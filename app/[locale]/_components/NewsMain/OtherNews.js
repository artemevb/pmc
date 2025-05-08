'use client'

import { useEffect, useState } from 'react'
import NewCardMain from '../News/NewCardMain'
import { useTranslations } from "next-intl";

export default function NewsComp({ locale }) {
    const t = useTranslations('News.Main');
    const [news, setNews] = useState([]); // State for all news
    const [visibleNews, setVisibleNews] = useState([]); // State for visible news
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch('https://api.pmc.dr-psixoterapevt.uz/v1/newness/get-all', {
                    headers: {
                        'Accept-Language': locale // Adjust to the current locale (e.g., 'ru', 'uz')
                    }
                });
                const result = await response.json();

                if (response.ok) {
                    // Assuming `result.data` is the array of news items
                    setNews(result.data);
                    setVisibleNews(getRandomNews(result.data, 4)); // Show 4 random news initially
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

    // Function to get random news without repetition
    const getRandomNews = (arr, count) => {
        const shuffled = [...arr].sort(() => 0.5 - Math.random()); // Shuffle array
        return shuffled.slice(0, count); // Return the first `count` items
    };

    const loadMoreNews = () => {
        const remainingNews = news.filter(n => !visibleNews.includes(n)); // Filter out already visible news
        if (remainingNews.length === 0) return; // If no remaining news, stop
        const newRandomNews = getRandomNews(remainingNews, 4); // Get 4 new random news
        setVisibleNews(prev => [...prev, ...newRandomNews]); // Add new news to visible ones
    };

    if (loading) return <div>Загрузка...</div>; // Loading indicator
    if (error) return <div>{error}</div>; // Error message

    return (
        <div className='w-full max-w-[1440px] mx-auto px-2 flex flex-col gap-8 mb-[90px] mdx:mb-[150px] 2xl:mb-[190px] mt-[90px] mdx:mt-[120px]'>
            <h2 className='text-[30px] mdx:text-[35px] mdl:text-[40px] xl:text-[50px] font-semibold'>
                {t('other')}
            </h2>
            <div className='w-full grid gap-y-[35px] mdx:gap-y-[45px] xl:gap-y-[55px] gap-x-4 grid-cols-1 mdl:grid-cols-2 xl:grid-cols-4 h-auto'>
                {visibleNews.map((item, i) => (
                    <a key={i} href={`/${locale}/news/${item.slug}`}>
                        <NewCardMain
                            title={item.optionList[0]?.title || 'Без заголовка'}
                            body={item.optionList[0]?.body || 'Без описания'}
                            date={new Date(item.createdDate).toLocaleDateString(locale)}
                            imageSrc={item.optionList[0]?.photo?.url || '/images/News/default.png'}
                        />
                    </a>
                ))}
            </div>
            {visibleNews.length < news.length && ( // Show button only if there are more news to load
                <div className="flex items-center justify-center xl:mt-[60px] mdx:mt-[40px] mt-[30px]">
                    <button onClick={loadMoreNews} className='bg-[#00863E] hover:bg-[#398f61] text-white py-[12px] px-4 w-[223px] flex justify-center font-extrabold'>
                        {t('go')}
                    </button>
                </div>
            )}
        </div>
    );
}
