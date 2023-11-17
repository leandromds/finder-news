import { Article } from '@/types'
import { v4 as uuid } from 'uuid'

export const filterArticles = (articles: Article[]): Article[] => (
  articles.filter(({ urlToImage, description }) => urlToImage && description)
)

export const createArticleId = (articles: Article[]): Article[] => (
  articles.map(article => ({
    ...article,
    articleId: uuid()
  }))
)
