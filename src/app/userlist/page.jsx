"use client"

// UserList 컴포넌트 (userList/page.js)
import { Container, Typography, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

// 가상의 유저 데이터
const users = [
    { id: 1, username: 'user1', adminwho: 'admin2', reported: true, reportReason: '욕설' },
    { id: 2, username: 'user2', adminwho: 'admin1', reported: false, reportReason: '' },
    { id: 3, username: 'user3', adminwho: 'admin3', reported: true, reportReason: '불법프로그램 사용' },
    { id: 4, username: 'user4', adminwho: 'admin4', reported: false, reportReason: '' },
    { id: 5, username: 'user5', adminwho: 'admin2', reported: true, reportReason: '명예회손' },
    { id: 6, username: 'user6', adminwho: 'admin6', reported: false, reportReason: '' },
];

export default function UserList() {

    const router = useRouter();

    const [usersData, setUsersData] = useState(users);

    // 신고 처리 함수
    const handleReportProcess = (userId) => {
        const updatedUsers = usersData.map(user => {
            if (user.id === userId) {
                return {
                    ...user,
                    reported: false,
                    reportReason: ''
                };
            }
            return user;
        });
        setUsersData(updatedUsers);
    };

    // 상세 정보 보기 함수
    const handleViewDetails = (userId) => {
        const user = usersData.find(user => user.id === userId);

        router.push("/detail/userdetail_list")
        /* alert(`유저명: ${user.username}\n이메일: ${user.email}\n역할: ${user.role}\n신고사유: ${user.reportReason}`); */
    };

    return (
        <>
            <Container >
                <Typography variant="h4" padding={"10px"}>유저 리스트</Typography>
                <TableContainer style={{ maxHeight: 500, overflow: 'auto' }} >
                    <Table >
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>사용자명</TableCell>
                                <TableCell>신고 처리한 관리자</TableCell>
                                <TableCell>신고 상태</TableCell>
                                <TableCell>신고 사유</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {usersData.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>{user.id}</TableCell>
                                    <TableCell>{user.username}</TableCell>
                                    <TableCell>{user.adminwho}</TableCell>
                                    <TableCell>{user.reported ? '신고 받음' : '신고 처리 완료'}</TableCell>
                                    <TableCell>{user.reportReason}</TableCell>
                                    <TableCell>
                                        {user.reported && (
                                            <>
                                                <Button variant="outlined" color="primary" onClick={() => handleReportProcess(user.id)}>신고 처리</Button>
                                                <Button variant="outlined" color="secondary" onClick={() => handleViewDetails(user.id)}>상세 보기</Button>
                                            </>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </>
    );
}