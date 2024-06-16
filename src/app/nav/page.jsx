"use client"
import { Button, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext } from "react";

export default function Nav() {
    const router = useRouter();

    const handleReviewsetting = () => {
        router.push("/sidebar/review")
    }

    const handleUsersetting = () => {
        router.push("/sidebar/user")
    };
    const handleAdminsetting = () => {
        router.push("/sidebar/adminplus")
    };
    const handleQuerysetting = () => {
        router.push("/sidebar/query")
    }

    return(
        <>
        <div className="navwrap">
        <Typography className="nav" onClick={handleReviewsetting}>면접 후기 게시판</Typography><br />
        <Typography className="nav" onClick={handleUsersetting}>유저 관리</Typography><br />
        <Typography className="nav" onClick={handleAdminsetting}>관리자 생성</Typography><br />
        <Typography className="nav" onClick={handleQuerysetting}>1:1 문의</Typography><br />
        </div>
        </>
    )
}