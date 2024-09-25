const { Sequelize } = require("sequelize");
require("dotenv").config();

const toBool = x => x === "true";
const DATABASE_URL = process.env.DATABASE_URL || "./database.db";

module.exports = {
   // Boolean Values (converted from Strings)
   LOGS: toBool(process.env.LOGS) || false,
   ANTILINK: toBool(process.env.ANTI_LINK) || false,
   HEROKU: toBool(process.env.HEROKU) || false,
   AUTO_READ: toBool(process.env.AUTO_READ) || false,
   AUTO_STATUS_READ: toBool(process.env.AUTO_STATUS_READ) || true,
   DELETED_LOG: toBool(process.env.DELETED_LOG) || true,
   STATUS_SAVER: toBool(process.env.STATUS_SAVER) || false,
   AUTO_REACT: toBool(process.env.AUTO_REACT) || false,

   // String Values
   SESSION_ID: "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRUZqb2hlaHpDN3N1RmJmc3ZHZEtjNGMwbEhZN3J0VzZoQXdVR05La3cwMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidzBUdnByd3ZBVXN4b2ZsUXdtTlZsa3RKMUtRMFd6MUo0RjJRUWxFQ1FqRT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIyQjRsajlpNkhTdXZEYjlsa0o0bVJINEptUHdoL3VkbGVuNDFXYU1JcTIwPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJoY3ZhZHpWMU9lM2dqbzBkMWtTaTNmUmZ4blBRcUdIYjR1cUJZNXVLQ1dJPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IitHWHFnait2aWU3MU0yZEE0Yi9hRng2bklNclNmZFZJS0xpbUJYRTNGV1E9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlR6dUxVN0VhS3puVUVEVENKdUZhZFBCWW4rWTBtQnlKbkU1Y1V0SGxvMjQ9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY0FxNWlxd2JXVzFhMnd2Z3grSHFqc3MrYU1RZXBTWk5vRjdHZkJNbFFrWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZVJpaGFiZTNtTEhpYVNKcllmZnFvVnZzMnZmNDVDdmF4UEpZdU1OeVZDOD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImpXbmNDMThucGtwVU9iejYvRFk5SWJBUUkwcC9kWWdsMnE0N0l2MkpJRE9ML3NUYWNqVGdGdTJ6YWphZ3hkbzFtY3prWGhZWVNScm0zUGtTS3BRcEJnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTAyLCJhZHZTZWNyZXRLZXkiOiJZMXk5WE95ck5rNGpTbGZONnVLR2trNHcwbktWakxJV1R4UjBKZEZERnQwPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJnaTFoX25VV1JhR3dpRUNxWHBHeVpnIiwicGhvbmVJZCI6IjI0YzFkYjVhLTY4ZDYtNGUwMy04NGM0LTZjZDY5Yzk5NDBiZiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDNXM0ZjE0dnZCdk1tSmlYWnpLSk1SNVpsbG89In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQVJHdndlL0NmTVc2UFJkVk1sM2s4ZlUwY3FZPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjdWMjVGNkI1IiwibWUiOnsiaWQiOiIxNzg2NDQ0NTQ3Njo0MkBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiLwnZWE8J2VkvCdlZXwnZWS8J2Vo/CdlZLippblvaHwnZmS8J2ZivCdmY3wnZmG8J2ZgPCdmY0g8J2ZjvCdmYfwnZi88J2ZlCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDT3Y2NHJFR0VOL0QwYmNHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiYlhVL24zUXRmV2FjVERKaGNpL1BWV2hnak5CM09MNmNTYXpjWCtrazNIRT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiNzBCL2JYNVgxamJIZEdXWFBuZ1FEK1BaVWgwUUZzWnVQS1VZSWpQZDg3NTYzQnltb0d3aXJic0R6V3pGeGN5R2Z2Z0dRR1E5QnBtb29OM0N5SlVzQlE9PSIsImRldmljZVNpZ25hdHVyZSI6ImpJUjgwMjMxRzdmUDdrL2lCblMrLzY1RWs4Q2J4a3MvS2VkaGFlSyt1OTFpVmpaQ0o4Sk1IbEpxdi9mRmFLUXhxblFyaFpTbUU2MDEzK0kzM1JVNkFnPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMTc4NjQ0NDU0NzY6NDJAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCVzExUDU5MExYMW1uRXd5WVhJdnoxVm9ZSXpRZHppK25FbXMzRi9wSk54eCJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyNzI5MTg4MywibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFML0gifQ=="
   HANDLERS: process.env.HANDLER === "false" || process.env.HANDLER === "null" ? "^" : "[.]",
   BOT_INFO: process.env.BOT_INFO || "Kɢᴛᴇᴄʜ;KᴇʀᴍLɪᴛᴇ⚡️", // YourName;BotName;Image/VideoLink
   SUDO: process.env.SUDO || "+1 7864445476",
   PRESENCE: process.env.PRESENCE || "available", // "unavailable", "available", "composing", "recording", "paused"
   CAPTION: process.env.CAPTION || "© Kᴇʀᴍ ᴍᴅ",
   TIME_ZONE: process.env.TIME_ZONE || "Africa/Lagos",
   ANTILINK_ACTION: process.env.ANTI_LINK || "kick",
   BRANCH: "master",
   AUTHOR: process.env.AUTHOR || "Kᴇʀᴍ-ᴍᴅ",
   ANTIWORD: process.env.ANTIWORD || "badword1,badword2,badword3",
   PACKNAME: process.env.PACKNAME || "KᴇʀᴍLɪᴛᴇ⚡️",
   WELCOME_MSG: process.env.WELCOME_MSG || "Hi @user Welcome to @gname",
   GOODBYE_MSG: process.env.GOODBYE_MSG || "Hi @user It was Nice Seeing you",
   RMBG_KEY: process.env.RMBG_KEY || "",
   WORK_TYPE: process.env.WORK_TYPE || "private",
   DELETED_LOG_CHAT: process.env.DELETED_LOG_CHAT || false,
   REMOVEBG: process.env.REMOVEBG || "",
   HEROKU_APP_NAME: process.env.HEROKU_APP_NAME,
   HEROKU_API_KEY: process.env.HEROKU_API_KEY,

   // Number Values
   WARN_COUNT: 3,

   // Database Configuration
   DATABASE_URL: DATABASE_URL,
   DATABASE:
      DATABASE_URL === "./database.db"
         ? new Sequelize({
              dialect: "sqlite",
              storage: DATABASE_URL,
              logging: false,
           })
         : new Sequelize(DATABASE_URL, {
              dialect: "postgres",
              ssl: true,
              protocol: "postgres",
              dialectOptions: {
                 native: true,
                 ssl: { require: true, rejectUnauthorized: false },
              },
              logging: false,
           }),
};
