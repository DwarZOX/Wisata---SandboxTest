import { useEffect, useState } from 'react'
import Input from './Input'
import Button from './Button'
import iconCari from '@app/assets/icons/search-normal.png'
import PropTypes from "prop-types";

const Search = ({placeholder, searchByName, handleSearch}) => {
  const [searchValue, setSearchValue] = useState(searchByName ? searchByName : '')
  const handleSearchChange = (e) => {
    setSearchValue(e.target.value)
  }
  const handleSubmit = () => {
    handleSearch(searchValue.toLowerCase())
  }

  useEffect(() => {
    if(searchValue.length == 0){
      handleSubmit()
    }
  },[searchValue])

  const handleKey = (e) => {
    if(e.key === 'Enter'){
      handleSubmit()
    }
  }

  return (
    <span className='flex justify-between items-center max-w-[450px] lg:w-[450px] h-[50px] pl-[8px] px-[4px] rounded-[100px] bg-[#FFFFFF]'>
        <img src={iconCari} className='w-[24px] h-[24px]'/>
        <Input type={'search'} placeholder={placeholder} classname={'w-[100%] h-[80%] border-none outline-none'} value={searchValue} onKeyDown={handleKey} onChange={handleSearchChange}/>
        <Button style={'cari'} onClick={handleSubmit}/>
    </span>
  )
}

Search.propTypes = {
  placeholder: PropTypes.string,
  searchByName: PropTypes.string,
  handleSearch: PropTypes.func
}

export default Search