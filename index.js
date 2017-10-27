web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
abi = JSON.parse('[{"constant":false,"inputs":[],"name":"getCandidates","outputs":[{"name":"","type":"bytes32[]"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"totalVotesFor","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"validCandidate","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"votesReceived","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"candidateList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"voteForCandidate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"candidateNames","type":"bytes32[]"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"name","type":"bytes32"},{"indexed":true,"name":"voter","type":"address"}],"name":"Vote","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"timestamp","type":"uint256"}],"name":"TotalVotes","type":"event"}]')
VotingContract = web3.eth.contract(abi);
// In your nodejs console, execute contractInstance.address to get the address at which the contract is deployed and change the line below to use your deployed address
contractAddress = '0xe0b391a335cfc3705828e08b757ede0c7856db1e';
contractInstance = VotingContract.at(contractAddress);
candidates = { "Rama": "candidate-1", "Nick": "candidate-2", "Jose": "candidate-3" }

function voteForCandidate() {
  candidateName = $("#candidate").val();
  // candidateName = 'Rama';
  contractInstance.voteForCandidate(candidateName, { from: web3.eth.accounts[1] }, function () {
    let div_id = candidates[candidateName];
    $("#" + div_id).html(contractInstance.totalVotesFor.call(candidateName).toString());
    console.log('vote')
  });
}

$(document).ready(function () {
  candidateNames = Object.keys(candidates);
  for (var i = 0; i < candidateNames.length; i++) {
    let name = candidateNames[i];
    let val = contractInstance.totalVotesFor.call(name).toString()
    $("#" + candidates[name]).html(val);
  }
  vote = contractInstance.Vote({ voter: '0x7e92dc1c68af3d2bd9f18af2855796fc00ac25dd' }, { fromBlock: 3, toBlock: 'latest' })
  vote.watch(function (e, r) {
    // console.log(r)
    console.log('name: ' + web3.toAscii(r.args.name))
    console.log('voter: ' + r.args.voter)
  })


  // const filter = web3.eth.filter({
  //   fromBlock: 0,
  //   toBlock: 'latest',
  //   address: contractAddress,
  //   topics: [web3.sha3('Vote(bytes32,address)')]
  // })


  // filter.watch((error, result) => {
  //   console.log(result);
  //   // a = web3.eth.getBlock(result.blockNumber);
  //   // console.log(a)

  //   // web3.eth.getBlock(result.blockNumber, true, function (e, r) {
  //   //   console.log(r.args)
  //   // })
  //   // console.log(a.totalVotesFor.call(candidateName).toString())
  //   // web3.eth.getTransaction(0x325dd759ce7000d9f103560e7d2f2acd181c8bba0225e116012129a847a6c79c, function (e, r) {
  //   //   console.log(r)
  //   // })
  // })
  // alert(contractInstance.getTestStr.call())

  // // filter = web3.eth.filter('Vote')

});
