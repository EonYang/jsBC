const fs = require("fs");
const crypto = require("crypto");

const sign = crypto.createSign('SHA256');
const hash = crypto.createHash('SHA256');
const verify = crypto.createVerify('SHA256');

var bobKeys = {};
fs.readFile('../keys_test/bob_key.pem', (err, data) => {
    if (err) throw err;
    console.log(`the date we just get is: ${data}, and it should be a private key`);
    bobKeys.private = data;
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
    aliceKeys.private = data;
});
fs.readFile('../keys_test/alice_pubkey.pem', (err, data) => {
    if (err) throw err;
    console.log(`the date we just get is: ${data}, and it should be a public key`);
    aliceKeys.public = data;
});

setTimeout(() => {

    //bob will sign the message, to make people believe:
    //1. bob has the privatekey for this pubkey.
    //2. the message body has never been changed after he signed it. 
    let message = {
        from: bobKeys.public,
        content: "I'm giving alice all the money belongs to my pubkey, which is 200 dollar.",
        to: `alice's public key`
    };
	console.log(`the message is ${JSON.stringify(message)}`);
    // create messageHash, which we will sign later
    hash.update(JSON.stringify(message));
    let messageHash = hash.digest('base64');
    console.log(`the message hash is: ${messageHash}`);

    //signing messageHash
    sign.update(messageHash);
    let signature = sign.sign(bobKeys.private, 'base64');
    console.log(`the signaure is ${signature}`);

    //people will verify:
    // the signature is from bob's private key, the private key for the "from" pubkey.
    // the signature is for this message hash.
    verify.update(messageHash);
    let sigIsValid = verify.verify(bobKeys.public, signature, 'base64');
    console.log(`sig validity: ${sigIsValid}`);

}, 3000);
