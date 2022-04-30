import * as React from 'react';
import { styled, alpha, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import DoubleArrowOutlinedIcon from '@mui/icons-material/DoubleArrowOutlined';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import Icon from '@mui/material/Icon';
import { ToggleButton } from '../CustomStyles';
import { Button, FormControl, Grid, InputBase, MenuItem, Select } from '@mui/material';
import eth from '../../assets/images/eth.svg';
import MarketPlace from '../DropdownComponents/MarketPlace';
import CollectionData from '../CollectionData';
import Properties from '../DropdownComponents/Properties';
import Footer from './common/Footer';

const drawerWidth = 280;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: '10px',
        }),
    }),
);

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `8px`,
        transition: theme.transitions.create('width'),
        width: '100%',
        borderRadius: '3px',
        border: '1px solid rgba(145, 147, 155, 0.3)',
        fontSize: '14px',
        lineHeigth: '18px'
    },
}));


const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));
const DropSelect = styled(Select)(({ theme }) => ({
    padding: '0'
}));



export default function CollectionPage() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);
    const [dropdown, setDropdown] = React.useState(0);

    const handleChange = (event) => {
        setDropdown(event.target.value);
    }


    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Box sx={{ display: 'flex', position: 'relative' }} >
                <CssBaseline />
                <Box sx={{ display: 'block', justifyContent: 'center', border: `1px solid ${theme.palette.primary.borderDrawer}`, background: alpha(theme.palette.primary.main, 1) }}>
                    <DoubleArrowOutlinedIcon
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        sx={{ m: 2, ...(open && { display: 'none' }) }}
                    >
                        <MenuIcon />
                    </DoubleArrowOutlinedIcon>
                </Box>
                <Drawer
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        display: { sm: 'none', xs: 'none' },
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                            mt: '64px',
                            background: alpha(theme.palette.primary.main, 1),
                        },
                    }}
                    variant="persistent"
                    anchor="left"
                    open={open}

                >

                    <Box sx={{ padding: '0 20px 20px 20px' }}>
                        <DrawerHeader sx={{ justifyContent: 'start' }}>
                            {/* <img src={backarrow} /> */}
                            <ArrowBackOutlinedIcon onClick={handleDrawerClose} sx={{
                                width: '30px', height: '30px', border: '1px solid', borderColor: '#40434E',
                                borderRadius: '22px'
                            }}>
                                {theme.direction === 'ltr' ? <Icon><ChevronLeftIcon /></Icon> : <ChevronRightIcon />}
                            </ArrowBackOutlinedIcon>
                        </DrawerHeader>
                        <Box sx={{ fontWeight: 600, fontSize: '22px' }}>
                            Filter
                        </Box>
                        <ToggleButton label="Buy Now"></ToggleButton>
                        <ToggleButton label="Rarity Ranking"></ToggleButton>
                        <Box sx={{ display: 'flex', alignItems: 'center', color: '#91939B', fontWeight: 500, fontSize: '16px', lineHeight: '21px', minHeight: '38px' }}>
                            Rarity Ranking Range
                        </Box>

                        <Grid container spacing={1} sx={{ display: 'flex' }}>
                            <Grid item xs={6}>
                                <StyledInputBase placeholder='Min'></StyledInputBase>
                            </Grid>
                            <Grid item xs={6}>
                                <StyledInputBase placeholder='Max'></StyledInputBase>
                            </Grid>
                            <Grid item xs={12}>
                                <Button variant='outlined' sx={{
                                    width: '100%', color: 'inherit', border: '1px solid #485FE6',
                                    fontWeight: '500',
                                    fontSize: '16px', textTransform: 'capitalize',
                                    '&:hover,&:focus': {
                                        border: '1px solid #485FE6',
                                    },
                                }}>Apply</Button>
                            </Grid>
                        </Grid>
                        <Box sx={{ display: 'flex', alignItems: 'center', color: '#91939B', fontWeight: 500, fontSize: '16px', lineHeight: '21px', minHeight: '38px', mt: 3 }}>
                            Price Range
                        </Box>

                        <Grid container spacing={1} sx={{ display: 'flex' }}>
                            <Grid item xs={4}>
                                <StyledInputBase placeholder='Min'></StyledInputBase>
                            </Grid>
                            <Grid item xs={4}>
                                <StyledInputBase placeholder='Max'></StyledInputBase>
                            </Grid>
                            <Grid item xs={4}>
                                <FormControl sx={{ maxWidth: '100%', width: '100%' }} size="small">
                                    <DropSelect
                                        sx={{
                                            border: '1px solid rgba(145, 147, 155, 0.3)',
                                            '&:hover,&:outfocus': {
                                                border: '1px solid #485FE6',
                                            },
                                        }}
                                        value={dropdown}
                                        onChange={handleChange}
                                    >
                                        <MenuItem value={0}><img src={eth} alt="ethicon" /></MenuItem>
                                        <MenuItem value={1}>2</MenuItem>
                                    </DropSelect>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <Button variant='outlined' sx={{
                                    width: '100%', color: 'inherit', border: '1px solid #485FE6',
                                    fontWeight: '500',
                                    fontSize: '16px', textTransform: 'capitalize',
                                    '&:hover,&:focus': {
                                        border: '1px solid #485FE6',
                                    },
                                }}>Apply</Button>
                            </Grid>
                        </Grid>
                        <Box sx={{ mt: 4 }}>
                            <MarketPlace></MarketPlace>

                            <Box sx={{ mt: 3, mb: 2, color: '#91939B' }}>
                                Properties

                            </Box>
                            <Properties></Properties>
                        </Box>
                    </Box>
                    <List>

                    </List>
                    <Divider />
                    <List>
                        {['All mail', 'Trash', 'Spam', 'All mail', 'Trash', 'Spam', 'All mail', 'Trash', 'Spam', 'All mail', 'Trash', 'Spam', 'All mail', 'Trash', 'Spam'].map((text, index) => (
                            <ListItem button key={text}>
                                <ListItemIcon>
                                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                    </List>
                </Drawer>
                <Main open={open}>
                    {/* <DrawerHeader /> */}

                    <Box sx={{ mt: 4 }}>
                        <CollectionData></CollectionData>
                    </Box>

                </Main>
            </Box>
            {/* <Footer></Footer> */}
        </>
    );
}
