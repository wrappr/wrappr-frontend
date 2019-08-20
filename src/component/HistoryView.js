import React from "react";
import {connect} from "react-redux";
import Grid from "@material-ui/core/Grid";
import {makeStyles, Typography} from "@material-ui/core";
import Coupon from "./Coupon";
import Paper from "@material-ui/core/Paper";
import Fab from "@material-ui/core/Fab";
import ClearIcon from "@material-ui/icons/ClearAll";
import {CLEAR_HISTORY} from "../actions";

const useStyles = makeStyles(theme => ({
    paper: {
        margin: theme.spacing(2),
        padding: theme.spacing(4),
    },
    empty: {marginTop: theme.spacing(6)},
    fab: {
        position: "fixed",
        bottom: theme.spacing(4),
        right: theme.spacing(4),
    },
}));

function HistoryView(props) {
    const classes = useStyles();


    return (
        <div className={classes.root}>
            <Grid container spacing={6} justify={"center"}>
                {props.history.length === 0 ?
                    <Paper className={classes.paper}><Grid container justify={"center"}><Typography variant={"body1"}>Hit the refresh button to
                        fetch a new
                        coupon.</Typography></Grid></Paper> : null}
                {props.history.map(item =>
                    <Paper key={item.code} className={classes.paper}><Coupon coupon={item}/></Paper>
                )}
            </Grid>
            <Fab aria-label={"Clear history"} className={classes.fab} color={"primary"}
                 onClick={props.CLEAR_HISTORY}><ClearIcon/></Fab>
        </div>
    );
}

export default connect(state => ({history: state.history}), {CLEAR_HISTORY})(HistoryView);