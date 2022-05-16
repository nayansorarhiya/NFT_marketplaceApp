import { alpha, Box, Divider, MenuItem, Select, useTheme } from '@mui/material';
import { useWeb3React } from '@web3-react/core';
import React from 'react'
import { Connected, Search, SearchIconWrapper, StyledInputBase } from '../CustomStyles';
import SearchIcon from '@mui/icons-material/Search';
import NFTCollection from '../CollectionPageComponents/NFTCollection';


export default function ProfilePage() {
    const { active, account, deactivate } = useWeb3React();
    const [dropdown, setDropdown] = React.useState(0);
    const theme = useTheme();
    const [rowfilter, setRowFilter] = React.useState({
        label: '24h', option: 0
    });

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

    return (
        <>
            <Box sx={{ p: 3 }}>
                <Box sx={{ width: '15%' }}>
                    <Box sx={{
                        pl: 0,
                        cursor: 'pointer',
                        pr: 2,
                        backgroundColor: alpha(theme.palette.primary.homeBg, 1),

                    }}>
                        {active ? <Connected > </Connected> :
                            // <CustomButton sx={{ whiteSpace: 'nowrap' }} variant="contained">Connect Wallet </CustomButton>
                            <></>
                        }
                    </Box>
                </Box>
                <Box sx={{ pt: 5, display: {xs: 'block', sm: 'block', md: 'flex', lg: 'flex'}, gap: '13px' }}>
                    <Box sx={{ width: '90%' }}>
                        <Search sx={{ display: 'flex' }}>
                            <SearchIconWrapper >
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search collections by name or address "
                                inputProps={{ 'aria-label': 'search' }}
                                sx={{ width: { xs: '100%', sm: '350px', md: '400px', lg: '500px' } }}
                            // onChange={requestSearch}
                            />
                        </Search>
                    </Box>
                    <Box sx={{ gap: 1, justifyContent: 'right', mt: { xs: 2, sm: 0, md: 0, lg: 0 } }}>
                        <Box sx={{ minWidth: 100 }} >
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

            <NFTCollection></NFTCollection>

        </>
    )
}
