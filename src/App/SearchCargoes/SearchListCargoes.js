import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import SearchIcon from '@material-ui/icons/Search';
import TextField from  '@material-ui/core/TextField';
import  InputAdornment from  '@material-ui/core/InputAdornment';





const useStyles = makeStyles({
    table: {
        width: 500,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
});
const headCells = [
    { id: 'freightIdea', numeric: true, disablePadding: true, label: 'Freight' },
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

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}
function EnhancedTableHead(props) {
    const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;

    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === headCell.id ? order : false}
                        colSpan={7}
                        rowSpan={7}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    //  rowCount: PropTypes.number.isRequired,
};

export default function SearchListCargoes(props) {
    const classes = useStyles();
    const { cargoes, editCargo } = props;
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('freightIdea');
    const [page, setPage] = useState(0);
    const [Search, SetSearch] = useState(cargoes);
    const [rowsPerPage, setRowsPerPage] = useState(3);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeSearch = event => {

        SetSearch(event.target.value);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 3));
        setPage(0);
    };

    const numberFormat = (value) =>
        new Intl.NumberFormat('US', {
            style: 'currency',
            currency: 'USD'
        }).format(value);


    const filteredcargoes = cargoes.filter(cargo => {
        return cargo.cargoType.toString().toLowerCase().indexOf(Search.toString().toLowerCase()) !== -1 ||

            cargo.applicationUser.email.toString().toLowerCase().indexOf(Search.toString().toLowerCase()) !== -1 ||
            cargo.departurePort.toString().toLowerCase().indexOf(Search.toString().toLowerCase()) !== -1
    });
    const emptyRows =
        rowsPerPage - Math.min(rowsPerPage, cargoes.length - page * rowsPerPage);
    if (cargoes == null || !typeof cargoes === "Array")
        return null;

    return (

        <div className="flex-container">
            <div className="box">
                <h1>Search Cargoes</h1>
                <div className="is-pulled-center" icon="fa-fa-search" >
                <form className={classes.root} noValidate autoComplete="off">
  <TextField id="standard-basic" label="Search" 
  onChange={handleChangeSearch}
  InputProps={{
    startAdornment: (
      <InputAdornment position="start">
        <SearchIcon />
      </InputAdornment>
    ),
  }} />
</form>
                                  
                 
                </div>
                <TableContainer component={Paper} >
                    <Table className={classes.table} size="small" aria-label="a dense table" >
                        <EnhancedTableHead
                            classes={classes}
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}

                        />
                        <TableHead >
                            <TableRow>
                                <TableCell align="right">CargoType</TableCell>
                                <TableCell align="right">Quantity</TableCell>
                                <TableCell align="right">Route</TableCell>
                                <TableCell align="right">L/D RATES</TableCell>
                                <TableCell align="right">LAYCAN</TableCell>
                                <TableCell align="right">Freight Idea</TableCell>
                                <TableCell align="right">Charterer</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {stableSort(filteredcargoes, getComparator(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((filteredcargo, index) => (
                                    <TableRow key={filteredcargo.id}>
                                        <TableCell align="right">{filteredcargo.cargoType}</TableCell>
                                        <TableCell align="right">{filteredcargo.quantity}</TableCell>
                                        <TableCell align="right">{filteredcargo.departurePort}-{filteredcargo.destinationPort}</TableCell>
                                        <TableCell align="right">{filteredcargo.dischargingRate}/{filteredcargo.loadingRate}</TableCell>
                                        <TableCell align="right">({filteredcargo.dateFrom})/({filteredcargo.dateTo})</TableCell>
                                        <TableCell align="right">{numberFormat(filteredcargo.freightIdea)}</TableCell>
                                        <TableCell align="right">{filteredcargo.applicationUser.email}</TableCell>
                                        <TableCell><button className="button is-rounded is-small is-primary" onClick={() => editCargo(filteredcargo)} > Send Offer
                    <span className="icon is-small">

                                            </span>
                                        </button></TableCell>
                                    </TableRow>
                                ))}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 53 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    component="div"
                    count={filteredcargoes.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}

                />
            </div>
        </div>
    );
}