import React from "react";
import QRCode from "qrcode.react";
import {Typography, Grid, makeStyles} from "@material-ui/core";
import CouponDownload from "./CouponActions";
import Divider from "@material-ui/core/Divider";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";


const useStyles = makeStyles(theme => ({
    divider: {
        marginTop: theme.spacing(6),
        marginBottom: theme.spacing(3),
    },
    chip: {
        marginTop: theme.spacing(4),
    },
    dateChip: {
        marginBottom: theme.spacing(4),
    }
}));

export default function Coupon(props) {
    const classes = useStyles();
    return (
        <div>
            <Grid container justify={"center"}>
                <Grid>
                    <Grid className={classes.dateChip} justify={"center"} container spacing={4}>
                        <Chip className={classes.chip}
                              label={new Date(Number.parseInt(props.coupon.valid_until * 1000)).toDateString()}
                              variant={"outlined"} color={"inherit"}/>
                    </Grid>
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
}
