"use client"

import { Grid } from "@mui/material";

import Nav from "@/app/nav/page";
import DashBordList from "@/app/dashbordlist/page";

export default function DashBord() {
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
                                <DashBordList />
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </>
    )

}