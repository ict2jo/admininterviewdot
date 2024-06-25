"use client"

import { Avatar, Button, FormControl, Stack, TextField } from "@mui/material";
import { green } from "@mui/material/colors";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import authStore from "@/stores/AuthStore";

export default function AdminLogin() {

    const [admin, setAdmin] = useState({
        a_id: '',
        a_pwd: ''
    });

    const router = useRouter();

    useEffect(() => {
        authStore.loadToken();
        if(authStore.isAuthenticated){ 
            router.push("/adminmain");
        } 
    }, [router, authStore]);

    async function handleLogin(e) {
        try {
            // console.log(admin.a_id)
            // console.log(admin.a_pwd)

            // const response = await axios.post('/api/adminlogin',{a_id: admin.a_id, a_pwd: admin.a_pwd});    
                 
            // console.log("몰르겠다")
            // // token 을 로컬 스토리지에 저장
            // if(response.data.token){
            //     authStore.setToken(response.data.token)
            //     // 성공 후 메인 페이지로 리다이렉트
                router.push("/adminmain");
            // }
        } catch (error) {
            alert("로그인 실패")
            setAdmin({
                a_id: "",
                a_pwd: ""
            })
        }
    }
    function changeAdminLoginInfo(e) {
        setAdmin({
            ...admin,
            [e.target.name]: e.target.value
        })
    }
    return (
        <>
            <div className="homewrap" style={{ width: '80%', margin: '100px auto', paddingTop: '20px', textAlign: 'center'}}>
                <FormControl className="homesub">
                    <Stack direction="column" spacing={1} alignItems='center'>
                        <Avatar sx={{ bgcolor: green[500], marginBottom: '20px' }} />
                        <TextField type='text' label='ID' name='a_id' fullWidth value={admin.a_id} autoComplete="off" onChange={changeAdminLoginInfo}/>
                        <TextField type='password' label='PW' name='a_pwd' fullWidth value={admin.a_pwd} autoComplete="off"  onChange={changeAdminLoginInfo}/>
                        <Button fullWidth variant='contained' onClick={handleLogin}>로그인</Button>
                    </Stack>
                </FormControl>

                
            </div>
        </>
    );
}

