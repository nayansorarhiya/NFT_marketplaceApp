import { Avatar, Box, Divider } from '@mui/material';
import InputBase from '@mui/material/InputBase';
import { styled, alpha, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import logo from '../assets/images/logo.svg';
import eth from '../assets/images/eth.svg';
import profileimage from '../assets/images/profileimage.svg';
// import logo_name from '../assets/images/logo_name.svg';
// import blacklogo_name from '../assets/images/blacklogo_name.svg';
import { Switch } from '@mui/material';
import { useWeb3React } from '@web3-react/core';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import RedeemIcon from '@mui/icons-material/Redeem';
import LogoutIcon from '@mui/icons-material/Logout';
import { BigNumber, ethers } from 'ethers';


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.primary.homeBg, 1),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
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



const Connected = () => {
    const { account, active, deactivate, library } = useWeb3React();
    const [balance, setBalance] = React.useState(BigNumber.from("0"));
    useEffect(() => {
        let getBalance = async () => {
            if (active) {
                setBalance(await library.getBalance(account));
            }
        }
        getBalance();
    }, [active])
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (<>

        <Search onClick={handleClick} aria-expanded={open ? 'true' : undefined} sx={{ display: 'flex', alignItems: 'center', borderRadius: '25px', height: '44px', pr: 1.5, border: '1px solid rgba(145, 147, 155, 0.3)' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', ml: 0.25 }}>
                <Avatar src={profileimage}></Avatar>
                <Box sx={{ ml: 1 }}>{account.substring(0, 6) + "..." + account.substring(account.length - 4)}</Box>
            </Box>
        </Search>
        <Menu
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            id="primary-search-account-menu-mobile"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
        >
            <MenuItem sx={{
                width: '200px', display: 'block', fontSize: '18px', fontWeight: 700
            }}>
                {account.substring(0, 6) + "..." + account.substring(account.length - 4)}
                <Box sx={{ display: 'flex', alignItems: 'center', fontSize: '16px', fontWeight: 700, gap: '5px', }}> {parseFloat((ethers.utils.formatEther(balance.toString())).toString()).toFixed(4)}<img src={eth} /></Box>
            </MenuItem>
            <Divider />
            <MenuItem onClick={() => { navigate("/profile"); handleClose() }} sx={{ fontWeight: 700, fontSize: '14px', }}><PersonOutlineIcon sx={{ mr: 1 }} />My Profile</MenuItem>
            <Divider />
            <MenuItem onClick={() => { navigate("/rewards"); handleClose() }} sx={{ fontWeight: 700, fontSize: '14px', }}><RedeemIcon sx={{ mr: 1 }} />My Rewards</MenuItem>
            <Divider />
            <MenuItem onClick={() => { deactivate(); handleClose(); }} sx={{ fontWeight: 700, fontSize: '14px', }}><LogoutIcon sx={{ mr: 1, transform: 'rotate(180deg)' }} />Disconnected</MenuItem>
        </Menu>
    </>);
}

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        borderRadius: '3px',
        border: '1px solid rgba(145, 147, 155, 0.3)',
        fontSize: '14px',
        lineHeigth: '18px'
    },
}));

const LogoTypography = () => {
    const theme = useTheme();
    return (
        <>
            <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ cursor: 'pointer', fontSize: '20px', display: 'flex', color: alpha(theme.palette.primary.footerIcon, 1), marginLeft: { xs: theme.spacing(0), sm: theme.spacing(0) } }}
                className="headerlogo"
            >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <img src={logo} alt='header logo' className='logo' />
                    <Box sx={{ display: { xs: 'none', sm: 'none', md: 'flex', lg: 'flex' }, ml: '15px' }}>
                        {/* <img src={theme.palette.mode == "dark" ? logo_name : blacklogo_name} alt='logo name' className='logo_name' /> */}
                        DiamondHands
                    </Box>
                </Box>
            </Typography>
        </>);
}

const CustomeSwitch = styled(Switch)(({ theme }) => ({
    padding: 6,
    '& .MuiSwitch-track': {
        borderRadius: '15px',
        // background: '#91939B',
        background: theme.palette.mode === 'dark' ? '#91939B' : '#485FE6',
        '&:before, &:after': {
            content: '""',
            position: 'absolute',
            transform: 'translateY(-50%)',
            width: 16,
            height: 16,
        },
    },
    '& .MuiSwitch-thumb': {
        boxShadow: 'none',
        width: 20,
        height: 20,
        margin: 0,
        backgroundColor: 'rgba(255,255,255,1)',
    },
    '& .MuiSwitch-switchBase': {
        '&.css-1fmfuzp-MuiButtonBase-root-MuiSwitch-switchBase:hover': {
            backgroundColor: 'rgba(255, 255, 255,0.03)',
        },
        '&.Mui-checked': {
            '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: theme.palette.primary.dark,
            },
        },
    },


}));

// const ToggleButton = (props) => {
//     return (
//         <>
//             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#91939B', fontWeight: 500, fontSize: '16px', lineHeight: '21px', mt: 1, mb: 1 }}>
//                 <Box>{props.label}</Box>
//                 {/* <CustomeSwitch onChange={()=> props.setRarityInput(!props.rarityinput)}></CustomeSwitch> */}
//             </Box>
//         </>
//     );
// }

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open, cartwidth }) => ({
        flexGrow: 1,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginRight: `${cartwidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginRight: '0px',
        }),
    }),
);

export function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}

export { Search, SearchIconWrapper, StyledInputBase, LogoTypography, Main, Connected,CustomeSwitch};