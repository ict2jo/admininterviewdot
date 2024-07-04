// Nav 컴포넌트
'use client';

import authStore from "@/stores/AuthStore";
import { List, ListItemButton, ListItemText } from "@mui/material";
import { observer } from 'mobx-react-lite';
import { useEffect } from "react";

const Nav = ({ handleMenuClick }) => {
    useEffect(() => {
        authStore.loadUserFromServer();
    }, []);

    const { a_id } = authStore.adminInfo;

    return (
        <div className="navcss">
        <List>
        <ListItemButton sx={{paddingLeft: 5}} onClick={() => handleMenuClick("dashboard")}>
            <ListItemText primary="대시보드" />
        </ListItemButton>
        <ListItemButton sx={{paddingLeft: 5}} onClick={() => handleMenuClick("adminlist")}>
            <ListItemText primary="관리자 게시판" />
        </ListItemButton>
        <ListItemButton sx={{paddingLeft: 5}} onClick={() => handleMenuClick("paylist")}>
            <ListItemText primary="결제관리" />
        </ListItemButton>
        <ListItemButton sx={{paddingLeft: 5}} onClick={() => handleMenuClick("reportlist")}>
            <ListItemText primary="신고 게시판" />
        </ListItemButton>
        <ListItemButton sx={{paddingLeft: 5}} onClick={() => handleMenuClick("inquirylist")}>
            <ListItemText primary="1:1문의 게시판" />
        </ListItemButton>
        <ListItemButton sx={{paddingLeft: 5}} onClick={() => handleMenuClick("reviewList")}>
            <ListItemText primary="면접 후기게시판" />
        </ListItemButton>
        <ListItemButton sx={{paddingLeft: 5}} onClick={() => handleMenuClick("successlist")}>
            <ListItemText primary="합격자 후기 게시판" />
        </ListItemButton>
        </List>
        </div>
    );
    }

export default observer(Nav);
