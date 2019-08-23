import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Coupon from "./Coupon";
import {connect} from "react-redux";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(theme => ({
    progress: {
        marginLeft: "50%",
        marginTop: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(3),
    },
    root: {}
}));

function GenerateView(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {typeof props.coupon !== "undefined" && typeof props.coupon.code !== "undefined" ?
                <Paper className={classes.paper}>
                    <Coupon coupon={props.coupon}/>
                </Paper>
                : <Grid container justify={"center"}><Typography variant={"body1"}>Hit the refresh button to fetch a new
                    coupon.</Typography></Grid>}
        </div>
    );
}


// redux
export default connect(state => ({
    coupon: state.history.slice(-1)[0],
    fetching: state.fetching,
    errorMessage: state.errorMessage,
}))(GenerateView);