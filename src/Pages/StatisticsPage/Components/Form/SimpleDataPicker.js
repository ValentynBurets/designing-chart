import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

const SimpleDatePicker = ({label, value, setValue}) => {
    return (
        <div>
           <Box>
                <FormControl>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label={label}
                            value={value}
                            onChange={(e) => setValue(e)}
                            renderInput={(params) => <TextField {...params} />}/>
                    </LocalizationProvider>
                </FormControl>
            </Box> 
        </div>
    );
};

SimpleDatePicker.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string, 
    setValue : PropTypes.func
};

export default SimpleDatePicker;