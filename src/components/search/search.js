import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, geoApiOptions } from "../../api";
//asyncpaginate used for the search text box 
//debouncetimeout is so when the user is inputting to the search box there arent too many requests
//useState needs null or the search bar wont show
const Search = ({onSearchChange}) => {

    const [search, setSearch] = useState(null);

    const loadOptions = (inputValue) => {
      return fetch(`${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`, geoApiOptions)
        .then(response => response.json())
        .then(response => {
          return {
            options: response.data.map((city) => {
              return{
                value: `${city.latitude} ${city.longitude}`,
                label: `${city.name}, ${city.countryCode}`
              }
            })
          }
        })
        .catch(err => console.error(err));
    }

    const handleOnChange = (searchData) =>{
         setSearch(searchData);
         onSearchChange(searchData);
    }

  return (
    <AsyncPaginate 
        placeholder='Search for City'
        debounceTimeout={600}
        value={search}
        onChange={handleOnChange}
        loadOptions={loadOptions}
    />
  )
}

export default Search;