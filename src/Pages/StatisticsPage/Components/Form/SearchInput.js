import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@material-ui/icons/Search';

const SearchInput = ({value, setValue, label}) => {
    return (
        <div>
            <Box sx={{ display: 'flex',  alignItems: 'center' }}>
                <TextField value={value}
                onChange={e => setValue(e.target.value)}
                 label={label} />
                <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                    <SearchIcon />
                </IconButton>
            </Box>
        </div>
    );
};

SearchInput.propTypes = {
    value: PropTypes.string, 
    setValue: PropTypes.func, 
    label: PropTypes.string,
}

export default SearchInput;