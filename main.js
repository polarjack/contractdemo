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
var deploy = require('./deployDone.js');

// 註冊 body-parser 處理 body stream
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
	extended: true
}))

app.get('/account', (req, res) => {
	var account = req.query.a
	eth.getBalance(account, (err, ethBalance) => {
		var output;
		if(!err) {
			// output = ethBalance;
			res.json(ethBalance);
		}
		else {
			// output = err;
			res.status(500).json(err)
		}
		// res.send('')
	})
});

// app.get('/deploycontract', (req, res) => {
	
// })

app.get('/showOwner', (req, res) => {
	var result = deploy.showOwner()
	res.json({
		result: result
	})
})

app.get('/changeOwner', (req, res) => {
	deploy.changeOwner("0x05efa790fcb8b64b381f35f2aec58bb8aea9b1cb", {
		from: eth.accounts[0],
		gas: 2000000
	}, (err, txhash) => {
		if(!err) {
			console.log(txhash)
		}
		else {
			console.log(err)
		}
	})
	res.json("done");
})

// app.get('/deploycontract', (req, res) => {
// 	var output = deploy();
// 	output.then((input) => {
// 		console.log(input)
// 		res.json("done")
// 	}).catch((input) => {
// 		console.log(input)
// 		res.json("err")
// 	})
	
// })

console.log("testing")

app.listen('3000')
