/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode:true,
    swcMinify:true,
    async rewrites(){
        return[
            {
                source : "/api/adminlogin",
                destination : "http://localhost:8090/api/adminlogin"
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
        ];
    }
};

export default nextConfig;
