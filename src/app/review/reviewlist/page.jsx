"use client"

import { Container, Typography, Paper, Grid, Box, Table, TableHead, TableRow, TableCell, TableBody, Dialog, DialogContent, Pagination, DialogTitle, TextField, DialogActions, Button } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { MenuContext } from '@/stores/StoreContext';
import './Reviewlist.css';

export default function ReviewList() {
    const menuStore = useContext(MenuContext);
    const [reviewList, setReviewList] = useState([]);
    const [selectedReview, setSeletedReview] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [page, setPage] = useState(1); // 현재 페이지 상태 추가
    const [totalPages, setTotalPages] = useState(""); // 전체 페이지 수 상태 추가
    const reviewsPerPage = 5; // 한 페이지당 보일 리뷰 개수
    const [comments, setComments] = useState([]);
    const [commentContent, setCommentContent] = useState("");

    const router = useRouter();

    useEffect(() => {
        fetchReviewList(page);
    }, [page]);

    useEffect(() => {
        fetchReviewList();
    },[]);

    const fetchReviewList = async (page) => {
        try {
            const response = await axios.get(`/review/reviewlist?page=${page}&limit=${reviewsPerPage}`);
            const activeReviews = response.data.filter(review => review.active === '0');
            setReviewList(activeReviews);
            setReviewList(response.data);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.log("error fetching review data: ", error);
        }
    };

    useEffect(() => {
        async function fetchReviewList() {
            try {
                const response = await axios.get("/review/reviewList");
                setReviewList(response.data); // 서버에서 받은 데이터를 상태에 저장
            } catch (error) {
                console.error('Error fetching review data:', error);
            }
        }

        fetchReviewList(); // async 함수 호출
    }, []); // useEffect의 두 번째 인자에 빈 배열을 전달하여 한 번만 호출되도록 설정

    const handleReviewClick = (review) => {
        setSeletedReview(review);
        setOpenDialog(true);
        fetchComments(review.r_idx);
        
    };

    useEffect(() => {
        console.log("selectedReview : ", selectedReview);
    }, [selectedReview]);

    useEffect(() => {
        console.log("comments", comments);
    }, [commentContent])

    const handleDelete = async () => {
        try {
            const response = await axios.post("http://localhost:8090/review/deletereview", {
                r_idx: selectedReview.r_idx,
            });
            console.log("리뷰 삭제 : ", response.data);

            await fetchReviewList();
            handleCloseDialog(); // 팝업창 닫기
        } catch (error) {
            console.error("리뷰 삭제 에러 : ", error);
        }
    };

    const fetchComments = async (r_idx) => {
        try {
            const response = await axios.get(`http://localhost:8090/comments/comment?r_idx=${r_idx}`);
            setComments(response.data);
            console.log("댓글 : ", response.data);
            /* setCommentContent(response.data); */
        } catch (error) {
            console.error("Error fetching comments:", error);
            setComments([]);
        }
    };

    const handleDeleteComment = async (re_idx) => {
        try {
            const response = await axios.post("http://localhost:8090/comments/deletecomment", {
                re_idx: re_idx,
            })
            console.log("Comment deleted:", response.data);

            // 삭제 후 댓글 목록 다시 불러오기
            await fetchComments(selectedReview.r_idx);

            /* handleCloseDialog(); // 팝업 창 닫기 */
        } catch (error) {
            console.error("Error deleting comment:", error);
        }
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        /* setSeletedReview(null); */
        setCommentContent("");
        /* setComments([]); // 댓글 목록 초기화 */
    };

    const handleCommentChange = (event) => {
        setCommentContent(event.target.value);
    }

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const startIndex = (page - 1) * reviewsPerPage;
    const endIndex = startIndex + reviewsPerPage;
    const currentReview = reviewList.slice(startIndex, endIndex);
    return (
        <>

            <Container sx={{ width: 1000 }} className="reviewwrap">
                    <h1>면접 후기 게시판</h1>
                    <Table sx={{ minWidth: 600, marginBottom: '20px' }}>
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
                            {currentReview.map((review) => (
                                <TableRow
                                    key={review.r_idx}
                                    onClick={() => {
                                        if (review.active !== '1') {
                                            handleReviewClick(review)

                                        }
                                    }}
                                    style={{ cursor: review.active === '1' ? 'default' : 'pointer' }}
                                >
                                    <TableCell sx={{ width: '100px', textAlign: 'center' }}>{review.active === '1' ? '' : review.r_idx}</TableCell>
                                    <TableCell sx={{ width: '100px', textAlign: 'center' }}>{review.active === '1' ? '' : review.r_id}</TableCell>
                                    <TableCell sx={{ width: '100px', textAlign: 'center' }}>{review.active === '1' ? '' : review.r_title}</TableCell>
                                    <TableCell colSpan={1} sx={{ textAlign: 'center' }}>
                                        {review.active === '1' ? (
                                            <span style={{ color: 'red', marginLeft: '10px', width: '300px' }}>삭제된 게시물 입니다.</span>
                                        ) : (
                                            review.r_content
                                        )}
                                    </TableCell>
                                    <TableCell sx={{ width: '100px', textAlign: 'center' }}>{review.active === '1' ? '' : review.r_company}</TableCell>
                                    <TableCell sx={{ width: '200px', textAlign: 'center' }}>{review.active === '1' ? '' : review.r_regdate.substring(0, 10)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    {/* 페이지네이션 */}
                    <div style={{ display: 'flex', justifyContent: 'center', margin: '10px 0 25px 0' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                            <Pagination
                                /* count={totalPages} */
                                count={Math.ceil(reviewList.length / reviewsPerPage)}
                                page={page}
                                onChange={handlePageChange}
                                color="primary"
                                className='repagination'
                            />
                        </Box>
                    </div>
            </Container>
            <Dialog open={openDialog} onClose={handleCloseDialog} className="reviewdetail" sx={{width:'600px'}}>
                <DialogTitle sx={{height: "70px",  borderBottom: "3px solid blue"}}>면접 후기 상세 정보 및 댓글</DialogTitle>
                <DialogContent sx={{marginTop: "10px"}}>
                    {selectedReview && (
                        <>
                            <Typography variant="h6" sx={{color:"blue"}}>제목: {selectedReview.r_title}</Typography>
                            <Typography sx={{ marginBottom:"5px"}}>작성자: {selectedReview.r_id}</Typography>
                            <Typography sx={{marginTop:"5px", fontSize:"13px"}}>회사: {selectedReview.r_company}</Typography>
                            <Typography sx={{marginTop:"5px", fontSize:"13px", color:"gray"}}>작성일: {selectedReview.r_regdate}</Typography>
                            <Typography sx={{marginTop:"15px"}}>내용: {selectedReview.r_content}</Typography>
                            
                            {/* 댓글 목록 표시 */}
                            <Typography variant="h6" style={{ marginTop: "5px" }}>
                                댓글 목록
                            </Typography>
                            <Table>
                                    <TableBody>
                                        {comments.filter(comment => comment.active !== '1').map((comment) => (
                                            <TableRow key={comment.re_idx}>
                                                <TableCell>{comment.re_idx}</TableCell>
                                                <TableCell>{comment.id}</TableCell>
                                                <TableCell style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '300px', fontSize: '12px' }}>
                                                    {comment.re_content}
                                                </TableCell>
                                                <TableCell>{comment.re_regdate}</TableCell>
                                                <TableCell>
                                                        <Box sx={{ display: 'flex', marginTop: 1, fontSize: '10px' }}>
                                                            <Button onClick={() => handleDeleteComment(comment.re_idx)} color="primary" sx={{ whiteSpace: 'nowrap', fontSize: '13px' }}>
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
    );
}