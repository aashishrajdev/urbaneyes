/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.module.rules.push({
            test: /\.(png|jpg|jpeg|gif|svg)$/i,
            type: 'asset/resource',
        });
        return config;
    },
    images: {
        domains: ['tile.openstreetmap.org'],
    },
};

module.exports = nextConfig; 