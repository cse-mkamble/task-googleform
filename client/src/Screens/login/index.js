import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core';
import {
    AppBar,
    Button,
    CssBaseline,
    Grid,
    Toolbar,
    Typography,
    Avatar
} from '@mui/material';
import ViewListRoundedIcon from '@mui/icons-material/ViewListRounded';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import GoogleButton from 'react-google-button';

import authAction from '../../Redux/actions/authAction';

const CLIENT_ID = '798003545648-sd4asfja34bs1jsionjgoju776lki3pk.apps.googleusercontent.com';

const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(1),
    },
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default function Login(props) {
    const classes = useStyles();
    let history = useHistory();
    const [isLogined, setIsLogined] = useState(false);
    const { from } = props.location.state || { from: { pathname: '/' } }

    useEffect(() => {
        setIsLogined(authAction.isAuthenticated())
    }, []);

    const loginGoogle = (response) => {
        console.log(response);
        authAction.loginWithGoogle(response)
            .then(() => {
                console.log(from.pathname);

                if (from.pathname == "/login") {
                    history.push("/");
                } else {
                    history.push(from.pathname);
                }
            },
                error => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();
                    console.log(resMessage);
                }
            );
    }

    const loginAsGuest = () => {
        authAction.loginAsGuest()
        history.push(from.pathname);
    }


    const handleLoginFailure = (response) => {
        console.log('Failed to log in');
    }

    const handleLogoutFailure = (response) => {
        console.log('Failed to log out');
    }

    const logout = (response) => {
        authAction.logout();
        setIsLogined(false);
    }

    return (<div>
        <CssBaseline />
        <div style={{ display: 'flex', flexGrow: 1, textAlign: 'start' }}>
            <AppBar position="relative" color="inherit">
                <Toolbar>
                    <ViewListRoundedIcon className={classes.icon} onClick={() => { history.push('/') }} />
                    <Typography variant="h6" color="inherit" noWrap className={classes.title}>Forms</Typography>
                </Toolbar>
            </AppBar>
        </div>
        <br></br>
        <main>
            <Typography component="h1" variant="h5" textAlign="center" >Login</Typography>
            <br></br>
            <br></br>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                {isLogined ?
                    "" :
                    <GoogleLogin
                        clientId={CLIENT_ID}
                        render={renderProps => (
                            <GoogleButton onClick={renderProps.onClick} disabled={renderProps.disabled} style={{ textAlign: 'center', alignSelf: 'center' }} />
                        )}
                        buttonText='Login'
                        onSuccess={loginGoogle}
                        onFailure={handleLoginFailure}
                        cookiePolicy={'single_host_origin'}
                        responseType='code,token'
                    />
                }
                <br></br>
                <br></br>
                <div style={{ textAlign: 'center' }} >
                    {isLogined ? (<div>
                        <p>Already logged in. Want to logout?</p>
                        <button onClick={logout}>Logout </button>
                    </div>) : (<Button
                        onClick={loginAsGuest}
                        variant="contained"
                        style={{ textTransform: "none" }}
                        startIcon={<Avatar src={"https://static.thenounproject.com/png/3244607-200.png"} />} >
                        Login as Guest(Anonymous)
                    </Button>
                    )}
                </div>
                <br></br>
                <br></br>
            </div>
        </main>
    </div>);
}