"use client"; // 클라이언트 컴포넌트로 설정

import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TableRow from '@mui/material/TableRow';
import Pagination from '@mui/material/Pagination';
import { Box, Button, CircularProgress, Table, TableHead } from '@mui/material';
import './adminlist.css';
import { MenuContext } from '@/stores/StoreContext';
import { useRouter } from 'next/navigation'; // next/router 대신 next/navigation 사용
import Link from 'next/link';
import { observer } from 'mobx-react-lite';


const AdminList = observer(() => {
    const menuStore = useContext(MenuContext);
    const [page, setPage] = useState(1); // Current page state
    const [rowsPerPage] = useState(5); // Rows per page (fixed)
    const fetchData = () => {
        axios.get('/admin/adminlist').then((data)=>{
        console.log(data.data)
        menuStore.setAdminList(data.data);
        })
        .catch((error) => {
        alert("데이터를 가져오는 데 실패했습니다.");
        console.error("데이터를 가져오는 중 오류가 발생했습니다:", error);
        });
    };
    useEffect(() => {
        fetchData();
    }, []);

    // Pagination logic
    const rows = menuStore.adminList || []; 
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - (page - 1) * rowsPerPage);
    const displayedRows = rows.slice((page - 1) * rowsPerPage, (page - 1) * rowsPerPage + rowsPerPage);
    const pageCount = Math.ceil(rows.length / rowsPerPage); // Total pages

    const router = useRouter();

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleMenuClick = (menu) => {
        localStorage.setItem("selectedMenu", menu);
        menuStore.setSelectedMenu(menu);
    };
    const handleAdminDelete = async (a_idx) => {
            const response = await axios.post('/admin/admindelete', null, {
                params: { a_idx }
            }).then(response => {
                console.log("사용자 정지 요청이 성공했습니다.", response.data);
                alert("사용자 정지 완료했습니다.");
                location.reload();
                })
                .catch(error => {
                console.error("사용자 정지 요청 중 오류가 발생했습니다.", error);
                });
            }
    const handleAdminLive = async (a_idx) => {
            const response = await axios.post('/admin/adminlive', null, {
                params: { a_idx }
            }).then(response => {
                console.log("사용자 복구 성공했습니다.", response.data);
                alert("사용자 복구 완료했습니다.");
                location.reload();
                })
                .catch(error => {
                console.error("사용자 복구 요청 중 오류가 발생했습니다.", error);
                });
            }
    return (
        <>
        <TableContainer sx={{ width: 1000 }} className='tablewrap'>
        <h1>관리자 리스트</h1>
        <Table sx={{ minWidth: 600 }}>
            <TableHead sx={{ borderBottom: '3px solid blue' }}>
            <TableRow>
                <TableCell sx={{ width: '50px', textAlign:'center'}}>NO</TableCell>
                <TableCell sx={{ width: '100px', textAlign:'center' }}>ID</TableCell>
                <TableCell sx={{ width: '100px', textAlign:'center' }}>이름</TableCell>
                <TableCell sx={{ width: '100px', textAlign:'center' }}>전화번호</TableCell>
                <TableCell sx={{ width: '100px', textAlign:'center' }}>이메일</TableCell>
                <TableCell sx={{ width: '408px', textAlign:'center' }}>수정/삭제</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {/* Map displayed rows and render */}
            {displayedRows.map((row, index) => (
                <TableRow key={row.i_idx}>
                <TableCell sx={{ width: '50px', textAlign:'center'}}>
                {row.a_idx}
                </TableCell>
                
                <TableCell sx={{ width: '100px', textAlign:'center' }}>
                {row.a_id}
                </TableCell>

                <TableCell sx={{ width: '100px', textAlign:'center' }}>
                {row.a_name}
                </TableCell>

                <TableCell sx={{ width: '200px', textAlign:'center' }}>
                {row.a_phone}
                </TableCell>

                <TableCell sx={{ width: '100px', textAlign:'center' }}>
                {row.a_email}
                </TableCell>

                <TableCell sx={{ width: '408px', textAlign: 'center', display: 'flex', flexDirection: 'row',justifyContent: 'center', gap: '10px'}}>
                <Button variant='contained'  onClick={() => handleMenuClick(`adminedit/${row.a_idx}`)}>수정하기</Button>
                {row.a_status ? (<Button variant='outlined' onClick={() => handleAdminLive(row.a_idx)}>복구하기</Button>)
                :(<Button variant='contained' onClick={() => handleAdminDelete(row.a_idx)}>정지하기</Button>)}
                </TableCell>
            </TableRow>
            ))}
            {emptyRows > 0 && (
                <TableRow style={{ height: 97 * emptyRows, width: '100%' }}>
                <TableCell colSpan={12} />
                </TableRow>
            )}
            </TableBody>
            {/* Pagination */}
            <TableFooter>
            <TableRow>
                <TableCell colSpan={12} align="center" sx={{ border: 0 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                        <Pagination
                            count={pageCount} // Total pages
                            page={page} // Current page index (1-based)
                            color="primary"
                            onChange={handleChangePage} // Page change handler
                            size="large" // Pagination size
                            className='inqpagination'
                        />
                    </Box>
                    <Box sx={{ flexShrink: 0 }}>
                        <Button variant='contained' onClick={() => handleMenuClick("admincreate")}>관리자 생성하기</Button>
                    </Box>
                </Box>
                </TableCell>
            </TableRow>
            </TableFooter>
        </Table>
        </TableContainer>
        </>
    );
});

export default AdminList;

