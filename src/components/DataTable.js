import * as React from "react";
import PropTypes from "prop-types";
import { useTheme, alpha } from "@mui/material/styles";
import CustomButton from "./CustomButton";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import { visuallyHidden } from "@mui/utils";
import vectorCorrect from "../assets/images/vectorCorrect.svg";
import eth from "../assets/images/eth.png";
import SearchIcon from "@mui/icons-material/Search";
import { Search, SearchIconWrapper, StyledInputBase } from "./CustomStyles";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Avatar, Grid } from "@mui/material";
import placeholderImage from "../assets/images/placeholderImage.jpg";
import { TableSkeleton } from "./Skeleton";
import { Link, NavLink, useNavigate } from "react-router-dom";
import apiDataTable from "./allJsons/dataTable.json";
import StarBorderSharpIcon from '@mui/icons-material/StarBorderSharp';
import portfolio from '../assets/images/portfolio.svg'
import land from '../assets/images/land.svg'
import games from '../assets/images/games.svg'

function descendingComparator(a, b, orderBy) {
    if (parseFloat(b[orderBy]) < parseFloat(a[orderBy])) {
        return -1;
    }
    if (parseFloat(b[orderBy]) > parseFloat(a[orderBy])) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === "desc"
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

function EnhancedTableHead(props) {
    const theme = useTheme();
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };
    const headCellsDesktop = [
        // {
        //     id: 'id',
        //     numeric: false,
        //     disablePadding: true,
        //     class: 'desktopCells',
        //     label: '',
        // },
        {
            id: "name",
            numeric: false,
            disablePadding: false,
            class: "desktopCells",
            label: "Collection",
        },
        {
            id: "floorprice",
            numeric: true,
            disablePadding: true,
            class: "desktopCells",
            label: "Floor Price",
        },
        {
            id: "onedayvalue1",
            numeric: true,
            disablePadding: true,
            class: "mobileCells h24-Hidden",
            label: props.label,
        },
        {
            id: "onedayvolumevalue",
            numeric: true,
            disablePadding: true,
            class: "mobileCells h24-Hidden",
            label: props.label + " Volume",
        },
        // {
        //     id: "onedayvalue2",
        //     numeric: true,
        //     disablePadding: true,
        //     class: "mobileCells h24-Hidden",
        //     label: props.label,
        // },
        {
            id: "owners",
            numeric: true,
            disablePadding: true,
            class: "mobileCells ownerHidden",
            label: "Owners",
        },
        {
            id: "totalsupply",
            numeric: true,
            disablePadding: false,
            class: "mobileCells supplyHidden",
            label: "Supply",
        },
    ];

    return (
        <TableHead>
            <TableRow>
                <TableCell></TableCell>
                {headCellsDesktop.map((headCell) => {
                    return (
                        <TableCell
                            key={headCell.id}
                            align={headCell.numeric ? "right" : "left"}
                            padding={headCell.disablePadding ? "none" : "normal"}
                            sortDirection={orderBy === headCell.id ? order : false}
                            sx={{
                                fontWeight: "500",
                                fontSize: "16px",
                                lineHeight: "21px",
                                color: alpha(theme.palette.primary.tableHead, 1),
                                whiteSpace: "nowrap",
                            }}
                            className={`${headCell.class} pe-0`}
                        >
                            <TableSortLabel
                                active={orderBy === headCell.id}
                                direction={orderBy === headCell.id ? order : "asc"}
                                onClick={createSortHandler(headCell.id)}
                            >
                                {headCell.label}

                                {orderBy === headCell.id ? (
                                    <Box component="span" sx={visuallyHidden}>
                                        {order === "desc"
                                            ? "sorted descending"
                                            : "sorted ascending"}
                                    </Box>
                                ) : null}
                            </TableSortLabel>
                        </TableCell>
                    );
                })}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(["asc", "desc"]).isRequired,
    orderBy: PropTypes.string.isRequired,
    // rowCount: PropTypes.number.isRequired,
};

export default function DataTable() {
    const theme = useTheme();
    const [order, setOrder] = React.useState("asc");
    const [orderBy, setOrderBy] = React.useState("id");
    const [rows, setRowData] = React.useState([]);
    const [searchrows, setSearchRow] = React.useState([]);

    const navigate = useNavigate();

    const collectionNavigation = (slug) => {
        navigate(`/collection/${slug}`);
    };

    async function apiCallforData() {
        const resp = await fetch(
            `https://dh-backend.vercel.app/api/getChainStats`,
            {
                method: "get",
            }
        );
        const rows = await resp.json();
        const localrows = rows.data.map((v) => ({
            imgurl: v.imageUrl,
            name: v.name,
            slug: v.slug,
            isVerified: v.isVerified,
            floorprice: v.stats.floor_price ? v.stats.floor_price : -1,

            onedayvalue1: [
                v.stats.one_day_change ? v.stats.one_day_change : 0,
                v.stats.seven_day_change ? v.stats.seven_day_change : 0,
                v.stats.thirty_day_change ? v.stats.thirty_day_change : 0,
                v.stats.total_volume ? v.stats.total_volume : 0,
            ],

            onedayvolumevalue: [
                v.stats.one_day_volume ? v.stats.one_day_volume : 0,
                v.stats.seven_day_volume ? v.stats.seven_day_volume : 0,
                v.stats.thirty_day_volume ? v.stats.thirty_day_volume : 0,
                v.stats.total_volume ? v.stats.total_volume : 0,
            ],

            onedayvalue2: [
                v.stats.one_day_change ? v.stats.one_day_change : 0,
                v.stats.seven_day_change ? v.stats.seven_day_change : 0,
                v.stats.thirty_day_change ? v.stats.thirty_day_change : 0,
                v.stats.total_volume ? v.stats.total_volume : 0,
            ],

            owners: v.stats.num_owners ? v.stats.num_owners : -1,
            totalsupply: v.totalSupply ? v.totalSupply : -1,
        }));
        // localrows.push({
        //     imgurl: 0,
        //     name: 0,
        //     isVerified: 0,
        //     floorprice: 0,

        //     onedayvalue1: [0, 0, 0, 0],

        //     onedayvolumevalue: [0, 0, 0, 0],

        //     onedayvalue2: [0, 0, 0, 0],

        //     owners: 0,
        //     totalsupply: 0
        // });
        setRowData(localrows);
        setSearchRow(localrows);
    }

    const requestSearch = (event) => {
        const filteredRows = rows.filter((row) => {
            return row.name.toLowerCase().includes(event.target.value.toLowerCase());
        });
        setSearchRow(filteredRows);
    };
    React.useEffect(() => {
        apiCallforData();
    }, []);

    // React.useEffect(() => {
    //     console.log(rows);
    // }, [rows])

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const [dropdown, setDropdown] = React.useState(0);
    const [networkdropdown, setNetworkDropdown] = React.useState(0);
    const [rowfilter, setRowFilter] = React.useState({
        label: "24h",
        option: 0,
    });


    const handleChange = (event) => {
        setDropdown(event.target.value);
        switch (event.target.value) {
            case 1:
                setRowFilter({
                    ...rowfilter,
                    label: "7d",
                    option: event.target.value,
                });
                break;
            case 2:
                setRowFilter({
                    ...rowfilter,
                    label: "30d",
                    option: event.target.value,
                });
                break;
            case 3:
                setRowFilter({
                    ...rowfilter,
                    label: "All Time",
                    option: event.target.value,
                });
                break;
            default:
                setRowFilter({
                    ...rowfilter,
                    label: "24h",
                    option: event.target.value,
                });
                break;
        }
    };

    const [allChain, setallChain] = React.useState({
        label: "allchain",
        option: 0,
    });

    const [ethrows, setEthRow] = React.useState([]);

    async function apiCalleth() {
        const resp = await fetch(
            `https://dh-backend.vercel.app/api/getChainStats?network=eth`,
            {
                method: "get",
            }
        );
        const rows = await resp.json();
        const ethereumrows = rows.data.map((v) => ({
            imgurl: v.imageUrl,
            name: v.name,
            slug: v.slug,
            isVerified: v.isVerified,
            floorprice: v.stats.floor_price ? v.stats.floor_price : -1,

            onedayvalue1: [
                v.stats.one_day_change ? v.stats.one_day_change : 0,
                v.stats.seven_day_change ? v.stats.seven_day_change : 0,
                v.stats.thirty_day_change ? v.stats.thirty_day_change : 0,
                v.stats.total_volume ? v.stats.total_volume : 0,
            ],

            onedayvolumevalue: [
                v.stats.one_day_volume ? v.stats.one_day_volume : 0,
                v.stats.seven_day_volume ? v.stats.seven_day_volume : 0,
                v.stats.thirty_day_volume ? v.stats.thirty_day_volume : 0,
                v.stats.total_volume ? v.stats.total_volume : 0,
            ],

            onedayvalue2: [
                v.stats.one_day_change ? v.stats.one_day_change : 0,
                v.stats.seven_day_change ? v.stats.seven_day_change : 0,
                v.stats.thirty_day_change ? v.stats.thirty_day_change : 0,
                v.stats.total_volume ? v.stats.total_volume : 0,
            ],

            owners: v.stats.num_owners ? v.stats.num_owners : -1,
            totalsupply: v.totalSupply ? v.totalSupply : -1,
        }));
        // localrows.push({
        //     imgurl: 0,
        //     name: 0,
        //     isVerified: 0,
        //     floorprice: 0,

        //     onedayvalue1: [0, 0, 0, 0],

        //     onedayvolumevalue: [0, 0, 0, 0],

        //     onedayvalue2: [0, 0, 0, 0],

        //     owners: 0,
        //     totalsupply: 0
        // });
        setEthRow(ethereumrows);
        setSearchRow(ethereumrows);

    }

    React.useEffect(() => {
        apiCalleth();
    }, []);
    const handleNetworkChange = (event) => {
        setNetworkDropdown(event.target.value);
        switch (event.target.value) {
            case 1:
                setallChain({
                    ...allChain,
                    label: "eth",
                    option: apiCalleth,
                });
                break;
            case 2:
                setallChain({
                    ...allChain,
                    label: "sol",
                    option: event.target.value,
                });
                break;

            default:
                setallChain({
                    ...allChain,
                    label: "allchain",
                    option: apiCallforData,
                });
                break;
        }
    };

    // function allChain() {
    //     alert("hello")
    // }

    return (
        <>
            <Box
                sx={{
                    width: "100%",
                    mt: 5,
                    background: alpha(theme.palette.primary.homeBg, 1),
                    display: "block",
                    textAlign: "center",
                }}
            >
                <Grid sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Box sx={{ fontWeight: 600, fontSize: '36px', lineHeight: '42px', mt: 2 }}>
                        Stats
                    </Box>
                    <Search sx={{ display: "flex", m: 2 }}>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search collections by name or address "
                            inputProps={{ "aria-label": "search" }}
                            sx={{
                                width: { xs: "100%", sm: "400px", md: "500px", lg: "500px" },
                            }}
                            onChange={requestSearch}
                        />
                    </Search>
                </Grid>
                {/* <Grid sx={{ display: "flex", mt: 4 }}> */}
                <Box sx={{ justifyContent: 'space-between', display: 'flex', mt: 3 }}>
                    <Box sx={{ display: 'flex', gap: '62px', alignItems: 'center' }}>
                        <Box sx={{
                            display: 'flex', gap: '9.73px', fontWeight: 500, py: '5px',
                            px: '10px', fontSize: '16px', lineHeight: '25px', cursor: 'pointer', color: '#91939B', "&:hover": {
                                color: alpha(theme.palette.primary.buttonfont, 1),
                                background: '#1E212E',
                                borderRadius: '5px'

                            },
                        }}>
                            <StarBorderSharpIcon sx={{ alignItems: 'end' }} />
                            Popular
                        </Box>
                        <Box sx={{
                            display: 'flex', gap: '9.73px', fontWeight: 500, fontSize: '16px', lineHeight: '25px', cursor: 'pointer', color: '#91939B', "&:hover": {
                                color: alpha(theme.palette.primary.buttonfont, 1),
                                fill: alpha(theme.palette.primary.buttonfont, 1)
                            },
                        }}>
                            <img src={portfolio} />
                            Portfolio
                        </Box>
                        <Box sx={{
                            display: 'flex', gap: '9.73px', fontWeight: 500, fontSize: '16px', lineHeight: '25px', cursor: 'pointer', color: '#91939B', "&:hover": {
                                color: alpha(theme.palette.primary.buttonfont, 1),
                            },
                        }}>
                            <img src={land} />
                            Land
                        </Box>
                        <Box sx={{
                            display: 'flex', gap: '9.73px', fontWeight: 500, fontSize: '16px', lineHeight: '25px', cursor: 'pointer', color: '#91939B', "&:hover": {
                                color: alpha(theme.palette.primary.buttonfont, 1),
                            },
                        }}>
                            <img src={games} />
                            Games
                        </Box>


                    </Box>
                    <Box sx={{ display: 'flex', gap: '20px' }}>
                        <Box
                            sx={{
                                minWidth: 100,
                                display: { xs: "none", sm: "flex", md: "flex", lg: "flex" },
                            }}>
                            <FormControl>
                                <Select
                                    value={networkdropdown}
                                    onChange={handleNetworkChange}
                                    sx={{
                                        "&:hover,&:focus": {
                                            border: "1px solid #485FE6",
                                        },
                                    }}
                                >
                                    <MenuItem value={0}>All Chains</MenuItem>
                                    <MenuItem value={1}>Ethereum</MenuItem>
                                    <MenuItem value={2}>Solana</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        <Box
                            sx={{
                                minWidth: 100,
                                display: { xs: "none", sm: "flex", md: "flex", lg: "flex" },
                            }}>
                            <FormControl>
                                <Select
                                    value={dropdown}
                                    onChange={handleChange}
                                    sx={{
                                        "&:hover,&:focus": {
                                            border: "1px solid #485FE6",
                                        },
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
                </Box>
                {/* </Grid> */}

                <TableContainer
                    fluid="true"
                    sx={{ background: alpha(theme.palette.primary.homeBg, 1), mt: 5 }}
                >
                    <Table
                        className="table-padding pe-0"
                        sx={{ minWidth: 200, borderCollapse: "unset", p: 0 }}
                        aria-labelledby="tableTitle"
                        size="medium" // small | medium
                    >
                        <EnhancedTableHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            // rowCount={rows.length}
                            label={rowfilter.label}
                            option={rowfilter.option}
                        />
                        <TableBody>
                            {searchrows.length !== 0 ? (
                                stableSort(searchrows, getComparator(order, orderBy)).map(
                                    (row, index) => {
                                        const labelId = `enhanced-table-checkbox-${index}`;
                                        return (
                                            <TableRow
                                                sx={{
                                                    width: "100vw",
                                                    cursor: "pointer",
                                                    textDecoration: "none",
                                                }}
                                                hover
                                                tabIndex={-1}
                                                key={index}
                                                component={NavLink}
                                                to={`/collection/${row.slug}`}
                                            // onClick={() => collectionNavigation(row.slug)}
                                            >
                                                <TableCell
                                                    className="padding-0"
                                                    align="left"
                                                    sx={{
                                                        fontWeight: 700,
                                                        fontSize: {
                                                            xs: "12px",
                                                            sm: "18px",
                                                            md: "18px",
                                                            lg: "18px",
                                                        },
                                                        lineHeight: {
                                                            xs: "13px",
                                                            sm: "32px",
                                                            md: "32px",
                                                            lg: "32px",
                                                        },
                                                        textAlign: "center",
                                                        color: alpha(theme.palette.primary.tableHead, 1),
                                                    }}
                                                >
                                                    {index + 1}
                                                </TableCell>
                                                <TableCell
                                                    className="padding-0"
                                                    component="th"
                                                    id={labelId}
                                                    scope="row"
                                                    padding="none"
                                                    sx={{
                                                        fontWeight: 700,
                                                        fontSize: {
                                                            xs: "12px",
                                                            sm: "20px",
                                                            md: "20px",
                                                            lg: "20px",
                                                        },
                                                        lineHeight: {
                                                            xs: "13px",
                                                            sm: "22px",
                                                            md: "22px",
                                                            lg: "22px",
                                                        },
                                                        color: alpha(theme.palette.primary.tableHead, 1),
                                                    }}
                                                >
                                                    <Box sx={{ display: "flex", alignItems: "center" }}>
                                                        <Box sx={{ display: "flex", alignItems: "center" }}>
                                                            <Avatar
                                                                variant="rounded"
                                                                src={row.imgurl && row.imgurl}
                                                                sx={{ width: "46px", height: "46px" }}
                                                            >
                                                                {row.name.substring(0, 1)}
                                                            </Avatar>
                                                        </Box>
                                                        {row.name !== undefined && (
                                                            <Box
                                                                sx={{
                                                                    fontSize: {
                                                                        xs: "12px",
                                                                        sm: "18px",
                                                                        md: "18px",
                                                                        lg: "18px",
                                                                    },
                                                                    maxWidth: "21vw",
                                                                    overflow: "hidden",
                                                                    whiteSpace: "nowrap",
                                                                    textOverflow: "ellipsis",
                                                                    pl: 1,
                                                                    pr: 1,
                                                                }}
                                                            >
                                                                {row.name}
                                                            </Box>
                                                        )}
                                                        {row.isVerified !== undefined &&
                                                            row.isVerified !== false && (
                                                                <Box>
                                                                    <Avatar
                                                                        alt="verified"
                                                                        sx={{
                                                                            width: {
                                                                                xs: "16px",
                                                                                sm: "24px ",
                                                                                md: "24px",
                                                                                lg: "24px",
                                                                            },
                                                                            height: {
                                                                                xs: "16px",
                                                                                sm: "24px ",
                                                                                md: "24px",
                                                                                lg: "24px",
                                                                            },
                                                                        }}
                                                                        src={vectorCorrect}
                                                                    />
                                                                </Box>
                                                            )}
                                                    </Box>
                                                </TableCell>
                                                <TableCell
                                                    className=""
                                                    sx={{
                                                        pl: 0,
                                                        pr: 0,
                                                        fontWeight: 700,
                                                        fontSize: {
                                                            xs: "14px",
                                                            sm: "18px",
                                                            md: "18px",
                                                            lg: "18px",
                                                        },
                                                        lineHeight: {
                                                            xs: "18px",
                                                            sm: "32px",
                                                            md: "32px",
                                                            lg: "32px",
                                                        },
                                                        color: alpha(theme.palette.primary.tableHead, 1),
                                                    }}
                                                >
                                                    {row.floorprice !== -1 && (
                                                        <Box
                                                            sx={{
                                                                display: "flex",
                                                                alignItems: "center",
                                                                justifyContent: "end",
                                                                pt: "10px",
                                                                pb: "10px",
                                                            }}
                                                        >
                                                            <Box
                                                                sx={{
                                                                    display: "flex",
                                                                    flexDirection: "column",
                                                                }}
                                                            >
                                                                <Box sx={{ textAlign: "end" }}>
                                                                    {row.floorprice.toFixed(3)}
                                                                </Box>
                                                                <Box
                                                                    className="desktopHidden"
                                                                    sx={{
                                                                        color:
                                                                            row.onedayvalue1[rowfilter.option] < 0
                                                                                ? "#EB5757"
                                                                                : "#27AE60",
                                                                        fontSize: {
                                                                            xs: "12px",
                                                                            sm: "18px",
                                                                            md: "18px",
                                                                            lg: "18px",
                                                                        },
                                                                    }}
                                                                >
                                                                    {row.onedayvalue1[rowfilter.option] < 0
                                                                        ? ""
                                                                        : "+"}
                                                                    {parseFloat(
                                                                        row.onedayvalue1[rowfilter.option] * 100
                                                                    ).toFixed(2)}
                                                                    %{" "}
                                                                </Box>
                                                            </Box>
                                                            <Box
                                                                sx={{
                                                                    ml: 1,
                                                                    display: "flex",
                                                                    justifyContent: "center",
                                                                }}
                                                            >
                                                                <img src={eth} alt="ethicon" />{" "}
                                                            </Box>
                                                        </Box>
                                                    )}
                                                </TableCell>
                                                <TableCell
                                                    className="mobileCells "
                                                    align="right"
                                                    sx={{
                                                        p: 0,
                                                        fontWeight: 700,
                                                        fontSize: "18px",
                                                        lineHeight: "32px",
                                                        color:
                                                            row.onedayvalue1[rowfilter.option] < 0
                                                                ? "#EB5757"
                                                                : "#27AE60",
                                                    }}
                                                >
                                                    {row.onedayvalue1[rowfilter.option] !== undefined && (
                                                        <Box className="h24-1Hidden" sx={{ pl: 2 }}>
                                                            {row.onedayvalue1[rowfilter.option] < 0
                                                                ? ""
                                                                : "+"}
                                                            {parseFloat(
                                                                row.onedayvalue1[rowfilter.option] * 100
                                                            ).toFixed(2)}
                                                            %
                                                        </Box>
                                                    )}
                                                </TableCell>
                                                <TableCell
                                                    className="mobileCells "
                                                    align="right"
                                                    sx={{
                                                        p: 0,
                                                        fontWeight: 700,
                                                        fontSize: "18px",
                                                        lineHeight: "32px",
                                                        color: alpha(theme.palette.primary.tableHead, 1),
                                                    }}
                                                >
                                                    {row.onedayvolumevalue[rowfilter.option] !==
                                                        undefined && (
                                                            <Box
                                                                sx={{
                                                                    display: "flex",
                                                                    alignItems: "center",
                                                                    justifyContent: "end",
                                                                    pt: "10px",
                                                                    pb: "10px",
                                                                }}
                                                            >
                                                                <Box
                                                                    sx={{
                                                                        display: "flex",
                                                                        flexDirection: "column",
                                                                    }}
                                                                >
                                                                    <Box className="h24-Hidden">
                                                                        {parseFloat(
                                                                            row.onedayvolumevalue[rowfilter.option]
                                                                        ).toFixed(2)}
                                                                    </Box>
                                                                </Box>
                                                                <Box
                                                                    className="h24-Hidden"
                                                                    sx={{
                                                                        ml: 1,
                                                                        display: "flex",
                                                                        justifyContent: "center",
                                                                    }}
                                                                >
                                                                    <img src={eth} alt="ethicon" />{" "}
                                                                </Box>
                                                            </Box>
                                                        )}
                                                </TableCell>
                                                {/* <TableCell
                                                    className="mobileCells "
                                                    align="right"
                                                    sx={{
                                                        p: 0,
                                                        fontWeight: 700,
                                                        fontSize: "18px",
                                                        lineHeight: "32px",
                                                        color:
                                                            row.onedayvalue2[rowfilter.option] < 0
                                                                ? "#EB5757"
                                                                : "#27AE60",
                                                    }}
                                                >
                                                    {row.onedayvalue2[rowfilter.option] !== undefined && (
                                                        <Box className="h24-2Hidden" sx={{ pl: 2 }}>
                                                            {row.onedayvalue2[rowfilter.option] < 0
                                                                ? ""
                                                                : "+"}
                                                            {parseFloat(
                                                                row.onedayvalue2[rowfilter.option] * 100
                                                            ).toFixed(2)}
                                                            %
                                                        </Box>
                                                    )}
                                                </TableCell> */}
                                                <TableCell
                                                    className="mobileCells "
                                                    align="right"
                                                    sx={{
                                                        p: 0,
                                                        fontWeight: 700,
                                                        fontSize: "18px",
                                                        lineHeight: "32px",
                                                        color: alpha(theme.palette.primary.tableHead, 1),
                                                    }}
                                                >
                                                    {row.owners !== -1 && (
                                                        <Box className="ownerHidden" sx={{ p: 2 }}>
                                                            {row.owners < 1000
                                                                ? row.owners
                                                                : (row.owners / 1000).toFixed(1) + "K"}
                                                        </Box>
                                                    )}
                                                </TableCell>
                                                <TableCell
                                                    className="mobileCells "
                                                    align="right"
                                                    sx={{
                                                        p: 0,
                                                        fontWeight: 700,
                                                        fontSize: "18px",
                                                        lineHeight: "32px",
                                                        color: alpha(theme.palette.primary.tableHead, 1),
                                                    }}
                                                >
                                                    {row.totalsupply !== -1 && (
                                                        <Box className="supplyHidden" sx={{ p: 2 }}>
                                                            {row.totalsupply < 1000
                                                                ? row.totalsupply
                                                                : (row.totalsupply / 1000).toFixed(1) + "K"}
                                                        </Box>
                                                    )}
                                                </TableCell>
                                                {/* </Box> */}
                                            </TableRow>
                                        );
                                    }
                                )
                            ) : rows.length === 0 ? (
                                <>
                                    <TableSkeleton />
                                    <TableSkeleton />
                                    <TableSkeleton />
                                    <TableSkeleton />
                                    <TableSkeleton />
                                    <TableSkeleton />
                                </>
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={8}>
                                        <Box sx={{ display: "flex", justifyContent: "center" }}>
                                            {" "}
                                            No Data Available
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <CustomButton sx={{ mt: 5, mb: 8, padding: "11px 22px" }}>
                    Call to Action
                </CustomButton>
            </Box>
        </>
    );
}
