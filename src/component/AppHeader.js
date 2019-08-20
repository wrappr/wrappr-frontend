import React, {useState} from "react";
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
import {CssBaseline} from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import Badge from "@material-ui/core/Badge";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {createCoupon} from "../actions";
import LinearProgress from "@material-ui/core/LinearProgress";
import Paper from "@material-ui/core/Paper";
import Fade from "@material-ui/core/Fade";

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
        width: 300,
        flexShrink: 0,
    },
    title: {
        marginLeft: "auto",
    }
}));

function AppHeader(props) {
    const classes = useStyles();

    const [state, setState] = useState({drawerState: false});

    const handleChange = () => setState({drawerState: !state.drawerState});


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
            <Drawer open={state.drawerState}
                    onClose={() => setState({drawerState: false})}>
                <nav className={classes.drawer} onClick={handleChange}>
                    <List>
                        <ListItem button key="Home" component={Link} to="/">
                            <ListItemIcon><HomeIcon/></ListItemIcon>
                            <ListItemText primary="Home"/>
                        </ListItem>
                    </List>
                    <Divider/>
                    <List>
                        <ListItem button key="History" component={Link} to="/history">
                            <ListItemIcon>
                                <Badge badgeContent={props.historyCount}
                                       color="primary"><HistoryIcon/></Badge>
                            </ListItemIcon>
                            <ListItemText primary="History"/>
                        </ListItem>
                    </List>
                </nav>
            </Drawer>
            <Fade in={props.fetching}>
                <LinearProgress hidden={!props.fetching}/>
            </Fade>
        </div>
    );
}

const mapStateToProps = state => ({historyCount: state.history.length, fetching: state.fetching});

export default connect(mapStateToProps)(AppHeader);