import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import CustomButton from './components/CustomButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import SearchIcon from '@mui/icons-material/Search';
import MoreIcon from '@mui/icons-material/MoreVert';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import { useTheme } from '@mui/material/styles';
import Divider from '@mui/material/Divider/Divider';
// import logo from './assets/images/logo.png';



const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.primary.search, 1),
    '&:hover': {
        backgroundColor: alpha(theme.palette.primary.search,1),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    color: alpha(theme.palette.primary.searchIcon, 1),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '25ch',
        },
    },
}));

export default function Header(props) {
    const theme = useTheme();
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

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
            <MenuItem sx={{ display: { xs: 'block', sm: 'block', md: 'none', lg: 'none' } }}>
                <Search >
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search..."
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </Search>
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
                <CustomButton variant="contained">Connect Wallet</CustomButton>
            </MenuItem>
        </Menu>
    );



    return (

        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'block', sm: 'block', md: 'block', lg: 'block' }, marginLeft: theme.spacing(3) }}
                        className="headerlogo"
                    >
                        logo
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <Search sx={{ display: { xs: 'none', sm: 'none', md: 'flex', lg: 'flex' } }}>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search items, collections and profiles "
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>

                    <Box sx={{ display: { xs: 'none', sm: 'none', md: 'none', lg: 'flex' }, color: alpha(theme.palette.primary.dark) }} className="menulist">
                        <Box sx={{ ml: 5 }}>
                            <MenuItem>
                                discover
                            </MenuItem>
                        </Box>
                        <Box sx={{ ml: 5 }}>
                            <MenuItem>
                                states
                            </MenuItem>
                        </Box>
                        <Box sx={{ ml: 5 }}>
                            <MenuItem>
                                staking
                            </MenuItem>
                        </Box>
                        <Box sx={{ ml: 5 }}>
                            <MenuItem>
                                sell
                            </MenuItem>
                        </Box>
                    </Box>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'flex', sm: 'flex', md: 'flex', lg: 'flex' } }}>
                        <MenuItem onClick={props.onClickTheme}>
                            {theme.palette.mode === 'dark' ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />}
                        </MenuItem>
                    </Box>
                    <Box sx={{ display: { xs: 'none', sm: 'none', md: 'none', lg: 'flex' } }}>
                        <MenuItem>
                            <CustomButton variant="contained">Connect Wallet</CustomButton>
                        </MenuItem>
                    </Box>
                    <Box sx={{ display: { xs: 'flex', sm: 'flex', md: 'flex', lg: 'flex' } }}>
                        <MenuItem>
                            <Badge badgeContent={1} color="error">
                                <ShoppingCartOutlinedIcon />
                            </Badge>
                        </MenuItem>
                    </Box>
                    <Box sx={{ display: { xs: 'flex', sm: 'flex', md: 'flex', lg: 'none' } }}>
                        <MenuItem
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </MenuItem>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
        </Box>
    );
}
