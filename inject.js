const fs = require("fs");
const path = require("path");
require("dotenv").config();

const templatePath = path.join(__dirname, "content.template.js");
const outputPath = path.join(__dirname, "content.js");

let content = fs.readFileSync(templatePath, "utf-8");

content = content
  .replace(/__GOOGLE_API_KEY__/g, process.env.GOOGLE_API_KEY)
  .replace(/__CSE_ID__/g, process.env.CSE_ID);

fs.writeFileSync(outputPath, content);
console.log("✅ content.js generated with API keys");
