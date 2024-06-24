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
                source : "/review/reviewlist",
                destination : "http://localhost:8090/review/reviewlist"
            },
        ];
    }
};

export default nextConfig;
