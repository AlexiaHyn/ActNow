import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const topics = ["Gender Equality", "Environment", "Racial Justice", "LGBTQ+", "Anti-War", "Health", "Social Policy", "Civil Rights", "Education", "Poverty", "Animals", "Energy"]

export default function SearchBar(props) {

  const onSearchChange = (event, values) => {
    props.searchCards(values);
  }

  return (
    <div>
      <Autocomplete
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        // options={topics.map((option) => option.title)}
        options={topics}
        onChange={onSearchChange}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search events by topics"
            InputProps={{
              ...params.InputProps,
              type: 'search',
            }}
          />
        )}
      />
    </div>

  )
}
