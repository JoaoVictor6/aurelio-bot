import * as dotenv from 'dotenv';
import { Message, MessageEmbed } from 'discord.js';
import { scrapeMeaning } from './services';
import createEmbedMesssage from './services/createEmbedMessage';

dotenv.config();
// eslint-disable-next-line import/first
import './server';

const Discord = require('discord.js');

const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag} ✅`);
});

client.on('message', async (message: Message) => {
  if (message.content === '??sobre') {
    const embed = new MessageEmbed({
      thumbnail: {
        url: 'https://i.ibb.co/Fsyc897/644129-Aln8-Nr-FK.png',
        width: 1500,
      },
      color: '#FAAB05',
      title: 'Informações sobre o projeto',
      fields: [
        {
          name: 'Links úteis:',
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

  if (message.content[0] === '?') {
    const wordPass = message.content
      .replace('?', '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

    const wordPassTitle = message.content.replace('?', '').toLowerCase();

    if (wordPass === '') {
      message.reply('Palavra inexistente 😓');
      return;
    }
    try {
      const { palavra, etimologia, significado } = await scrapeMeaning(
        wordPass,
      );

      message.reply({
        embed: createEmbedMesssage(wordPassTitle, {
          palavra,
          etimologia,
          significado,
        }),
      });
    } catch (err) {
      message.reply('Não conseguimos achar a palavra 😶');
    }
  }
});

client.login(process.env.BOT_TOKEN);
