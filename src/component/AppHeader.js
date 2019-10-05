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
import SettingsIcon from "@material-ui/icons/Settings"
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import VideoCamIcon from "@material-ui/icons/Videocam";
import Divider from "@material-ui/core/Divider";
import {CssBaseline, FormControlLabel, Switch} from "@material-ui/core";
import Badge from "@material-ui/core/Badge";
import {connect} from "react-redux";
import {AUTH_ERROR, authSuccess, switchTheme, syncSettings} from "../actions";
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
        marginRight: "auto",
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => props.dispatch(syncSettings()), []);

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <AppBar position="static">
                <Toolbar>
                    <IconButton onClick={handleChange} edge="start" className={classes.menuButton} color="inherit"
                                aria-label="menu">
                        <Icon>menu</Icon>
                    </IconButton>

                    <Icon className={classes.title}>eco</Icon>
                </Toolbar>
            </AppBar>

            <AuthBarrier/>

            <SwipeableDrawer open={state.drawerState}
                             onClose={() => setState({drawerState: false})} onOpen={handleChange}>
                <nav className={classes.drawer} onClick={handleChange}>
                    <List>
                        <ListItem button key="Scan" component={Link} to="/">
                            <ListItemIcon><PhotoCameraIcon/></ListItemIcon>
                            <ListItemText primary="Scan"/>
                        </ListItem>
                        <ListItem button key="Live" component={Link} to="/live">
                            <ListItemIcon><VideoCamIcon/></ListItemIcon>
                            <ListItemText primary="Live"/>
                        </ListItem>
                        <ListItem button key="Settings" component={Link} to="/settings">
                            <ListItemIcon>
                                <Badge badgeContent={props.historyCount}
                                       color="primary"><SettingsIcon/></Badge>
                            </ListItemIcon>
                            <ListItemText primary="Settings"/>
                        </ListItem>
                    </List>
                    <Divider/>
                    <List>
                        <ListItem button key={"Dark"}>
                            <FormControlLabel control={
                                <Switch
                                    checked={props.darkMode || false}
                                    onChange={() => props.dispatch(switchTheme())}
                                    value="Dark mode"
                                    color={"primary"}/>
                            } label={"Dark mode"}/>
                        </ListItem>
                    </List>
                    <Divider/>
                    <List>
                        <Tooltip title={"Logout"} aria-label={"logout"} placement={"right"}>
                            <ListItem button key={"Logout"} component={Link} to={"/logout"} className={classes.bottom}>
                                <ListItemIcon>
                                    <Badge badgeContent={props.statisticsCount}>
                                        <Avatar alt={props.user.displayName} src={props.user.photoURL}/>
                                    </Badge>
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

const mapStateToProps = state => ({darkMode: state.darkMode, user: state.user});

export default connect(mapStateToProps)(AppHeader);