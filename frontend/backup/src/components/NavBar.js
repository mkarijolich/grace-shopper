import React, { Fragment } from 'react';
import { AppBar, Button, Toolbar, Typography, Link} from '@mui/material';



const NavBar = ({ user, handleLogout, products, orders }) => {

    const navigate = useNavigate();

    return (
        <Container theme={theme}>
            <Fragment>
                <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
                <CssBaseline />
                <AppBar
                    position="static"
                    color="default"
                    elevation={0}
                    sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
                >
                    <Toolbar sx={{ flexWrap: 'wrap' }}>
                        <Typography variant="h4" color="#006D77" noWrap sx={{ flexGrow: 1 }}>
                        Grace Shopper
                        </Typography>
                        
                        {Object.keys(user).length > 0 ?//logged in
                            <nav>
                                <Link
                                    href='/'
                                    variant="button"
                                    color="text.primary"
                                    sx={{ my: 1, mx: 1.5}}
                                >
                                    Home
                                </Link>
                                <Link
                                    href='/products'
                                    variant="button"
                                    color="text.primary"
                                    sx={{ }}
                                >
                                    Products
                                </Link>
                                
                                <Link
                                    href='/myaccount'
                                    variant="button"
                                    color="text.primary"
                                    sx={{ my: 1, mx: 1.5 }}
                                >
                                    MyAccount
                                </Link>
                            
                                <Button
                                    variant="outlined"
                                    sx={{ my: 1, mx: 1.5 }}
                                    onClick={() => {
                                        handleLogout()
                                        navigate("/")
                                    }}>
                                    Logout
                                </Button>
                            </nav>

                            :
                            <nav>
                                <Link
                                    href='/'
                                    variant="button"
                                    color="text.primary"
                                    sx={{ my: 1, mx: 1.5 }}
                                >
                                    Home
                                </Link>
                                <Link
                                    href='/products'
                                    variant="button"
                                    color="text.primary"
                                    sx={{ my: 1, mx: 1.5 }}
                                >
                                    products
                                </Link>
                                

                                <HashLink to="/#signin">
                                    <Button
                                        variant="outlined"
                                        sx={{ my: 1, mx: 1.5 }}>
                                        Sign In
                                    </Button>
                                </HashLink>

                                <HashLink to="/#signin">
                                    <Button
                                        variant="outlined"
                                        sx={{ my: 1, mx: 1.5 }}>
                                        Register
                                    </Button>
                                </HashLink>
         
           
                            </nav>
                        }
                    </Toolbar>
                </AppBar>
            </Fragment>
        </Container>
    );

}

export default NavBar;