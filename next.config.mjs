import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['api.pmc.dr-psixoterapevt.uz'], // Добавьте домен, откуда будут загружаться изображения
    },
};

export default withNextIntl(nextConfig);