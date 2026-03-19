import Winston from "winston";

const Logger = Winston.createLogger({
  level: "error",
  transports: [new Winston.transports.File({ filename: "log/errors.log.json" })],
});

export default Logger;
