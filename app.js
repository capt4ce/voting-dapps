Web3 = require('web3')
fs = require('fs')
solc = require('solc')

web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
code = fs.readFileSync('Voting.sol').toString()
compiledCode = solc.compile(code)
abiDefinition = JSON.parse(compiledCode.contracts[':Voting'].interface)
VotingContract = web3.eth.contract(abiDefinition)
byteCode = compiledCode.contracts[':Voting'].bytecode
deployedContract = VotingContract.new(['Rama', 'Nick', 'Jose'], { data: byteCode, from: web3.eth.accounts[0], gas: 4700000 })
console.log('Contract Address: ' + deployedContract.address)
contractInstance = VotingContract.at(deployedContract.address)

var process = require('process')
var stop = false;
var f = function () { if (!stop) process.nextTick(f) }
f()
console.log(JSON.stringify(abiDefinition))
console.log('from: ' + web3.eth.accounts[0])
console.log('account [0] balance: ' + web3.eth.getBalance(web3.eth.accounts[0]))
console.log('web3 ready...')
console.log('transaction ' + JSON.stringify(web3.eth.getTransaction('0xb3c9b26745dbd1cd2327700ef984686029e6613993170ad7f314f37e963d8adc')))

