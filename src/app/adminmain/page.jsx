// AdminMain 컴포넌트
'use client';

import { useContext, useEffect, useState } from "react";
import ReviewList from "../reviewlist/page";
import SuccessList from "../successlist/page";
import UserList from "../userlist/page";
import Nav from "../nav/page";
import QueryList from "../querylist/page";
import AdminList from "../adminlist/page";
import Inquiry from "../inquiry/page";
import { Grid } from "@mui/material";
import { MenuContext } from "@/stores/StoreContext";

export default function AdminMain() {
    const menuStore = useContext(MenuContext);
    const [selectedMenu, setSelectedMenu] = useState(() => localStorage.getItem("selectedMenu") || "userlist");

    useEffect(() => {
        // localStorage에 저장된 selectedMenu가 있으면 menuStore에 반영
        if (localStorage.getItem("selectedMenu")) {
            menuStore.setSelectedMenu(localStorage.getItem("selectedMenu"));
        } else {
            // localStorage에 selectedMenu가 없으면 초기화
            localStorage.setItem("selectedMenu", menuStore.selectedMenu);
        }
    }, [menuStore]);

    const handleMenuClick = (menu) => {
        // 클릭한 메뉴로 selectedMenu 업데이트
        setSelectedMenu(menu);
        // localStorage에도 저장
        localStorage.setItem("selectedMenu", menu);
        // menuStore에 반영
        menuStore.setSelectedMenu(menu);
    };

    const renderContent = () => {
        switch (selectedMenu) {
            case "reviewList":
                return <ReviewList />;
            case "successlist":
                return <SuccessList />;
            case "userlist":
                return <UserList />;
            case "querylist":
                return <QueryList />;
            case "adminlist":
                return <AdminList />;
            default:
                return <QueryList />;
        }
    };

    return (
        <div className="innerwrap">
            <div className="whiteboard">
                <Grid container>
                    <Grid item xs={2}>
                        <div className="grayboard">
                            <Nav handleMenuClick={handleMenuClick} />
                        </div>
                    </Grid>
                    <Grid item xs={10}>
                        <div className="maintext">
                            {renderContent()}
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}
