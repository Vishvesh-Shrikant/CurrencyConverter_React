import { useState, useTransition } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import InputBox from './Components/InputBox.jsx'
import useCurrencyInfo from './hooks/useCurrencyInfo'

function App() {
  const[amount, setAmount]=useState(0)
  const[fromCurrency, setFrom]= useState("usd")
  const[toCurrency, setTo]=useState("inr")
  const [convertedAmt, setConvertedAmt] =useState(0)

  const getCurrencyInfo=useCurrencyInfo(fromCurrency)
  const options=Object.keys(getCurrencyInfo)

  const convert=()=>
  {
    setConvertedAmt(amount*getCurrencyInfo[toCurrency])
    console.log(Number(convertedAmt))
  }
  const swap=()=>
  {
    let from=fromCurrency
    setFrom(toCurrency)
    setTo(from)
    let amt=amount
    setAmount(convertedAmt)
    setConvertedAmt(amt)
  }
  return (
    <>
      <div className='h-screen w-full flex flex-wrap justify-center items-center bg-cover bg-no-repeat'
      style={{backgroundImage:`url(https://media.istockphoto.com/id/1487894858/photo/candlestick-chart-and-data-of-financial-market.jpg?b=1&s=612x612&w=0&k=20&c=gw1Wp2iJ0vqWUW2llWepg4vVYfxTnT90Cqb0rKkkeQA=)`}}>
          <div className='w-full'>
            <div className='w-full mx-auto max-w-md border border-gray-100 rounded-lg p-5 backdrop-blur-sm bg-white/40'>

              <form onSubmit={(e)=>{
                 e.preventDefault()
                 convert()
              }}>
                  <div className='w-full mb-1'>
                    <InputBox
                      label="From"
                      amount={amount}
                      currencyOption={options}
                      onCurrencyChnange={(currency)=>setFrom(currency)}
                      onAmountChange={(amount)=> setAmount(amount)}
                      selectedCurrency={fromCurrency}
                    />
                  </div>
                  <div className='relative w-full h-0.5'>
                    <div className='absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5'
                    onClick={()=>swap()}> Swap</div>
                  </div>
                  <div className='w-full mb-1'>
                    <InputBox
                      label="To"
                      currencyOption={options}
                      amount={convertedAmt}
                      onCurrencyChnange={(currency)=>setTo(currency)}
                      selectedCurrency={toCurrency}
                      amountDisabled
                    />
                    
                  </div>
                  <button type='submit'
                    className='w-full bg-blue-600 text-white px-4 py-3 rounded-lg'
                    onClick={(e)=>
                    {
                      e.preventDefault()
                      convert()
                    }}>Convert {fromCurrency.toUpperCase()} to {toCurrency.toUpperCase()}</button>
              </form>


            </div>
          </div>
      </div>
    </>
  )
}

export default App
