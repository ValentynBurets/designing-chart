import React from 'react';
import PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import ExerciseResultRecord from './ExerciseResultRecord';



const ExerciseSubtable = ({exercises}) => {
    return (
        <>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell> </TableCell>
                        <TableCell align="left">Exercise</TableCell>
                        <TableCell align="left">Course Percentage</TableCell>
                        <TableCell align="left">Maximal Mark</TableCell>
                        <TableCell align="left">Average Mark</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {
                    exercises.map(
                        exercise => 
                        <ExerciseResultRecord 
                            key={exercise.Id} 
                            record={exercise}/>
                    )
                }
                </TableBody>
            </Table>
        </>
    );
};

ExerciseSubtable.propTypes = {
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
};
export default ExerciseSubtable;