'use client';

import authStore from "@/stores/AuthStore";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Header = () => {
    const router = useRouter();
        useEffect(() => {
        authStore.loadUserFromServer();
    }, []);
    const token = localStorage.getItem("token");
    const { a_name } = authStore.adminInfo;
    function handleLogout() {
        authStore.logout();
        router.push("/");
    };
    return (
        <div class="header">
            <h3 className="logo">인터뷰닷</h3>
            {token ? (
                <>
                <h3 className="center">{a_name}님 환영합니다</h3>
                <h3 className="logout" onClick={handleLogout}>로그아웃</h3>
                </>
            ) : (
                null // Render nothing if token is false or undefined
            )}
        </div>
    );
    }

export default observer(Header);
