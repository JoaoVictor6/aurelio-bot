import { dicionarioResponseProps } from './index';

export default function createEmbedMesssage(
  title: string,
  dicionario: dicionarioResponseProps,
) {
  const { etimologia, significado } = dicionario;

  if (etimologia.length === 0) {
    return {
      color: '#0583F2',
      author: {
        name: `Palavra ${title} 📚`,
      },
      footer: {
        text: 'Fonte: dicio.com.br',
      },
      fields: [
        {
          name: 'Significados',
          value: significado.join('\n\n'),
          inline: true,
        },
      ],
    };
  }

  return {
    color: '#0583F2',
    author: {
      name: `Palavra ${title} 📚`,
    },
    footer: {
      text: 'Fonte: dicio.com.br',
    },
    fields: [
      {
        name: 'Significados',
        value: significado.join('\n\n'),
        inline: true,
      },
      {
        name: 'Etimologia',
        value: etimologia.join('\n\n'),
      },
    ],
  };
}
