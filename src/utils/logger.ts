import winston from "winston";

import { serverConfig } from "config";

const logger = winston.createLogger({
  level: serverConfig.logger.level,
  format: winston.format.combine(
    winston.format.timestamp({ format: "DD-MM-YYYY hh:mm:ss" }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: `${serverConfig.logger.folder_path}/log.log` }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.json(),
    })
  );
}

export default logger;
