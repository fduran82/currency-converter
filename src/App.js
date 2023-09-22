import logo from './images/logo512.png';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  // API
  // `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

  const [amount, setAmount] = useState(1);
  const [fromCur, setFromCur] = useState('EUR');
  const [toCur, setToCur] = useState('USD');
  const [converted, setConverted] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    function() {
      async function convert() {
        setIsLoading(true);
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCur}&to=${toCur}`
        );
        const data = await res.json();
        console.log(data.rates[toCur]);
        setConverted(data.rates[toCur]);
        setIsLoading(false);
      }

      if (fromCur === toCur) return setConverted(amount);

      convert();
    },
    [amount, fromCur, toCur]
  );

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <h1>Currency Converter</h1>
        <p className='App-header-p'>DUVELOPERS&copy;</p>
        <div className='App-header-container'>
          <input
            className='App-input'
            type='text'
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            // disabled={isLoading}
          />
          <div className='App-input-cur'>
            <select
              className='App-select'
              value={fromCur}
              onChange={(e) => setFromCur(e.target.value)}
              disabled={isLoading}
            >
              <option value='USD'>USD</option>
              <option value='EUR'>EUR</option>
              <option value='CAD'>CAD</option>
              <option value='INR'>INR</option>
            </select>
            <select
              className='App-select'
              value={toCur}
              onChange={(e) => setToCur(e.target.value)}
              disabled={isLoading}
            >
              <option value='USD'>USD</option>
              <option value='EUR'>EUR</option>
              <option value='CAD'>CAD</option>
              <option value='INR'>INR</option>
            </select>
          </div>

          <p className='converted'>
            ≈ {converted} {toCur}
          </p>
        </div>
      </header>
    </div>
  );
}

export default App;
