import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Fab from "@material-ui/core/Fab";
import {connect} from "react-redux";
import DoneIcon from "@material-ui/icons/Done";
import {makeStyles} from "@material-ui/core";
import {deleteCoupon} from "../actions";

const useStyles = makeStyles(theme => ({
}));

function CouponDownload(props) {
    const classes = useStyles();

    const options = ['Download PDF', 'Visit original URL', 'Add to Wallet', "Share via WhatsApp"];

    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const [selectedIndex, setSelectedIndex] = React.useState(3);

    function handleMenuItemClick(event, index) {
        setSelectedIndex(index);
        setOpen(false);
    }

    function handleToggle() {
        setOpen(prevOpen => !prevOpen);
    }

    function handleClose(event) {
        // noinspection JSUnresolvedFunction
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    }

    function handleURL() {
        switch (selectedIndex) {
            case 0:
                return props.coupon.pdf;
            case 1:
                return props.coupon.url;
            case 2:
                return props.coupon.wallet;
            case 3:
                return encodeURI("whatsapp://send?text=Enjoy+your+free+coke+:)+" + props.coupon.code);
            default:
                return props.coupon.pdf;
        }
    }

    return (
        <Grid container alignItems={"center"}>
            <Grid item xs={9}>
                <ButtonGroup variant="contained" color="primary" ref={anchorRef} aria-label="split button">
                    <Button href={handleURL()}>{options[selectedIndex]}</Button>
                    <Button
                        color="primary"
                        size="small"
                        aria-owns={open ? 'menu-list-grow' : undefined}
                        aria-haspopup="true"
                        onClick={handleToggle}
                    >
                        <ArrowDropDownIcon/>
                    </Button>
                </ButtonGroup>
                <Popper open={open} anchorEl={anchorRef.current} transition disablePortal>
                    {({TransitionProps, placement}) => (
                        <Grow
                            {...TransitionProps}
                            style={{
                                transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                            }}
                        >
                            <Paper id="menu-list-grow">
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList>
                                        {options.map((option, index) => (
                                            <MenuItem
                                                key={option}
                                                selected={index === selectedIndex}
                                                onClick={event => handleMenuItemClick(event, index)}
                                            >
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </Grid>
            <Grid item xs={1}/>
            <Grid xs={2} item align={"right"}>
                <Fab className={classes.fab} size={"medium"} color={"default"}
                     onClick={() => props.dispatch(deleteCoupon(props.coupon))}><DoneIcon/></Fab>
            </Grid>
        </Grid>
    );
}

export default connect()(CouponDownload)