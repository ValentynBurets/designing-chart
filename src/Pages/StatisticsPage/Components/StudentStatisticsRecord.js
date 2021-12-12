import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import ExerciseResultRecord from './ExerciseResultRecord';
import ExerciseSubtable from './ExerciseSubtable';

const StudentStatisticsRecord = ({record}) => {
    
    return (
      <React.Fragment>
        <TableRow> 
          <TableCell align={record.align} style={{minWidth: record.minWidth, fontWeight: 'bold', fontSize:'20px' }}>{record.user.surName + ' ' + record.user.name}</TableCell>
          <TableCell align={record.align} style={{minWidth: record.minWidth }}>{Number.parseFloat(record.totalProgress).toFixed(1) + "%"}</TableCell>
        </TableRow>
        <TableRow>
                <TableCell>Exercises</TableCell>
                <TableCell>
                  {
                    record.exercises.length == 0 ?
                    <Typography variant="h6" gutterBottom component="div">
                        The student has not yet completed any exercises
                    </Typography>:
                    <ExerciseSubtable exercises={record.exercises}/>
                  }
                </TableCell>

        </TableRow>
      </React.Fragment>
    );
};

StudentStatisticsRecord.propTypes = {
  record: PropTypes.shape({
    user: PropTypes.shape({
        name: PropTypes.string,
        surName: PropTypes.string,
    }),
    toralProgress: PropTypes.number,
    exercise: PropTypes.arrayOf(PropTypes.shape({
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

export default StudentStatisticsRecord;