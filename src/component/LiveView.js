import React from "react";
import Webcam from "react-webcam";
import {Container, makeStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import {connect, mapStateToProps} from "react-redux";
import {pushImage, startStream} from "../actions";
import Fab from '@material-ui/core/Fab';
import DoneIcon from '@material-ui/icons/Done';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import {duration} from "moment";
import CameraIcon from "@material-ui/icons/Camera";

const useStyles = makeStyles(theme => ({
    input: {
        display: "none"
    },
    button: {
        margin: theme.spacing(2)
    },
    grey: {
        backgroundColor: 'rgba(80, 80, 80, 0.8)',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0

    },
    wrapper: {
        display: 'inline-block',
        position: 'relative'
    },
    centered: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        color: 'white'
    },
    ButtonSubmit: {
        margin: '0px',
        top: 'auto',
        right: '20px',
        bottom: '20px',
        left: 'auto',
        position: 'fixed'
    }
}));


function LiveView(props) {

    const classes = useStyles();

    const videoConstraints = {
        width: 640,
        height: 360,
        facingMode: "environment"
    };


    const webcamRef = React.useRef(null);
    const capture = React.useCallback(
        () => {
            const imageSrc = webcamRef.current.getScreenshot();
            props.dispatch(pushImage(imageSrc));
        },
        [webcamRef]
    );

    const handleClick = () => {
        if (!props.streaming)
            props.dispatch(startStream());
    };

    return (
        <div className={classes.root}>
            <Fab color="primary" aria-label="push" className={classes.ButtonSubmit} onClick={capture}>
                <CameraIcon />
            </Fab>
            <Grid container direction={"row"} justify={"center"} alignItems={"center"}>
                <Box boxShadow={3}>
                    <div className={classes.wrapper} onClick={handleClick}>
                        <Fade in={!props.streaming} timeout={1500}>
                            <div className={classes.grey}>
                                <Typography variant={"h2"} align={'center'} className={classes.centered}>Touch to start!</Typography>
                            </div>
                        </Fade>
                        <Webcam
                            audio={false}
                            height='100%'
                            weight='100%'
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            videoConstraints={videoConstraints}
                        />
                    </div>
                </Box>
            </Grid>
        </div>
    );
};

export default connect(state => ({streaming: state.streaming}))(LiveView);