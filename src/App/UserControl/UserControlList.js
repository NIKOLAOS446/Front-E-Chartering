import React,{useState} from 'react'
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

export default function UserControlList(props) {
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
        
        const {users, deleteOffer, approveUser, deleteUser } = props;
        const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, users.length - page * rowsPerPage);
        if(users == null || !typeof users === "Array")
            return null;
      
           
      
        return (
          
          <div className="flex-container">
            <div className="box">
              <h1>Not Approved Users</h1>              
          <TableContainer component={Paper}>
            <Table className={classes.table} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                <TableCell align="right">Id</TableCell>
                 <TableCell align="right">Email</TableCell>  
                 <TableCell align="right">Username</TableCell> 
                           
                </TableRow>
              </TableHead>
              <TableBody>
              {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((user, index) => (
                  <TableRow key={user.id}>     
                   <TableCell align="right">{user.id}</TableCell>      
                     <TableCell align="right">{user.email}</TableCell>
                      <TableCell align="right">{user.userName}</TableCell>
                                   
                    <TableCell> <button className="button is-rounded is-small is-primary"  onClick={()=>approveUser(user)}> 
                  <span className="icon is-small">
                    <i className="fa fa-check"></i>
                  </span>
                </button></TableCell>
                <TableCell> <button className="button is-rounded is-small is-primary" onClick={()=>deleteUser(user)}> 
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
                    count={users.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}

                />
          </div>
          </div>
        );
      }