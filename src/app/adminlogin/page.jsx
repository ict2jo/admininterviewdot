"use client"

import authStore from "@/stores/AuthStore";
import { Avatar, Button, FormControl, Stack, TextField } from "@mui/material";
import { green } from "@mui/material/colors";
import axios from "axios";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/navigation";
import {  useEffect, useState } from "react";

const Login = observer(() => {
    const API_URL = "/api/login"
    const [avo, setAvo] = useState({
        a_id : '',
        a_pwd : ''
    });

    const router = useRouter();

    useEffect(() => {
        console.log("a_id",authStore.a_id);
        console.log("isAuthenticated",authStore.isAuthenticated);
        console.log("token",authStore.token);
        
        authStore.loadToken();
        if (authStore.isAuthenticated) {
            router.push("/adminmain");
            console.log("authStore.isAuthenticated없나")
        }else{
            // 로그인 성공 후 개인정보 가지고 서버로 다시 가기
            console.log("authStore.isAuthenticated있나")
            const urlParams = new URLSearchParams(window.location.search)
            const token = urlParams.get('token')
            if(token){
                authStore.setToken(token);
                // 개인정보를 받기 위해서 
                axios.get('/api/userInfo', {params:{token}})
                console.log("토큰있니?",token)
                .then(response => {
                    // 개인정보
                    authStore.setAdminInfo(response.data);
                    router.push("/adminmain")
                    console.log(authStore.adminInfo);
                })
                .catch(error => {
                    console.error("error")
                });
            }
        }
    }, [router, authStore]);

    async function login() {
        try {
            const response = await axios.post(API_URL, {
                a_id: avo.a_id,
                a_pwd: avo.a_pwd
            });
    
            console.log("response.data", response.data);
    
            if (response.data.success) {
                const { message, userDetails } = response.data;
    
                if (userDetails.a_status === -1) {
                    alert("정지된 회원입니다.");
                    setAvo({
                        a_id: "",
                        a_pwd: ""
                    });
                } else {
                    const { token } = response.data;
    
                    // 토큰과 사용자 정보를 상태에 저장
                    authStore.setToken(token);
                    authStore.setAdminInfo(userDetails);
    
                    // 성공 후 메인 페이지로 리다이렉트
                    router.push("/adminmain");
                }
            } else {
                alert("로그인 실패: 아이디 또는 비밀번호가 일치하지 않습니다.");
                setAvo({
                    a_id: "",
                    a_pwd: ""
                });
            }
        } catch (error) {
            console.error('로그인 요청 실패:', error);
            alert("로그인 요청 실패: 네트워크 오류 또는 서버 오류가 발생했습니다.");
            setAvo({
                a_id: "",
                a_pwd: ""
            });
        }
    }
    
    function changeAvo(e){
        setAvo({
            ...avo,
            [e.target.name] : e.target.value
        })
    }
    return(
        <div style={{width: '80%', margin: '100px auto', paddingTop: '20px', textAlign: 'center'}}>
            <FormControl>
                <Stack direction="column" spacing={1} alignItems='center'>
                    <Avatar sx={{ bgcolor: green[500], marginBottom:'20px'}} />
                    <TextField type='text' label='id' name='a_id' fullWidth  autoComplete="off" onChange={changeAvo} />
                    <TextField type='password' label='password' name='a_pwd' fullWidth autoComplete="off" onChange={changeAvo} />
                    <Button fullWidth variant='contained' onClick={login} >로그인</Button>
                </Stack>
            </FormControl>
         </div>
    )
});
export default Login ;
