import axios from 'axios';
import cheerio from 'cheerio';

export type dicionarioResponseProps = {
  palavra: string;
  significado: string[];
  etimologia: string[];
  error?: string;
};

export async function scrapeMeaning(
  wordSearch: string,
): Promise<dicionarioResponseProps> {
  const { data } = await axios.get(`https://www.dicio.com.br/${wordSearch}/`);
  const $ = cheerio.load(data);
  const dicionarioResponse = {
    palavra: wordSearch,
    significado: [],
    etimologia: [],
    error: '',
  } as dicionarioResponseProps;
  if (!$('.significado')) {
    const error = { error: 'A palavra não existe' } as dicionarioResponseProps;
    return error;
  }

  $('.significado > span').each((index: number, element: cheerio.Element) => {
    const elementValue = $(element).text();
    const elementHtml = $(element);

    if (!elementHtml.hasClass('etim') && !elementHtml.hasClass('cl')) {
      dicionarioResponse.significado.push(elementValue);
    }

    if (elementHtml.hasClass('etim')) {
      dicionarioResponse.etimologia.push(
        elementValue.split('.')[1].replace(' ', ''),
      );
    }
  });

  return dicionarioResponse;
}
