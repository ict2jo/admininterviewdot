import { Button, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useRouter } from "next/router";


export default function ReviewSuccessDetail() {
    const router = useRouter();
    const handleReivewSucc = () =>{
        router.push()
    };
    
    return(
        <>
            <Container>
                <Typography variant="h4" padding={"10px"} >
                    합격 후기 게시판
                </Typography>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>기업체 명</TableCell>
                                <TableCell>난이도</TableCell>
                                <TableCell>작성 날짜</TableCell>
                                <TableCell>내용</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((review) => (
                                <TableRow key={review.id}>
                                    <TableCell>{review.writer}</TableCell>
                                    <TableCell>{review.title}</TableCell>
                                    <TableCell>{review.company}</TableCell>
                                    <TableCell>{review.regidate}</TableCell>
                                    <TableCell>{review.content}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody> 
                    </Table>
                </TableContainer>
                <Button className="reviewSuccGo" onClick={handleReivewSucc}>목록</Button>
                <Button className="reviewSuccDeleteGo">삭제하기</Button>
            </Container>
        </>
        
    )
}