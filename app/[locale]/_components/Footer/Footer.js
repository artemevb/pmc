"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import resultLogo from "@/public/svg/result-logo.svg";
import Logo_Footer from "@/public/images/Logo_Footer.png";

import instagram from "@/public/svg/social/Instagram.svg";
import telegram from "@/public/svg/social/telergam.svg";
import facebook from "@/public/svg/social/facebook.svg";
import youtube from "@/public/svg/social/youtube.svg";

const handleNewLines = (text) => {
  return text.split('\n').map((item, index) => (
    <span key={index}>
      {item}
      <br />
    </span>
  ));
};

const FooterLink = ({ text }) => (
  <div className="mt-[8px] mdx:mt-[12px] font-medium">{text}</div>
);

// Компонент секции футера
const FooterSection = ({ title, links, locale }) => (
  <div className="flex flex-col slg:w-6/12 max-md:ml-0 max-md:w-full">
    <nav className="flex flex-col grow text-xl text-neutral-900 max-slg:mt-10">
      <Link href={`/${locale}/${title.url}`}>
        <h3 className="font-bold">{title.title}</h3>
      </Link>
      {links.map((link, index) => (
        <Link href={`/${locale}/${link.url}`} key={index}>
          <FooterLink text={link.title} />
        </Link>
      ))}
    </nav>
  </div>
);

// Основной компонент футера
function Footer({ locale }) {
  const t = useTranslations();

  const handleTelegramClick = async () => {
    try {
      const response = await fetch('https://api.pmc.dr-psixoterapevt.uz/v1/counter/add?button=TELEGRAM_FOR_BLOG', {
        method: 'POST',
      });

      if (response.ok) {
      } else {
      }
    } catch (error) {
      console.log('Error tracking Telegram button click:', error);
    }
  };

  const handleTelegramiconClick = async () => {
    try {
      const response = await fetch('https://api.pmc.dr-psixoterapevt.uz/v1/counter/add?button=TELEGRAM_FOOTER', {
        method: 'POST',
      });

      if (response.ok) {
      } else {
      }
    } catch (error) {
      console.log('Error tracking Telegramicon button click:', error);
    }
  };

  const handleInstagramiconClick = async () => {
    try {
      const response = await fetch('https://api.pmc.dr-psixoterapevt.uz/v1/counter/add?button=INSTAGRAM_FOOTER', {
        method: 'POST',
      });

      if (response.ok) {
      } else {

      }
    } catch (error) {
      console.log('Error tracking Telegram button click:', error);
    }
  };

  const handleFacebookiconClick = async () => {
    try {
      const response = await fetch('https://api.pmc.dr-psixoterapevt.uz/v1/counter/add?button=FACEBOOK_FOOTER', {
        method: 'POST',
      });

      if (response.ok) {
      }
    } catch (error) {
      console.log('Error tracking Facebook button click:', error);
    }
  };

  const handleYoutubeiconClick = async () => {
    try {
      const response = await fetch('https://api.pmc.dr-psixoterapevt.uz/v1/counter/add?button=YOUTUBE_FOOTER', {
        method: 'POST',
      });

      if (response.ok) {
      } else {
      }
    } catch (error) {
      console.log('Error tracking Youtube button click:', error);
    }
  };

  return (
    <div className="flex flex-col justify-center w-full ">
      <div className="flex flex-col w-full bg-[#F9F9F9] max-md:max-w-full ">
        <header className="flex flex-col justify-center items-start xl:items-center px-[16px] py-10 w-full bg-slate-50 max-md:px-5 max-md:max-w-full max-w-[1440px] mx-auto">
          <div className="flex flex-col self-start w-full mdx:flex-row mdx:self-auto mdx:justify-between border-b pb-[30px] mdx:pb-[45px] xl:pb-[40px]">
            <div className="w-[40%] max-md:w-1/2">
              <Image
                src={Logo_Footer}
                width={500}
                height={500}
                quality={100}
                alt="Prime logo"
                className="h-full w-full object-contain max-w-[141px] mdx:max-w-[195px]"
              />
            </div>
            <div className="w-full mt-6 mdx:max-w-[299px] xl:max-w-[393px] mdl:mr-[20px]">
              <h4 className="text-[#000000] font-bold text-[20px] mdx:text-[24px] xl:text-[26px] pt-[30px] pb-[17px] max-w-[208px] mdx:max-w-[299px] xl:max-w-[393px]">
                {t("Footer.telegram_info")}
              </h4>
              {/* Updated Telegram Button with onClick Handler */}
              <a
                href="https://t.me/prime_medical_center"
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleTelegramClick}
                className="bg-[#00863E] hover:bg-[#398f61] w-full px-[35px] mdx:px-[20px] min-h-[50px] flex items-center justify-center mdx:max-w-[240px]"
              >
                <p className="text-white text-[14px] mdx:text-[16px] font-bold">Telegram</p>
              </a>
            </div>
          </div>

          <div className="w-full xl:flex xl:flex-row xl: justify-between max-w-[1440px]">
            <div className="flex flex-col justify-between gap-5 w-full max-slg:flex-wrap max-md:max-w-full mt-[50px]">
              <div className="flex-auto max-w-full">
                <div className="flex gap-5 justify-between max-mdl:flex-row max-md:gap-0">
                  <FooterSection
                    locale={locale}
                    title={{ title: t("Footer.services"), url: "services" }}
                    links={[
                      { title: t("Footer.Navigation.laboratory"), url: "services" },
                      { title: t("Footer.Navigation.consultation"), url: "services" },
                      { title: t("Footer.Navigation.services_1"), url: "services" },
                      { title: t("Footer.Navigation.services_2"), url: "services" },
                    ]}
                  />
                  <FooterSection
                    locale={locale}
                    title={{ title: ("Prime Medical") }}
                    links={[
                      { title: t("Footer.Navigation.about"), url: "about" },
                      { title: t("Footer.Navigation.doctors"), url: "doctors" },
                      { title: t("Footer.Navigation.news"), url: "news" },
                      { title: t("Footer.Navigation.contacts"), url: "contacts" },
                    ]}
                  />
                </div>
              </div>
            </div>

            <div className="mt-[50px] mdx:flex mdx:flex-row  mdx:justify-between w-full">
              <div className="w-full flex flex-col slg:w-6/12">
                <h4 className="font-bold text-[18px] mdx:text-[20px] xl:text-[20px] mb-[16px]">
                  {t("Footer.Navigation.contacts")}
                </h4>
                <a
                  href="tel:+998781131343"
                  className="hover:underline text-black text-[16px] mdx:text-[20px]"
                >
                  +998 (78) 113 13 43
                </a>
                <a
                  href="mailto:administrative@prime-medical.uz"
                  className="text-black text-[16px] mdx:text-[20px] mt-[8px]"
                >
                  administrative@prime-medical.uz
                </a>
                <p className="w-full text-[16px] mdx:text-[20px] max-w-[344px] mt-[8px]">
                  {handleNewLines(t("Footer.addresses"))}
                </p>
              </div>
              <div className="mt-[40px] mdx:mt-[0px] slg:w-6/12">
                <h4 className="text-[20px] font-bold">
                  {t("Footer.social")}
                </h4>
                <div className="mt-[18px] flex flex-row gap-[8px]">
                  <a href="https://www.instagram.com/prime_medical_center/" target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleInstagramiconClick}
                  >
                    <Image
                      src={instagram}
                      width={50}
                      height={50}
                      quality={100}
                      alt="instagram logo"
                      className="h-full w-full object-cover"
                    />
                  </a>
                  <a href="https://t.me/prime_medical_center"
                   target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleTelegramiconClick}>
                    <Image
                      src={telegram}
                      width={50}
                      height={50}
                      quality={100}
                      alt="telegram logo"
                      className="h-full w-full object-cover"
                    />
                  </a>
                  <a href="https://www.facebook.com/people/Prime-Medical-Center/100085066009600/"
                   target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleFacebookiconClick}>
                    <Image
                      src={facebook}
                      width={50}
                      height={50}
                      quality={100}
                      alt="facebook logo"
                      className="h-full w-full object-cover"
                    />
                  </a>
                  <a href="https://youtube.com/@primemedicalcentertashkent?si=zsvKksa_R4qwUuPy"
                   target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleYoutubeiconClick}>
                    <Image
                      src={youtube}
                      width={50}
                      height={50}
                      quality={100}
                      alt="youtube logo"
                      className="h-full w-full object-cover"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Нижняя часть футера */}
        <footer className="flex flex-col items-center px-[16px] pb-2.5 w-full text-base text-red-400 bg-slate-50 max-md:px-5 max-md:max-w-full">
          <div className="flex flex-col w-full max-w-[1440px] max-md:max-w-full">
            <div className="shrink-0 h-px bg-neutral-200 max-md:max-w-full" />
            <div className="flex gap-5 mt-2.5 xl:my-[15px] max-md:flex-wrap max-md:max-w-full items-center">
              <p className="flex-auto my-auto text-[#B3B3B3]">© 2024 {t("Footer.info")}</p>
              <Link
                target="_blank"
                rel="noopener noreferrer" // Добавлено для безопасности
                href="https://result-me.uz/api/redirect?from=cG1j"
                className="flex items-center"
              >
                <Image
                  src={resultLogo}
                  width={500}
                  height={500}
                  quality={100}
                  alt="Result logo"
                  className="h-full max-h-10 w-auto"
                />
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Footer;
