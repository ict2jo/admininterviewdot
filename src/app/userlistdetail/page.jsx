// UserListDetail 컴포넌트 (userlistdetail/page.js)
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";

// 가상의 유저 데이터 (예시로 사용)
const users = [
    { id: 1, username: 'user1', adminwho: 'admin1', role: 'admin', reported: true, reportReason: 'Inappropriate behavior' },

    // 나머지 유저 데이터는 생략하겠습니다.
];

export default function UserListDetail() {

    return (
        <Container>
            <Typography variant="h4">유저 상세 정보</Typography>
            <TableContainer>
                <Table>
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
                        {users.map((user) => {
                            <TableRow key={user.id}>
                                <TableCell>{user.id}</TableCell>
                                <TableCell>{user.username}</TableCell>
                                <TableCell>{user.adminwho}</TableCell>
                                <TableCell>{user.reported}</TableCell>
                                <TableCell>{user.reportReason}</TableCell>
                            </TableRow>
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}