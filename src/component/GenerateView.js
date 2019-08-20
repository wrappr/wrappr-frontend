import React, {useEffect} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Paper from "@material-ui/core/Paper";
import Coupon from "./Coupon";
import {connect} from "react-redux";
import {createCoupon} from "../actions";
import Fade from "@material-ui/core/Fade";

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
            <Paper className={classes.paper}>
                <Coupon coupon={props.coupon}/>
            </Paper>
            <Fade in={props.fetching}>
                <CircularProgress className={classes.progress} hidden={!props.fetching}/>
            </Fade>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        coupon: state.history[state.history.length - 1],
        fetching: state.fetching,
        errorMessage: state.errorMessage,
    };
};

// redux
export default connect(mapStateToProps)(GenerateView);