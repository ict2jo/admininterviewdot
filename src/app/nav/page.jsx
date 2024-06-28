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
        <List>
        <ListItemButton onClick={() => handleMenuClick("reviewList")}>
            <ListItemText primary="reviewList" />
        </ListItemButton>
        <ListItemButton onClick={() => handleMenuClick("successlist")}>
            <ListItemText primary="successlist" />
        </ListItemButton>
        <ListItemButton onClick={() => handleMenuClick("reportlist")}>
            <ListItemText primary="reportlist" />
        </ListItemButton>
        <ListItemButton onClick={() => handleMenuClick("inquirylist")}>
            <ListItemText primary="inquirylist" />
        </ListItemButton>
        <ListItemButton onClick={() => handleMenuClick("adminlist")}>
            <ListItemText primary="adminlist" />
        </ListItemButton>
        <ListItemButton onClick={() => handleMenuClick("adminlist")}>
            <ListItemText primary={a_id} />
        </ListItemButton>
        </List>
    );
    }

export default observer(Nav);
