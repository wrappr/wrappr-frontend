import React from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import RecordVoiceOverIcon from "@material-ui/icons/RecordVoiceOver";
import {makeStyles} from "@material-ui/core";
import {startStream} from "../actions";

const useStyles = makeStyles(theme => ({
    input: {
        display: "none"
    },
    button: {
        margin: theme.spacing(2)
    }
}));

const saySomething = () => {
    alert("Test");
};

export default function SettingsView() {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Typography variant={"h2"}>Settings</Typography>
            <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                onClick={saySomething}
            ><RecordVoiceOverIcon>Say something nice</RecordVoiceOverIcon></Button>
        </div>
    );
}