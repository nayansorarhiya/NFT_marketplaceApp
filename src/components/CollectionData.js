import { Box, Button, Divider, FormControl, MenuItem, Select, styled } from '@mui/material'
import React from 'react'
import vectorCorrect from '../assets/images/vectorCorrect.svg'
import PriceRange from './CollectionPageComponents/PriceRange'
import { Search, SearchIconWrapper, StyledInputBase } from './CustomStyles'
import SearchIcon from '@mui/icons-material/Search';
import NFTCollection from './CollectionPageComponents/NFTCollection'

const CollectionName = styled(Box)`
    font-family: 'WorkSans';
    font-style: normal;
    font-weight: 600;
    font-size: 36px;
    line-height: 42px;
    text-transform: capitalize;
`

export default function CollectionData() {
    const [dropdown, setDropdown] = React.useState(0);

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
            <Box
                sx={{
                    display: 'flex',
                    gap: '13px',
                    mb: 1.5
                }}>
                <CollectionName>
                    Mutant Ape Yacht club
                </CollectionName>
                <img src={vectorCorrect} alt='verified' />
            </Box>

            <PriceRange></PriceRange>
            <Box sx={{ display: {md: 'none', lg: 'none' } }}>
                <Button>Filter</Button>
            </Box>

            <Box sx={{ display: 'flex', mt: 4, justifyContent: 'space-between' }}>
                <Search sx={{ display: 'flex' }}>
                    <SearchIconWrapper >
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search collections by name or address "
                        inputProps={{ 'aria-label': 'search' }}
                        sx={{ width: { xs: '100%', sm: '400px', md: '500px', lg: '500px' } }}
                    // onChange={requestSearch}
                    />
                </Search>
                <Box sx={{ minWidth: 100, display: { xs: 'none', sm: 'flex', md: 'flex', lg: 'flex' } }} >
                    <FormControl>
                        <Select
                            value={dropdown}
                            onChange={handleChange}
                            sx={{
                                '&:hover,&:focus': {
                                    border: '1px solid #485FE6',
                                },
                                height: '38px'
                            }}
                        >
                            <MenuItem value={0}>Last 24h</MenuItem>
                            <MenuItem value={1}>Last 7 days</MenuItem>
                            <MenuItem value={2}>Last 30 days</MenuItem>
                            <MenuItem value={3}>All Time</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </Box>
            {/* <Divider /> */}
            <NFTCollection></NFTCollection>

        </>
    )
}
