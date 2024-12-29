const qrcode = require("qrcode-terminal");
const {result} = require("./AI");

const { Client, LocalAuth } = require("whatsapp-web.js");

const whatsapp = new Client({
  AuthStrategy: new LocalAuth(),
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
    message.reply("Hello! how Are You?");
  } else if (message.body.startsWith("@bot")) {
    const prompt = message.body.replace("@bot", "");
    result(prompt).then((response) => {
      message.reply(response);
    });
  }
});
whatsapp.on("message_create", (msg) => {
  if (msg.fromMe && msg.body.startsWith("@bot")) {
    const prompt = msg.body.replace("@bot", "" );
    result(prompt).then((response) => {
      msg.reply(response);
    });
  }
});





whatsapp.initialize();

module.exports = {
  whatsapp
}