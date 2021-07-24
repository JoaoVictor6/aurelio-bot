import * as dotenv from "dotenv";
dotenv.config()
const Discord = require('discord.js');

import { Message } from "discord.js";

const client = new Discord.Client()

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag} ✅`)
})

client.on("message", (message: Message) => {
  if(message.content === "ping"){
    message.channel.send("pong")
  }
})

client.login(process.env.BOT_TOKEN)