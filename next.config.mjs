/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode:true,
    swcMinify:true,
    env: {
        NEXT_PUBLIC_TOSS_SECRET_KEY: process.env.NEXT_PUBLIC_TOSS_SECRET_KEY,
    },
    async rewrites(){
        return[
            {
                source : "/api/:path*",
                destination : "http://localhost:8090/api/:path*"
            },
            {
                source : "/inquiry/:path*",
                destination : "http://localhost:8090/inquiry/:path*"
            },
            {
                source : "/review/reviewlist",
                destination : "http://localhost:8090/review/reviewlist"
            },
            {
                source : "/report/:path*",
                destination : "http://localhost:8090/report/:path*"
            },
            {
                source : "/admin/:path*",
                destination : "http://localhost:8090/admin/:path*"
            },
            {
                source : "/admin/:path*",
                destination : "http://localhost:8090/payments/:path*"
            },
        ];
    }
};

export default nextConfig;
