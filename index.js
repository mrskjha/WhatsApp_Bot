const qrcode = require("qrcode-terminal");
const { result } = require("./AI");
const { Client, LocalAuth } = require("whatsapp-web.js");
const express = require("express");

const app = express();
const port = 3000;

const whatsapp = new Client({
  authStrategy: new LocalAuth(),
});

whatsapp.on("qr", (qr) => {
  qrcode.generate(qr, {
    small: true,
  });
});

whatsapp.on("ready", () => {
  console.log("Client is ready");
});

whatsapp.on("message", async (message) => {
  if (message.body === "Hii") {
    message.reply("Hello! How are you?");
  } else if (message.body.startsWith("@bot")) {
    const prompt = message.body.replace("@bot", "");
    result(prompt).then((response) => {
      message.reply(response);
    });
  }
});

whatsapp.on("message_create", (msg) => {
  if (msg.fromMe && msg.body.startsWith("@bot")) {
    const prompt = msg.body.replace("@bot", "");
    result(prompt).then((response) => {
      msg.reply(response);
    });
  }
});

whatsapp.initialize();

app.get("/", (req, res) => {
  res.send("Hello, this is the Express server for the WhatsApp bot!");
});

app.listen(port, () => {
  console.log(`Express server is running on http://localhost:${port}`);
});

module.exports = {
  whatsapp,
};