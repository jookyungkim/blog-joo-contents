const ip = require("ip");

exports.getUserIP = (req) => {
  let addr = ip.address();
  if (process.env.NODE_ENV === "production") {
    addr = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  }
  return addr;
};
