
import Nav from "@/app/nav/page";
import ReviewSuccessDetail from "@/app/reviewsuccessdetail/page";
import { Grid } from "@mui/material";

export default function Success_Detail() {
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
                                <ReviewSuccessDetail />
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </>
    )
}