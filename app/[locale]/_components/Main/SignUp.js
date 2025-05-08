"use client";
import { useTranslations } from "next-intl";
import { useState } from "react";
import axios from "axios";
import Image from "next/image";
import logo from "@/public/images/Logoabs.png";
import logo_top from "@/public/images/Logoabs-top.png";
import arrow from "@/public/svg/arrow-bottom-light.svg";
import ModalOk from "../Modal/Ok";

export default function ContAddress() {
    const t = useTranslations('Main.SignUp');

    const [isSubmitted, setIsSubmitted] = useState(false);

    const [values, setValues] = useState({
        name: "", // Полное имя
        phone: "", // Номер телефона
        comment: "", // Комментарий
    });

    const [focusedInput, setFocusedInput] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedService, setSelectedService] = useState(t('text-3')); // Значение по умолчанию для выпадающего списка

    // Сервисы, переведенные с помощью next-intl
    const services = [
        t('services-1'),
        t('services-2'),
        t('services-3'),
        t('services-4')
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "phone") {
            // Удаляем все символы, кроме цифр
            const digitsOnly = value.replace(/\D/g, '');
            setValues({
                ...values,
                [name]: digitsOnly,
            });
        } else {
            setValues({
                ...values,
                [name]: value,
            });
        }
    };

    const validateInput = (name, value) => {
        if (name === "name") {
            return value.length >= 3
                ? { isValid: true, message: t('correct') }
                : { isValid: false, message: t('enter_full_name') };
        } else if (name === "phone") {
            // Проверяем, что введены только цифры и длина от 7 до 15 цифр
            const phoneRegex = /^\d{7,15}$/;
            return phoneRegex.test(value)
                ? { isValid: true, message: t('correct') }
                : { isValid: false, message: t('enter_valid_phone_number') };
        } else if (name === "comment") {
            return value.length <= 500
                ? { isValid: true, message: t('correct') }
                : { isValid: false, message: t('comment_too_long') };
        }
        return { isValid: true, message: "" };
    };

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

    const handleSelectService = (service) => {
        setSelectedService(service);
        setIsDropdownOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { name, phone, comment } = values;
        if (!name || !phone) {
            // Можно установить состояния ошибок здесь, если необходимо
            return;
        }

        const payload = {
            fullName: name,
            phoneNum: phone,
            service: selectedService,
            comment: comment, // Добавляем комментарий
        };

        try {
            const response = await axios.post("https://api.pmc.dr-psixoterapevt.uz/v1/application/create", payload);
            if (response.status === 200 || response.status === 201) { // В зависимости от ответа API
                setIsSubmitted(true);
            } else {
                console.error('Error:', response.statusText);
                // Можно обработать ответы с ненулевым статусом
            }
        } catch (error) {
            console.error('Error submitting the form:', error);
            // Можно обработать ошибки (например, отобразить сообщение об ошибке пользователю)
        }
    };

    const handleAppointmentClick = async () => {
        try {
            const response = await fetch('https://api.pmc.dr-psixoterapevt.uz/v1/counter/add?button=MAKE_AN_APPOINTMENT', {
                method: 'POST',
            });
            if (response.ok) {
                // Успешный запрос
            } else {
                // Ошибка запроса
            }
        } catch (error) {
            // Обработка ошибки
        }
    };

    const closeModalHandler = () => {
        setIsSubmitted(false);
        // Можно сбросить форму или выполнить другие действия
    };

    return (
        <div className="bg-[#00863E] p-6 pb-9 mdx:px-[40px] lg:py-[40px] xl:px-[60px] xl:py-[50px] relative max-w-[1440px] mx-auto w-full">
            <div className="flex max-xl:flex-col gap-12 max-lg:gap-8 mx-auto w-full h-auto z-10 relative">
                <div className="lg:flex lg:flex-row lg:justify-between w-full max-w-[1640px] 5xl:max-w-[2000px] mx-auto">
                    <div>
                        <h3 className="text-[25px] text-[#fff] mdx:font-bold mdx:text-[30px] pt-[10px] pb-[17px] mdx:pt-[20px] mdx:pb-[12px] 3xl:text-[35px] xl:pt-0 lh max-mdx:max-w-[50%] ">
                            {t('title')}
                        </h3>
                        <h5 className="text-[15px] mdx:text-[16.5px] xl:text-[18px] max-w-[325px] mdx:max-w-[466px] xl:max-w-[325px] text-[#fff] opacity-[0.8] mb-[25px] font-medium">
                            {t('subtitle')}
                        </h5>
                    </div>
                    <form className="flex flex-col gap-9 w-full max-lg:max-w-full max-w-[350px] 3xl:mr-[5%] 4xl:mr-[10%] xl:gap-12 z-10 relative" onSubmit={handleSubmit}>
                        {["name", "phone"].map((field) => (
                            <div className="relative" key={field}>
                                <input
                                    type="text"
                                    name={field}
                                    value={values[field]}
                                    onChange={handleInputChange}
                                    onFocus={() => setFocusedInput(field)}
                                    onBlur={() => setFocusedInput(null)}
                                    inputMode={field === "phone" ? "numeric" : "text"}
                                    pattern={field === "phone" ? "\\d*" : undefined}
                                    className={`block w-full px-3 py-2 bg-transparent text-[#FFFFFF] placeholder-[#00863E] focus:outline-none border-b-[0.5px] ${focusedInput === field
                                        ? validateInput(field, values[field]).isValid
                                            ? "border-[#E1E1E1] opacity-[0.8]"
                                            : "border-red-500 opacity-[0.8]"
                                        : "border-[#E1E1E1] opacity-[0.8]"
                                        }`}
                                />

                                <label
                                    htmlFor={field}
                                    className={`absolute transition-all text-[16px] mdx:text-[19px] ${focusedInput === field || values[field]
                                        ? "-top-4 text-xs"
                                        : "top-1 text-[16px] mdx:text-[20px]"
                                        } ${focusedInput === field
                                            ? validateInput(field, values[field]).isValid
                                                ? "text-white opacity-[0.9]"
                                                : "text-red-500 opacity-[0.9]" // Красный цвет при ошибке
                                            : "text-white opacity-[0.9]"
                                        } cursor-text`}
                                    onClick={() => document.getElementsByName(field)[0].focus()}
                                >
                                    {focusedInput === field && values[field].length > 0
                                        ? validateInput(field, values[field]).message
                                        : field === "name"
                                            ? t('info')
                                            : t('telephone-number')}
                                </label>
                            </div>
                        ))}

                        {/* Новое поле "Комментарий" */}
                        <div className="relative" key="comment">
                            <input
                                name="comment"
                                value={values.comment}
                                onChange={handleInputChange}
                                onFocus={() => setFocusedInput("comment")}
                                onBlur={() => setFocusedInput(null)}
                                className={`block w-full px-3 py-2 bg-transparent text-[#FFFFFF] placeholder-[#00863E] focus:outline-none border-b-[0.5px] ${focusedInput === "comment"
                                    ? validateInput("comment", values.comment).isValid
                                        ? "border-[#E1E1E1] opacity-[0.8]"
                                        : "border-red-500 opacity-[0.8]"
                                    : "border-[#E1E1E1] opacity-[0.8]"
                                    } resize-none`}
                                rows={4}
                                maxLength={500} // Ограничение длины
                            />

                            <label
                                htmlFor="comment"
                                className={`absolute transition-all text-[16px] mdx:text-[19px] ${focusedInput === "comment" || values.comment
                                    ? "-top-4 text-xs"
                                    : "top-1 text-[16px] mdx:text-[20px]"
                                    } ${focusedInput === "comment"
                                        ? validateInput("comment", values.comment).isValid
                                            ? "text-white opacity-[0.9]"
                                            : "text-red-500 opacity-[0.9]" // Красный цвет при ошибке
                                        : "text-white opacity-[0.9]"
                                    } cursor-text`}
                                onClick={() => document.getElementsByName("comment")[0].focus()}
                            >
                                {focusedInput === "comment" && values.comment.length > 0
                                    ? validateInput("comment", values.comment).message
                                    : t('comment')} {/* Добавьте соответствующий ключ в переводы */}
                            </label>
                        </div>

                        <div className="relative border-b-[0.5px] border-[#E1E1E1] border-opacity-[0.8] mt-3">
                            {/* Кнопка Dropdown */}
                            <button
                                type="button"
                                className="w-full bg-[#00863E] text-white opacity-[0.9] text-[16px] mdx:text-[20px] text-left border-[#E1E1E1] pb-[10px] flex justify-between items-center"
                                onClick={toggleDropdown}
                            >
                                <span>{selectedService}</span>
                                <Image
                                    quality={100}
                                    src={arrow}
                                    alt="arrow-green"
                                    objectFit="contain"
                                    className="w-5 h-5"
                                />
                            </button>

                            {/* Список Dropdown */}
                            {isDropdownOpen && (
                                <ul className="absolute bg-white border border-gray-300 w-full mt-1 z-20">
                                    {services.map((service, index) => (
                                        <li
                                            key={index}
                                            className="p-3 hover:bg-gray-200 cursor-pointer"
                                            onClick={() => handleSelectService(service)}
                                        >
                                            {service}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <div>
                            <button
                                type="submit"
                                onClick={handleAppointmentClick}
                                className="py-[13px] w-full mdx:w-[223px] mdx:px-12 text-[14px] bg-white font-bold hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white xl:w-[224px] xl:text-[16px] text-[#00863E]"
                            >
                                {t('send')}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="absolute top-0 right-0 xl:top-auto xl:bottom-0 xl:left-16 z-0">
                <Image
                    priority
                    src={logo_top}
                    width={270}
                    height={270}
                    alt="The Wild Oasis logo"
                    quality={100}
                    className="w-full h-auto max-w-[148px] xl:hidden"
                />
                <Image
                    priority
                    src={logo}
                    width={270}
                    height={270}
                    alt="The Wild Oasis logo"
                    quality={100}
                    className="w-full h-auto max-w-[235px] hidden xl:block bottom-0"
                    style={{ pointerEvents: 'none' }} // Предотвращает перекрытие
                />
            </div>

            {/* Компонент ModalOk */}
            {isSubmitted && <ModalOk closeModal={closeModalHandler} />}
        </div>
    );
}
