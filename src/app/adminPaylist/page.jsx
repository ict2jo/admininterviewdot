'use client';

import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TableRow from '@mui/material/TableRow';
import Pagination from '@mui/material/Pagination';
import { Table, TableHead } from '@mui/material';
import { MenuContext } from '@/stores/StoreContext';
import { observer } from 'mobx-react-lite';
import authStore from '@/stores/AuthStore';
import './inquiry.css';

const Paylist = observer(() => {
    const menuStore = useContext(MenuContext);
    const [page, setPage] = useState(1); // Current page state
    const [rowsPerPage] = useState(5); // Rows per page (fixed)
    const secretKey = process.env.NEXT_PUBLIC_TOSS_SECRET_KEY;
    const encodedKey = btoa(secretKey + ':');

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:8090/payments/payList`);
            const data = response.data;
            console.log(data);
            menuStore.setPayList(data);
            
            // t_idx 값 기준으로 내림차순 정렬
            data.sort((a, b) => b.t_idx - a.t_idx);
        } catch (error) {
            console.error('데이터를 가져오는 중 오류가 발생하였습니다.', error);
        }
    };
    
    useEffect(() => {
        fetchData();
    }, [menuStore]);
    

    const calculateIndex = (pageIndex, rowIndex) => {
        return (pageIndex - 1) * rowsPerPage + rowIndex + 1;
    };

    // Pagination logic
    const rows = menuStore.payList || []; 
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - (page - 1) * rowsPerPage);
    const displayedRows = rows.slice((page - 1) * rowsPerPage, (page - 1) * rowsPerPage + rowsPerPage);
    const pageCount = Math.ceil(rows.length / rowsPerPage);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // 결제취소
    const handleCancelOk = async (row) => {
        const { t_idx, paymentKey, cancelReason } = row;
        try {
            const response = await axios.post(
                `http://localhost:8090/payments/cancel`,
                {
                    t_idx,
                    paymentKey,
                    cancelReason,
                    a_id: authStore.adminInfo.a_id
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Basic ${encodedKey}`
                    },
                }
            );
            
            if (response.status === 200) {
                alert("결제 취소가 성공적으로 처리되었습니다.");
                fetchData();
            } else {
                alert("결제 취소에 실패하였습니다.");
                console.error('Failed to confirm payment:', response.statusText);
            }
        } catch (error) {
            console.error('결제 취소 중 오류가 발생하였습니다.', error);
        }
    };

    return (
        <TableContainer sx={{ width: 1190 }} className='tablewrap'>
            <h1>결제관리</h1>
            <Table sx={{ minWidth: 600 }}>
                <TableHead sx={{ borderBottom: '3px solid blue' }}>
                    <TableRow>
                        <TableCell sx={{ width: '0px', textAlign: 'center' }}>No</TableCell>
                        <TableCell sx={{ width: '10px', textAlign: 'center' }}>사용자</TableCell>
                        <TableCell sx={{ width: '80px', textAlign: 'center' }}>결제상품</TableCell>
                        <TableCell sx={{ width: '40px', textAlign: 'center' }}>결제금액</TableCell>
                        <TableCell sx={{ width: '70px', textAlign: 'center' }}>결제수단</TableCell>
                        <TableCell sx={{ width: '40px', textAlign: 'center' }}>결제일자</TableCell>
                        <TableCell sx={{ width: '40px', textAlign: 'center' }}>취소일자</TableCell>
                        <TableCell sx={{ width: '60px', textAlign: 'center' }}>취소사유</TableCell>
                        <TableCell sx={{ width: '50px', textAlign: 'center' }}>처리상태</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {displayedRows.map((row, index) => (
                        <TableRow key={row.t_idx}>
                            <TableCell sx={{ width: '0px', textAlign: 'center' }}>{calculateIndex(page, index)}</TableCell>
                            <TableCell sx={{ width: '10px', textAlign: 'center' }}>
                                <p>{row.id}</p>
                            </TableCell>
                            <TableCell sx={{ width: '80px', textAlign: 'center' }}>
                                <p>{row.orderName}</p>
                            </TableCell>
                            <TableCell sx={{ width: '40px', textAlign: 'center' }}>
                                <p>{row.amount.toLocaleString()}</p>
                            </TableCell>
                            <TableCell sx={{ width: '70px', textAlign: 'center' }}>
                                <p>{row.provider}</p>
                            </TableCell>
                            <TableCell sx={{ width: '40px', textAlign: 'center' }}>
                                <p>{row.approvedAt}</p>
                            </TableCell>
                            <TableCell sx={{ width: '40px', textAlign: 'center' }}>
                                <p>{row.canceledAt}</p>
                            </TableCell>
                            <TableCell sx={{ width: '60px', textAlign: 'center' }}>
                                <p>{row.cancelReason}</p>
                            </TableCell>
                            <TableCell sx={{ width: '50px', textAlign: 'center' }}>
                            {row.payStatus === "취소중" ? (
                                <button onClick={() => handleCancelOk(row)}>처리</button>
                            ) : row.payStatus === "취소완료" ? (
                                '처리완료'
                            ) : null}
                            </TableCell>
                        </TableRow>
                    ))}
                    {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={12} />
                        </TableRow>
                    )}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={12} align="center" sx={{ border: 0 }}>
                            <Pagination
                                count={pageCount} 
                                page={page} 
                                color="primary"
                                onChange={handleChangePage} 
                                size="large" 
                                className='inqpagination'
                                sx={{ justifyContent: 'center' }}
                            />
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    );
});

export default Paylist;
