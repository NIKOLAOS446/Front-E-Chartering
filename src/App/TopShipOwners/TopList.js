import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {FaStar} from 'react-icons/fa';
import { withStyles, makeStyles } from '@material-ui/core/styles';
    import Table from '@material-ui/core/Table';
    import TableBody from '@material-ui/core/TableBody';
    import TableCell from '@material-ui/core/TableCell';
    import TableContainer from '@material-ui/core/TableContainer';
    import TableHead from '@material-ui/core/TableHead';
    import TableRow from '@material-ui/core/TableRow';
    import Paper from '@material-ui/core/Paper';

    const StyledTableCell = withStyles((theme) => ({
      head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
      },
      body: {
        fontSize: 14,
      },
    }))(TableCell);
    
    const StyledTableRow = withStyles((theme) => ({
      root: {
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
      },
    }))(TableRow);
    
  
    
    const useStyles = makeStyles({
      table: {
        minWidth: 600,
      },
    });


    
    
    
    
    export default function TopList(props) {
      const classes = useStyles();
      const { Countratings } = props;


      const StarRating = (props) => {
        const {rating}=props;
        return (
          <div>
            {[...Array(5)].map((star,i)=>{
              const ratingvalue= i+1;
              return(
               <label>
                <input type ="radio" name = "rating" value = {ratingvalue}/>
                <FaStar className="star" color ={ratingvalue <= rating ?'#ffc107': '#e4e5e9'} />
                </label>
              );
            })}
          </div>
        );
      }  

     

      return (
        <div className="flex-container">
            <div className="box">
              <h1>Top ShipOwners </h1>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table" size="small">
            <TableHead>
              <TableRow>
              <StyledTableCell>Rank</StyledTableCell>
                <StyledTableCell>ShipOwners</StyledTableCell>
                <StyledTableCell align="right">Rating</StyledTableCell>
                <StyledTableCell align="right">Description</StyledTableCell>
                <StyledTableCell align="right">Positive</StyledTableCell>
                <StyledTableCell align="right">Neutral</StyledTableCell>
                <StyledTableCell align="right">Negative</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Countratings.map((Countrating,i) => (
                <StyledTableRow key = {Countrating.user}>
                  <StyledTableCell align="right">{i+1}</StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {Countrating.user}
                  </StyledTableCell>
                  <StyledTableCell align="right"><StarRating rating ={Countrating.totalScore}/></StyledTableCell>
              <StyledTableCell align="right">The Average Rating is :{Number.parseFloat(Countrating.totalScore).toFixed(2)}/5</StyledTableCell>
              <StyledTableCell component="th" scope="row">
                    {Countrating.positive}
                  </StyledTableCell>  
                  <StyledTableCell component="th" scope="row">
                    {Countrating.neutral}
                  </StyledTableCell> 
                  <StyledTableCell component="th" scope="row">
                    {Countrating.negative}
                  </StyledTableCell>           
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </div>
        </div>
      );
    }
//     <div>

//       <Card className={classes.root}>
//         <CardActionArea>
//           <CardMedia
//             component="img"
//             height="140"
//             image="src/view"
//             title="Best ShipOwners"
//           />
//           <CardContent>
//           {ratings.map(rating=>(
            
//             <span> <Typography variant="body2" color="textSecondary" component="p">
//                {rating.user} : <StarRating rating ={rating.totalScore}/>
//                                The Avg rating is : {Number.parseFloat(rating.totalScore).toFixed(2)}/5 
//             </Typography> </span>  
//             )
//             )
//             }      
//           </CardContent>
//         </CardActionArea>
//       </Card>

//     </div>

//   );
// }

