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
  if (message.content === "??sobre") {
    const embed = new MessageEmbed({
      thumbnail: {
        url: "https://i.ibb.co/Fsyc897/644129-Aln8-Nr-FK.png",
        width: 1500,
      },
      color: "#FAAB05",
      title: "Informações sobre o projeto",
      fields: [
        {
          name: "Links úteis:",
          value: `
            [GitHub](https://github.com/JoaoVictor6/aurelio-bot)
            [Twitter](https://twitter.com/PrazerJo)
          `,
        },
      ],
    });

    message.reply(embed);

    return;
  }

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
      color: "#0583F2",
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
    color: "#0583F2",
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
