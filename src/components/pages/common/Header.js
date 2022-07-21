import * as React from 'react';
import { alpha, useTheme, styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import SearchIcon from '@mui/icons-material/Search';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import Divider from '@mui/material/Divider/Divider';
import CustomButton from '../../CustomButton';
import { Search, SearchIconWrapper, StyledInputBase, LogoTypography, Connected } from '../../CustomStyles';
import ConnectionModal from '../../modals/ConnectionModal';
import { useWeb3React } from '@web3-react/core';
import { Button, CssBaseline, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, useMediaQuery } from '@mui/material';
import card_img from '../../../assets/images/cart_image.svg'
import close from '../../../assets/images/close.svg'
import vector from '../../../assets/images/vector.svg'
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import eth from '../../../assets/images/eth.svg';
import { useNavigate } from 'react-router-dom';
import CartItems from '../../cart/CartItems';
import CartDrawer from '../../cart/CartDrawer';
import { useSelector } from 'react-redux';


const drawerWidth = 300;
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginRight: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginRight: '0px',
        }),
    }),
);

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export default function Header(props) {
    const CartData = (useSelector((state) => state.Index.cartdata))
    const navigate = useNavigate();
    const profile = () => {

        navigate(`/profile`);

    }
    const { active, account, deactivate } = useWeb3React();
    const theme = useTheme();
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const [usdprice, setusdPrice] = React.useState(1);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const ethToUsd = async () => {
        try {
            const usdPrice = await fetch(
                `https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd`,
            );
            const currentUsdPrice = (await usdPrice.json());
            // console.log(currentUsdPrice.ethereum.usd);
            await setusdPrice(currentUsdPrice.ethereum.usd)
        } catch (error) {
            console.log(error)
        }
    }
    React.useEffect(() => {
        setInterval(ethToUsd, 20000)
    }, []);

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const [topdrawerwidth, setTopDrawerwidth] = React.useState(300);

    const [open, setOpen] = React.useState(false);

    const [cartopen, setCartOpen] = React.useState(false);
    React.useEffect(() => {
        (CartData.length > 0) && handleDrawerOpen();
    }, [CartData])

    const [cartvariant, setCartVariant] = React.useState({
        view: 'persistent', width: '', direction: 'right'
    });

    const isMobile = useMediaQuery(theme.breakpoints.between('xs', 'md'));
    React.useEffect(() => {
        setCartVariant({ view: 'persistent', width: isMobile ? 0 : 300, direction: isMobile ? 'bottom' : 'right' })
        setTopDrawerwidth(isMobile ? '100%' : 300);
        props.setcartWidth(0);
    }, [isMobile])

    const handleDrawerOpen = () => {
        setCartOpen(true);
        !isMobile && props.setcartWidth(300);
    };
    const handleDrawerClose = () => {
        setCartOpen(false);
        props.setcartWidth(0);
    };

    const ConnectModal = () => setOpen(true);
    const handleClose = () => setOpen(false);
    React.useEffect(() => {
        if (active) {
            setOpen(false);
        }
        // console.log(open, active)
    }, [active])



    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
            className="menulist"
        >
            <MenuItem onClick={props.onClickTheme} sx={{ display: { sm: 'block', md: 'none' } }}>
                {theme.palette.mode === 'dark' ? <LightModeOutlinedIcon sx={{ fontSize: 32 }} /> : <DarkModeOutlinedIcon sx={{ fontSize: 32 }} />}
            </MenuItem>
            <MenuItem>
                discover
            </MenuItem>
            <Divider />
            <MenuItem>
                states
            </MenuItem>
            <Divider />
            <MenuItem>
                staking
            </MenuItem>
            <Divider />
            <MenuItem>
                sell
            </MenuItem>
            <Divider />
            <MenuItem onClick={() => !active && ConnectModal()}>
                {active ? <Connected > </Connected> :
                    <CustomButton sx={{ whiteSpace: 'nowrap' }} variant="contained">Connect Wallet </CustomButton>
                }
            </MenuItem>
        </Menu>
    );

    return (
        <>
            <Box sx={{ flexGrow: 1, mb: '5px' }}>
                <CssBaseline />
                <Box sx={{ boxShadow: `1px 0px 0px  ${theme.palette.primary.borderDrawer}`, background: alpha(theme.palette.primary.main, 1), display: { xs: 'none', sm: 'none', md: 'flex', lg: 'flex' } }}>
                    {/* <DoubleArrowOutlinedIcon
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        sx={{ m: 2, ...(open && { display: 'none' }) }}
                    >
                        <MenuIcon />
                    </DoubleArrowOutlinedIcon> */}
                </Box>
                <AppBar position="fixed" sx={{ boxShadow: theme.palette.mode === 'dark' ? '0px 1px 0px #343742' : '0px 1px 0px rgba(0, 0, 0, 0.1)', background: alpha(theme.palette.primary.main, 1), minHeight: '64px', justifyContent: 'center' }}>
                    <Toolbar>
                        <Box onClick={() => navigate(`/`)}>
                            <LogoTypography />
                        </Box>
                        <Box sx={{ flexGrow: 1 }} />
                        <Container>
                            <Grid container
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-around', alignItems: 'center', position: 'relative',
                                }}>
                                <Grid item lg={4.5} >
                                    <Search sx={{ display: 'flex' }}>
                                        <SearchIconWrapper>
                                            <SearchIcon />
                                        </SearchIconWrapper>
                                        <StyledInputBase
                                            placeholder="Search items, collections and profiles "
                                            inputProps={{ 'aria-label': 'search' }}
                                            sx={{ width: '50vw' }}
                                        />
                                    </Search>
                                </Grid>
                                <Grid item >
                                    <Box sx={{ display: { lg: 'flex', xs: 'none' }, color: alpha(theme.palette.primary.dark) }} className="menulist">
                                        <Box>
                                            <MenuItem>
                                                discover
                                            </MenuItem>
                                        </Box>
                                        <Box sx={{ ml: 3.8 }}>
                                            <MenuItem>
                                                states
                                            </MenuItem>
                                        </Box>
                                        <Box sx={{ ml: 3.8 }}>
                                            <MenuItem>
                                                staking
                                            </MenuItem>
                                        </Box>
                                        <Box sx={{ ml: 3.8 }}>
                                            <MenuItem>
                                                sell
                                            </MenuItem>
                                        </Box>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Container>
                        <Box sx={{ flexGrow: 1 }} />
                        <Box sx={{ display: { xs: 'none', md: 'flex', lg: 'flex' } }}>
                            <Box onClick={props.onClickTheme} sx={{
                                pl: 0, '&:hover,&:focus': {
                                    backgroundColor: alpha(theme.palette.primary.main, 1),
                                }, display: 'flex', alignItems: 'center', pr: 2
                            }}>
                                {theme.palette.mode === 'dark' ? <LightModeOutlinedIcon sx={{ fontSize: 32, cursor: 'pointer' }} /> : <DarkModeOutlinedIcon sx={{ fontSize: 32, cursor: 'pointer' }} />}
                            </Box>
                        </Box>
                        <Box sx={{ flexGrow: 1 }} />

                        <Box sx={{ display: { lg: 'flex', xs: 'none' } }}>
                            <Box sx={{
                                pl: 0,
                                cursor: 'pointer',
                                pr: 2,
                                '&:hover': { backgroundColor: 'none' },
                            }} onClick={() => !active && ConnectModal()}>
                                {active ? <Connected > </Connected> :
                                    <CustomButton sx={{ whiteSpace: 'nowrap' }} variant="contained">Connect Wallet </CustomButton>
                                }
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex' }}>
                            <MenuItem sx={{ padding: 0, }} onClick={!cartopen ? handleDrawerOpen : handleDrawerClose}>
                                <Badge badgeContent={CartData.length} color="error">
                                    <ShoppingCartOutlinedIcon sx={{ fontSize: 32 }} />
                                </Badge>
                            </MenuItem>
                        </Box>
                        <Box sx={{ display: { xs: 'flex', lg: 'none' } }}>
                            <MenuItem
                                size="large"
                                aria-label="show more"
                                aria-controls={mobileMenuId}
                                aria-haspopup="true"
                                onClick={handleMobileMenuOpen}
                                color="inherit"
                            >
                                <MenuIcon fontSize="large" />
                            </MenuItem>
                        </Box>
                    </Toolbar>
                </AppBar>
                {renderMobileMenu}
                <ConnectionModal open={open && !active} onClose={handleClose}></ConnectionModal>
                <CartDrawer usdprice={usdprice} topdrawerwidth={topdrawerwidth} cartvariant={cartvariant} cartopen={cartopen} ConnectModal={ConnectModal}></CartDrawer>
            </Box>

        </>
    );
}
