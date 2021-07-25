import * as dotenv from "dotenv";
dotenv.config();

const Discord = require("discord.js");
import { ErrorEvent, Message, MessageEmbed } from "discord.js";
import { dicionarioResponseProps, scrapeMeaning } from "./services";

const client = new Discord.Client();

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag} ✅`);
});

client.on("message", async (message: Message) => {
  if (message.content[0] === "?") {
    const wordPass = message.content
      .replace("?", "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    const wordPassTitle = message.content.replace("?", "").toLowerCase();

    if (wordPass === "") {
      message.reply("Palavra inexistente 😓");
      return;
    }
    try {
      const { palavra, etimologia, significado } = await scrapeMeaning(
        wordPass
      );

      message.reply({
        embed: createEmbedMesssage(wordPassTitle, {
          palavra,
          etimologia,
          significado,
        }),
      });
    } catch (err) {
      message.reply("Não conseguimos achar a palavra 😶");
    }
  }
});

function createEmbedMesssage(
  title: string,
  dicionario: dicionarioResponseProps
) {
  const { etimologia, palavra, significado } = dicionario;

  if (etimologia.length === 0) {
    return {
      author: {
        name: `Palavra ${title} 📚`,
      },
      footer: {
        text: "Fonte: dicio.com.br",
      },
      fields: [
        {
          name: "Significados",
          value: significado.join("\n\n"),
          inline: true,
        },
      ],
    };
  }

  return {
    author: {
      name: `Palavra ${title} 📚`,
    },
    footer: {
      text: "Fonte: dicio.com.br",
    },
    fields: [
      {
        name: "Significados",
        value: significado.join("\n\n"),
        inline: true,
      },
      {
        name: "Etimologia",
        value: etimologia.join("\n\n"),
      },
    ],
  };
}

client.login(process.env.BOT_TOKEN);
