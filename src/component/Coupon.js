import React from "react";
import QRCode from "qrcode.react";
import {Typography, Grid, makeStyles} from "@material-ui/core";
import CouponDownload from "./CouponDownload";
import Divider from "@material-ui/core/Divider";
import Chip from "@material-ui/core/Chip";


const useStyles = makeStyles(theme => ({
    divider: {
        marginTop: theme.spacing(6),
        marginBottom: theme.spacing(3),
    },
    chip: {
        marginTop: theme.spacing(4),
    }
}));

export default function Coupon(props) {

    const classes = useStyles();
    if (props.coupon) {
        return (
            <div>
                <Grid container justify={"center"}>
                    <Grid>
                        <QRCode value={props.coupon.code} size={256}/>
                        <Grid justify={"center"} container spacing={4}>
                            <Chip className={classes.chip} label={props.coupon.code} color={"primary"}/>
                        </Grid>
                    </Grid>
                </Grid>
                <Divider variant={"middle"} className={classes.divider}/>
                <CouponDownload coupon={props.coupon}/>
            </div>
        );
    } else {
        return (
            <Grid container justify={"center"}><Typography variant={"body1"}>Hit the refresh button to fetch a new
                coupon.</Typography></Grid>
        );
    }
}
