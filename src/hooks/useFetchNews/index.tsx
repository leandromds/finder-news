import { createArticleId, filterArticles } from '@/helpers'
import { ActionType, StatePropsType } from '@/types'
import axios from 'axios'
import { useCallback, useEffect, useReducer, useState } from 'react'

const urlDomainNews: URL = new URL(process.env.NEXT_PUBLIC_NEWS_API_URL as string);
urlDomainNews.searchParams.append('language', 'pt')
urlDomainNews.searchParams.append('sortBy', 'popularity')

function reducer(state: StatePropsType, action: ActionType) {
  switch (action.type) {
    case 'loading':
      return { ...state, loading: true } as StatePropsType
    case 'fetched':
      return {
        ...state,
        data: action.payload,
        loading: false,
      } as StatePropsType
    case 'error':
      return {
        ...state,
        error: action.payload,
        loading: false,
      } as StatePropsType
    default:
      return state
  }
}

export default function useFetchNews() :StatePropsType {
  const [termToSearch, setTermToSearch] = useState<string>('sport')

  const initialState: StatePropsType = {
    data: undefined,
    loading: true,
    error: undefined,
    setTermToSearch
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  const handleFetch = useCallback(async () => {
    dispatch({ type: 'loading' })
    try {
      urlDomainNews.searchParams.append('q', termToSearch)
      const response = await axios.get(
        urlDomainNews.toString(),
        {
          headers: {
            authorization: `Bearer ${process.env.NEXT_PUBLIC_NEWS_API_KEY}`
          }
        }
      )

      urlDomainNews.searchParams.delete('q')

      const articles = createArticleId(
        filterArticles(response.data.articles)
      )

      dispatch({ type: 'fetched', payload: articles })
    } catch (error) {
      if (axios.isAxiosError(error) || error instanceof Error) {
        dispatch({ type: 'error', payload: error })
      }
    }
  }, [termToSearch])

  useEffect(() => {
    handleFetch()
  }, [handleFetch])

  return {
    data: state.data,
    loading: state.loading,
    error: state.error,
    setTermToSearch
  }
}