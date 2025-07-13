const fs = require("fs");
const path = require("path");
require("dotenv").config();

const filePath = path.join(__dirname, "content.js");
let content = fs.readFileSync(filePath, "utf-8");

content = content
  .replace(/__GOOGLE_API_KEY__/g, process.env.GOOGLE_API_KEY)
  .replace(/__CSE_ID__/g, process.env.CSE_ID);

fs.writeFileSync(filePath, content);
console.log("✅ Environment variables injected into content.js");
