"use client"
import { Grid } from "@mui/material";

import UserList from "@/app/userlist/page";
import Nav from "@/app/nav/page";

export default function User() {
    return(
        <>
        <div className="innerwrap">
        <h1>유저 관리</h1>
        
        <div className="whiteboard">
            <Grid container>
                <Grid item xs={2}>
                    <div className="grayboard">
                        <Nav />
                    </div>
                </Grid>
                <Grid item xs={10}>
                    <div className="maintext">
                        <UserList />
                    </div>
                </Grid>
            </Grid>
        </div>
        </div>
        </>
    )
    
}