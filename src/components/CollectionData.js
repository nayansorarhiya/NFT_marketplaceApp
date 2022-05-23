import { Box, Button, Divider, FormControl, MenuItem, Select, styled } from '@mui/material'
import React from 'react'
import vectorCorrect from '../assets/images/vectorCorrect.svg'
import PriceRange from './CollectionPageComponents/PriceRange'
import { Search, SearchIconWrapper, StyledInputBase } from './CustomStyles'
import SearchIcon from '@mui/icons-material/Search';
import mob_broom from '../assets/images/mob_broom.svg'

const CollectionName = styled(Box)`
    font-family: 'WorkSans';
    font-style: normal;
    font-weight: 600;
    font-size: 36px;
    line-height: 42px;
    text-transform: capitalize;
`

export default function CollectionData(props) {
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
            <Box sx={{p:'32px 20px 20px 20px'}}>
                <Box
                    sx={{
                        display: 'flex',
                        gap: '13px',
                        mb: 1.5
                    }}>
                    <CollectionName>
                        {props.apidata.name}
                        {props.apidata.isvarified &&<img src={vectorCorrect} alt='verified' style={{ marginLeft: '10px' }} />}
                    </CollectionName>
                </Box>

                <PriceRange apidata={props.apidata}></PriceRange>
                <Box sx={{ display: { md: 'none', lg: 'none' } }}>
                    <Button variant='outlined' sx={{
                        width: '100%', color: 'inherit', border: '1px solid #485FE6',
                        fontWeight: '500',
                        fontSize: '16px', textTransform: 'capitalize',
                        '&:hover,&:focus': {
                            border: '1px solid #485FE6',
                        },
                        mt: 3,
                    }} onClick={props.drawerCall}>Filter</Button>
                </Box>

                <Box sx={{ display: { xs: 'block', sm: 'flex', md: 'flex', lg: 'flex' }, gap: 1, mt: 2, justifyContent: 'space-between' }}>
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
                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'right', mt: { xs: 2, sm: 0, md: 0, lg: 0 } }}>
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
                                <MenuItem value={0} sx={{ width: '100%' }}>Last 24h</MenuItem>
                                <MenuItem value={1}>Last 7 days</MenuItem>
                                <MenuItem value={2}>Last 30 days</MenuItem>
                                <MenuItem value={3}>All Time</MenuItem>
                            </Select>
                            {/* </FormControl> */}
                        </Box>
                        <Box sx={{ border: '1px solid rgba(145, 147, 155, 0.3)', borderRadius: '3px', cursor: 'pointer', width: '40px', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Box sx={{ width: "24px", height: "24px", }}><img src={mob_broom}></img></Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Divider />
        </>
    )
}
