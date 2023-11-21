import { ActionType, StatePropsType } from '@/types'
import axios from 'axios'
import { useCallback, useEffect, useReducer, useState } from 'react'

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
      const response = await axios.get(`api/news/${termToSearch}`)
      const articles = response.data.result
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