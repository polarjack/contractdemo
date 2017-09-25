'use strict'

//const Web3 = require('web3')
const path = require('path')
const fs = require('fs')
const Web3 = require('web3')
const Promise = require('promise')

let contractName = 'Student'
let gasEstimate = 2000000
const provider = "http://localhost:8545"
const web3 = new Web3(new Web3.providers.HttpProvider(provider))

const contract_abi = JSON.parse(fs.readFileSync(contractName + '.json'))
const contract_bytecode = '0x' + fs.readFileSync(contractName + '.bin').toString()


let MyContract = web3.eth.contract(contract_abi);

var searchAddr = '';
var studentAccount = "0xa81ac7cc05a30f529b04bbaaf5fa65df9e9f25fd"

var deploy =
    MyContract.new(studentAccount, {
        from: web3.eth.coinbase,
        data: contract_bytecode,
        gas: gasEstimate
    }, function (err, contract) {
        // if(!err) {
        //     console.log(err)
        // }
        // else {
        //     console.log(err)
        //     console.log(contract)
        // }
        if (typeof contract.address !== 'undefined') {
            console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash)
        }
    });

