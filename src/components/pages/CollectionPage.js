import * as React from 'react';
import { styled, alpha, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
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
import eth from '../../assets/images/eth.png';

const drawerWidth = 240;

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
            marginLeft: 0,
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
    padding: theme.spacing(0, 1),
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
        <Box sx={{ display: 'flex' }} >
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
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        mt: '65px',
                        background: alpha(theme.palette.primary.main, 1),
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}

            >
                <DrawerHeader>
                    <ArrowBackOutlinedIcon onClick={handleDrawerClose} sx={{ width: '30px', height: '30px' }}>
                        {theme.direction === 'ltr' ? <Icon><ChevronLeftIcon /></Icon> : <ChevronRightIcon />}
                    </ArrowBackOutlinedIcon>
                </DrawerHeader>
                <Box sx={{ padding: '0 20px 20px 20px' }}>
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
                            <FormControl sx={{ maxWidth: 65, }} size="small">
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
                </Box>
                <List>

                </List>
                <Divider />
                <List>
                    {['All mail', 'Trash', 'Spam'].map((text, index) => (
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
                <DrawerHeader />
                <Typography paragraph>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
                    enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
                    imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
                    Convallis convallis tellus id interdum velit laoreet id donec ultrices.
                    Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
                    adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra
                    nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum
                    leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis
                    feugiat vivamus at augue. At augue eget arcu dictum varius duis at
                    consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
                    sapien faucibus et molestie ac.
                </Typography>
                <Typography paragraph>
                    Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper
                    eget nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim
                    neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra
                    tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis
                    sed odio morbi. Euismod lacinia at quis risus sed vulputate odio. Morbi
                    tincidunt ornare massa eget egestas purus viverra accumsan in. In hendrerit
                    gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem
                    et tortor. Habitant morbi tristique senectus et. Adipiscing elit duis
                    tristique sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
                    eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
                    posuere sollicitudin aliquam ultrices sagittis orci a.
                </Typography>
            </Main>
        </Box>
    );
}
