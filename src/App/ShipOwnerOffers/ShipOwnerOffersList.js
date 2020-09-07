import React,{useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';


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
  { id: 'fixedFreight', numeric: true, disablePadding: true, label: 'fixedFreight'},
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
  // rowCount: PropTypes.number.isRequired,
};

export default function SearchListShips(props) {
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
        
        const {offers, deleteOffer, approveOffer } = props;
        const handleRequestSort = (event, property) => {
          const isAsc = orderBy === property && order === 'asc';
          setOrder(isAsc ? 'desc' : 'asc');
          setOrderBy(property);
        };
        const [order, setOrder] = React.useState('asc');
        const [orderBy, setOrderBy] = React.useState('fixedFreight');
        const numberFormat = (value) =>
  new Intl.NumberFormat('US', {
    style: 'currency',
    currency: 'USD'
  }).format(value);
        const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, offers.length - page * rowsPerPage);
        if(offers == null || !typeof offers === "Array")
            return null;
      
           
      
        return (
          
          <div className="flex-container">
            <div className="box">
              <h1>Offers List</h1>              
          <TableContainer component={Paper}>
            <Table className={classes.table} size="small" aria-label="a dense table">
            <EnhancedTableHead
              classes={classes}             
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}  
                         
            />
              <TableHead>
                <TableRow>
                 <TableCell align="right">Ship</TableCell> 
                 <TableCell align="right">Cargo</TableCell> 
                  <TableCell align="right">Quantity(TN)</TableCell>
                  <TableCell align="right">Charterer</TableCell>          
                  <TableCell align="right">Route</TableCell>
                  <TableCell align="right">Laycan</TableCell>
                  <TableCell align="right">Fixed Freight($/TN)</TableCell>
                  <TableCell align="right">Commission</TableCell>
                  
                </TableRow>
              </TableHead>
              <TableBody>
              {stableSort(offers, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((offer, index) => (
                  <TableRow key={offer.id}>           
                     <TableCell align="right">{offer.ship.type}</TableCell>
                    <TableCell align="right">{offer.cargo.cargoType}</TableCell> 
                    <TableCell align="right">{offer.cargo.quantity}</TableCell>
                    <TableCell align="right">{offer.cargoUser.email}</TableCell>                   
                    <TableCell align="right">{offer.cargo.departurePort}-{offer.cargo.destinationPort}</TableCell>
                    <TableCell align="right">{offer.cargo.dateFrom}/{offer.cargo.dateTo}</TableCell>
                    <TableCell align="right">{numberFormat(offer.fixedFreight)}</TableCell>  
                    <TableCell align="right">{offer.commission} %</TableCell>                 
                    <TableCell> <button className="button is-rounded is-small is-primary" onClick={()=>approveOffer(offer)} > 
                  <span className="icon is-small">
                    <i className="fa fa-check"></i>
                  </span>
                </button></TableCell>
                <TableCell> <button className="button is-rounded is-small is-primary" onClick={()=>deleteOffer(offer)} > 
                  <span className="icon is-small">
                  <i className="fa-fa delete"></i>
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
                    count={offers.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}

                />
          </div>
          </div>
        );
      }
    