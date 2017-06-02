"use strict";

require("./DateUtil");
const hw_config = require("./hw_config");
const xm_config = require("./xm_config");
let HWPush = require("huawei-push");
let MIPush = require("xiaomi-push");

/** 华为推送 LIB */
var HWMessage = HWPush.Message;
var HWNotification = HWPush.Notification;

let notification = new HWNotification({
      appId: hw_config.appId,
      appSecret: hw_config.appSecret
});

/** 小米推送 LIB*/
let MIMessage = MIPush.Message;
let MINotification = MIPush.Notification;


module.exports.init = function(router) {
  /**
   * 示例 Code
   */
  router.get("/", async function(ctx, next) {
    ctx.state = {
      title: "NXT Push Server"
    };
    await ctx.render("index", {});
  });

  /**
   * 华为推送API
   */
  router.post("/HWNotificationApi", async function(ctx, next) {
    let deviceToken = ctx.request.body.token;
    if (Object.prototype.toString.call(deviceToken) == "[object Array]"){
        deviceToken = deviceToken.join(',');
    }
   
    let type = ctx.request.body.type;
    let title = ctx.request.body.title?  ctx.request.body.title: "EFOS";
    let content = ctx.request.body.content?ctx.request.body.content: "您有新的消息";
    console.log('deviceToken:'+deviceToken+ 'type:'+type+'title:'+title + 'content:'+ content);
    if(!deviceToken){
        ctx.status = 200;
        ctx.body = {
          success: false,
          message: ""
        };
        return;
    }

    let msg = new HWMessage();
    let nowtime = new Date().getTime();
    let sendtime = new Date(nowtime+60000);
    // 置于 extras 中区分推送类型
    msg.title(title).content(content).send_time(sendtime.format("isoDateTime")+"+08:00").extras({
      Type:type
    });
    
    // deviceToken:多个token用","分隔
    (function(deviceToken, msg, hw_config){
       setTimeout(function(){
          notification.send(deviceToken, msg, hw_config.callback);
       }, Math.random()* 1000);
    })(deviceToken, msg, hw_config);
   
    ctx.status = 200;
    ctx.body = {
      success: true,
      message: ""
    };
  });

  /**
   * 小米推送API
   */
  router.get("/MINotificationApi", async function(ctx, next) {
    let msg = new MIMessage();
    msg
      .title("EFOS")
      .description("description example")
      .payload("payload description")
      .passThrough(0)
      .notifyType(-1)
      .extra("badge", 6);

    let notification = new MINotification({
      production: xm_config.production,
      appSecret: xm_config.appSecret
    });

    let regid = xm_config.regids[0];

    notification.send(regid, msg, xm_config.callback);

    ctx.status = 200;
    ctx.body = {
      success: true,
      message: ""
    };
  });
};
