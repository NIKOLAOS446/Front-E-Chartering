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
import SearchIcon from '@material-ui/icons/Search';
import TextField from  '@material-ui/core/TextField';
import  InputAdornment from  '@material-ui/core/InputAdornment';




const useStyles = makeStyles({
    table: {
        width: 600,
    },
});


export default function SearchListShips(props) {
    const classes = useStyles();
    const { ships, editShip, filtertext, filterUpdate } = props;

    const [page, setPage] = useState(0);
    const [Search, SetSearch] = useState(ships);
    const [rowsPerPage, setRowsPerPage] = useState(4);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeSearch = event  => {
        
        SetSearch(event.target.value);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 4));
        setPage(0);
    };



    
    const filteredships = ships.filter(ship => {
        return ship.type.toString().toLowerCase().indexOf(Search.toString().toLowerCase() )!== -1 || 
        
        ship.applicationUser.email.toString().toLowerCase().indexOf(Search.toString().toLowerCase() )!== -1 ||
        ship.location.toString().toLowerCase().indexOf(Search.toString().toLowerCase() )!== -1;
      });
    const emptyRows =
        rowsPerPage - Math.min(rowsPerPage, ships.length - page * rowsPerPage);
    if (ships == null || !typeof ships === "Array")
        return null;
 
    return (

        <div className="flex-container">
            <div className="box">
                <h1>Search Vessels</h1>
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
                        <TableHead >
                            <TableRow>
                                <TableCell align="right" >DWCC (MTS)</TableCell >
                                <TableCell align="right">Type</TableCell>
                                <TableCell align="right">Date</TableCell>
                                <TableCell align="right">Location</TableCell>
                                <TableCell align="right">Flag</TableCell>
                                <TableCell align="right">Year</TableCell>
                                <TableCell align="right">ShipOwner</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredships.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((filteredship, index) => (
                                    <TableRow key={filteredship.id}>
                                        <TableCell align="right">{filteredship.dwcc}</TableCell>
                                        <TableCell align="right">{filteredship.type}</TableCell>
                                        <TableCell align="right">{filteredship.date}</TableCell>
                                        <TableCell align="right">{filteredship.location}</TableCell>
                                        <TableCell align="right">{filteredship.flag}</TableCell>
                                        <TableCell align="right">{filteredship.year}</TableCell>
                                        <TableCell align="right">{filteredship.applicationUser.email}</TableCell>
                                        <TableCell><button className="button is-rounded is-small is-primary" onClick={() => editShip(filteredship)}> Send Offer
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
                    count={filteredships.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}

                />
            </div>
        </div>
    );
}