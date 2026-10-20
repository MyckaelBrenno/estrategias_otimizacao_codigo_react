import React, { useState } from 'react';
import useDebouncedState from './useDebounce';

function SearchInput () {
    const [state, setState] = useState('');
    const debouncedName= useDebouncedState(state)

    function handleChange(event) {
        setState(event.target.value)
        console.log(debouncedName)
    }

    return (
        <input 
            type='search'
            value={state}
            onChange={handleChange}
        />
    )
}

export default SearchInput;