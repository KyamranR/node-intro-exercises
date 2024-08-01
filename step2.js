const fs = require("fs");
const axios = require("axios");

function cat(path) {
  fs.readFile(path, "utf-8", (err, data) => {
    if (err) {
      console.log(`Error reading ${path}: ${err}`);
      process.exit(1);
    } else {
      console.log(data);
    }
  });
}

async function webCat(url) {
  try {
    let response = await axios.get(url);
    console.log(response.data);
  } catch (error) {
    console.log(`Error fetching ${url}: ${error}`);
    process.exit(1);
  }
}

let path = process.argv[2];

if (path.startsWith("http")) {
  webCat(path);
} else {
  cat(path);
}
