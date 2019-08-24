import React, {useEffect, useState} from "react";
import {makeStyles} from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HistoryIcon from "@material-ui/icons/History"
import HomeIcon from "@material-ui/icons/Home";
import Divider from "@material-ui/core/Divider";
import {CssBaseline, FormControlLabel, Switch} from "@material-ui/core";
import Badge from "@material-ui/core/Badge";
import {connect} from "react-redux";
import {AUTH_ERROR, authSuccess, createCoupon, SWITCH_THEME} from "../actions";
import LinearProgress from "@material-ui/core/LinearProgress";
import Fade from "@material-ui/core/Fade";
import {SwipeableDrawer} from "@material-ui/core";
import firebase from "../firebase";
import AuthBarrier from "./AuthBarrier";
import {Link} from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    button: {
        marginLeft: "auto",
    },
    list: {
        width: 200,
    },
    fullList: {
        width: 'auto',
    },
    drawer: {
        width: 200,
        flexShrink: 0,
    },
    title: {
        marginLeft: "auto",
    },
    bottom: {
        anchor: "bottom"
    },
    avatarPaper: {
        padding: theme.spacing(2),
        width: "100%",
    }
}));

function AppHeader(props) {
    const classes = useStyles();

    const [state, setState] = useState({drawerState: false});

    const handleChange = () => setState({drawerState: !state.drawerState});

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => firebase.auth().onAuthStateChanged(user => user ? props.dispatch(authSuccess(user)) : props.dispatch(AUTH_ERROR(user))), []);

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <AppBar position="static">
                <Toolbar>
                    <IconButton onClick={handleChange} edge="start" className={classes.menuButton} color="inherit"
                                aria-label="menu">
                        <Icon>menu</Icon>
                    </IconButton>

                    <Icon className={classes.title}>local_drink</Icon>

                    <IconButton onClick={() => props.dispatch(createCoupon())} color="inherit"
                                className={classes.button}
                                aria-label="Get a new QR Code">
                        <Icon>refresh</Icon>
                    </IconButton>
                </Toolbar>
            </AppBar>

            <AuthBarrier/>

            <SwipeableDrawer open={state.drawerState}
                             onClose={() => setState({drawerState: false})} onOpen={handleChange}>
                <nav className={classes.drawer} onClick={handleChange}>
                    <List>
                        <ListItem button key="Home" component={Link} to="/">
                            <ListItemIcon><HomeIcon/></ListItemIcon>
                            <ListItemText primary="Home"/>
                        </ListItem>
                        <ListItem button key="History" component={Link} to="/history">
                            <ListItemIcon>
                                <Badge badgeContent={props.historyCount}
                                       color="primary"><HistoryIcon/></Badge>
                            </ListItemIcon>
                            <ListItemText primary="History"/>
                        </ListItem>
                    </List>
                    <Divider/>
                    <List>
                        <ListItem button key={"Dark"}>
                            <FormControlLabel onChange={() => props.dispatch(SWITCH_THEME())} color={"primary"} checked={props.darkMode}  control={<Switch/>} label={"Dark mode"}/>
                        </ListItem>
                    </List>
                    <Divider/>
                    <List>
                        <Tooltip title={"Logout"} aria-label={"logout"} placement={"right"}>
                            <ListItem button key={"Logout"} component={Link} to={"/logout"} className={classes.bottom}>
                                <ListItemIcon>
                                    <Avatar alt={props.user.displayName} src={props.user.photoURL}/>
                                </ListItemIcon>
                                <ListItemText primary={props.user.displayName}/>
                            </ListItem>
                        </Tooltip>
                    </List>
                    <Divider/>
                </nav>
            </SwipeableDrawer>
            <Fade in={props.fetching}>
                <LinearProgress hidden={!props.fetching}/>
            </Fade>
        </div>
    );
}

const mapStateToProps = state => ({darkMode: state.darkMode, historyCount: state.history.length, fetching: state.fetching, user: state.user});

export default connect(mapStateToProps)(AppHeader);