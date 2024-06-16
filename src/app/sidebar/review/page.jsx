import { Grid } from "@mui/material";

import Nav from "@/app/nav/page";
import ReviewList from "@/app/reviewlist/page";

export default function Review() {
    return(
        <>
        <div className="innerwrap">
        <h1>면접 후기 게시판</h1>
        
        <div className="whiteboard">
            <Grid container>
                <Grid item xs={2}>
                    <div className="grayboard">
                        <Nav />
                    </div>
                </Grid>
                <Grid item xs={10}>
                    <div className="maintext">
                        <ReviewList />
                    </div>
                </Grid>
            </Grid>
        </div>
        </div>
        </>
    )
    
}