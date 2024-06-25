"use client"

import { Button, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


export default function ReviewDetail() {
    const [reviewdetail, setReviewDetail] = useState([]);
    const router = useRouter();

    useEffect(() => {
        async function fetchReviewDetailList(){
            try{
                const response = await axios.get("/review/reviewdetail");
                setReviewDetail(response.data);
            } catch(error){
                console.log('Error fetching review data :', error);
            }
        }
        fetchReviewDetailList();
    }, []);

  

    return(
        <>
            <Container>
                <Typography variant="h4" padding={"10px"} >
                    면접 후기 게시판
                </Typography>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>작성자</TableCell>
                                <TableCell>제목</TableCell>
                                <TableCell>내용</TableCell>
                                <TableCell>회사명</TableCell>
                                <TableCell>작성날짜</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {reviewdetail.map((k) => (
                                <TableRow key={k.r_idx}>
                                    <TableCell>{k.r_writer}</TableCell>
                                    <TableCell>{k.r_title}</TableCell>
                                    <TableCell>{k.r_content}</TableCell>
                                    <TableCell>{k.r_company}</TableCell>
                                    <TableCell>{k.r_regdate}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Button className="reviewlistGo">목록</Button>
                <Button className="reviewDeleteGo" >삭제하기</Button>
            </Container>
        </>
    );
}