import { Dispatch, SetStateAction } from "react"

export type StatePropsType = {
  data?: Article[]
  loading: boolean
  error?: Error
  setTermToSearch: Dispatch<SetStateAction<string>>
}

export type ActionType = 
  | { type: 'loading' }
  | { type: 'fetched' payload: Article[] }
  | { type: 'error' payload: Error }

export interface IData {
  status: string
  totalResults: number
  articles: Article[]
}

export interface Article {
  id?: string,
  source: Source
  author: string
  title: string
  description: any
  url: string
  urlToImage: any
  publishedAt: string
  content: any
}

export interface Source {
  id: string
  name: string
}