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

var done = web3.eth.contract(contract_abi).at("0xcd9b6d77fa43fdb8c7bf65c52499e55bbd5b04f4");

done.StudentChange({}, function (err, event) {
  console.log("inside regist event")
  console.log(err)
  eventEmitter.emit('StudentChange:', event.args)
})
console.log("using loaded")

module.exports = done