"use client"

import { Typography } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";



export default function AdminMain() {
    const router = useRouter();
    const [adminId, setAdminId] = useState("");

    useEffect(() =>{
        const admingetId = async () => {
            try {
                const response = await axios.get('/api/adminlogin');
                setAdminId(response.data);
            } catch (error) {
                console.error("error : ", error);
            }
        }
    })


    const handlereviewList = () => {
        router.push("/reviewmenu")
    };
    const handleuserList = () => {
        router.push("/sidebar/user")
    };
    const handleadminList = () => {
        router.push("/sidebar/adminplus")
    };
    const handlequeryList = () => {
        router.push("/sidebar/query")
    };

    return (
        <>
            <div className="navwrap2">
                <h2>{`관리자님 환영합니다. ${adminId}`}</h2> 
                <Typography className="main1" onClick={handlereviewList}>면접 후기<br />게시판</Typography><br />
                <Typography className="main2" onClick={handleuserList}>유저 관리</Typography><br />
                <Typography className="main3" onClick={handleadminList}>관리자 생성</Typography><br />
                <Typography className="main4" onClick={handlequeryList}>1:1 문의</Typography><br />
            </div>
        </>
    )
}