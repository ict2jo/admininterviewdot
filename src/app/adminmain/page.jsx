// AdminMain 컴포넌트
'use client';

import { useContext, useEffect, useState } from "react";
import Nav from "../nav/page";
import Inquiry from "../inquiry/page";
import { Grid } from "@mui/material";
import { MenuContext } from "@/stores/StoreContext";
import SuccessList from "../review/successlist/page";
import AdminList from "../adminlist/page";
import Reportlist from "../reportlist/page";
//import ReviewList from "../review/reviewlist/page";

export default function AdminMain() {
    const menuStore = useContext(MenuContext);
    const [selectedMenu, setSelectedMenu] = useState(() => {
        const savedMenu = localStorage.getItem("selectedMenu");
        return savedMenu || "userlist"; // 기본 값으로 "userlist"를 설정
    });

    useEffect(() => {
        const savedMenu = localStorage.getItem("selectedMenu");
        if (savedMenu) {
            setSelectedMenu(savedMenu);
            menuStore.setSelectedMenu(savedMenu); // Update MenuContext if needed
        }
    }, [menuStore]);
    
      // 선택된 메뉴가 변경될 때마다 로컬 스토리지에 저장
      useEffect(() => {
        localStorage.setItem("selectedMenu", menuStore.selectedMenu);
      }, [menuStore.selectedMenu]);

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
           // case "reviewList":
            //    return <ReviewList />;
            case "successlist":
                return <SuccessList />;
            case "reportlist":
                return <Reportlist />;
            case "inquirylist":
                return <Inquiry />;
            case "adminlist":
                return <AdminList />;
            default:
                return <Inquiry />;
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
