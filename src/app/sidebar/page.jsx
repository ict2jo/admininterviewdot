"use client"

import { MenuContext } from "@/stores/StoreContext";
import { AccountCircle } from "@mui/icons-material";
import { Box, Drawer, List, ListItemButton, ListItemIcon, Toolbar } from "@mui/material";
import axios from "axios";
import { Observer } from "mobx-react-lite";
import { useContext } from "react";


const drawerWidth = 240;

function Sidebar() {
    const menuStore = useContext(MenuContext)

    const handleMenuClick = async (menu) => {
        menuStore.setSelectedMenu(menu)

        if(menu === "reviewList"){
            try {
                const response = await axios.get("/review/reviewList",{
                    headers : {
                        Authorization: `Bearer ${menuStore.token}`
                    }
                });
                menuStore.setReviewList(response.data)
            } catch (error) {
                alert("실패")                
            }
        }else if(menu === "successlist"){
            try {
                const response = await axios.get("/review/successlist",{
                    headers: {
                        Authorization: `Bearer ${menuStore.token}`
                    }
                });
                menuStore.setSuccessList(response.data)
            } catch (error) {
                alert("실패")
            }
       
        }else if(menu === "userlist"){
            try {
                const response = await axios.get("/user/userlist",{
                    headers: {
                        Authorization: `Bearer ${menuStore.token}`
                    }
                });
                menuStore.setUserList(response.data)
            } catch (error) {
                alert("실패")
            }
        }else if(menu === "querylist"){
            try {
                const response = await axios.get("/query/querylist", {
                    headers: {
                        Authorization: `Bearer ${menuStore.token}`
                    }
                });
                menuStore.setQueryList(response.data)
            } catch (error) {
                alert("실패")
            }
        }else if(menu === "adminlist"){
            try {
                const response = await axios.get("/admin/adminlist",{
                    headers: {
                        Authorization: `Bearer ${menuStore.token}`
                    }
                });
                menuStore.setAdminList(response.data)
            } catch (error) {
                alert("실패")
            }
        }
        
    }

    const drawer = (
        <div>
            <Toolbar />
            <List>
                <ListItemButton onClick={() => handleMenuClick("reviewList")}>
                    <ListItemIcon><AccountCircle /></ListItemIcon>
                </ListItemButton>   
                <ListItemButton onClick={() => handleMenuClick("successlist")}>
                    <ListItemIcon><AccountCircle /></ListItemIcon>
                </ListItemButton>   
                <ListItemButton onClick={() => handleMenuClick("userlist")}>
                    <ListItemIcon><AccountCircle /></ListItemIcon>
                </ListItemButton>   
                <ListItemButton onClick={() => handleMenuClick("querylist")}>
                    <ListItemIcon><AccountCircle /></ListItemIcon>
                </ListItemButton>   
                <ListItemButton onClick={() => handleMenuClick("adminlist")}>
                    <ListItemIcon><AccountCircle /></ListItemIcon>
                </ListItemButton>   
            </List>    
        </div>
    )

    return(
        <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders">
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', sm: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
                open
            >
            {drawer}
        </Drawer>
    </Box>
    )
}

export default Observer(Sidebar);