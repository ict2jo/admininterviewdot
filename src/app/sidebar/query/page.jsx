import { Grid } from "@mui/material";

import Nav from "@/app/nav/page";
import QueryList from "@/app/querylist/page";

export default function Query() {
    return(
        <>
        <div className="innerwrap">
        <h1>1:1 문의</h1>
        
        <div className="whiteboard">
            <Grid container>
                <Grid item xs={2}>
                    <div className="grayboard">
                        <Nav />
                    </div>
                </Grid>
                <Grid item xs={10}>
                    <div className="maintext">
                        <QueryList/>
                    </div>
                </Grid>
            </Grid>
        </div>
        </div>
        </>
    )
    
}