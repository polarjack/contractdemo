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
var student = require('./using.js');

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

//done
app.get('/addVideo', (req, res) => {
    var message = req.query.message;
    student.addVideo(sha3_256(message), {
        from: eth.accounts[0],
        gas: 100000
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

//done
app.get('/deleteVideo', (req, res) => {
    var message = req.query.message;
    student.deleteVideo(sha3_256(message), {
        from: eth.accounts[0],
        gas: 100000
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

//done
app.get('/showAllVideos', (req, res) => {
    var result = student.showAllVideos()
    res.json({
        result: result
    })
})

//done
app.get('/ifInside', (req, res) => {
    var message = req.query.message
    var account = eth.accounts[0]
    var result = student.ifInside(sha3_256(message))
    res.json({
        result: result
    })
})


//done
app.get('/addCertificates', (req, res) => {
    var cer = req.query.cer
    var account = eth.accounts[0]
    student.addCertificates(cer, {
        from: account,
        gas: 2000000
    }, (err, txhash) => {
        if (!err) {
            console.log("done")
            res.json({
                txhash: txhash
            })
        } else {
            res.json({
                err: errs
            })
        }
    })
})

//done
app.get('/deleteCertificates', (req, res) => {
    var account = eth.accounts[0];
    var cer = req.query.cer
    student.deleteCertificates(cer, {
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

//done
app.get('/showAllCer', (req, res) => {
    var result = student.showAllCer()
    res.json({
        result: result
    })
})

//error
// app.get('/changeStudent', (req, res) => {
//     var account = eth.accounts[0]
//     var student = req.query.student
//     student.changingStudent(student, {
//         from: account,
//         gas: 2000000
//     }, (err, txhash) => {
//         if (!err) {
//             res.json({
//                 txhash: txhash
//             })
//         } else {
//             res.json({
//                 err: err
//             })
//         }
//     })
// })

//done
app.get('/showStudent', (req, res) => {
    var result = student.showStudent()
    res.json({
        result: result
    })
})

//done
app.get('/showCreator', (req, res) => {
    var result = student.showCreator()
    res.json({
        result: result
    })
})

// app.get('/shatest', (req, res) => {
//     res.json({
//         message: sha3_256(req.query.message)
//     })
// })

app.listen(3000)