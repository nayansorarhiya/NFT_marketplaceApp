import { alpha, Avatar, Box, Divider, MenuItem, Select, useTheme } from '@mui/material';
import { useWeb3React } from '@web3-react/core';
import React, { useEffect, useState } from 'react'
import { Connected, Search, SearchIconWrapper, StyledInputBase } from '../CustomStyles';
import SearchIcon from '@mui/icons-material/Search';
import NFTCollection from '../CollectionPageComponents/NFTCollection';
import CustomButton from '../CustomButton';
import profileimage from '../../assets/images/profileimage.svg';
import copyClip from '../../assets/images/copyClip.svg';
import DoneIcon from '@mui/icons-material/Done';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import UseNFTCollection from '../CollectionPageComponents/UseNFTCollection';


export default function ProfilePage() {
    const { active, account, deactivate } = useWeb3React();
    const [dropdown, setDropdown] = React.useState(0);
    const [usernftlist, setUserNFTList] = React.useState([]);
    const theme = useTheme();
    const [rowfilter, setRowFilter] = React.useState({
        label: '24h', option: 0
    });
    const [copied, setCopied] = useState(false);

    const handleChange = (event) => {
        setDropdown(event.target.value);
        switch (event.target.value) {
            case 1:
                setRowFilter({
                    ...rowfilter,
                    label: '7d',
                    option: event.target.value
                });
                break;
            case 2:
                setRowFilter({
                    ...rowfilter,
                    label: '30d',
                    option: event.target.value
                });
                break;
            case 3:
                setRowFilter({
                    ...rowfilter,
                    label: 'All Time',
                    option: event.target.value
                });
                break;
            default:
                setRowFilter({
                    ...rowfilter,
                    label: '24h',
                    option: event.target.value
                });
                break;
        }
    };

    const usenftlist = async () => {
        if (active) {
            try {
                const nfts = await fetch(
                    `https://dh-backend.vercel.app/api/user/getNft/${account}`,
                );
                const nftlist = (await nfts.json());
                const costomaDatalist = (nftlist["ownedNfts"]).map((value) => {
                    return {
                        imageurl: value.metadata.image,
                        title: value.title,
                        name: value.metadata.name
                    }
                })
                setUserNFTList(costomaDatalist)
            } catch (error) {
                console.log(error)
            }
        }
    }
    useEffect(() => {
        usenftlist();
    }, [account])

    return (
        <>
            <Box sx={{ p: 3, }}>
                {active ?
                    <Box>
                        <Box sx={{
                            pl: 0,
                            cursor: 'pointer',
                            pr: 2,
                            backgroundColor: alpha(theme.palette.primary.homeBg, 1),
                            display: 'flex',
                            alignItems: 'center',
                        }}>
                            <Search sx={{ maxWidth: '195px', display: 'flex', alignItems: 'center', borderRadius: '25px', height: '44px', pr: 1.5, border: '1px solid rgba(145, 147, 155, 0.3)' }}>

                                <Box sx={{ display: 'flex', alignItems: 'center', ml: 0.25, }}>
                                    <Avatar src={profileimage}></Avatar>
                                    <Box sx={{ ml: 1, mr: 1 }}>{account.substring(0, 6) + "..." + account.substring(account.length - 4)}</Box>
                                    {!copied ? <>
                                        <ContentCopyRoundedIcon onClick={() => {
                                            navigator.clipboard.writeText(`${account}`)
                                            setCopied(true);
                                            setTimeout(() => {
                                                setCopied(false);
                                            }, 500);
                                        }} ></ContentCopyRoundedIcon></>
                                        : <DoneIcon></DoneIcon>
                                    }
                                </Box>

                            </Search>

                        </Box>
                    </Box> :
                    <></>
                }
                <Box sx={{ pt: 3, display: { xs: 'block', sm: 'flex', md: 'flex', lg: 'flex' }, alignItems: 'center', gap: '13px' }}>
                    <Box sx={{ width: '100%' }}>
                        <Search sx={{ display: 'flex' }}>
                            <SearchIconWrapper >
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search collections by name or address "
                                inputProps={{ 'aria-label': 'search' }}
                                sx={{ width: '100%' }}
                            // onChange={requestSearch}
                            />
                        </Search>
                    </Box>
                    <Box sx={{ gap: 1, justifyContent: 'right', mt: { xs: 2, sm: 0, md: 0, lg: 0 } }}>
                        <Box sx={{ minWidth: '100%' }} >
                            {/* <FormControl> */}
                            <Select
                                value={dropdown}
                                onChange={handleChange}
                                sx={{
                                    border: '1px solid rgba(145, 147, 155, 0.3)',
                                    '&:active,&:hover,&:focus': {
                                        border: '1px solid rgba(145, 147, 155, 0.3)',
                                    },
                                    height: '40px',
                                    width: '100%',
                                }}
                            >
                                <MenuItem value={0} sx={{ width: '100%' }}>All Collection</MenuItem>
                                <MenuItem value={1}>Last 7 days</MenuItem>
                                <MenuItem value={2}>Last 30 days</MenuItem>
                                <MenuItem value={3}>All Time</MenuItem>
                            </Select>
                            {/* </FormControl> */}
                        </Box>

                    </Box>
                </Box>
            </Box>
            <Divider />
            <Box sx={{ minHeight: '100vh' }}>
                <UseNFTCollection usernftlist={usernftlist}></UseNFTCollection>
            </Box>
            {/* <NFTCollection></NFTCollection> */}
        </>
    )
}
