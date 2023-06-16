import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Sparklines, SparklinesLine } from 'react-sparklines';
import { FaTwitter, FaFacebook, FaReddit, FaGithub } from 'react-icons/fa'
import DOMPurify from 'dompurify';
import { useParams } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader'

const CoinPage = () => {
  const [coin, setCoin] = useState({});
  const [loading, setLoading] = useState(false)
  const params = useParams()
  const url = `https://api.coingecko.com/api/v3/coins/${params.coinId}?localization=false%20&sparkline=true`



  const showCoins = async () => {
    try {
      const data = await axios
        .get(url)
        .then(res => {
          setCoin(res.data)
          console.log(res.data)
        });
      setLoading(true);
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    showCoins();

  }, []);
  console.log(coin,"--cryptocoin")

  return (
    <>
      {loading ? <div className='rounded-div my-12 py-8'>
        <div className='flex py-8 '>
          <img className='w-20 mr-8' src={coin.image?.large} alt="" />
          <div>
            <p className='text-3xl  font-bold'> {coin?.name} price </p>
            <p> ({coin.symbol?.toUpperCase()} / USD) </p>
          </div>
        </div>

        <div className='grid md:grid-cols-2 gap-8'>
          <div>
            <div className='flex justify-between'>
              {coin.market_data?.current_price ? (<p className='text-3xl font-bold'>  ${coin.market_data.current_price.usd.toLocaleString()} </p>) : null}
              <p> 7 Days </p>
            </div>
            <div>
              <Sparklines data={coin.market_data?.sparkline_7d.price}>
                <SparklinesLine color='green' />
              </Sparklines>
            </div>
            <div className='flex justify-between py-4'>
              <div>
                <p className='text-gray-500 text-sm'> Market Cap </p>
                {coin.market_data?.market_cap ? (<p> {coin.market_data.market_cap.usd.toLocaleString()} </p>) : null}
              </div>
              <div>
                <p className='text-gray-500 text-sm'> Volume 24hr </p>
                {coin.market_data?.market_cap ? (<p> {coin.market_data.total_volume.usd.toLocaleString()} </p>) : null}
              </div>
            </div>

            <div className='flex justify-between py-4'>
              <div>
                <p className='text-gray-500 text-sm'> 24h High</p>
                {coin.market_data?.high_24h ? (<p className='text-green-700 font-semibold'>  {coin.market_data.high_24h.usd.toLocaleString()} </p>) : null}
              </div>

              <div>
                <p className='text-gray-500 text-sm mt-1'> 24h Low</p>
                {coin.market_data?.low_24h ? (<p className='text-red-600 font-semibold'> {coin.market_data.low_24h.usd.toLocaleString()} </p>) : null}
              </div>
            </div>
          </div>

          <div>
            <p className='text-xl font-bold'>Market Stats </p>
            <div className='flex justify-evenly py-4'>
              <div>
                <p className='text-gray-500 text-sm '> Market Rank </p>
                <p className='text-center ml-6'> {coin.market_cap_rank} </p>
              </div>
              <div>
                <p className='text-grey-500 text-sm '> Hashing Algorithm </p>
                {coin.hashing_algorithm ? <p className='text-center'>{coin.hashing_algorithm} </p> : null}
              </div>
              <div>
                <p className='text-gray-500 text-sm '> Trust Score </p>
                {coin.tickers ? <p className=' '> {coin.liquidity_score.toFixed(2)}</p> : null}
              </div>
            </div>

            <div className='flex justify-evenly py-4'>
              <div>
                <p className='text-gray-500 text-sm'>Price Change (24hr) </p>
                {coin.market_data ? (<p className='text-center'> {coin.market_data.price_change_percentage_24h.toFixed(2)} </p>) : null}
              </div>

              <div>
                <p className='text-gray-500 text-sm'>Price Change (7d) </p>
                {coin.market_data ? (<p className='text-center'> {coin.market_data.price_change_percentage_7d.toFixed(2)} </p>) : null}
              </div>

              <div>
                <p className='text-gray-500 text-sm '>Price Change (14d) </p>
                {coin.market_data ? (<p className='text-center'> {coin.market_data.price_change_percentage_14d.toFixed(2)} </p>) : null}
              </div>
            </div>

            <div className='flex justify-evenly py-4'>
              <div>
                <p className='text-gray-500 text-sm'>Price Change (30d) </p>
                {coin.market_data ? (<p className='text-center'> {coin.market_data.price_change_percentage_30d.toFixed(2)} </p>) : null}
              </div>

              <div>
                <p className='text-gray-500 text-sm'>Price Change (60d) </p>
                {coin.market_data ? (<p className='text-center'> {coin.market_data.price_change_percentage_60d.toFixed(2)} </p>) : null}
              </div>

              <div>
                <p className='text-gray-500 text-sm'>Price Change (1y) </p>
                {coin.market_data ? (<p className='text-center'> {coin.market_data.price_change_percentage_1y.toFixed(2)} </p>) : null}
              </div>
            </div>


          </div>


        </div>

        {/* Description */}
        <div className='py-4 '>
          <p className='text-xl font-bold'> About {coin.name}</p>
          <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(coin.description ? coin.description.en : ''), }}></p>
        </div>
      </div> : <div className="flex flex-col w-fit mx-auto mt-[40%] md:mt-[15%]"  >

        <ClipLoader speedMultiplier="1" color='yellow' className='' />

      </div>}
    </>
  )
}

export default CoinPage