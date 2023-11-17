import dynamic from 'next/dynamic'
import { useState } from 'react'

import ArticleCard from '@/components/ArticleCard'
import useFetchNews from "@/hooks/useFetchNews"

import { Article } from '@/types'

const Header = dynamic(() => import('finderNewsComponents/header'))

const urlDomainNews = new URL('https://newsapi.org/v2/everything')
urlDomainNews.searchParams.append('language', 'pt')
urlDomainNews.searchParams.append('sortBy', 'popularity')

export default function Home() {
  const [searchInput, setSearchInput] = useState<string>('')

  const {
    loading: loadingNewsList,
    data: newsList,
    error: newsListError,
    setTermToSearch
  } = useFetchNews()

  const getSearchInputTerm = (e:React.FormEvent<HTMLInputElement>) => {
    setSearchInput(e.currentTarget.value)
  }

  const handleSearchArticlesbyTerm = () => {
    setTermToSearch(searchInput)
  }

  return (
    <>
      <Header
        handleSearchArticlesbyTerm={handleSearchArticlesbyTerm}
        getSearchInputTerm={getSearchInputTerm}
      />
      <main className="flex min-h-screen flex-col items-center justify-between px-24 py-14">
        <div className="box-border max-w-7xl mx-4 sm:columns-1 md:columns-1 lg:columns-1 xl:columns-1">
          {loadingNewsList && <p>loading...</p>}

              {newsList && newsList.map((article: Article) => (
                <ArticleCard 
                  key={article.articleId}
                  source={article.source}
                  author={article.author}
                  title={article.title}
                  description={article.description}
                  url={article.url}
                  image={article.urlToImage}
                  publishedAt={article.publishedAt}
                  content={article.content}
                />
              ))}

        </div>

          {newsListError && <h1>{newsListError?.message}</h1>}
      </main>
    </>
  )
}