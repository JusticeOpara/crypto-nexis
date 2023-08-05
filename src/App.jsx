import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import {Home,Account,Login,Signup,CoinPage} from "./pages"
import axios from 'axios';
import { useEffect, useState } from 'react';
import { AuthContextProvider } from './context/AuthContext';
import FadeLoader from 'react-spinners/FadeLoader'
import { useSelector } from 'react-redux';
import Footer from './components/Footer';



function App() {
  const themeMode = useSelector(state => state.theme.themeMode)
  console.log(themeMode, "--themeMode");

  const [coins, setCoins] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentpage, setCurrentpage] = useState(1)

  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=${currentpage}&sparkline=true`

  useEffect(() => {
    axios.get(url).then((response) => {
      setCoins(response.data)

      setLoading(true)
    })
  }, [url])

  console.log(coins, "---coingecko.com")


  return (
    <div className={`bg-primary ${themeMode}`} >

      <AuthContextProvider>

        <Navbar />

        {loading ? <Routes>
          <Route path='/' element={<Home coins={coins} />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/account' element={<Account />} />

          <Route path='/coin/:coinId' element={<CoinPage />}>
            <Route path=':coindId' />
          </Route>

        </Routes> : <div className="flex flex-col w-fit mx-auto mt-[40%] md:mt-[15%]"  >

          <FadeLoader speedMultiplier="1" size={15} color='yellow' className='' />
          <p className='italic font-semibold'> loading... </p>
        </div>}
        <Footer />

      </AuthContextProvider>

    </div>


  );
}

export default App;
