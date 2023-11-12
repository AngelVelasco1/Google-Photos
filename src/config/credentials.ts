import dotenv from 'dotenv';
dotenv.config()

export const CONFIG = {
  hostname: process.env.HOSTNAME,
  port: process.env.PORT,
  db_connection: process.env.DB_CONNECTION,
  db_name: process.env.DB_NAME,
  db_username: process.env.DB_USERNAME,
  db_password: process.env.DB_PASSWORD,
  session_secret: process.env.SESSION_SECRET
}