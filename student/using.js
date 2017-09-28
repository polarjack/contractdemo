'use strict'

//const Web3 = require('web3')
const path = require('path')
const fs = require('fs')
const Web3 = require('web3')
const Promise = require('promise')
var eventEmitter = require('./eventEmitter.js')

let contractName = 'Student'
let gasEstimate = 200000
const provider = "http://localhost:8545"
const web3 = new Web3(new Web3.providers.HttpProvider(provider))

const contract_abi = JSON.parse(fs.readFileSync(contractName + '.json'))
const contract_bytecode = '0x' + fs.readFileSync(contractName + '.bin').toString()

const contractAddress = "0x017af8e3d1cac21248c2a6b2bba322aa774c2756"
var done = web3.eth.contract(contract_abi).at(contractAddress);

done.StudentChange({}, function(err, event) {
  console.log("StudentChange")
  if(!err) {
    eventEmitter.emit('StudentChange:', event.args)
  }
  else {
    console.log(err)
  }
})

done.VideoChange({}, function(err, event) {
  console.log("VideoChange")
  if(!err) {
    eventEmitter.emit('VideoChange:', event.args)
  }
  else {
    console.log(err)
  }
})

done.CertificateChange({}, function(err, event) {
  console.log("CertificateChange")
  if(!err) {
    eventEmitter.emit('CertificateChange:', event.args)
  }
  else {
    console.log(err)
  }
})

module.exports = done