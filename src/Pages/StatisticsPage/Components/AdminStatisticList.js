import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import Container from '@mui/material/Container';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import StudentStatisticsRecord from './StudentStatisticsRecord';

const AdminStatisticsList = ({records}) => {

    return (
        <div>
            <Container>
            <TableContainer component={Paper}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                    <TableRow>
                        <TableCell>User</TableCell>
                        <TableCell>Total Progress</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            records.length == 0 ?
                            <Typography variant="h6" gutterBottom component="div">
                                There are no students who meet the specified criteria
                            </Typography>:
                            records.map(record => <StudentStatisticsRecord record={record}/>)
                        }           
                    </TableBody>
                </Table>
            </TableContainer>

            </Container>
        </div>
    );
};

AdminStatisticsList.propTypes = {
    records: PropTypes.arrayOf(PropTypes.shape({
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
    }))
};

export default AdminStatisticsList;
