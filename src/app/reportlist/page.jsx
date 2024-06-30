"use client"; // 클라이언트 컴포넌트로 설정

import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TableRow from '@mui/material/TableRow';
import Pagination from '@mui/material/Pagination';
import { Button, CircularProgress, Table, TableHead } from '@mui/material';
import './Userlist.css';
import { MenuContext } from '@/stores/StoreContext';
import { useRouter } from 'next/navigation'; // next/router 대신 next/navigation 사용
import Link from 'next/link';
import { observer } from 'mobx-react-lite';


const Reportlist = observer(() => {
    const menuStore = useContext(MenuContext);
    const [page, setPage] = useState(1); // Current page state
    const [rowsPerPage] = useState(5); // Rows per page (fixed)
    const fetchData = () => {
        axios.get('/report/reportlist').then((data)=>{
        console.log(data.data)
        menuStore.setReportList(data.data);
        })
        .catch((error) => {
        console.error("데이터를 가져오는 중 오류가 발생했습니다:", error);
        });
    };
    useEffect(() => {
        fetchData();
    }, []);

    // Pagination logic
    const rows = menuStore.reportlist || []; 
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - (page - 1) * rowsPerPage);
    const displayedRows = rows.slice((page - 1) * rowsPerPage, (page - 1) * rowsPerPage + rowsPerPage);
    const pageCount = Math.ceil(rows.length / rowsPerPage); // Total pages

    const router = useRouter();

    // Handle page change
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleMenuClick = (menu) => {
        console.log("handleMenuClick", menu); // 메뉴 클릭 이벤트가 발생하는지 확인
        menuStore.setSelectedMenu(menu);
        localStorage.setItem("selectedMenu", menu);
    };
    return (
        <>
        <TableContainer sx={{ width: 1000 }} className='tablewrap'>
        <h1>신고게시판</h1>
        <Table sx={{ minWidth: 600 }}>
            <TableHead sx={{ borderBottom: '3px solid blue' }}>
            <TableRow>
                <TableCell sx={{ width: '100px', textAlign:'center'}}>신고 번호</TableCell>
                <TableCell sx={{ width: '200px', textAlign:'center' }}>신고 게시글</TableCell>
                <TableCell sx={{ width: '100px', textAlign:'center' }}>신고 날짜</TableCell>
                <TableCell sx={{ width: '100px', textAlign:'center' }}>신고 상태</TableCell>
                <TableCell sx={{ width: '100px', textAlign:'center' }}>처리관리자</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {/* Map displayed rows and render */}
            {displayedRows.map((row, index) => (
                <TableRow key={row.rep_idx}>
                <TableCell sx={{ width: '100px', textAlign:'center'}}>{row.rep_idx}</TableCell>
                
                {/* 신고 게시글 */}
                <TableCell sx={{ width: '200px', textAlign:'center' }} onClick={() => handleMenuClick(`reportdetail/${row.rep_idx}`)}>
                {row.r_title ? (
                    <p className="ellipsis-cell">{row.r_title}</p>
                    ) : (
                    <p className="ellipsis-cell">{row.s_title}</p>
                    )}
                </TableCell>
                
                {/* 신고 날짜 */}
                <TableCell sx={{ width: '100px', textAlign:'center' }}>
                <p className="ellipsis-cell">{row.rep_sysdate}</p>
                </TableCell>

                {/* 신고 상태 */}
                <TableCell sx={{ width: '100px', textAlign:'center' }}>
                <p className="ellipsis-cell">
                {row.rep_active == 0 ? '처리대기중' : '신고처리완료'}</p>
                </TableCell>

                {/* 처리관리자 */}
                <TableCell sx={{ width: '100px', textAlign:'center' }}>
                {row.a_id ? row.a_id : '처리대기중'}
                </TableCell>
            </TableRow>
            ))}
            {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={4} />
                </TableRow>
            )}
            </TableBody>
            {/* Pagination */}
            <TableFooter>
            <TableRow>
                <TableCell colSpan={4} align="center" sx={{ border: 0 }}>
                <Pagination
                    count={pageCount} // Total pages
                    page={page} // Current page index (1-based)
                    color="primary"
                    onChange={handleChangePage} // Page change handler
                    size="large" // Pagination size
                    className='inqpagination'
                    sx={{justifyContent: 'center'}}
                />
                </TableCell>
            </TableRow>
            </TableFooter>
        </Table>
        </TableContainer>
        </>
    );
});

export default Reportlist;

