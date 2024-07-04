'use client';

import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import Nav from "../nav/page";
import Inquiry from "../inquiry/page";
import { Grid } from "@mui/material";
import SuccessList from "../review/successlist/page";
import AdminList from "../adminlist/page";
import Reportlist from "../reportlist/page";
import { useRouter } from "next/navigation";
import authStore from "@/stores/AuthStore";
import Inquirydetail from "../inquiry/inquirydetail/[id]/page";
import Reportdetail from "../reportdetail/[id]/page";
import menuStore from "@/stores/MenuStore";
import Adminedit from "../adminlist/adminedit/[id]/page";
import AdminCreate from "../adminlist/admincreate/page";
import Paylist from "../adminPaylist/page";
import Dashboard from "../dashboard/page";
import ReviewList from "../review/reviewList/page";

function AdminMain() {
    const router = useRouter();

    useEffect(() => {
        if (!authStore.isAuthenticated) {
            router.push("/");
        }
        console.log("a_id", authStore.adminInfo.a_id);
        console.log("authStore.adminInfo", authStore.adminInfo);
    }, [router]);

    const handleMenuClick = (menu) => {
        menuStore.setSelectedMenu(menu);
    };
    useEffect(() => {
        // menuStore.selectedMenu가 변경될 때마다 호출되도록 설정
        const renderContent = () => {
            // renderContent 함수 내용
        };
        renderContent();
    }, [menuStore.selectedMenu]); // menuStore.selectedMenu를 의존성 배열에 추가

    const renderContent = () => {
        if (menuStore.selectedMenu.startsWith(`adminedit/`)) {
            const a_idx = menuStore.selectedMenu.split('/')[1];
            console.log(a_idx);
            return <Adminedit a_idx={a_idx} />;
        }
        if (menuStore.selectedMenu.startsWith(`reportdetail/`)) {
            const rep_idx = menuStore.selectedMenu.split('/')[1];
            console.log(rep_idx);
            return <Reportdetail rep_idx={rep_idx} />;
        }
        if (menuStore.selectedMenu.startsWith(`inquirydetail/`)) {
            const i_idx = menuStore.selectedMenu.split('/')[1];
            console.log(i_idx);
            return <Inquirydetail i_idx={i_idx} />;
        }
        if (menuStore.selectedMenu.startsWith(`reviewList/`)) {
            const r_idx = menuStore.selectedMenu.split('/')[1];
            console.log(r_idx);
            return <ReviewList r_idx={r_idx} />;
        }
        switch (menuStore.selectedMenu) {
            case "successlist":
                return <SuccessList />;
            case "reviewlist":
                return <ReviewList />;
            case "reportlist":
                return <Reportlist />;
            case "inquirylist":
                return <Inquiry />;
            case "adminlist":
                return <AdminList />;
            case "admincreate":
                return <AdminCreate />;
            case "paylist":
                return <Paylist />;
            case "dashboard":
                return <Dashboard />;
                default:
                return <Dashboard />;
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
export default observer(AdminMain);