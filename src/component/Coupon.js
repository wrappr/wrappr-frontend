import React from "react";
import QRCode from "qrcode.react";
import {Grid, makeStyles} from "@material-ui/core";
import CouponDownload from "./CouponActions";
import Divider from "@material-ui/core/Divider";
import Chip from "@material-ui/core/Chip";
import moment from "moment";

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
    },
    qr: {
        height: 272,
        width: 272,
        padding: 16,
        borderRadius: 4,
        background: "#fff",
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
                              label={moment.unix(props.coupon.valid_until).format("ddd, DD MMMM hh:mm")}
                              variant={"outlined"} color={"secondary"}/>
                    </Grid>
                    <QRCode className={classes.qr} value={props.coupon.code} size={256}/>
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
