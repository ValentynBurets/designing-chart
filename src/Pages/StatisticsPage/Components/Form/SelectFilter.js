import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const SelectFilter = ({options, defaultValue, value, label, onChange}) => {
    return (
        <div>
            <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                    <InputLabel id="select-label">{label}</InputLabel>
                    <Select
                    labelId="select-label"
                    value={value}
                    onChange={e => onChange(e.target.value)}>
                        <MenuItem disable value={null}>{defaultValue.name}</MenuItem>
                        {options.map(
                            option =>
                            <MenuItem value={option.value}>{option.name}
                            </MenuItem>)
                        }
                    </Select>
                </FormControl>
            </Box> 
        </div>
    );
};

SelectFilter.propTypes ={
    options: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.string,
        name: PropTypes.string
    })),
    value: PropTypes.string,
    label: PropTypes.string,
    onChange: PropTypes.func
};

export default SelectFilter;