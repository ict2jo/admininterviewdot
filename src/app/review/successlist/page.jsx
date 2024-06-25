"use client"

import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useRouter } from "next/navigation";


const users = [
    { id: 1, username: 'user1', email: 'user1@example.com', role: 'admin' },
    { id: 2, username: 'user2', email: 'user2@example.com', role: 'user2' },
    { id: 3, username: 'user3', email: 'user3@example.com', role: 'user3' },
    { id: 4, username: 'user4', email: 'user4@example.com', role: 'user4' },
    { id: 5, username: 'user5', email: 'user5@example.com', role: 'user5' },
];
export default function SuccessList() {
    const router = useRouter();

    const handleSuccDetail = () => {
        router.push("/sidebar/review/success_detail")
    };


    return(
        <>
            <Container>
                <Typography variant="h4" padding={"10px"} >
                    
                </Typography>
                <TableContainer>
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
                                <TableRow key={user.id} onClick={handleSuccDetail}>
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
    )
}