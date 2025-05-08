'use client'

import { useEffect, useState } from 'react'
import Image from "next/image"
import GreenArrow from "@/public/svg/arrow-right-green-news.svg"
import { useTranslations } from "next-intl"

export default function OtherNewsList({ locale, currentSlug }) {
    const t = useTranslations('News.Main')
    const [otherNews, setOtherNews] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchOtherNews = async () => {
            try {
                const response = await fetch('https://api.pmc.dr-psixoterapevt.uz/v1/newness/get-all', {
                    headers: {
                        'Accept-Language': locale
                    }
                })
                const result = await response.json()

                if (response.ok) {
                    // Фильтруем текущую новость и трансформируем данные
                    const filteredNews = result.data.filter(item => item.slug !== currentSlug)
                    setOtherNews(filteredNews.slice(0, 3)) // Ограничиваем количество до 3 новостей
                } else {
                    throw new Error(result.message || 'Ошибка при загрузке данных')
                }
            } catch (error) {
                console.error('Fetch Error:', error)
                setError('Не удалось загрузить другие новости.')
            } finally {
                setLoading(false)
            }
        }

        fetchOtherNews()
    }, [locale, currentSlug])

    if (loading) return <div>Загрузка других новостей...</div>
    if (error) return <div>{error}</div>

    return (
        <div className='w-full grid grid-cols-1 gap-[30px]'>
            {otherNews.map((item, i) => {
                const firstOption = item.optionList.find(option => option.orderNum === 1) || item.optionList[0] || {}
                return (
                    <a key={i} href={`/${locale}/news/${item.slug}`}>
                        <div className="w-full bg-white h-full flex flex-col justify-between pb-[25px] border-b">
                            <div className="w-full flex flex-col flex-grow justify-between">
                                <h3 className="text-[22px] font-semibold mt-0 lh line-clamp-2">
                                    {firstOption.title || 'Без заголовка'}
                                </h3>
                                <p className="text-[16px] lh font-medium text-[#666] mt-[8px] line-clamp-2">
                                    {firstOption.body || 'Описание отсутствует'}
                                </p>

                                <div className="flex flex-row gap-[5px] items-center mt-[10px]">
                                    <p className="text-[#00863E] hover:text-[#41a56f] xl:text-[20px] text-[16px] mdx:text-[18px] font-bold hover:ml-2 transition-all duration-300">
                                        {t('button')}
                                    </p>
                                    <Image
                                        src={GreenArrow}
                                        width={25}
                                        height={25}
                                        quality={100}
                                        alt="Green Arrow"
                                        className="w-[25px] h-[25px] "
                                    />
                                </div>
                            </div>
                        </div>
                    </a>
                )
            })}
        </div>
    )
}
