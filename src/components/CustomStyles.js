import { Box } from '@mui/material';
import InputBase from '@mui/material/InputBase';
import { styled, alpha, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import logo from '../assets/images/logo.svg';
import logo_name from '../assets/images/logo_name.svg';
import { Switch } from '@mui/material';


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
                sx={{ fontSize: { xs: '22px', sm: '32px' }, display: 'flex', color: alpha(theme.palette.primary.logo, 1), marginLeft: { xs: theme.spacing(0), sm: theme.spacing(0) } }}
                className="headerlogo"
            >
                <Box>
                    <img src={logo} alt='header logo' className='logo' />
                    <img src={logo_name} alt='logo name' className='logo_name' />
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
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#91939B', fontWeight: 500, fontSize: '16px', lineHeight: '21px' }}>
                <Box>{props.label}</Box>
                <CustomeSwitch></CustomeSwitch>
            </Box>
        </>
    );
}

export { Search, SearchIconWrapper, StyledInputBase, LogoTypography, ToggleButton };