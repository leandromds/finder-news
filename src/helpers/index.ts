import { Article } from '@/types'
import { v4 as uuid } from 'uuid'
export const filterArticles = (articles:Article[]): Article[] => {
  return articles.filter((article: Article) => article.urlToImage && article.description)
}

export const createArticleId = (articles:Article[]): Article[] => {
  return articles.map((article: Article) => (
    {
      articleId: uuid(),
      ...article
    }
  ))
}