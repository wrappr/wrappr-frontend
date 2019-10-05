import React from "react";
import Webcam from "react-webcam";
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


export default function LiveView() {

    const classes = useStyles();

    const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: "environment"
    };

    const webcamRef = React.useRef(null);
    const capture = React.useCallback(
        () => {
            const imageSrc = webcamRef.current.getScreenshot();
        },
        [webcamRef]
    );

    const WebcamCapture = () => {


    };
    return (
        <div className={classes.root}>
            <Typography variant={"h2"}>Live</Typography>
            <Grid container direction={"row"} justify={"center"} alignItems={"center"}>
                <Webcam
                    audio={false}
                    height='100%'
                    width='100%'
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    videoConstraints={videoConstraints}
                />
                <Button onClick={capture} variant="contained" size={"large"} component="span" className={classes.button}>
                    Send Photo
                </Button>
            </Grid>
        </div>
    );
}