'use client';

import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TableRow from '@mui/material/TableRow';
import Pagination from '@mui/material/Pagination';
import { Button, Table, TableHead } from '@mui/material';
import { MenuContext } from '@/stores/StoreContext';
import { observer } from 'mobx-react-lite';
import authStore from '@/stores/AuthStore';
import './inquiry.css';

const Paylist = observer(() => {
    const menuStore = useContext(MenuContext);
    const [page, setPage] = useState(1); 
    const [rowsPerPage] = useState(5); 
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState(null);
    const secretKey = process.env.NEXT_PUBLIC_TOSS_SECRET_KEY;
    const encodedKey = btoa(secretKey + ':');

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://192.168.0.53:8090/payments/payList`);
            const data = response.data;
            console.log(data);
            menuStore.setPayList(data);
            
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
    const handleCancelOk = async (modalData) => {
        const { t_idx, paymentKey, cancelReason } = modalData;
        try {
            const response = await axios.post(
                `http://192.168.0.53:8090/payments/cancel`,
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
                setShowModal(false);
            } else {
                alert("결제 취소에 실패하였습니다.");
                console.error('Failed to confirm payment:', response.statusText);
            }
        } catch (error) {
            console.error('결제 취소 중 오류가 발생하였습니다.', error);
        }
    };

    const openModal = (t_idx) => {
        const rowData = menuStore.payList.find((item) => item.t_idx === t_idx);
        if (rowData) {
            setModalData(rowData);
            setShowModal(true);
        }
    };

    const closeModal = () => {
        setShowModal(false);
        setModalData(null);
    };


    return (
        <>
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
                        <TableCell sx={{ width: '70px', textAlign: 'center' }}>결제취소</TableCell>
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
                            <TableCell sx={{ width: '70px', textAlign: 'center', padding: '0px' }}>
                                {row.payStatus === "취소중" ? (
                                    <Button onClick={() => openModal(row.t_idx)} variant="contained">취소요청</Button>
                                ) : row.payStatus === "취소완료" ? (
                                    <Button onClick={() => openModal(row.t_idx)} variant="outlined">처리상세</Button>
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
        
        {showModal && modalData && (
            <div className="modal">
                <div className="modal-content">
                    <h1>결제 취소 상세내역</h1>
                    <table>
                        <tbody>
                            <tr>
                                <th>취소사유</th>
                                <td>{modalData.cancelReason}</td>
                            </tr>
                            <tr>
                                <th>취소일자</th>
                                <td>{modalData.canceledAt}</td>
                            </tr>
                            <tr>
                                <th>처리관리자</th>
                                <td>{modalData.a_id}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div>
                        <Button onClick={closeModal} variant="outlined" >닫기</Button>
                        {modalData.payStatus === "취소중" && (
                            <Button onClick={() => handleCancelOk(modalData)} variant="contained" >처리</Button>
                        )}
                    </div>
                </div>
            </div>
        )}
    </>    
    );
});

export default Paylist;
