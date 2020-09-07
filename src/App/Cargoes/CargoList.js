import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    table: {
        width: 600,
    },
});


function CargoList(props) {
    const [page, setPage] = useState(0);
     
      const [rowsPerPage, setRowsPerPage] = useState(4);
      const handleChangePage = (event, newPage) => {
          setPage(newPage);
      }; 
      const handleChangeRowsPerPage = event => {
          setRowsPerPage(parseInt(event.target.value, 4));
          setPage(0);
      };
      const numberFormat = (value) =>
      new Intl.NumberFormat('US', {
        style: 'currency',
        currency: 'USD'
      }).format(value);
    const classes = useStyles();
    const { cargoes, loading, addCargo,editCargo } = props;
    if (cargoes == null || !typeof cargoes === "Array")
        return null;
        const emptyRows =
        rowsPerPage - Math.min(rowsPerPage, cargoes.length - page * rowsPerPage);
    return (
        <div className="flex-container">
            <div className="box">
                <h1>Cargo List</h1>
                <button className="button is-info is-pulled-right" onClick={addCargo}>+ Add Cargo Position</button>

                <TableContainer component={Paper}>
                    <Table className={classes.table} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="right">CargoType</TableCell>
                                <TableCell align="right">Quantity</TableCell>
                                <TableCell align="right">Departure Port</TableCell>
                                <TableCell align="right">Destination Port</TableCell>
                                <TableCell align="right">L/D RATES</TableCell>                               
                                <TableCell align="right">LAYCAN</TableCell>                                
                                <TableCell align="right">Freight Idea</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {cargoes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((cargo) => (
                            <TableRow key={cargo.id}>
                                <TableCell align="right">{cargo.cargoType}</TableCell>
                                <TableCell align="right">{cargo.quantity}</TableCell>
                                <TableCell align="right">{cargo.departurePort}</TableCell>
                                <TableCell align="right">{cargo.destinationPort}</TableCell>
                                <TableCell align="right">{cargo.dischargingRate}/{cargo.loadingRate}</TableCell>                              
                                <TableCell align="right">({cargo.dateFrom})/({cargo.dateTo})</TableCell>
                                <TableCell align="right">{numberFormat(cargo.freightIdea)}</TableCell>
                                <TableCell> <button className="button is-rounded is-small is-primary" onClick={()=>editCargo(cargo)} >
                                    <span className="icon is-small">
                                        <i className="fas fa-edit"></i>
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
                    count={cargoes.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}

                />
            </div>
        </div>
    )
}

export default CargoList;