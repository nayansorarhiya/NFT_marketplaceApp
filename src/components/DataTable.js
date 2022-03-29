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
// import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
// import Paper from '@mui/material/Paper';
import FormControlLabel from '@mui/material/FormControlLabel';
// import Switch from '@mui/material/Switch';
import { visuallyHidden } from '@mui/utils';
import vectorCorrect from '../assets/images/vectorCorrect.svg';
import eth from '../assets/images/eth.png';
// import { height } from '@mui/system';
import SearchIcon from '@mui/icons-material/Search';
import { Search, SearchIconWrapper, StyledInputBase } from './pages/common/Header';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Grid } from '@mui/material';


function createData(id, name, volume, hour, hour2, color, price, owner, supply) {
    return {
        id,
        name,
        volume,
        hour,
        hour2,
        color,
        price,
        owner,
        supply,
    };
}

const rows = [
    createData(1, 'Mutant Ape Yacht Club', '0,047.89', -1.74, -92.25, 'green', '5,05.7', '4,7K', '23,5K'),
    createData(2, 'Meetbits', '1,070.15', +1.06, +770.15, 'blue', '2,14.3', '4,5K', '17,1K'),
    createData(3, 'X Design', '0,047.89', -1.74, -92.25, 'red', '5,05.7', '4,7K', '23,5K'),
    createData(4, 'Some Crypto Name', '7,142.89', +2.24, -52.25, 'red', '1,178.57', '2,5K', '11,2K'),
    // createData(5,'X Design', '0,047.89', '-92.25%', '5,05.7', '4,7K', '23,5K'),
    // createData(6,'Some Crypto Name', '0,047.89', '-92.25%', '5,05.7', '4,7K', '23,5K'),
    // createData(7,'Meetbits', '1,070.15', '+770.15%', '2,14.3', '4,5K', '17,1K'),
    // createData(8,'X Design', '0,047.89', '-92.25%', '5,05.7', '4,7K', '23,5K'),
    // createData(10,'Some Crypto Name', '7,142.89', '+124.25%', '1,178.57', '2,5K', '11,2K'),
    // createData(11,'Meetbits', '1,070.15', '+770.15%', '2,14.3', '4,5K', '17,1K'),
    // createData(12,'Some Crypto Name', '7,142.89', '+124.25%', '1,178.57', '2,5K', '11,2K'),
    // createData(13,'Mutant Ape Yacht Club', '0,047.89', '-92.25%', '5,05.7', '4,7K', '23,5K'),
    // createData(14,'Meetbits', '1,070.15', '+770.15%', '2,14.3', '4,5K', '17,1K'),

];

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
        class: 'mobileCells',
        label: '24h',
    },
    {
        id: 'volume',
        numeric: true,
        disablePadding: false,
        class: 'mobileCells',
        label: '24h Volume',
    },
    {
        id: 'hour2',
        numeric: true,
        disablePadding: false,
        class: 'mobileCells',
        label: '24h',
    },
    {
        id: 'owner',
        numeric: true,
        disablePadding: false,
        class: 'mobileCells',
        label: 'Owners',
    },
    {
        id: 'supply',
        numeric: true,
        disablePadding: false,
        class: 'mobileCells',
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
                        sx={{ fontWeight: '500', fontSize: '16px', lineHeight: '21px', color: alpha(theme.palette.primary.tableHead, 1) }}
                        className={headCell.class}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
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
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

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

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;


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
                            placeholder="Search items, collections and profiles "
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
                <TableContainer sx={{ background: alpha(theme.palette.primary.homeBg, 1) }}>
                    <Table
                        sx={{ minWidth: 250 }}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
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
                            {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
                            {stableSort(rows, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const isItemSelected = isSelected(row.name);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) => handleClick(event, row.name)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.name}
                                            selected={isItemSelected}
                                        >

                                            <TableCell align="left" sx={{ fontWeight: 700, fontSize: '18px', lineHeight: '32px', color: alpha(theme.palette.primary.tableHead, 1) }}>{row.id}</TableCell>
                                            <TableCell
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                                padding="none"
                                                sx={{ fontWeight: 700, fontSize: '20px', lineHeight: '22px', color: alpha(theme.palette.primary.tableHead, 1), whiteSpace: 'nowrap' }}
                                            >
                                                {row.name} {row.name && <img src={vectorCorrect} alt="vectoricon" />}
                                            </TableCell>
                                            <TableCell align="right" sx={{ display: 'flex', alignItems: 'center', fontWeight: 700, fontSize: '18px', lineHeight: '32px', color: alpha(theme.palette.primary.tableHead, 1) }}>
                                                {row.name && <Box sx={{ ml: 1, display: 'flex', justifyContent: 'center' }}><img src={eth} alt="ethicon" /> </Box>}
                                                <Box sx={{ display: 'flex', justifyContent: 'end', flexDirection: 'column' }}><Box>{row.price}</Box><Box className="desktopHidden">{row.hour < 0 ? '' : '+'}{row.hour}% </Box></Box>
                                            </TableCell>
                                            <TableCell className="mobileCells" align="right" sx={{ fontWeight: 700, fontSize: '18px', lineHeight: '32px', color: (row.hour < 0 ? '#EB5757' : '#27AE60') }}>{row.hour < 0 ? '' : '+'}{row.hour}%</TableCell>
                                            <TableCell className="mobileCells" align="right" sx={{ fontWeight: 700, fontSize: '18px', lineHeight: '32px', color: alpha(theme.palette.primary.tableHead, 1) }} >{row.volume}</TableCell>
                                            <TableCell className="mobileCells" align="right" sx={{ fontWeight: 700, fontSize: '18px', lineHeight: '32px', color: (row.hour2 < 0 ? '#EB5757' : '#27AE60') }}>{row.hour2 < 0 ? '' : '+'}{row.hour2}%</TableCell>
                                            <TableCell className="mobileCells" align="right" sx={{ fontWeight: 700, fontSize: '18px', lineHeight: '32px', color: alpha(theme.palette.primary.tableHead, 1) }} >{row.owner}</TableCell>
                                            <TableCell className="mobileCells" align="right" sx={{ fontWeight: 700, fontSize: '18px', lineHeight: '32px', color: alpha(theme.palette.primary.tableHead, 1) }} >{row.supply}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: (dense ? 33 : 53) * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>

                </TableContainer>
                <CustomButton sx={{ mt: 5, mb: 8, padding: '11px 22px' }}>Call to Action</CustomButton>
            </Box>

        </>
    );
}
