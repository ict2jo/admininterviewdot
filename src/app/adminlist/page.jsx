// UserList 컴포넌트 (userList/page.js)
import { Container, Typography, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper } from "@mui/material";

// 가상의 유저 데이터
const users = [
    { id: 1, username: 'admin1', email: 'admin1@example.com', role: 'admin1' },
    { id: 2, username: 'admin2', email: 'admin2@example.com', role: 'admin2' },
    { id: 3, username: 'admin3', email: 'admin3@example.com', role: 'admin3' },
    { id: 4, username: 'admin4', email: 'admin4@example.com', role: 'admin4' },
    { id: 5, username: 'admin5', email: 'admin5@example.com', role: 'admin5' },
    { id: 6, username: 'admin6', email: 'admin6@example.com', role: 'admin6' },
    { id: 7, username: 'admin7', email: 'admin7@example.com', role: 'admin7' },
    { id: 8, username: 'admin8', email: 'admin8@example.com', role: 'admin8' },
    { id: 9, username: 'admin9', email: 'admin8@example.com', role: 'admin9' },
    
];

export default function AdminList() {
    return (
        <>
            <Container>
                <TableContainer >
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>관리자명</TableCell>
                                <TableCell>이메일</TableCell>
                                <TableCell>역할</TableCell>
                                <TableCell>등급</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>{user.id}</TableCell>
                                    <TableCell>{user.username}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.role}</TableCell>
                                    <TableCell>{user.grade}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </>
    );
}