const fs = require("fs");
const crypto = require("crypto");

const sign = crypto.createSign('SHA256');
const hash = crypto.createHash('SHA256');
const verify = crypto.createVerify('SHA256');

var txManager = require("../js/transaction.js");

var bobKeys = {};
fs.readFile('../keys_test/bob_key.pem', (err, data) => {
    if (err) throw err;
    console.log(`the date we just get is: ${data}, and it should be a private key`);
    bobKeys.private = data.toString();
});
fs.readFile('../keys_test/bob_pubkey.pem', (err, data) => {
    if (err) throw err;
    console.log(`the date we just get is: ${data}, and it should be a public key`);
    bobKeys.public = data.toString();
});

let aliceKeys = {};
fs.readFile('../keys_test/alice_key.pem', (err, data) => {
    if (err) throw err;
    console.log(`the date we just get is: ${data}, and it should be a private key`);
    aliceKeys.private = data.toString();
});
fs.readFile('../keys_test/alice_pubkey.pem', (err, data) => {
    if (err) throw err;
    console.log(`the date we just get is: ${data}, and it should be a public key`);
    aliceKeys.public = data.toString();
});

setTimeout(() => {
    let tx = txManager.CreateTransaction(bobKeys.private, bobKeys.public, aliceKeys.public, 8);
    console.log(JSON.stringify(tx));

    let validity = txManager.VerifyTransaction(tx);
    console.log(validity);
    tx.body.out[0].value = "12.3";
    console.log(JSON.stringify(tx));
    validity = txManager.VerifyTransaction(tx);
    console.log(validity);

    tx.header.signature = "something wrong";
    console.log(JSON.stringify(tx));
    validity = txManager.VerifyTransaction(tx);
    console.log(validity);
}, 3000);
