// Eksempel 1 - side effect import
import "dotenv/config";

// Eksempel 2
// import dotenv from "dotenv";
// dotenv.config({ path: "./.env-dev" });

console.log(process.env.MYSQL_USER);
