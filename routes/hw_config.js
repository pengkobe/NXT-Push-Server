module.exports = {
  appId: 1,
  appSecret: "",
  tokens: "",
  callback: function(a, b) {
    debugger;
    console.log("华为推送服务端回调！");
    console.log(JSON.stringify(a));
    console.log(JSON.stringify(b));
    console.log(JSON.stringify(arguments, null, 2));
  }
};
