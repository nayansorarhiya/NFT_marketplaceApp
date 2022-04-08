import InputBase from '@mui/material/InputBase';
import { styled, alpha, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import logo from '../assets/images/logo.svg'

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
        fontSize : '14px',
        lineHeigth : '18px'
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
                sx={{ fontSize: { xs: '22px', sm: '32px' }, display: 'block', color: alpha(theme.palette.primary.logo, 1), marginLeft: { xs: theme.spacing(0), sm: theme.spacing(3) } }}
                className="headerlogo"
            >
                <img src={logo} alt='header logo' className='logo' />
            </Typography>
        </>);
}

export { Search, SearchIconWrapper, StyledInputBase ,LogoTypography};