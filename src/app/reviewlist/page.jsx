// UserList 컴포넌트 (userList/page.js)
import { Container, Typography, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper } from "@mui/material";

// 가상의 유저 데이터
const users = [
    { id: 1, username: 'user1', email: 'user1@example.com', role: 'admin' },
    { id: 2, username: 'user2', email: 'user2@example.com', role: 'user2' },
    { id: 3, username: 'user3', email: 'user3@example.com', role: 'user3' },
    { id: 4, username: 'user4', email: 'user4@example.com', role: 'user4' },
    { id: 5, username: 'user5', email: 'user5@example.com', role: 'user5' },
    { id: 6, username: 'user6', email: 'user6@example.com', role: 'user6' },
    { id: 7, username: 'user7', email: 'user7@example.com', role: 'user7' },
    { id: 8, username: 'user8', email: 'user8@example.com', role: 'user8' },
    { id: 9, username: 'user9', email: 'user8@example.com', role: 'user9' },
];

export default function ReviewList() {
    return (
        <>
            <Container>
                <Typography variant="h4" padding={"10px"} >
                    
                </Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>사용자명</TableCell>
                                <TableCell>이메일</TableCell>
                                <TableCell>역할</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>{user.id}</TableCell>
                                    <TableCell>{user.username}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.role}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </>
    );
}