"use client"
import { useTranslations } from "next-intl";
import NewCardMain from '../Main/NewCardMain'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Link from "next/link";

const DoctorsSlider = ({ locale }) => {
    const t = useTranslations('About.Doctors');
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
                <div className='flex flex-col '>
                    <h2 className="text-[30px] mdx:text-[40px] xl:text-[45px] font-semibold">
                        {t("title")}
                    </h2>
                    <p className="text-[#666666] text-[15px] mdx:text-[18px] font-medium mt-[10px] max-w-[799px]">{t('text')}</p>
                    <div className='w-full h-auto mt-[30px] mdx:mt-[40px]'>
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
                    <div className='flex w-full justify-center mt-[50px] mdx:mt-[60px]'>
                        <Link
                            href={`/${locale}/doctors`}
                            className='flex items-center justify-center border border-neutral-300 py-3 text-[#fff] transition-all duration-200 bg-[#00863E] hover:bg-[#398f61] font-extrabold w-[223px]'
                        >
                            {t('button')}
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DoctorsSlider;
