"use client"
import { MenuContext } from "@/stores/StoreContext";
import { Button, Typography } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useContext } from "react";

export default function Nav() {
    const router = useRouter();

    const menuStore = useContext(MenuContext);

    const handleMenuClick = async(menu) => {
        menuStore.setSelectedMenu(menu)

        if(menu === "reviewlist"){
            try {
                const response = await axios.get("/review/reviewlist",{
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

    

    return(
        <>
        <div className="navwrap">
        {/* <Typography className="nav" onClick={handleDashbord}>대쉬 보드</Typography><br /> */}
        <Typography className="nav" onClick={() => handleMenuClick("reviewlist")}>면접 후기 게시판</Typography><br />
        <Typography className="nav" onClick={() => handleMenuClick("successlist")}>합격자 후기 게시판</Typography><br />
        <Typography className="nav" onClick={() => handleMenuClick("userlist")}>유저 관리</Typography><br />
        <Typography className="nav" onClick={() => handleMenuClick("querylist")}>1:1 문의</Typography><br /> 
        <Typography className="nav" onClick={() => handleMenuClick("adminlist")}>관리자 생성</Typography><br />
        </div>
        </>
    );
}