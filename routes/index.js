"use strict";

require("./DateUtil");
var hw_config = require("./hw_config");
var xm_config = require("./xm_config");
var HWPush = require("huawei-push");
var MIPush = require("xiaomi-push");

/** 华为推送 LIB */
var HWMessage = HWPush.Message;
var HWNotification = HWPush.Notification;

/** 小米推送 LIB*/
var MIMessage = MIPush.Message;
var MINotification = MIPush.Notification;

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
    let notification = new HWNotification({
      appId: hw_config.appId,
      appSecret: hw_config.appSecret
    });
    // deviceToken:多个token用","分隔
    notification.send(deviceToken, msg, hw_config.callback);

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
    var msg = new MIMessage();
    msg
      .title("EFOS")
      .description("description example")
      .payload("payload description")
      .passThrough(0)
      .notifyType(-1)
      .extra("badge", 6);

    var notification = new MINotification({
      production: xm_config.production,
      appSecret: xm_config.appSecret
    });

    var regid = xm_config.regids[0];

    notification.send(regid, msg, xm_config.callback);

    ctx.status = 200;
    ctx.body = {
      success: true,
      message: ""
    };
  });
};
