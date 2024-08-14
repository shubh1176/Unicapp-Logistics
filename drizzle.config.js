/** @type { import("drizzle-kit").Config } */
export default {
  schema: "./utils/schema.js",
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://unicappdb_owner:hl9CBgxPL6iW@ep-blue-queen-a5sqodxk.us-east-2.aws.neon.tech/unicappdb?sslmode=require',
  }
};