"use strict";


const utils = require("../utils/index.js"),
  config = require("../config/index.js"),
  jwt = require("jsonwebtoken");
module.exports = async function(ctx, next) {
  const authorization = ctx.get("Authorization");
  if ("" === authorization) {
    ctx.throw(401, "no token detected in http header 'Authorization'");
  }
  const token = authorization.split(" ")[1];
  let tokenContent;
  try {
    tokenContent = await jwt.co_verify(token, config.jwt.cert)();
    console.log("Authorization tokenContent:", tokenContent);
  } catch (err) {
    ctx.status = 401;
    if ("TokenExpiredError" === err.name) {
      ctx.throw(401, "token expired");
    }
    ctx.throw(401, "invalid token");
  }
  utils.print("鉴权通过");
  ctx.token = tokenContent;
  return await next();
};
