// app/news/[slug]/page.js

import { notFound } from 'next/navigation'
import MainPages from "../../_components/NewsMain/MainPages";
import Share from "../../_components/NewsMain/Share";
import OtherNews from "../../_components/NewsMain/OtherNews";


export async function generateMetadata({ params }) {
    const { slug, locale } = params
    const url = `https://api.pmc.dr-psixoterapevt.uz/v1/newness/get/${slug}`

    try {
        const response = await fetch(url, {
            headers: {
                'Accept-Language': locale,
            },
        })

        if (!response.ok) {
            throw new Error('Не удалось загрузить данные')
        }

        const result = await response.json()
        const newsItem = result.data

        if (!newsItem) {
            return {
                title: 'Новость не найдена | Prime Medical Center',
                description: 'Запрошенная новость не найдена.',
            }
        }

        const description = newsItem.optionList[0]?.body.substring(0, 160) || 'Описание новости'
        const title = `${newsItem.optionList[0]?.title || 'Новость'} | Prime Medical Center`
        const imageUrl = newsItem.optionList[0]?.photo.url || 'https://pmcenter.uz/images/Prime_MedicalCenter.png'
        const articleUrl = `https://pmcenter.uz/${locale}/news/${slug}`

        return {
            title: title,
            description: description,
            openGraph: {
                title: newsItem.optionList[0]?.title || 'Новость',
                description: description,
                images: [
                    {
                        url: imageUrl,
                        alt: newsItem.optionList[0]?.title || 'Новость',
                    },
                ],
                url: articleUrl,
                type: 'article',
                article: {
                    publishedTime: newsItem.createdDate,
                },
            },
            twitter: {
                card: 'summary_large_image',
                title: newsItem.optionList[0]?.title || 'Новость',
                description: description,
                images: [imageUrl],
            },
        }
    } catch (error) {
        console.error('Ошибка при генерации метаданных:', error)
        return {
            title: 'Новость | Prime Medical Center',
            description: 'Описание новости',
        }
    }
}

export default async function NewsDetailPage({ params }) {
    const { slug, locale } = params
    const url = `https://api.pmc.dr-psixoterapevt.uz/v1/newness/get/${slug}`

    let newsItem = null
    let error = null

    try {
        const response = await fetch(url, {
            headers: {
                'Accept-Language': locale,
            },
            // Опционально: настройте кэширование
        })

        if (response.ok) {
            const result = await response.json()
            newsItem = result.data
        } else if (response.status === 404) {
            notFound()
        } else {
            throw new Error('Ошибка при загрузке данных')
        }
    } catch (err) {
        console.error('Ошибка при запросе:', err)
        error = 'Не удалось загрузить данные. Попробуйте позже.'
    }

    if (error) return <div>{error}</div>
    if (!newsItem) return <div>Новость не найдена.</div>

    return (
        <div className="w-full bg-white flex flex-col mt-[30px]">
            <MainPages newsItem={newsItem} locale={locale} />
            <div className="max-xl:px-[15px]">
                <Share locale={locale} />
            </div>
            <OtherNews locale={locale} />
        </div>
    )
}
