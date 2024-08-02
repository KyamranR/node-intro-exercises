const fs = require("fs");
const axios = require("axios");

function handleOutput(data, outputPath) {
  if (outputPath) {
    fs.writeFile(outputPath, data, "utf-8", (err) => {
      if (err) {
        console.log(`Couldn't write ${outputPath}: ${err}`);
        process.exit(1);
      }
    });
  } else {
    console.log(data);
  }
}

function cat(path, outputPath) {
  fs.readFile(path, "utf-8", (err, data) => {
    if (err) {
      console.log(`Error reading ${path}: ${err}`);
      process.exit(1);
    } else {
      handleOutput(data, outputPath);
    }
  });
}

async function webCat(url) {
  try {
    let response = await axios.get(url);
    handleOutput(response.data, outputPath);
  } catch (error) {
    console.log(`Error fetching ${url}: ${error}`);
    process.exit(1);
  }
}

let args = process.argv.slice(2);
let outputPath = null;
let path;

if (args[0] === "--out") {
  outputPath = args[1];
  path = args[2];
} else {
  path = args[0];
}

if (path.startsWith("http")) {
  webCat(path);
} else {
  cat(path);
}
