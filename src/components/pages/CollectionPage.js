import * as React from 'react';
import { styled, alpha, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';
import DoubleArrowOutlinedIcon from '@mui/icons-material/DoubleArrowOutlined';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import { ToggleButton } from '../CustomStyles';
import { Button, FormControl, Grid, InputBase, MenuItem, Select, useMediaQuery } from '@mui/material';
import eth from '../../assets/images/eth.svg';
import MarketPlace from '../DropdownComponents/MarketPlace';
import CollectionData from '../CollectionData';
import NFTCollection from '../CollectionPageComponents/NFTCollection';

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
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
    const [variant, setVariant] = React.useState({
        view: '', width: '', direction: ''
    });
    const [topdrawerwidth, setTopDrawerwidth] = React.useState(280);

    const handleChange = (event) => {
        setDropdown(event.target.value);
    }

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const isMobile = useMediaQuery(theme.breakpoints.between('xs', 'md'));
    React.useEffect(() => {
        setVariant({ view: isMobile ? 'persistent' : 'persistent', width: isMobile ? 0 : 280, direction: isMobile ? 'top' : 'left' })
        setTopDrawerwidth(isMobile ? '100%' : 280);
    }, [isMobile])

    const drawerWidth = variant.width;

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
                marginLeft: '0px',
            }),
        }),
    );

    return (
        <>
            <Box sx={{ display: 'flex', }} >
                <CssBaseline />
                <Box sx={{ boxShadow: `1px 0px 0px  ${theme.palette.primary.borderDrawer}`, background: alpha(theme.palette.primary.main, 1), display: { xs: 'none', sm: 'none', md: 'flex', lg: 'flex' } }}>
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
                        width: { xs: '0', sm: '0', md: topdrawerwidth, lg: topdrawerwidth },
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: topdrawerwidth,
                            boxSizing: 'border-box',
                            mt: { xs: 8.1, sm: 8.1, md: '0px', lg: '0px' },
                            pb: { xs: 8.1, sm: 8.1, md: '0px', lg: '0px' },
                            background: alpha(theme.palette.primary.main, 1),
                            position: { xs: 'fixed', sm: 'fixed', md: 'relative', lg: 'relative' },
                            maxHeight: '100vh',
                            zIndex: 1,
                        },
                    }}
                    variant={variant.view}
                    anchor={variant.direction}
                    open={open}>

                    <Box sx={{ padding: '0 20px 20px 20px' }}>
                        <DrawerHeader sx={{ justifyContent: 'start', display: { xs: 'none', sm: 'none', md: 'flex', lg: 'flex' } }}>
                            {/* <img src={backarrow} /> */}
                            <ArrowBackOutlinedIcon onClick={handleDrawerClose} sx={{
                                width: '30px', height: '30px', border: '1px solid', borderColor: '#40434E',
                                borderRadius: '22px'
                            }}>
                            </ArrowBackOutlinedIcon>
                        </DrawerHeader>
                        <Box sx={{ fontWeight: 600, fontSize: '22px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: { xs: 3, sm: 3, md: 0, lg: 0 } }}>
                            <Box> Filter </Box>
                            <Button variant='outlined' onClick={handleDrawerClose} sx={{
                                display: { xs: 'flex', sm: 'flex', md: 'none', lg: 'none' },
                                flex: 'end',
                                width: '80%', color: 'inherit', border: '1px solid #485FE6',
                                fontWeight: '500',
                                fontSize: '16px', textTransform: 'capitalize',
                                '&:hover,&:focus': {
                                    border: '1px solid #485FE6',
                                },
                            }}>Done</Button>
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
                            <MarketPlace name={"MarketPlace"} list={[{ name: "LooksRare", percentage: 120, total: 105 }, { name: "OpenSea", percentage: 56.5, total: 110 }]}></MarketPlace>
                            <Box sx={{ mt: 3, mb: 2, color: '#91939B' }}>
                                Properties
                            </Box>
                            <MarketPlace name={"Background"} list={[{ name: "Purple", percentage: 25, total: 8 }, { name: "Yellow", percentage: 56.5, total: 25 }]}></MarketPlace>
                            <MarketPlace name={"Background"} list={[{ name: "Purple", percentage: 25, total: 8 }, { name: "Yellow", percentage: 56.5, total: 25 }]}></MarketPlace>
                            <MarketPlace name={"Background"} list={[{ name: "Purple", percentage: 25, total: 8 }, { name: "Yellow", percentage: 56.5, total: 25 }]}></MarketPlace>
                            {/* <Properties></Properties> */}
                        </Box>
                    </Box>
                </Drawer>
                <Main open={open} sx={{ p: 0 }}>
                    <Box>
                        <CollectionData drawerCall={handleDrawerOpen}></CollectionData>
                        <NFTCollection></NFTCollection>
                    </Box>

                </Main>
            </Box>
        </>
    );
}
