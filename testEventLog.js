

var filter = web3.eth.filter({ fromBlock: 0, toBlock: 'latest', topics: [/* ????!!! */] });

filter.get(function (error, result) {
    console.log(result)
})