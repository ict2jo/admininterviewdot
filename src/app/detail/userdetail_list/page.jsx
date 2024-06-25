import Nav from "@/app/nav/page";
import UserListDetail from "@/app/userlistdetail/page";
import { Grid } from "@mui/material";

export default function UserDetail_List() {
    return (
        <>
            <div className="innerwrap">

                <div className="whiteboard">
                    <Grid container>
                        <Grid item xs={2}>
                            <div className="grayboard">
                                <Nav />
                            </div>
                        </Grid>
                        <Grid item xs={10}>
                            <div className="maintext">
                                <UserListDetail />
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </>
    )
}