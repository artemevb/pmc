'use client'
import axios from 'axios'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import NewCardMain from '../Main/NewCardMain'
import { useTranslations } from "next-intl"

export default function List({ locale }) {
    const t = useTranslations('Doctors')
    const params = useParams()
    const [news, setNews] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchNews = async () => {
            setLoading(true)
            setError(null)

            try {
                const response = await axios.get(
                    'https://api.pmc.dr-psixoterapevt.uz/v1/doctor/get-all',
                    {
                        headers: { 'Accept-Language': locale },
                    }
                )
                setNews(response.data.data)
            } catch (error) {
                console.error('Ошибка при получении данных:', error.message)
                setError('Не удалось загрузить данные')
            } finally {
                setLoading(false)
            }
        }

        fetchNews()
    }, [locale])

    if (loading) return <div>Загрузка...</div>
    if (error) return <div>{error}</div>

    return (
        <div className='w-full max-w-[1440px] 5xl:max-w-[2000px] mx-auto px-3 flex flex-col mb-[90px] mdx:mb-[120px] 2xl:mb-[150px]'>
            <h2 className='text-[30px] mdx:text-[40px] mdl:text-[43px] xl:text-[50px] font-semibold'>
                {t('title')}
            </h2>
            <p className="text-[15px] text-[#666666] mdx:text-[18px] mt-[5px]">{t('subtitle')}</p>
            <div className='w-full grid gap-y-[30px] gap-x-[14px] grid-cols-1 mdl:grid-cols-2 xl:grid-cols-4 h-auto mt-[35px] xl:mt-[55px]'>
                {news.map((item, i) => (
                    <a key={i} href={`/${locale}/doctors/${item.slug}`}>
                        <NewCardMain
                            title={item.fullName || 'Нет имени'}
                            date={item.receptionTime || 'Нет данных'}
                            imageSrc={item.photo?.url || '/path/to/default-image.png'}
                            specializationList={item.specializationList?.slice(0, 2) || []}
                        />
                    </a>
                ))}
            </div>
        </div>
    )
}

