"use client"

import { Typography } from "@mui/material";
import { useRouter } from "next/navigation";



export default function ReviewMenu() {
    const router = useRouter();

    const handleReviewsetting = () => {
        router.push("sidebar/review/review_list")
    };
    const handleSuccesssetting = () => {
        router.push("sidebar/review/success_list")
    };


    return(
        <>
        <div className="navwrap3">
                <Typography className="menu1" onClick={handleReviewsetting}>면접 후기</Typography><br />
                <Typography className="menu2" onClick={handleSuccesssetting}>합격자 후기</Typography><br />
            </div>
        </>
    )
}