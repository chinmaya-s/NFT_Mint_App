const contract = require("./build/LimitedMintERC721.json")

const CONTRACT_ADDR = "0x6594a2937366a5A09f0b7e640e34eB0A39112515" 

const abi = contract.abi

const erc721ContractFunc = (web3) => {
    return new web3.eth.Contract(abi, CONTRACT_ADDR)
}

export default erc721ContractFunc 