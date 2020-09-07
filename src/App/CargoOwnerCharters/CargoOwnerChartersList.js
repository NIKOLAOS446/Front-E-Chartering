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



const useStyles = makeStyles({
  table: {
    width: 500,
  },
});

export default function ShipOwnerChartersList(props) {
  const classes = useStyles();

  const numberFormat = (value) =>
    new Intl.NumberFormat('US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);

  const formatDate = (string) => {
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(string).toLocaleDateString([], options);
  }
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const subtotal = (items) => {
    return items.map(({ fixedFreight }) => fixedFreight).reduce((sum, i) => sum + i, 0);
  }


  const avgScore = (items) => {
    return (items.map(({ fixedFreight }) => fixedFreight).reduce((sum, i) => sum + i, 0)) / items.length;
  }


  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 3));
    setPage(0);
  };


  const { charters, editCharter, currentDate } = props;
  const invoiceSubtotal = subtotal(charters);
  const averagefreight = avgScore(charters);
  console.log(invoiceSubtotal);
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, charters.length - page * rowsPerPage);
  if (charters == null || !typeof offers === "Array")
    return null;



  return (

    <div className="flex-container">
      <div className="box">
        <h1>My Charters</h1>
        <TableContainer component={Paper}>
          <Table className={classes.table} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell align="right">Ship</TableCell>
                <TableCell align="right">Cargo</TableCell>
                <TableCell align="right">Quantity(TN)</TableCell>
                <TableCell align="right">ShipOwner</TableCell>
                <TableCell align="right">Route</TableCell>
                <TableCell align="right">Laycan</TableCell>

                <TableCell align="right">Fixed Freight($/TN)</TableCell>
                <TableCell align="right">Commission</TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {charters.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((charter, index) => (
                  <TableRow key={charter.id}>
                    <TableCell align="right">{charter.ship.type}, {charter.ship.id}</TableCell>
                    <TableCell align="right">{charter.cargo.cargoType},{charter.cargo.id}</TableCell>
                    <TableCell align="right">{charter.cargo.quantity}</TableCell>
                    <TableCell align="right">{charter.shipUser.email}</TableCell>
                    <TableCell align="right">{charter.cargo.departurePort}-{charter.cargo.destinationPort}</TableCell>
                    <TableCell align="right">{charter.cargo.dateFrom}/{charter.cargo.dateTo}</TableCell>

                    <TableCell align="right"> {numberFormat(charter.fixedFreight)}</TableCell>
                    <TableCell align="right"> {charter.commission} %</TableCell>
                    {(currentDate >= charter.cargo.dateTo) ? (<TableCell align="right"><button className="button is-rounded is-small is-primary" onClick={() => editCharter(charter)} > Rate
                    <span className="icon is-small">

                      </span>
                    </button> </TableCell>) : null}
                  </TableRow>
                ))}
              <TableRow>
                <TableCell colSpan={6}><strong>Total Freight</strong></TableCell>
                <TableCell align="right">{numberFormat(invoiceSubtotal)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={6}><strong>Average Freight</strong></TableCell>
                {(charters.length != 0) ? <TableCell align="right">{numberFormat(averagefreight)}</TableCell>
                  : <TableCell align="right">0,00 $</TableCell>}
              </TableRow>
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
          count={charters.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}

        />
      </div>
    </div>
  );
}