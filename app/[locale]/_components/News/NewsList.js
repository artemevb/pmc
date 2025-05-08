'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import NewCardMain from '../News/NewCardMain'
import { useTranslations } from 'next-intl'

export default function NewsComp({ locale }) {
    const t = useTranslations('News')
    const params = useParams()
    const [news, setNews] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [visibleNewsCount, setVisibleNewsCount] = useState(8)

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch('https://api.pmc.dr-psixoterapevt.uz/v1/newness/get-all', {
                    headers: {
                        'Accept-Language': locale
                    }
                });
                const result = await response.json();


                console.log('API Response:', result);

                if (response.ok) {

                    const transformedNews = result.data.map(item => {
                        const firstOption = item.optionList[0] || {};
                        return {
                            slug: item.slug,
                            head: {
                                title: firstOption.title || 'Без заголовка',
                                body: firstOption.body || 'Без подзаголовка',
                                date: item.createdDate,
                                photo: firstOption.photo ? { url: firstOption.photo.url } : null
                            }
                        };
                    });
                    setNews(transformedNews);
                } else {
                    throw new Error(result.message || 'Ошибка при загрузке данных');
                }
            } catch (error) {
                console.error('Fetch Error:', error);
                setError('Не удалось загрузить данные. Попробуйте позже.');
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, [locale]);

    const loadMoreNews = () => {
        setVisibleNewsCount(prevCount => prevCount + 8)
    }

    if (loading) return <div>Загрузка...</div>
    if (error) return <div>{error}</div>

    return (
        <div className='w-full max-w-[1440px] mx-auto px-2 flex flex-col gap-8 mb-[90px] mdx:mb-[150px] 2xl:mb-[190px]'>
            <h2 className='text-[30px] mdx:text-[35px] mdl:text-[40px] xl:text-[50px] font-semibold'>
                {t('title')}
            </h2>
            <div className='w-full grid gap-y-[35px] mdx:gap-y-[45px] xl:gap-y-[55px] gap-x-4 grid-cols-1 mdl:grid-cols-2 xl:grid-cols-4 h-auto'>
                {news.slice(0, visibleNewsCount).map((item, i) => (
                    <a key={i} href={`/${locale}/news/${item.slug}`}>
                        <NewCardMain
                            title={item.head.title}
                            body={item.head.body}
                            date={item.head.date}
                            imageSrc={item.head.photo?.url || '/path/to/default/image.png'}
                        />
                    </a>
                ))}
            </div>
            {visibleNewsCount < news.length && (
                <div className="flex items-center justify-center xl:mt-[60px] mt-[40px]">
                    <button onClick={loadMoreNews} className='bg-[#00863E] hover:bg-[#398f61] text-white py-[12px] px-4 max-w-[223px] w-full font-extrabold'>
                        {t('more')}
                    </button>
                </div>
            )}
        </div>
    )
}
