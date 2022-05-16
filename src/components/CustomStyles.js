import { Avatar, Box } from '@mui/material';
import InputBase from '@mui/material/InputBase';
import { styled, alpha, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import logo from '../assets/images/logo.svg';
import profileimage from '../assets/images/profileimage.svg';
// import logo_name from '../assets/images/logo_name.svg';
// import blacklogo_name from '../assets/images/blacklogo_name.svg';
import { Switch } from '@mui/material';
import { useWeb3React } from '@web3-react/core';


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
    const { account } = useWeb3React();
    return (<>
        <Search sx={{ display: 'flex',alignItems: 'center', width: '100px', borderRadius: '25px', height: '44px',  pr: 1.5, border: '1px solid rgba(145, 147, 155, 0.3)' }}>
            {/* <SearchIconWrapper> */}
            <Box sx={{display: 'flex',alignItems: 'center',ml: 0.25 }}>
                <Avatar src={profileimage}></Avatar>
                <Box sx={{ml : 1}}>{account.substring(0, 6) + "..." + account.substring(account.length - 4)}</Box>
            </Box>
            {/* </SearchIconWrapper> */}
        </Search>
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
                sx={{ fontSize: '20px', display: 'flex', color: alpha(theme.palette.primary.footerIcon, 1), marginLeft: { xs: theme.spacing(0), sm: theme.spacing(0) } }}
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
        '&.Mui-checked': {
            '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: theme.palette.primary.dark,
            },
        },
    },


}));

const ToggleButton = (props) => {
    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#91939B', fontWeight: 500, fontSize: '16px', lineHeight: '21px', mt: 1, mb: 1 }}>
                <Box>{props.label}</Box>
                <CustomeSwitch></CustomeSwitch>
            </Box>
        </>
    );
}

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open, cartWidth }) => ({
        flexGrow: 1,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginRight: `${cartWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginRight: '0px',
        }),
    }),
);

export { Search, SearchIconWrapper, StyledInputBase, LogoTypography, ToggleButton, Main, Connected };