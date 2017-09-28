// 用於處理路徑
var path = require('path')

// import 同目錄的 eventEmitter.js
var eventEmitter = require('./eventEmitter.js')

// import 同目錄的 web3.js
var web3 = require('./web3.js')
var eth = web3.eth

// import 同目錄的 bank
// var bank = require('./bank.js')

// Express.js
var express = require('express')
var app = express()

// 讓 req 有 body
var bodyParser = require('body-parser')

// 使 static 中的檔案能被讀取
// app.use(express.static(path.resolve(__dirname, 'static')))

// var deploy = require('./deployDemo.js')
var eventTest = require('./using.js');

var sha3_256 = require('js-sha3').sha3_256;

// 註冊 body-parser 處理 body stream
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

//fortest
app.get('/account', (req, res) => {
    var account = eth.accounts[0]
    eth.getBalance(account, (err, ethBalance) => {
        var output;
        if (!err) {
            // output = ethBalance;
            res.json(web3.fromWei(ethBalance, 'ether'));
        } else {
            // output = err;
            res.status(500).json(err)
        }
        // res.send('')
    })
});

app.get('/changeuser', (req, res) => {
    var _new = eth.accounts[2]
    var account = eth.accounts[0]
    
    eventTest.changeOwner(_new, {
        from: account,
        gas: 2000000
    }, (err, txhash) => {
        if(!err) {
            console.log(txhash)
            eventEmitter.once('StudentChange:', function(eventPayload) {
                console.log(eventPayload);
                eventPayload['txhash'] = txhash
                res.json(eventPayload)
            })
            // res.json({
            //     status: "success", 
            //     txhash: txhash
            // })
        } else {
            cosole.log(err)
            res.status(500).json(err)
        }
    })
})



app.listen(3000)