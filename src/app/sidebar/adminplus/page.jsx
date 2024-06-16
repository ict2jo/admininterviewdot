import { Grid } from "@mui/material";

import UserList from "@/app/userlist/page";
import Nav from "@/app/nav/page";
import AdminList from "@/app/adminlist/page";

export default function AdminPlus() {
    return(
        <>
        <div className="innerwrap">
        <h1>관리자 생성</h1>
        
        <div className="whiteboard">
            <Grid container>
                <Grid item xs={2}>
                    <div className="grayboard">
                        <Nav />
                    </div>
                </Grid>
                <Grid item xs={10}>
                    <div className="maintext">
                        <AdminList />
                    </div>
                </Grid>
            </Grid>
        </div>
        </div>
        </>
    )
    
}