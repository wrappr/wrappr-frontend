import {connect} from "react-redux";
import React from "react";
import copy from "clipboard-copy";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    makeStyles,
    TextField, Tooltip
} from "@material-ui/core";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
    dialog: {
        padding: theme.spacing(4),
    }
}));

function CopyDialog(props) {
    const classes = useStyles();

    const [openTooltip, setTooltip] = React.useState(false);

    const handleClick = () => {
        copy(props.coupon.code);
        setTooltip(true);
    };

    return (
        <Dialog className={classes.dialog} open={props.open} onClose={props.handleCopyClickToggle}
                aria-labelledby={"copy-dialog"}>
            <DialogTitle>Copy coupon code</DialogTitle>
            <DialogContent>
                <DialogContentText>Click copy to copy the coupon code to your clipboard.</DialogContentText>
                <TextField autoFocus fullWidth label={"Code"} value={props.coupon.code}
                           inputProps={{
                               readOnly: true
                           }}/>
            </DialogContent>
            <DialogActions>
                <Tooltip placement={"left"} title={"Copied code to clipboard!"} open={openTooltip}>
                    <Button onClick={handleClick} color={"primary"}>Copy</Button>
                </Tooltip>
            </DialogActions>
        </Dialog>
    );
}

export default connect()(CopyDialog);