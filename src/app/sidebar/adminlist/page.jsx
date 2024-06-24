"use client"

import { FormControl, Grid, InputLabel, MenuItem, Select, Typography } from "@mui/material";

import Nav from "@/app/nav/page";
import { useState } from "react";
import AdminList from "@/app/adminlist/page";

export default function AdminList({ users }) {
    const [selectedGrade, setSelectedGrade] = useState(''); // 선택된 등급 상태 관리

    

    const handleGradeChange = (event) => {
        setSelectedGrade(event.target.value); // 드롭다운 리스트에서 선택된 등급 업데이트
    };

    return (
        <div className="innerwrap">
            <h1>관리자 생성</h1>
            <div className="whiteboard">
            <Grid container>
                <Grid item xs={2}>
                    <div className="grayboard">
                        <Nav />
                    </div>
                </Grid>
                <Grid item xs={10}>
                    <div className="maintext">
                        <AdminList />
                    </div>
                </Grid>
            </Grid>
        </div>
        </div>
    );
}