import Image from "next/image"
import { convertISODateToShortDate } from "@/utils"

export interface CardProps {
  source: Source
  author: string
  title: string
  description: any
  url: string
  image: any
  publishedAt: string
  content: any
}

export interface Source {
  id: string
  name: string
}

const ArticleCard = ({
  source,
  author,
  title,
  description,
  url,
  image,
  publishedAt,
  content,
} : CardProps) => {
  return (
    <article className="relative flex w-full max-w-[48rem] flex-row rounded-xl bg-white bg-clip-border text-gray-700 shadow-md mb-[3rem]">
      <div className="relative w-2/5 m-0 overflow-hidden text-gray-700 bg-white rounded-r-none shrink-0 rounded-xl bg-clip-border">
        <Image
          src={image}
          alt="image"
          className="object-cover w-full h-full"
          width={507}
          height={547}
        />
      </div>

      <div className="p-6">
        <h6 className="block mb-4 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal uppercase">
          {source.name}
        </h6>

        <h4 className="block font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
          {title}
        </h4>
        <span className="block mb-4 font-sans text-xs antialiased leading-relaxed tracking-normal italic">
          Por: {author}
        </span>

        <p className="block mb-8 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
          {description}
        </p>

        <span className="block mb-8 font-sans text-xs antialiased leading-relaxed tracking-normal italic text-right">
          publicado em: {convertISODateToShortDate(publishedAt)}
        </span>

        <a className="inline-block" href={url} target='_blank'>
          <button
            className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center uppercase align-middle transition-all rounded-lg select-none hover:bg-pink-500/10 active:bg-pink-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
          >
            Ir para o site
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              aria-hidden="true"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              ></path>
            </svg>
          </button>
        </a>
      </div>
    </article>
  )
}

export default ArticleCard
