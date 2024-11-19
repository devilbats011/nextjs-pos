/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        missingSuspenseWithCSRBailout: false,
    },
    images: {
        domains: ['127.0.0.1','i.imgflip.com'],
    },
};

export default nextConfig;
