class BlockChain {
    constructor() {}

    GetUnspendOutputsByAddress(address) {
        let outputs = [{
            "tx_hash": "58d00055cae1c410cb57462c9d5d56a536284a5abc02a1ac54dd4f79cb731d3e",
            "address": address,
            "value": "25.12345678"
        }, {
            "tx_hash": "982e9d4e99ce75b72bf3ba0d4bb2a11bb55f5e7b32c8b29305264615b0a6de0b",
            "address": address,
            "value": "13"
        }];
        return outputs;
    }

}

let chain = new BlockChain();

let testData = {
    chain: chain,
};

module.exports = testData;
