"use client";
import { useState } from "react";
import Image from "next/image";
import close from "@/public/svg/close-modal.svg";
import telegram from "@/public/svg/social/telergam.svg";
import phone from "@/public/svg/social/phone.svg";
import arrow from "@/public/svg/arrow-bottom-gray.svg";
import axios from "axios";
import { useTranslations } from "next-intl";
import ModalOk from "./Ok";

export default function QuestionSent({ closeModal }) {
    const t = useTranslations('Modal');

    const [showModalOk, setShowModalOk] = useState(false); // New state for ModalOk

    const handleClose = () => {
        closeModal();
        setShowModalOk(false);
    };

    const formatText = (text) => {
        return text.split('\n').map((line, index) => (
            <span key={index}>
                {line}
                <br />
            </span>
        ));
    };

    // Close modal when clicking outside the modal content
    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            closeModal();
        }
    };

    const [values, setValues] = useState({
        name: "", // Full name
        phone: "", // Phone number
        comment: "" // New comment field
    });

    const [focusedInput, setFocusedInput] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedService, setSelectedService] = useState(t('text-3')); // Default placeholder for dropdown

    // Services translated using next-intl
    const services = [
        t('services-1'),
        t('services-2'),
        t('services-3'),
        t('services-4')
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "phone") {
            // Allow only digits, plus sign, spaces, dashes, and parentheses
            const filteredValue = value.replace(/[^\d+()\s-]/g, '');
            setValues({
                ...values,
                [name]: filteredValue,
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
            // Updated regex for phone numbers with parentheses support
            const phoneRegex = /^\+?[\d\s()-]{7,20}$/;
            return phoneRegex.test(value)
                ? { isValid: true, message: t('correct') }
                : { isValid: false, message: t('enter_valid_phone_number') };
        }
        // Optional: Add validation for comment if needed
        // else if (name === "comment") {
        //     return value.length <= 500
        //         ? { isValid: true, message: t('correct') }
        //         : { isValid: false, message: t('comment_too_long') };
        // }
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
        if (!name || !phone || !selectedService || selectedService === t('text-3')) {
            // Optionally, add user feedback here
            return;
        }

        // Map your current state to the API's expected payload structure
        const payload = {
            fullName: name,
            phoneNum: phone,
            service: selectedService,
            comment: comment // Include comment in the payload
        };

        try {
            const response = await axios.post("https://api.pmc.dr-psixoterapevt.uz/v1/application/create", payload);
            if (response.status === 200 || response.status === 201) {
                setShowModalOk(true);
                setValues({ name: "", phone: "", comment: "" }); // Reset comment field
                setSelectedService(t('text-3'));
            }
        } catch (error) {
            console.error('Error submitting the form:', error);
            // Optionally, handle error feedback here
        }
    };

    const handleAppointmentClick = async () => {
        try {
            const response = await fetch('https://api.pmc.dr-psixoterapevt.uz/v1/counter/add?button=MAKE_AN_APPOINTMENT', {
                method: 'POST',
            });
            if (response.ok) {
                // Optionally, handle successful click
            } else {
                // Optionally, handle unsuccessful click
            }
        } catch (error) {
            // Optionally, handle error
        }
    };


    return (
        <>
            {/* Main Modal */}
            <div
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[99999]"
                onClick={handleBackdropClick}
            >
                <div className="bg-white p-6 mdx:p-[30px] shadow-md w-[90%] max-w-[466px] relative flex flex-col items-center justify-center">
                    <div className="flex justify-between items-start w-full">
                        <h2 className=" lh text-[25px] font-semibold mdx:text-[35px] ">
                            {formatText(t('type-of-service'))}
                        </h2>
                        <div onClick={handleClose} className="w-full h-full max-w-[25px] max-h-[25px] mdx:max-w-[30px] mdx:max-h-[30px] absolute right-[15px] top-[15px] cursor-pointer">
                            <Image
                                src={close}
                                width={100}
                                height={100}
                                quality={100}
                                alt="close"
                                className="h-full w-full max-w-[25px] max-h-[25px] mdx:max-w-[30px] mdx:max-h-[30px]"
                            />
                        </div>
                    </div>
                    <form className="flex flex-col gap-9 w-full xl:gap-12 mt-[30px] mdx:mt-[50px]" onSubmit={handleSubmit}>
                        {["name", "phone"].map((field) => (
                            <div className="relative" key={field}>
                                <input
                                    type={field === "phone" ? "tel" : "text"} // Change type to "tel" for phone
                                    name={field}
                                    value={values[field]}
                                    onChange={handleInputChange}
                                    onFocus={() => setFocusedInput(field)}
                                    onBlur={() => setFocusedInput(null)}
                                    className={`block w-full px-3 py-2  text-[#666666] placeholder-transparent focus:outline-none border-b-2 ${focusedInput === field
                                        ? validateInput(field, values[field]).isValid
                                            ? "border-[#EEEEEE] text-black"
                                            : "border-red-500 text-black" // Change border color on validation error
                                        : "border-[#EEEEEE] text-black"
                                        }`}
                                    placeholder={t(
                                        field === "name"
                                            ? "full-name"
                                            : "telephone-number"
                                    )}
                                    inputMode={field === "phone" ? "numeric" : undefined} // Suggest numeric keypad on mobile
                                />
                                <label
                                    htmlFor={field}
                                    className={`absolute transition-all text-[16px] mdx:text-[19px]  ${focusedInput === field || values[field]
                                        ? "-top-4 text-xs"
                                        : "top-1 text-[16px] mdx:text-[20px]"
                                        } ${focusedInput === field
                                            ? "text-[#666666] opacity-[0.8]"
                                            : "text-[#666666] opacity-[0.8]"
                                        } cursor-text`}
                                    onClick={() => document.getElementsByName(field)[0].focus()}
                                >
                                    {focusedInput === field && values[field].length > 0
                                        ? validateInput(field, values[field]).message
                                        : field === "name"
                                            ? t('full-name') // Ensure this key exists in your translations
                                            : t('telephone-number')}
                                </label>
                                {/* Optional: Display validation error message */}
                                {focusedInput === field || values[field] ? (
                                    !validateInput(field, values[field]).isValid && (
                                        <span className="text-red-500 text-sm">
                                            {validateInput(field, values[field]).message}
                                        </span>
                                    )
                                ) : null}
                            </div>
                        ))}

                        {/* New Comment Field */}
                        <div className="relative" key="comment">
                            <input
                                name="comment"
                                value={values.comment}
                                onChange={handleInputChange}
                                onFocus={() => setFocusedInput("comment")}
                                onBlur={() => setFocusedInput(null)}
                                className={`block w-full px-3 py-2 text-[#666666] placeholder-transparent focus:outline-none border-b-2 ${focusedInput === "comment"
                                    ? validateInput("comment", values.comment).isValid
                                        ? "border-[#EEEEEE] text-black"
                                        : "border-red-500 text-black" // Change border color on validation error
                                    : "border-[#EEEEEE] text-black"
                                    }`}
                                placeholder={t("comment-placeholder")} // Ensure this key exists in your translations
                                rows={4} // Adjust rows as needed
                            />
                            <label
                                htmlFor="comment"
                                className={`absolute transition-all text-[16px] mdx:text-[19px]  ${focusedInput === "comment" || values.comment
                                    ? "-top-4 text-xs"
                                    : "top-1 text-[16px] mdx:text-[20px]"
                                    } ${focusedInput === "comment"
                                        ? "text-[#666666] opacity-[0.8]"
                                        : "text-[#666666] opacity-[0.8]"
                                    } cursor-text`}
                                onClick={() => document.getElementsByName("comment")[0].focus()}
                            >
                                {focusedInput === "comment" && values.comment.length > 0
                                    ? validateInput("comment", values.comment).message
                                    : t('comment')} {/* Ensure this key exists in your translations */}
                            </label>
                            {/* Optional: Display validation error message */}
                            {focusedInput === "comment" || values.comment ? (
                                !validateInput("comment", values.comment).isValid && (
                                    <span className="text-red-500 text-sm">
                                        {validateInput("comment", values.comment).message}
                                    </span>
                                )
                            ) : null}
                        </div>

                        {/* Dropdown for Service Selection */}
                        <div className="relative border-b-[2px] border-[#E1E1E1] border-opacity-[0.8] mt-3 ">
                            {/* Dropdown Button */}
                            <button
                                type="button"
                                className="w-full text-black opacity-[0.8] text-[16px] mdx:text-[20px] text-left border-[#E1E1E1] pb-[10px] flex justify-between items-center"
                                onClick={toggleDropdown}
                            >
                                {selectedService}
                                <Image
                                    quality={100}
                                    src={arrow}
                                    alt="arrow"
                                    objectFit="contain"
                                    className="w-5 h-5 ml-2"
                                />
                            </button>

                            {/* Dropdown List */}
                            {isDropdownOpen && (
                                <ul className="absolute bg-white border border-gray-300 w-full mt-1 z-10 max-h-60 overflow-y-auto">
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
                        {/* Optional: Validation for service selection */}
                        {/* {!selectedService || selectedService === t('text-3') ? (
                            <span className="text-red-500 text-sm">
                                {t('select_a_service')}
                            </span>
                        ) : null} */}
                        <div>
                            <button
                                type="submit"
                                onClick={handleAppointmentClick}
                                className="py-[13px] w-full mdx:px-12 text-[14px] text-white font-bold hover:bg-[#398f61] focus:outline-none focus:ring-2 focus:ring-offset-2 xl:text-[16px] bg-[#00863E] "
                            >
                                {t('send')}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* ModalOk Component */}
            {showModalOk && (
                <ModalOk closeModal={handleClose} />
            )}
        </>
    );
}
