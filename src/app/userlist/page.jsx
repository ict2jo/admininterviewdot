'use client';

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
import { observer } from 'mobx-react-lite';

const Userlist = observer(() => {
    const menuStore = useContext(MenuContext);
    const [page, setPage] = useState(1); // Current page state
    const [rowsPerPage] = useState(5); // Rows per page (fixed)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/report/userlist');
                console.log(response.data);
                menuStore.setUserList(response.data);
            } catch (error) {
                alert("데이터를 가져오는 데 실패했습니다.");
                console.error("데이터를 가져오는 중 오류가 발생했습니다:", error);
            }
        };
        fetchData();
    }, [menuStore]);

    const calculateIndex = (pageIndex, rowIndex) => {
        return (pageIndex - 1) * rowsPerPage + rowIndex + 1;
    };

    // Pagination logic
    const rows = menuStore.userList || []; 
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - (page - 1) * rowsPerPage);
    const displayedRows = rows.slice((page - 1) * rowsPerPage, (page - 1) * rowsPerPage + rowsPerPage);
    const pageCount = Math.ceil(rows.length / rowsPerPage); // Total pages

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleMenuClick = (menu) => {
        menuStore.setSelectedMenu(menu);
        localStorage.setItem("selectedMenu", menu);
    };
    const handlestopClick = async (u_idx) => {
        const response = await axios.post('/report/userdelete', null, {
            params: { u_idx }
        }).then(response => {
            console.log("사용자 정지 요청이 성공했습니다.", response.data);
            alert("사용자 정지 완료했습니다.");
            location.reload();
            })
            .catch(error => {
            console.error("사용자 정지 요청 중 오류가 발생했습니다.", error);
            });
        }
const handleliveClick = async (u_idx) => {
        const response1 = await axios.post('/report/userlive', null, {
            params: { u_idx }
        }).then(response1 => {
            console.log("사용자 복구 성공했습니다.", response1.data);
            alert("사용자 복구 완료했습니다.");
            //location.reload();
            })
            .catch(error => {
            console.error("사용자 복구 요청 중 오류가 발생했습니다.", error);
            });
        }
    return (
        <TableContainer sx={{ width: 1000 }} className='tablewrap'>
            <h1>유저목록</h1>
            <Table sx={{ minWidth: 600 }}>
                <TableHead sx={{ borderBottom: '3px solid blue' }}>
                    <TableRow>
                        <TableCell sx={{ width: '50px', textAlign: 'center' }}>No</TableCell>
                        <TableCell sx={{ width: '100px', textAlign: 'center' }}>이름</TableCell>
                        <TableCell sx={{ width: '100px', textAlign: 'center' }}>id</TableCell>
                        <TableCell sx={{ width: '100px', textAlign: 'center' }}>가입방법</TableCell>
                        <TableCell sx={{ width: '200px', textAlign: 'center' }}>회원정지</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {displayedRows.map((row, index) => (
                        <TableRow key={row.u_idx} onClick={() => handleMenuClick(`userdetail/${row.u_idx}`)}>
                            <TableCell sx={{ width: '50px', textAlign: 'center' }}>{calculateIndex(page, index)}</TableCell>
                            <TableCell sx={{ width: '100px', textAlign: 'center' }}>
                                <p>{row.name}</p>
                            </TableCell>
                            <TableCell sx={{ width: '100px', textAlign: 'center' }}>
                                <p>{row.id}</p>
                            </TableCell>
                            <TableCell sx={{ width: '100px', textAlign: 'center' }}>
                                <p>{row.provider}</p>
                            </TableCell>
                            <TableCell sx={{ width: '200px', textAlign: 'center' }}>
                            {row.active === '0' ? (
                                <Button variant='contained' onClick={() => handlestopClick(row.u_idx)}>회원정지</Button>
                                ) : (
                                <Button variant='outlined' onClick={() => handleliveClick(row.u_idx)}>회원복구</Button>
                                )}

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
                                count={pageCount} // Total pages
                                page={page} // Current page index (1-based)
                                color="primary"
                                onChange={handleChangePage} // Page change handler
                                size="large" // Pagination size
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

export default Userlist;
