module.exports = {
  appId: 1,
  appSecret: "",
  tokens: "",
  callback: function(err, data,d3) {
    console.log("华为推送服务端回调！");
    console.log('err:',err);
    console.log('data:',data);
    // data
    console.log(JSON.stringify(arguments, null, 2));
  }
};
