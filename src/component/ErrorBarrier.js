import {connect} from "react-redux";
import {
    Dialog,
    Divider,
    DialogContent,
    DialogContentText,
    DialogTitle,
    makeStyles,
    DialogActions,
    Button
} from "@material-ui/core";
import React from "react";
import {createCoupon, DISMISS_ERROR} from "../actions";

const useStyles = makeStyles(theme => ({
    divider: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
    iconRight: {
        marginLeft: theme.spacing(1),
    }
}));

function ErrorBarrier(props) {
    const classes = useStyles();

    return (
        <Dialog open={props.errorMessage !== null}>
            <DialogTitle>Failed to fetch a coupon</DialogTitle>
            <DialogContent>
                <DialogContentText>An error occurred while attempting to fetch a coupon for you. The backend might be
                    down.
                </DialogContentText>
                <Divider className={classes.divider}/>
                <DialogContentText><code>Error: {props.errorMessage}</code></DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => props.dispatch(createCoupon())} aria-label={"retry"}
                        className={classes.button}>Retry</Button>
                <Button onClick={() => props.dispatch(DISMISS_ERROR())} aria-label={"close"} className={classes.button}
                        color={"primary"}>Close</Button>
            </DialogActions>
        </Dialog>
    );
}

export default connect(state => ({errorMessage: state.errorMessage}))(ErrorBarrier);