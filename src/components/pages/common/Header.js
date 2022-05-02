import * as React from 'react';
import { alpha, useTheme } from '@mui/material/styles';
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
import { Search, SearchIconWrapper, StyledInputBase, LogoTypography } from '../../CustomStyles';
import ConnectionModal from '../../modals/ConnectionModal';
import { useWeb3React } from '@web3-react/core';

export default function Header(props) {
    const { active, account, deactivate } = useWeb3React();
    const theme = useTheme();
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };
    const [open, setOpen] = React.useState(false);

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
            <MenuItem>
                <CustomButton variant="contained" onClick={() => active ? deactivate() : ConnectModal()}>{active ? account.substring(0, 4) + "..." + account.substring(account.length - 4) : "Connect Wallet"}</CustomButton>
            </MenuItem>
        </Menu>
    );

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="fixed" sx={{ boxShadow: theme.palette.mode === 'dark' ? '0px 1px 0px #343742' : '0px 1px 0px rgba(0, 0, 0, 0.1)', background: alpha(theme.palette.primary.main, 1), minHeight: '64px', justifyContent: 'center' }}>
                    <Toolbar>
                        <Box>
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
                                        <Box sx={{ ml: 4 }}>
                                            <MenuItem>
                                                states
                                            </MenuItem>
                                        </Box>
                                        <Box sx={{ ml: 4 }}>
                                            <MenuItem>
                                                staking
                                            </MenuItem>
                                        </Box>
                                        <Box sx={{ ml: 4 }}>
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
                            <MenuItem onClick={props.onClickTheme} sx={{ pl: 0, }}>
                                {theme.palette.mode === 'dark' ? <LightModeOutlinedIcon sx={{ fontSize: 32 }} /> : <DarkModeOutlinedIcon sx={{ fontSize: 32 }} />}
                            </MenuItem>
                        </Box>
                        <Box sx={{ flexGrow: 1 }} />

                        <Box sx={{ display: { lg: 'flex', xs: 'none' } }}>
                            <MenuItem sx={{ pl: 0 }}>
                                <CustomButton variant="contained" onClick={() => active ? deactivate() : ConnectModal()}>{active ? account.substring(0, 4) + "..." + account.substring(account.length - 4) : "Connect Wallet"} </CustomButton>
                            </MenuItem>
                        </Box>
                        <Box sx={{ display: 'flex' }}>
                            <MenuItem sx={{ padding: 0 }}>
                                <Badge badgeContent={1} color="error">
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
            </Box>

            <ConnectionModal open={open && !active} onClose={handleClose}></ConnectionModal>
        </>
    );
}
