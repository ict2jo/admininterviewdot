"use client"

import { Container, Typography, Paper, Grid, Box, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ReviewList() {
    const [reviewList, setReviewList] = useState([]);
    const router = useRouter();

    useEffect(() => {
        async function fetchReviewList() {
            try {
                const response = await axios.get("/review/reviewlist");
                setReviewList(response.data); // 서버에서 받은 데이터를 상태에 저장
            } catch (error) {
                console.error('Error fetching review data:', error);
            }
        }

        fetchReviewList(); // async 함수 호출
    }, []); // useEffect의 두 번째 인자에 빈 배열을 전달하여 한 번만 호출되도록 설정

    const handleReviewClick = () =>{
        router.push("/review/review_detail_list")
    }

    return (
        <>
        
        <Container>
            <Typography variant="h4" padding={"10px"} >
                면접 후기 게시판
            </Typography>
            
            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>작성자</TableCell>
                            <TableCell>제목</TableCell>
                            <TableCell>내용</TableCell>
                            <TableCell>회사</TableCell>
                            <TableCell>작성일</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {reviewList.map((k) => (
                            <TableRow key={k.r_idx} onClick={() => handleReviewClick(k.r_idx)}>
                                <TableCell>{k.r_writer}</TableCell>
                                <TableCell>{k.r_title}</TableCell>
                                <TableCell>{k.r_content}</TableCell>
                                <TableCell>{k.r_company}</TableCell>
                                <TableCell>{k.r_regdate.substring(0, 10)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </Container>
        </>
    );
}