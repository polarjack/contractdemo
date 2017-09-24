'use strict'

//const Web3 = require('web3')
const path = require('path')
const fs = require('fs')
var web3 = require('./web3')

var eth = web3.eth;
const account = "0x004f8fa1b484547269a985c2de67364c09ac59e4"

const contractName = "Mytest"
const contract_abi = JSON.parse(fs.readFileSync(contractName + '.json'))
const contract_bytecode = '0x' + fs.readFileSync(contractName + '.bin').toString()


eth.getBalance(account, (err, ethBalance) => {
    if(!err) {
        console.log(ethBalance);
    }
    else {
        console.log(err);
    }
})
var myTestContract = eth.contract(contract_abi)
var myTest = myTestContract.new({
    from: eth.accounts[0],
    data: contract_bytecode,
    gas: '20000000'
}, function (e, contract) {
    
})



