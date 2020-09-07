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
import DirectionsBoatIcon from '@material-ui/icons/DirectionsBoat';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});




export default function ShipsList(props) {
  const classes = useStyles();
  const [page, setPage] = useState(0);
     
      const [rowsPerPage, setRowsPerPage] = useState(4);
      const handleChangePage = (event, newPage) => {
          setPage(newPage);
      }; 
      const handleChangeRowsPerPage = event => {
          setRowsPerPage(parseInt(event.target.value, 4));
          setPage(0);
      };
  const {ships, editShip, addShip} = props;
  if(ships == null || !typeof ships === "Array")
      return null;

      
      const emptyRows =
        rowsPerPage - Math.min(rowsPerPage, ships.length - page * rowsPerPage);

  return (
    
    <div className="flex-container">
      <div className="box">
        <h1>Vessels List</h1>
        <button className="button is-info is-pulled-right" onClick={addShip}>+ Add Ship Position</button>
        
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">DWCC (MTS)</TableCell>
            <TableCell align="right">Type</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Location</TableCell>
            <TableCell align="right">Flag</TableCell>
            <TableCell align="right">Year</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {ships.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((ship) => (
            <TableRow key={ship.id}>   
                    
              <TableCell align="right">{ship.dwcc}</TableCell>
              <TableCell align="right">{ship.type}</TableCell>
              <TableCell align="right">{ship.date}</TableCell>
              <TableCell align="right">{ship.location}</TableCell>
              <TableCell align="right">{ship.flag}</TableCell>
              <TableCell align="right">{ship.year}</TableCell>
              <TableCell> <button className="button is-rounded is-small is-primary" onClick={()=>editShip(ship)}>
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
                    count={ships.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}

                />
    </div>
    </div>
  );
}
