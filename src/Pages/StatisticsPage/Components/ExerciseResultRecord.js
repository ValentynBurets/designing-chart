import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const ExerciseResultRecord = ({record}) => {

    const [open, setOpen] = useState(false);
 
    return (
        <React.Fragment>
        
        <TableRow sm={{width: '100%'}}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {record.title}
          </TableCell>
          <TableCell>{Number.parseFloat(record.coursePercentage).toFixed(1)}</TableCell>
          <TableCell>{Number.parseFloat(record.maxMark).toFixed(1)}</TableCell>
          <TableCell>{Number.parseFloat(record.averageMark).toFixed(1)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Attempts
                </Typography>
                <Table size="small" aria-label="purchases"  align="center">
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">№</TableCell>
                      <TableCell align="left">Mark</TableCell>
                      <TableCell align="left">Time Spended</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {record.attempts.map((attempt, index) => (
                      <TableRow key={attempt.Id}>
                        <TableCell component="th" scope="row">
                          {index + 1}
                        </TableCell>
                        <TableCell align="left">{Number.parseFloat(attempt.mark).toFixed(1)}</TableCell>
                        <TableCell align="left">{attempt.timeSpend}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
                    
      </React.Fragment>
    );
};

ExerciseResultRecord.propTypes ={
  record: PropTypes.shape({
  id: PropTypes.string,
  title: PropTypes.string,
  coursePercentage: PropTypes.number,
  maxMark: PropTypes.number,
  attempts: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      mark: PropTypes.number,
      timeSpend: PropTypes.string,
  }))
})};

export default ExerciseResultRecord;