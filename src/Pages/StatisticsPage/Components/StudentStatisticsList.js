import {React, useState} from 'react';
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Table from '@mui/material/Table';
import Typography from '@mui/material/Typography';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import ExerciseResultRecord from './ExerciseResultRecord';
import ExerciseSubtable from './ExerciseSubtable';

const StudentStatisticsList = ({record}) => {
    
    return (
        <div>
            <Container>
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                    <TableRow>
                        <TableCell align="left">My Total Progress</TableCell>
                        <TableCell align="left">{Number.parseFloat(record.totalProgress).toFixed(1)+ "%"}</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>Exercises</TableCell>
                            <TableCell>
                                {
                                    record.exercises.length == 0 ?
                                    <Typography variant="h6" gutterBottom component="div">
                                        You have not yet completed any exercises
                                    </Typography>:
                                    <ExerciseSubtable exercises={record.exercises}/>
                                }
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>

            </Container>
        </div>
    );
};

StudentStatisticsList.propTypes = {
    record: PropTypes.shape({
      user: PropTypes.shape({
          name: PropTypes.string,
          surName: PropTypes.string,
      }),
      totalProgress: PropTypes.number,
      exercises: PropTypes.arrayOf(PropTypes.shape({
          id: PropTypes.string,
          title: PropTypes.string,
          coursePercentage: PropTypes.number,
          maxMark: PropTypes.number,
          attempts: PropTypes.arrayOf(PropTypes.shape({
              id: PropTypes.string,
              mark: PropTypes.number,
              timeSpend: PropTypes.string,
          }))
      }))
  })
  };

export default StudentStatisticsList;