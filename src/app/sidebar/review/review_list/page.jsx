import Nav from "@/app/nav/page";
import ReviewList from "@/app/reviewList/page";
import { Grid } from "@mui/material";



export default function review_List() {
    return (
        <>
            <div className="innerwrap">
                <h1>면접후기 게시판</h1>

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