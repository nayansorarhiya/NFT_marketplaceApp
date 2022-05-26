import * as React from 'react';
import { styled, alpha, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';
import DoubleArrowOutlinedIcon from '@mui/icons-material/DoubleArrowOutlined';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import { CustomeSwitch } from '../CustomStyles';
import { Avatar, Badge, Button, FormControl, Grid, InputBase, MenuItem, Select, useMediaQuery } from '@mui/material';
import eth from '../../assets/images/eth.svg';
import MarketPlace from '../DropdownComponents/MarketPlace';
import Properties from '../DropdownComponents/Properties';
import TraitsCount from '../DropdownComponents/TraitsCount';
import CollectionData from '../CollectionData';
import NFTCollection from '../CollectionPageComponents/NFTCollection';
import menu from '../../assets/images/menu.svg'
import { useParams } from 'react-router-dom';
import { BigNumber } from 'ethers';

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
    const [open, setOpen] = React.useState(false);
    const [dropdown, setDropdown] = React.useState(0);
    const { slug } = useParams();
    const [variant, setVariant] = React.useState({
        view: '', width: '', direction: ''
    });
    const [topdrawerwidth, setTopDrawerwidth] = React.useState(280);
    const [rarityinput, setRarityInput] = React.useState(false);
    const [offset, setOffset] = React.useState(0);
    // const [searchInputtext, setSearchInputtext] = React.useState("");
    const [apifilter, setApiFilter] = React.useState({
        "filters": {
            "traits": {},
            "traitsRange": {},
            "slug": slug,
            "rankRange": {},
            "searchText": '',
            "price": {}
        },
        "limit": 30,
        "markets": [],
        "offset": offset,
        "sort": { "currentEthPrice": "asc" },
        "status": ["all"]
    });
    const [onecollectionData, setoneCollectionData] = React.useState([{
        name: "",
        isverified: false,
        onedaychange: 0,
        onedayvolume: 0,
        floorprice: 0,
        revealpercentage: 100,
        marketstats: [],
        traits: [],
        traitslist: [],
        traitcounts: [],
    }]);
    const [assetsdata, setAssetsdata] = React.useState([{
        name: '',
        market: '',
        imageUrl: '',
        rarityscore: 0,
        price: "0",

    }])

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
            // marginRight: `-${drawerWidth}px`,
            // ...(open && {
            //     transition: theme.transitions.create('margin', {
            //         easing: theme.transitions.easing.easeOut,
            //         duration: theme.transitions.duration.enteringScreen,
            //     }),
            //     marginRight: '0px',
            // }),
        }),
    );
    const groupBy = (items, key) => items.reduce(
        (result, item) => ({
            ...result,
            [item[key]]: [
                ...(result[item[key]] || []),
                item,
            ],
        }),
        {},
    );

    async function apiCallforCollectionData() {
        const resp = await fetch(
            `https://dh-backend.vercel.app/api/getCollectionDetails?slug=${slug}`,
            {
                method: "get",
            }
        );
        const rows = await resp.json();
        const localrows = rows.data.data.map((v) => ({
            name: v.name,
            isverified: v.isVerified,
            onedaychange: v.stats.one_day_change ? v.stats.one_day_change : 0,
            onedayvolume: v.stats.one_day_volume ? v.stats.one_day_volume : 0,
            floorprice: v.stats.floor_price ? v.stats.floor_price : -1,
            revealpercentage: v.revealPercentage ? v.revealPercentage : 100,
            marketstats: (v.marketStats).length !== 0 ? v.marketStats : [],
            traits: (v.traits).length !== 0 ? v.traits : [],
            traitslist: [],
            traitcounts: (v.traitCounts).length !== 0 ? v.traitCounts : [],
        }));
        localrows[0].traits = groupBy(localrows[0].traits, 'trait_type');
        localrows[0].traitslist = Object.keys(localrows[0].traits)
        setoneCollectionData(localrows);

    }
    async function apiCallforAssetData() {
        const assetresp = await fetch(
            `https://dh-backend.vercel.app/api/getAssestDetails`,
            {
                method: "POST",
                body: JSON.stringify(apifilter),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }
        );
        const assetsrows = await assetresp.json();
        // console.log(assetsrows.data.data);
        const localassetsrows = assetsrows.data.data.map((v) => ({
            name: v.name,
            market: v.market,
            imageurl: v.imageUrl,
            rarityscore: v.rarityScore,
            price: v.currentBasePrice != null ? v.currentBasePrice.toLocaleString('fullwide', { useGrouping: false }) : "0",
        }));
        // localassetsrows[0].traits = groupBy(localassetsrows[0].traits, 'trait_type');
        // localassetsrows[0].traitslist = Object.keys(localassetsrows[0].traits)
        setAssetsdata(localassetsrows);
        // console.log(assetsdata);
    }

    React.useEffect(() => {
        apiCallforAssetData();
    }, [apifilter]);
    React.useEffect(() => {
        apiCallforCollectionData();
        apiCallforAssetData();
    }, []);

    return (
        <>
            <Box sx={{ display: 'flex', }} >
                <CssBaseline />
                <Box sx={{ boxShadow: `1px 0px 0px  ${theme.palette.primary.borderDrawer}`, background: alpha(theme.palette.primary.main, 1), display: { xs: 'none', sm: 'none', md: 'flex', lg: 'flex' } }}>
                    <Box
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        height='40px'
                        width='40px'
                        sx={{ m: 3, ...(open && { display: 'none' }), cursor: 'pointer' }}
                    >
                        <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="21" cy="21" r="20.5" stroke="#40434E" />
                            <path d="M13 15.6667H29M16 21H26M18 26.3333H24" stroke={alpha(theme.palette.primary.font, 1)} stroke-width="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>

                        {/* <Box>Filter</Box> */}
                        {/* <MenuIcon /> */}
                    </Box>
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
                            maxHeight: '100%',
                            zIndex: 1,
                        },
                    }}
                    variant={variant.view}
                    anchor={variant.direction}
                    open={open}>

                    <Box sx={{ padding: '0 20px 20px 20px' }}>
                        <DrawerHeader sx={{ justifyContent: 'start', display: { xs: 'none', sm: 'none', md: 'flex', lg: 'flex' } }}>
                            {/* <img src={backarrow} /> */}
                            <Box onClick={handleDrawerClose} sx={{
                                width: '22px', height: '22px', cursor: 'pointer', pb: 1
                            }}>
                                <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="0.5" y="0.5" width="43" height="43" rx="21.5" stroke="#40434E" />
                                    <path d="M21.3125 16.5L15.8125 22L21.3125 27.5" stroke={alpha(theme.palette.primary.font, 1)} stroke-width="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M15.8125 22L27.5 22" stroke={alpha(theme.palette.primary.font, 1)} stroke-width="1.5" strokeLinecap="round" />
                                </svg>

                            </Box>
                        </DrawerHeader>
                        <Box sx={{ fontWeight: 600, fontSize: '22px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: { xs: 3, sm: 3, md: 0, lg: 0 }, pt: 2 }}>
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
                        <Box sx={{ maxHeight: '100vh', overflow: 'auto' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#91939B', fontWeight: 500, fontSize: '16px', lineHeight: '21px', mt: 1, mb: 1 }}>
                                <Box>Buy Now</Box>
                                <CustomeSwitch></CustomeSwitch>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#91939B', fontWeight: 500, fontSize: '16px', lineHeight: '21px', mt: 1, mb: 1 }}>
                                <Box>Rarity Ranking</Box>
                                <CustomeSwitch onChange={() => setRarityInput(!rarityinput)}></CustomeSwitch>
                            </Box>
                            {rarityinput && <>
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
                            </>}
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
                                <MarketPlace setApiFilter={setApiFilter} apifilter={apifilter} keyword={"markets"} name={"MarketPlace"} list={onecollectionData[0].marketstats} label={'_id'} count={'count'}></MarketPlace>
                                {onecollectionData[0].traitcounts.length !== 0 &&
                                    <>
                                        <Box sx={{ mt: 3, mb: 2, color: '#91939B' }}>
                                            Trait Count
                                        </Box>
                                        <TraitsCount setApiFilter={setApiFilter} apifilter={apifilter} keyword={"filters"} name={"Trait Count"} list={onecollectionData[0].traitcounts} label={'_id'} count={'count'}></TraitsCount>
                                        {/* <MarketPlace name={"Trait Count"} list={onecollectionData[0].traitcounts} label={'_id'} count={'count'}></MarketPlace> */}
                                    </>}
                                {onecollectionData[0].traitslist.length !== 0 &&
                                    <>
                                        <Box sx={{ mt: 3, mb: 2, color: '#91939B' }}>
                                            Properties
                                        </Box>
                                        {
                                            onecollectionData[0].traitslist.map((value) => {
                                                return (<Properties setApiFilter={setApiFilter} apifilter={apifilter} keyword={"filters"} name={value} list={onecollectionData[0].traits[value]} label={'trait_value'} count={'trait_count'}></Properties>)
                                            })
                                        }
                                    </>
                                }
                            </Box>
                        </Box>
                    </Box>
                </Drawer>
                <Main open={open} sx={{ p: 0 }}>
                    <Box>
                        <CollectionData  drawerCall={handleDrawerOpen} apidata={onecollectionData[0]}></CollectionData>
                        <NFTCollection assetsdata={assetsdata} rarityinput={rarityinput}></NFTCollection>
                    </Box>
                </Main>
            </Box>
        </>
    );
}
