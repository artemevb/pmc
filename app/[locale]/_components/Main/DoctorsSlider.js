"use client"
import { useTranslations } from "next-intl";
import NewCardMain from './NewCardMain'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Link from "next/link";

const DoctorsSlider = ({ locale }) => {
    const t = useTranslations('Main.DoctorsSlider');
    const [news, setNews] = useState([]) // Состояние для новостей
    const [loading, setLoading] = useState(true) // Состояние загрузки
    const [error, setError] = useState(null) // Состояние ошибки


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
                setNews(response.data.data) // Обновляем новости из ответа
            } catch (error) {
                console.error('Ошибка при получении данных:', error.message)
                setError('Не удалось загрузить данные')
            } finally {
                setLoading(false) // Выключаем индикатор загрузки
            }
        }

        fetchNews()
    }, [locale])

    if (loading) return <div>Загрузка...</div>
    if (error) return <div>{error}</div>

    const settings = {
        infinite: true,
        speed: 1500,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                },
            },
            {
                breakpoint: 1000,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                },
            },
        ],
    }

    return (
        <div className="w-full max-w-[1440px] mx-auto px-[16px]">
            {news.length > 0 && (
                <div className='flex flex-col gap-[45px]'>
                    <h2 className="text-[30px] mdx:text-[40px] xl:text-[45px] font-semibold">
                        {t("title")}
                    </h2>
                    <div className='w-full h-auto '>
                        <Slider {...settings} className='h-auto w-full '>
                            {news.map((item, i) => {
                                return (
                                    <div className='px-[10px] xl:h-[520px] 3xl:h-[560px] max-h-full' key={i}>
                                        <a href={`/${locale}/doctors/${item.slug}`}>
                                            <NewCardMain
                                                title={item.fullName || 'Нет имени'}
                                                date={item.date}
                                                imageSrc={item.photo?.url || '@/public/images/Main/slider2.png'}
                                                specializationList={item.specializationList}
                                            />
                                        </a>
                                    </div>
                                )
                            })}
                        </Slider>
                    </div>
                    <div className='flex w-full justify-center'>
                        <a
                            href={`/${locale}/doctors`}
                            className='flex items-center justify-center border border-neutral-300 py-3 text-[#fff] transition-all duration-200 bg-[#00863E] hover:bg-[#398f61] font-extrabold w-[223px]'
                        >
                            {t('button')}
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DoctorsSlider;
