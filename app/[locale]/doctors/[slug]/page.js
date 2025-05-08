import SignUp from "../../_components/Main/SignUp";
import Main_info from "../../_components/Doctors/Main";
import SkillsMain from "../../_components/Doctors/SkillsMain";
import ServiceMain from "../../_components/Doctors/ServiceMain";
import axios from 'axios';


// Функция для генерации метаданных
export async function generateMetadata({ params }) {
    const { slug, locale } = params;

    try {
        const response = await axios.get(`https://api.pmc.dr-psixoterapevt.uz/v1/doctor/get/${slug}`, {
            headers: {
                'Accept-Language': locale,
            }
        });

        const doctorData = response.data.data;

        return {
            title: `Доктор ${doctorData.fullName} - ${doctorData.specializationList.map(spec => spec.name).join(', ')}`,
            description: doctorData.description,
            openGraph: {
                title: `Доктор ${doctorData.fullName}`,
                description: `Опыт: ${doctorData.experience}. Приемное время: ${doctorData.receptionTime}`,
                images: [
                    {
                        url: doctorData.photo?.url,
                        width: 800,
                        height: 600,
                        alt: `Фото доктора ${doctorData.fullName}`,
                    }
                ],
                type: 'profile',
            },
            alternates: {
                canonical: `https://pmcenter.uz/${locale}/doctors/${slug}`
            },
            robots: {
                index: true,
                follow: true
            },
        };
    } catch (error) {
        console.error('Ошибка при получении данных для metadata:', error.message);
        return {
            title: 'Ошибка при загрузке данных',
            description: 'Не удалось загрузить информацию о докторе.',
        };
    }
}


// Страница рендерится на сервере и передаёт данные клиентскому компоненту
export default async function Page({ params }) {
    const { slug, locale } = params;

    let doctorData;
    try {
        const response = await axios.get(`https://api.pmc.dr-psixoterapevt.uz/v1/doctor/get/${slug}`, {
            headers: {
                'Accept-Language': locale,
            }
        });
        doctorData = response.data.data;
    } catch (error) {
        console.error('Ошибка при получении данных:', error.message);
        return <div>Не удалось загрузить данные</div>;
    }

    return (
        <div className="w-full bg-white flex flex-col mt-[30px]">
            {doctorData && (
                <>
                    <Main_info doctorData={doctorData} />
                    <SkillsMain doctorData={doctorData} />
                    <ServiceMain doctorData={doctorData} />
                </>
            )}
            <div className="mx-[10px] mb-[90px] mdx:mb-[130px] xl:mb-[150px]">
                <SignUp />
            </div>
        </div>
    );
}
