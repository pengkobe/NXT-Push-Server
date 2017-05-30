"use strict";

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
   * 测试华为推送API
   */
  router.get("/HWNotificationApi", async function(ctx, next) {
    var msg = new HWMessage();
    msg.title("testHWApi").content("description example");

    var notification = new HWNotification({
      appId: hw_config.appId,
      appSecret: hw_config.appSecret
    });
    notification.send("your device token", msg, hw_config.callback);
    ctx.status = 200;
    ctx.body = {
      success: true,
      started: false
    };
  });

  /**
   * 测试小米推送API
   */
  router.get("/MINotificationApi", async function(ctx, next) {
    var msg = new MIMessage();
    msg
      .title("testXMApi")
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
      started: false
    };
  });
};
