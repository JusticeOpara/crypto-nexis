import React from 'react'
import SearchCoin from '../components/SearchCoin'
import Trending from '../components/Trending'

const Home = ({coins}) => {
  return (
    <div>
      <Trending/> 
      <SearchCoin coins={coins}/>
       
    </div>
  )
}

export default Home