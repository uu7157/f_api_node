const express = require("express");
const axios = require("axios");
const cors = require("cors");
const cheerio = require("cheerio");

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hey this is my API running 🥳");
});

app.get("/api/directlink", (req, res) => {
  let id = req.query.id;
  if (!id) {
    res.send({
      error: "id is required",
    });
  }
});

function adilboHTMLdecoder(code, script, nativePlayer) {
  let page = "";
  if (script && code) {
    script = script.replace(/'/g, "").replace(/\+/g, "").replace(/\n/g, "");
    const sc = script.split(".");
    sc.forEach((elm) => {
      const c_elm = Buffer.from(elm + "==", "base64").toString("ascii");
      const matches = c_elm.match(/\d+/g);
      if (matches) {
        const nb = parseInt(matches[0], 10) + parseInt(code, 10);
        page += String.fromCharCode(nb);
      }
    });

    const regex = nativePlayer
      ? /var\s*videoSrc\s*=\s*'(.+?)'/s
      : /file":"(.+?)"/s;
    const matches2 = page.match(regex);
    return matches2?.[1] || "";
  }
  return "";
}

const port = process.env.PORT || 8080;

app.listen(port, (err, res) => {
  if (err) {
    console.log(err);
    return res.status(500).send(err.message);
  } else {
    console.log("[INFO] Server Running on http://localhost:" + port);
  }
});

module.exports = app;
