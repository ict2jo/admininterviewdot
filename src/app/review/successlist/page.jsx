"use client"

import authStore from "@/stores/AuthStore";
import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import './Successlist.css';
import { MenuContext } from "@/stores/StoreContext";

export default function SuccessList() {
    const menuStore = useContext(MenuContext);
    const [successList, setSuccessList] = useState([]);
    const [selectedSuccess, setSelectedSuccess] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [page, setPage] = useState(1); // 현재 페이지 상태 추가
    const [totalPages, setTotalPages] = useState(""); // 전체 페이지 수 상태 추가
    const successPerPage = 5; // 한 페이지당 보일 후기 개수
    const [comments, setComments] = useState([]);
    const [commentContent, setCommentContent] = useState("");

    const router = useRouter();

    useEffect(() => {
        fetchSuccessList(page);
    }, [page]);

    useEffect(() => {
        fetchSuccessList();
    }, []);


    const fetchSuccessList = async (page) => {
        try {
            const response = await axios.get(`/success/successlist?page=${page}&limit=${successPerPage}`);
            const activeSuccess = response.data.filter(success => success.active === '0');
            setSuccessList(activeSuccess);
            setSuccessList(response.data);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error("합격 후기 데이터를 불러오는 중 오류 발생 : ", error);
        }
    };

    useEffect(() => {
        async function fetchSuccessList() {
            try {
                const response = await axios.get("/success/successlist");
                setSuccessList(response.data);
            } catch (error) {
                console.error("합격 후기 데이터를 불러오는 중 오류 발생: ", error);
            }
        }
        fetchSuccessList()
    }, []);

    useEffect(() => {
        console.log("comments", comments);
    }, [commentContent])

    const handleSuccessClick = (success) => {
        setSelectedSuccess(success);
        setOpenDialog(true);
    };

    useEffect(() => {
        console.log("selectedSuccess", selectedSuccess);
    }, [selectedSuccess]);

    const handleDelete = async () => {
        try {
            // 서버에 삭제할 후기 정보 전송
            const response = await axios.post("http://localhost:8090/success/deletesuccess", {
                s_idx: selectedSuccess.s_idx,
            });
            console.log("후기 삭제됨:", response.data);

            // 삭제 후 후기 목록 다시 불러오기
            await fetchSuccessList();
            handleCloseDialog(); // 팝업 닫기

        } catch (error) {
            console.error("후기 삭제 중 오류 발생:", error);
        }
    };

    const fetchComments = async (s_idx) => {
        try {
            const response = await axios.get(`http://localhost:8090/commentsucc/comment?s_idx=${s_idx}`);
            setComments(response.data);
            console.log("왜 안들어가지니", response.date);
        } catch (error) {
            console.error("댓글을 불러오는 중 오류 발생:", error);
            setComments([]);
        }
    };

    const handleDeleteComment = async (su_idx) => {
        try {
            const response = await axios.post("http://localhost:8090/commentsucc/deletecomment", {
                su_idx: su_idx,
            })
            console.log("Comment deleted : ", response.data);

            await fetchComments(selectedSuccess.s_idx);

            /* handleCloseDialog(); */
        } catch (error) {
            console.error("Error deleting comment : ", error);
        }
    };


    const handleCommentChange = (event) => {
        setCommentContent(event.target.value); // 댓글 내용 업데이트
    };







    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedSuccess(null); // 선택된 후기 초기화
        setCommentContent(""); // 댓글 내용 초기화
    };


    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const startIndex = (page - 1) * successPerPage;
    const endIndex = startIndex + successPerPage;
    const currentSuccess = successList.slice(startIndex, endIndex);
    return (
        <>
            <Container sx={{ width: 1000 }} className="successwrap">
                <h1>합격 후기 게시판</h1>
                <Table sx={{ minWidth: 600 }}>
                    <TableHead sx={{ borderBottom: '3px solid blue' }}>
                        <TableRow>
                            <TableCell sx={{ width: '100px', textAlign: 'center' }}>NO</TableCell>
                            <TableCell sx={{ width: '100px', textAlign: 'center' }}>작성자</TableCell>
                            <TableCell sx={{ width: '100px', textAlign: 'center' }}>제목</TableCell>
                            <TableCell sx={{ width: '300px', textAlign: 'center' }}>내용</TableCell>
                            <TableCell sx={{ width: '100px', textAlign: 'center' }}>회사</TableCell>
                            <TableCell sx={{ width: '200px', textAlign: 'center' }}>작성일</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentSuccess.map((success) => (
                            <TableRow
                                key={success.s_idx}
                                onClick={() => {
                                    if (success.active !== '1') {
                                        handleSuccessClick(success)

                                    }
                                }}
                                style={{ cursor: success.active === '1' ? 'default' : 'pointer' }}
                            >
                                <TableCell sx={{ width: '100px', textAlign: 'center' }}>{success.active === '1' ? '' : success.s_idx}</TableCell>
                                <TableCell sx={{ width: '100px', textAlign: 'center' }}>{success.active === '1' ? '' : success.s_id}</TableCell>
                                <TableCell sx={{ width: '100px', textAlign: 'center' }}>{success.active === '1' ? '' : success.s_title}</TableCell>
                                <TableCell colSpan={1} sx={{ textAlign: 'center' }}>
                                    {success.active === '1' ? (
                                        <span style={{ color: 'red', marginLeft: '10px', width: '300px' }}>삭제된 게시물입니다.</span>
                                    ) : (
                                        success.s_content
                                    )}
                                </TableCell>
                                <TableCell sx={{ width: '100px', textAlign: 'center' }}>{success.active === '1' ? '' : success.s_company}</TableCell>
                                <TableCell sx={{ width: '200px', textAlign: 'center' }}>{success.active === '1' ? '' : success.s_regdate.substring(0, 10)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <div style={{ display: 'flex', justifyContent: 'center', margin: '10px 0 25px 0' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                        <Pagination
                            /* count={totalPages} */
                            count={Math.ceil(successList.length / successPerPage)}
                            page={page}
                            onChange={handlePageChange}
                            defaultPage={1}
                            color="primary"
                            className='supagination'
                        />
                    </Box>
                </div>
            </Container>
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle sx={{height: "70px",  borderBottom: "3px solid blue"}}>합격 후기 상세보기 및 댓글</DialogTitle>
                <DialogContent sx={{marginTop: "10px"}}>
                    {selectedSuccess && (
                        <>
                            <Typography variant="h6" sx={{ color: "blue" }}>제목: {selectedSuccess.s_title}</Typography>
                            <Typography sx={{ marginBottom: "5px" }}>작성자 : {selectedSuccess.s_id}</Typography>
                            <Typography sx={{ marginBottom: "5px", fontSize: "13px" }}>회사: {selectedSuccess.s_company}</Typography>
                            <Typography sx={{ marginTop: "5px", fontSize: "13px", color: "gray" }}>작성일 : {selectedSuccess.s_regdate}</Typography>
                            <Typography sx={{ marginBottom: "15px" }}>내용: {selectedSuccess.s_content}</Typography>

                            {/* 댓글 목록 표시 */}
                            <Typography variant="h6" style={{ marginTop: "5px" }}>
                                댓글 목록
                            </Typography>
                            <Table>
                                <TableBody>
                                    {comments.filter(comment => comment.active !== '1').map((comment) => (
                                        <TableRow key={comment.su_idx}>
                                            <TableCell>{comment.su_idx}</TableCell>
                                            <TableCell>{comment.id}</TableCell>
                                            <TableCell style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '300px', fontSize: '12px' }}>
                                                {comment.su_content}
                                            </TableCell>
                                            <TableCell>{comment.su_regdate}</TableCell>
                                            <TableCell>
                                                <Box sx={{ display: 'flex', marginTop: 1, fontSize: '10px' }}>
                                                    <Button onClick={() => handleDeleteComment(comment.su_idx)} color="primary" sx={{ whiteSpace: 'nowrap', fontSize: '13px' }}>
                                                        삭제
                                                    </Button>
                                                </Box>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </>
                    )}
                </DialogContent>
                <DialogActions>
                    <>
                        <Button onClick={handleDelete} color="primary">
                            삭제
                        </Button>
                    </>
                    <Button onClick={handleCloseDialog} color="primary">
                        닫기
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}