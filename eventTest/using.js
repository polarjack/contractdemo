'use strict'

//const Web3 = require('web3')
const path = require('path')
const fs = require('fs')
const Web3 = require('web3')
const Promise = require('promise')
const eventEmitter = require('./eventEmitter.js')

let contractName = 'EventTest'
let gasEstimate = 200000
const provider = "http://localhost:8545"
const web3 = new Web3(new Web3.providers.HttpProvider(provider))

const contract_abi = JSON.parse(fs.readFileSync(contractName + '.json'))
const contract_bytecode = '0x' + fs.readFileSync(contractName + '.bin').toString()

var done = web3.eth.contract(contract_abi).at("0x62f32611919a82e5585bc6e4478d411e1bf11ae2");

done.StudentChange({}, function (err, event) {
  eventEmitter.emit('DepositEvent:' + event.args.from, event.args)
})
 

module.exports = done