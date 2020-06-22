import React, {useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Link from '@material-ui/core/Link';
import { Link as RouterLink , useHistory } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import {removeAuthTokens} from '../helpers/authHelpers'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    link: {
        marginRight: "40px",
    }
}));

export default function MenuAppBar() {
    const classes = useStyles();
    const { currentUser, setCurrentUser } = useContext(UserContext)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const history = useHistory();


    const logOut = () => {
        removeAuthTokens();
        setCurrentUser(null);
        history.push('/login')
    }

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h4" className={classes.title}>
                        <Link component={RouterLink} to="/" variant="inherit" underline="none" color="inherit" className={classes.link}>
                            MyNews
                        </Link>
                        <Link component={RouterLink} to="/sources" variant="h6" underline="none" color="inherit">
                            Sources
                        </Link>
                    </Typography>
                    <div>
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <AccountCircle />
                            <Typography variant="button" display="block">
                                {currentUser?.fullName}
                             </Typography>
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            // anchorOrigin={{
                            //     vertical: 'bottom',
                            //     horizontal: 'center',
                            // }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                            }}
                            open={open}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={logOut}>LogOut</MenuItem>
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}
