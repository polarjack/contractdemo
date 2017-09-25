// 用於處理路徑
var path = require('path')

// import 同目錄的 eventEmitter.js
// var eventEmitter = require('./eventEmitter.js')

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
var certificate = require('./using.js');

var sha3_256 = require('js-sha3').sha3_256;

// 註冊 body-parser 處理 body stream
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

//fortest
// app.get('/account', (req, res) => {
//     var account = req.query.a
//     eth.getBalance(account, (err, ethBalance) => {
//         var output;
//         if (!err) {
//             // output = ethBalance;
//             res.json(ethBalance);
//         } else {
//             // output = err;
//             res.status(500).json(err)
//         }
//         // res.send('')
//     })
// });

app.get('/addVideo', (req, res) => {
    var account = eth.accounts[0]
    var message = req.query.message
    var videoId = req.query.videoId
    certificate.addVideo(videoId, message, {
        from: account,
        gas: 200000
    }, (err, txhash) => {
        if (!err) {
            res.json({
                txhash: txhash
            })
        } else {
            res.json({
                err: err
            })
        }
    })
})

app.get('/deleteVideo', (req, res) => {
    var account = eth.accounts[0]
    var videoId = req.query.videoId
    certificate.deleteVideo(videoId, {
        from: account,
        gas: 200000
    }, (err, txhash) => {
        if (!err) {
            res.json({
                txhash: txhash
            })
        } else {
            res.json({
                err: err
            })
        }
    })
})

app.get('/confirmVideo', (req, res) => {
    var account = eth.accounts[0]
    var videoId = req.query.videoId
    certificate.confirmVideo(videoId, {
        from: account,
        gas: 200000
    }, (err, txhash) => {
        if (!err) {
            res.json({
                txhash: txhash
            })
        } else {
            res.json({
                err: err
            })
        }
    })
})

app.get('/failedVideo', (req, res) => {
    var account = eth.accounts[0]
    var videoId = req.query.videoId
    certificate.failedVideo(videoId, {
        from: account,
        gas: 200000
    }, (err, txhash) => {
        if (!err) {
            res.json({
                txhash: txhash
            })
        } else {
            res.json({
                err: err
            })
        }
    })
})

app.get('/findVideo', (req, res) => {
    var account = eth.accounts[0]
    var videoId = req.query.videoId
    certificate.findVideo(videoId, {
        from: account,
        gas: 200000
    }, (err, txhash) => {
        if (!err) {
            res.json({
                txhash: txhash
            })
        } else {
            res.json({
                err: err
            })
        }
    })
})

app.listen(3000)