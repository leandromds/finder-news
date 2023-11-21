import { createArticleId, filterArticles } from '@/helpers';
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

const urlDomainNews: URL = new URL(process.env.API_URL as string);
urlDomainNews.searchParams.append('language', 'pt')
urlDomainNews.searchParams.append('sortBy', 'popularity')

const fetcherDataInNewsApi = async (termToSearch: string) => {
  try {
    urlDomainNews.searchParams.append('q', termToSearch)
    const response = await axios.get(
      urlDomainNews.toString(),
      {
        headers: {
          authorization: `Bearer ${process.env.API_KEY}`
        }
      }
    )

    urlDomainNews.searchParams.delete('q')

    const articles = createArticleId(
      filterArticles(response.data.articles)
    )

    return articles
  } catch (error) {
    return error
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log('API accessed');
  try {
    const { term } = req.query
    const result = await fetcherDataInNewsApi(term as string)
    res.status(200).send({ result })
  } catch (err) {
    res.status(500).send({ error: 'failed to fetch data' })
  }
}