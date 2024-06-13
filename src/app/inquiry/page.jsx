import { Grid } from "@mui/material";
import Nav from "../nav/page";

export default function Inquiry() {
    return(
        <>
        <div className="innerwrap">
        <h1>1:1문의 관리</h1>
        <div className="whiteboard">
            <Grid container>
                <Grid item xs={2}>
                    <div className="grayboard">
                        <Nav />
                    </div>
                </Grid>
                <Grid item xs={10}>
                    <div className="maintext">
                        <h4>여기 가져가서 만드세용</h4>
                    </div>
                </Grid>
            </Grid>
        </div>
        </div>
        </>
    )
    
}