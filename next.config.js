/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['example.com'], // Add your image domains here
  },
  env: {
    CUSTOM_ENV_VARIABLE: process.env.CUSTOM_ENV_VARIABLE, // Add your custom environment variables here
  },
  webpack: (config) => {
    // Custom webpack configurations can be added here
    return config;
  },
};