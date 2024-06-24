import Nav from "@/app/nav/page";
import SuccessList from "@/app/successlist/page";
import { Grid } from "@mui/material";

export default function Success_List() {
    return(
        <>
        <div className="innerwrap">
        <h1>합격자 후기 게시판</h1>
        
        <div className="whiteboard">
            <Grid container>
                <Grid item xs={2}>
                    <div className="grayboard">
                        <Nav />
                    </div>
                </Grid>
                <Grid item xs={10}>
                    <div className="maintext">
                        <SuccessList />
                    </div>
                </Grid>
            </Grid>
        </div>
        </div>
        </>
    );
}