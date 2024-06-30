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
        <ListItemButton sx={{paddingLeft: 5}} onClick={() => handleMenuClick("reviewList")}>
            <ListItemText primary="reviewList" />
        </ListItemButton>
        <ListItemButton sx={{paddingLeft: 5}} onClick={() => handleMenuClick("successlist")}>
            <ListItemText primary="successlist" />
        </ListItemButton>
        <ListItemButton sx={{paddingLeft: 5}} onClick={() => handleMenuClick("reportlist")}>
            <ListItemText primary="reportlist" />
        </ListItemButton>
        <ListItemButton sx={{paddingLeft: 5}} onClick={() => handleMenuClick("inquirylist")}>
            <ListItemText primary="inquirylist" />
        </ListItemButton>
        <ListItemButton sx={{paddingLeft: 5}} onClick={() => handleMenuClick("adminlist")}>
            <ListItemText primary="adminlist" />
        </ListItemButton>
        </List>
        </div>
    );
    }

export default observer(Nav);
