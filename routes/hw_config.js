module.exports = {
  appId: 100015991,
  appSecret: "6c1fc2283c95cfc5c973cac43a68a353",
  tokens: "0a00000554307310300000502100CN01",
  callback: function(err, data,d3) {
    console.log("华为推送服务端回调！");
    console.log('err:',err);
    console.log('data:',data);
    console.log('d3:',d3);
    // data
    console.log(JSON.stringify(arguments, null, 2));
  }
};
