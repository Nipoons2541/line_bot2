const line = require("@line/bot-sdk");
const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");
const env = dotenv.config().parsed;
const app = express();
const lineConfig = {
  channelAccessToken: env.ACCESS_TOKEN,
  channelSecret: env.SECRET_TOKEN,
};
console.log(lineConfig);

const client = new line.Client(lineConfig);

app.post("/webhook", line.middleware(lineConfig), async (req, res) => {
  try {
    const event = req.body.events;
    console.log(event);
    return event.length > 0
      ? await event.map((item) => handleEvent(item))
      : res.status(200).send("PASS");
  } catch (err) {
    return res.status(500).end();
  }
});

const handleEvent = async (event) => {
  console.log(event);
  return client.replyMessage(event.replyToken, {
    type: "text",
    text: "Hello world",
  });
};

app.listen(4000, () => {
  console.log("listening on 4000");
});
