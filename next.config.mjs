/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode:true,
    swcMinify:true,
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
        ];
    }
};

export default nextConfig;
