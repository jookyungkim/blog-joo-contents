// const ip = require("ip");
const requestIp = require("request-ip");
const moment = require("moment");
require("moment-timezone");
moment.tz.setDefault("Asia/Seoul");

exports.getUserIP = (req) => {
  let addr = ip.address();
  if (process.env.NODE_ENV === "production") {
    // addr = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    addr = requestIp.getClientIp(req);
  }
  return addr;
};

exports.getKoreaMoment = () => {
  return moment();
};
