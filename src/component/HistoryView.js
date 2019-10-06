import React from "react";
import {Container, makeStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(theme => ({
    input: {
        display: "none"
    },
    button: {
        margin: theme.spacing(2)
    }
}));

export default function HistoryView() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Typography variant={"h2"}>History</Typography>
            <Grid container direction={"row"} justify={"center"} alignItems={"center"}>
            </Grid>
        </div>
    );
}