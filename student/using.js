'use strict'

//const Web3 = require('web3')
const path = require('path')
const fs = require('fs')
const Web3 = require('web3')
const Promise = require('promise')

let contractName = 'Student'
let gasEstimate = 200000
const provider = "http://localhost:8545"
const web3 = new Web3(new Web3.providers.HttpProvider(provider))

const contract_abi = JSON.parse(fs.readFileSync(contractName + '.json'))
const contract_bytecode = '0x' + fs.readFileSync(contractName + '.bin').toString()

var done = web3.eth.contract(contract_abi).at("0x25447ed32acf4c5df2432aa1f43efe41ed152ba1");

module.exports = done