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
import './inquiry.css';
import { MenuContext } from '@/stores/StoreContext';
import { useRouter } from 'next/navigation'; // next/router 대신 next/navigation 사용
import Link from 'next/link';
import { observer } from 'mobx-react-lite';


const Inquiry = observer(() => {
    const menuStore = useContext(MenuContext);
    const [page, setPage] = useState(1); // Current page state
    const [rowsPerPage] = useState(5); // Rows per page (fixed)
    const fetchData = () => {
        axios.get('/inquiry/inquirylist').then((data)=>{
        console.log(data.data)
        menuStore.setInquiryList(data.data);
        })
        .catch((error) => {
        alert("데이터를 가져오는 데 실패했습니다.");
        console.error("데이터를 가져오는 중 오류가 발생했습니다:", error);
        });
    };
    useEffect(() => {
        fetchData();
    }, []);

    const calculateIndex = (pageIndex, rowIndex) => {
        return (pageIndex - 1) * rowsPerPage + rowIndex + 1;
    };

    // Pagination logic
    const rows = menuStore.inquiryList || []; 
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - (page - 1) * rowsPerPage);
    const displayedRows = rows.slice((page - 1) * rowsPerPage, (page - 1) * rowsPerPage + rowsPerPage);
    const pageCount = Math.ceil(rows.length / rowsPerPage); // Total pages

    const router = useRouter();

    // Handle page change
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // Handle menu click
    const handleMenuClick = async (menu) => {
        menuStore.setSelectedMenu(menu);
    };

    return (
        <>
        <TableContainer sx={{ width: 1000 }} className='tablewrap'>
        <h1>1:1문의</h1>
        <Table sx={{ minWidth: 600 }}>
            <TableHead sx={{ borderBottom: '3px solid blue' }}>
            <TableRow>
                <TableCell sx={{ width: '100px', textAlign:'center'}}>No</TableCell>
                <TableCell sx={{ width: '200px', textAlign:'center' }}>Subject</TableCell>
                <TableCell sx={{ width: '200px', textAlign:'center' }}>Content</TableCell>
                <TableCell sx={{ width: '100px', textAlign:'center' }}>Active</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {/* Map displayed rows and render */}
            {displayedRows.map((row, index) => (
                <TableRow key={row.i_idx}>
                <TableCell sx={{ width: '100px', textAlign:'center'}}>{calculateIndex(page, index)}</TableCell>
                <TableCell sx={{ width: '200px', textAlign:'center' }}>
                <Link href={`/inquirydetail/${row.i_idx}?id=${row.i_idx}`}>
                    <p className="ellipsis-cell">{row.i_subject}</p>
                </Link>
                </TableCell>
                <TableCell sx={{ width: '200px', textAlign:'center' }}>
                <Link href={`/inquirydetail/${row.i_idx}?id=${row.i_idx}`}>
                <p className="ellipsis-cell">{row.i_content}</p>
                </Link>
                </TableCell>
                <TableCell sx={{ width: '100px', textAlign:'center' }}>
                {row.i_active === '0' ? '답변대기중' : '답변완료'}
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

export default Inquiry;

