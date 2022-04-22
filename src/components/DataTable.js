import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme, alpha } from '@mui/material/styles';
import CustomButton from './CustomButton';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import vectorCorrect from '../assets/images/vectorCorrect.svg';
import eth from '../assets/images/eth.png';
import SearchIcon from '@mui/icons-material/Search';
import { Search, SearchIconWrapper, StyledInputBase } from './CustomStyles';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Grid } from '@mui/material';
import profile from '../assets/images/tableProfile.png'
import placeholderImage from '../assets/images/placeholderImage.jpg'


function createData(id, name, volume, hour, hour2, price, owner, supply) {
    return {
        id,
        name,
        volume,
        hour,
        hour2,
        price,
        owner,
        supply,
    };
}

// const rows = [
//     createData(1, 'Mutant Ape Yacht Club', '0,047.89', -1.74, -92.25, '5,05.7', '4,7K', '23,5K'),
//     createData(2, 'Meetbits', '1,070.15', +1.06, +770.15, '2,14.3', '4,5K', '17,1K'),
//     createData(3, 'X Design', '0,047.89', -1.74, -92.25, '5,05.7', '4,7K', '23,5K'),
//     createData(4, 'Some Crypto Name', '7,142.89', +2.24, -52.25, '1,178.57', '2,5K', '11,2K'),
// ];




function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCellsDesktop = [
    {
        id: 'id',
        numeric: true,
        disablePadding: true,
        class: 'desktopCells',
        label: '',
    },
    {
        id: 'name',
        numeric: false,
        disablePadding: true,
        class: 'desktopCells',
        label: 'Collection',
    },
    {
        id: 'price',
        numeric: true,
        disablePadding: false,
        class: 'desktopCells',
        label: 'Floor Price',
    },
    {
        id: 'hour',
        numeric: true,
        disablePadding: false,
        class: 'mobileCells h24-1Hidden',
        label: '24h',
    },
    {
        id: 'volume',
        numeric: true,
        disablePadding: false,
        class: 'mobileCells h24-Hidden',
        label: '24h Volume',
    },
    {
        id: 'hour2',
        numeric: true,
        disablePadding: false,
        class: 'mobileCells h24-2Hidden',
        label: '24h',
    },
    {
        id: 'owner',
        numeric: true,
        disablePadding: false,
        class: 'mobileCells ownerHidden',
        label: 'Owners',
    },
    {
        id: 'supply',
        numeric: true,
        disablePadding: false,
        class: 'mobileCells supplyHidden',
        label: 'Supply',
    },
];

function EnhancedTableHead(props) {
    const theme = useTheme();
    const { order, orderBy, onRequestSort } =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headCellsDesktop.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                        sx={{ fontWeight: '500', fontSize: '16px', lineHeight: '21px', color: alpha(theme.palette.primary.tableHead, 1), whiteSpace: 'nowrap' }}
                        className={`${headCell.class} pe-0`}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {/* <Box  className="table-padding">
                                </Box> */}
                            {headCell.label}

                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

export default function DataTable() {
    const theme = useTheme();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('id');
    const [selected, setSelected] = React.useState([]);
    const [rows, setRowData] = React.useState([]);

    async function apiCallforData() {
        const resp = await fetch(`https://nft-aggregator-api.herokuapp.com/collections`,
            {
                method: "post",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "sort": { "oneDayVolume": "desc" },
                    "limit": 100,
                    "fields": {
                        "name": 1,
                        "symbol": 1,
                        "standard": 1,
                        "description": 1,
                        "address": 1,
                        "createdDate": 1,
                        "externalUrl": 1,
                        "imageUrl": 1,
                        "totalSupply": 1,
                        "sevenDayVolume": 1,
                        "oneDayVolume": 1,
                        "stats": 1,
                        "indexingStatus": 1,
                        "discordUrl": 1,
                        "instagramUsername": 1,
                        "isVerified": 1,
                        "lastNumberOfUpdates": 1,
                        "lastOpenSeaCancelledId": 1,
                        "lastOpenSeaSaleCreatedId": 1,
                        "slug": 1,
                        "lastOpenSeaTransferId": 1,
                        "lastRaribleAssetUpdateId": 1,
                        "mediumUsername": 1,
                        "telegramUrl": 1,
                        "twitterUsername": 1,
                        "updatedAt": 1,
                        "wikiUrl": 1
                    }
                })
            }
        );
        const rows = await resp.json();
        setRowData(rows.data);
    }

    React.useEffect(() => {
        apiCallforData();
    }, [])

    React.useEffect(() => {
        console.log(rows);
    }, [rows])


    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };


    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    return (
        <>
            <Box sx={{ width: '100%', mt: '40px', background: alpha(theme.palette.primary.homeBg, 1), display: 'block', textAlign: 'center' }}>
                <Grid sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Search sx={{ display: 'flex', m: 2 }}>
                        <SearchIconWrapper >
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search collections by name or address "
                            inputProps={{ 'aria-label': 'search' }}
                            sx={{ width: { xs: '100%', sm: '400px', md: '500px', lg: '500px' } }}
                        />
                    </Search>
                    <Box sx={{ minWidth: 100, display: { xs: 'none', sm: 'flex', md: 'flex', lg: 'flex' } }} >
                        <FormControl>
                            <Select
                                value={age ? age : 1}
                                onChange={handleChange}
                            >
                                <MenuItem value={1}>Last 24h</MenuItem>
                                <MenuItem value={2}>Yesterday</MenuItem>
                                <MenuItem value={3}>1 Week</MenuItem>
                                <MenuItem value={4}>1 Month</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Grid>
                <TableContainer fluid="true" sx={{ background: alpha(theme.palette.primary.homeBg, 1) }}>
                    <Table
                        className="table-padding pe-0"
                        sx={{ minWidth: 300, borderCollapse: 'unset', p: 0 }}
                        aria-labelledby="tableTitle"
                        size='small'   // small | medium
                    >
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>

                            {rows.length != 0 ? (stableSort(rows, getComparator(order, orderBy))
                                .map((row, index) => {
                                    const labelId = `enhanced-table-checkbox-${index}`;
                                    {/* console.log(row.stats.one_day_change); */ }
                                    return (

                                        <TableRow
                                            style={{ width: "100vw" }}
                                            hover
                                            onClick={(event) => handleClick(event, row.name)}
                                            tabIndex={-1}
                                            key={index + 1}

                                        >
                                            <TableCell className='padding-0' align="left" sx={{ fontWeight: 700, fontSize: { xs: '12px', sm: '18px', md: '18px', lg: '18px' }, lineHeight: { xs: '13px', sm: '32px', md: '32px', lg: '32px' }, color: alpha(theme.palette.primary.tableHead, 1) }}>{index + 1}</TableCell>
                                            <TableCell
                                                className='padding-0'
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                                padding="none"
                                                sx={{ fontWeight: 700, fontSize: { xs: '12px', sm: '20px', md: '20px', lg: '20px' }, lineHeight: { xs: '13px', sm: '22px', md: '22px', lg: '22px' }, color: alpha(theme.palette.primary.tableHead, 1) }}
                                            >
                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <Box sx={{ display: 'flex', alignItems: 'center' }}><img src={row.imageUrl ? row.imageUrl : placeholderImage} width="46px" height="46px" /></Box>
                                                    <Box sx={{
                                                        fontSize: { xs: '12px', sm: '18px', md: '18px', lg: '18px' },
                                                        maxWidth: '21vw',
                                                        overflow: 'hidden',
                                                        whiteSpace: 'nowrap',
                                                        lineHeight: '15px',
                                                        textOverflow: 'ellipsis', pl: 1, pr: 1
                                                    }}>{row.name}</Box>
                                                    {row.isVerified && <Box>  <img src={vectorCorrect} alt="correcticon" /></Box>}
                                                </Box>
                                            </TableCell>
                                            <TableCell className="" sx={{ pl: 0, pr: 0, fontWeight: 700, fontSize: { xs: '14px', sm: '18px', md: '18px', lg: '18px' }, lineHeight: { xs: '18px', sm: '32px', md: '32px', lg: '32px' }, color: alpha(theme.palette.primary.tableHead, 1) }}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'end' }}>
                                                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                                        <Box>{row.stats.floor_price.toFixed(3)}</Box>
                                                        <Box className="desktopHidden" sx={{ color: (row.stats.one_day_change < 0 ? '#EB5757' : '#27AE60'), fontSize: { xs: '12px', sm: '18px', md: '18px', lg: '18px' } }}>{row.stats.one_day_change < 0 ? '' : '+'}{parseFloat(row.stats.one_day_change * 100).toFixed(2)}% </Box>
                                                    </Box>
                                                    {row.name && <Box sx={{ ml: 1, display: 'flex', justifyContent: 'center' }}><img src={eth} alt="ethicon" /> </Box>}

                                                </Box>
                                            </TableCell>
                                            <TableCell className="mobileCells " align="right" sx={{ p: 0, fontWeight: 700, fontSize: '18px', lineHeight: '32px', color: (row.stats.one_day_change < 0 ? '#EB5757' : '#27AE60') }}>
                                                <Box className="h24-1Hidden" sx={{ p: 2 }} >
                                                    {row.stats.one_day_change < 0 ? '' : '+'}{parseFloat(row.stats.one_day_change * 100).toFixed(2)}%
                                                </Box>
                                            </TableCell>
                                            <TableCell className="mobileCells " align="right" sx={{ p: 0, fontWeight: 700, fontSize: '18px', lineHeight: '32px', color: alpha(theme.palette.primary.tableHead, 1) }} >
                                                <Box className="h24-Hidden" sx={{ p: 2 }} >
                                                    {row.oneDayVolume.toFixed(2)}
                                                </Box>
                                            </TableCell>
                                            <TableCell className="mobileCells " align="right" sx={{ p: 0, fontWeight: 700, fontSize: '18px', lineHeight: '32px', color: (row.stats.one_day_change < 0 ? '#EB5757' : '#27AE60') }}>
                                                <Box className="h24-2Hidden" sx={{ p: 2 }} >
                                                    {row.stats.one_day_change < 0 ? '' : '+'}{parseFloat(row.stats.one_day_change * 100).toFixed(2)}%
                                                </Box>
                                            </TableCell>
                                            <TableCell className="mobileCells " align="right" sx={{ p: 0, fontWeight: 700, fontSize: '18px', lineHeight: '32px', color: alpha(theme.palette.primary.tableHead, 1) }}>
                                                <Box className="ownerHidden" sx={{ p: 2 }} >
                                                    {row.stats.num_owners < 1000 ? row.stats.num_owners : (row.stats.num_owners / 1000).toFixed(1) + "K"}
                                                </Box>
                                            </TableCell>
                                            <TableCell className="mobileCells " align="right" sx={{ p: 0, fontWeight: 700, fontSize: '18px', lineHeight: '32px', color: alpha(theme.palette.primary.tableHead, 1) }}>
                                                <Box className="supplyHidden" sx={{ p: 2 }} >
                                                    {row.totalSupply < 1000 ? row.totalSupply : (row.totalSupply / 1000).toFixed(1) + "K"}
                                                </Box>
                                            </TableCell>
                                            {/* </Box> */}
                                        </TableRow>

                                    );
                                })) : <TableRow><TableCell colSpan={8}><Box sx={{ display: 'flex', justifyContent: 'center' }}> No Data Available</Box></TableCell></TableRow>}

                        </TableBody>
                    </Table>

                </TableContainer>
                <CustomButton sx={{ mt: 5, mb: 8, padding: '11px 22px' }}>Call to Action</CustomButton>
            </Box>

        </>
    );
}
