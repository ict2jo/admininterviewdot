// Nav 컴포넌트
'use client';

import { MenuContext } from "@/stores/StoreContext";
import { List, ListItemButton, ListItemText, Typography } from "@mui/material";
import { observer } from 'mobx-react-lite';
import { useContext } from "react";

const Nav = ({handleMenuClick}) => {
    const menuStore = useContext(MenuContext); 
    return (
        <List>
            <ListItemButton onClick={() => handleMenuClick("reviewList")}>
                <ListItemText>reviewList</ListItemText>
            </ListItemButton>
            <ListItemButton onClick={() => handleMenuClick("successlist")}>
                <ListItemText>successlist</ListItemText>
            </ListItemButton>
            <ListItemButton onClick={() => handleMenuClick("reportlist")}>
                <ListItemText>reportlist</ListItemText>
            </ListItemButton>
            <ListItemButton onClick={() => handleMenuClick("inquirylist")}>
                <ListItemText>inquirylist</ListItemText>
            </ListItemButton>
            <ListItemButton onClick={() => handleMenuClick("adminlist")}>
                <ListItemText>adminlist</ListItemText>
            </ListItemButton>
        </List>
    );
}

export default observer(Nav);
