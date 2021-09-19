import './App.css';
import CurrencySelector from "./components/currency-selector/currency-selector.component";
import axios from 'axios';

import { useEffect, useState } from "react";

function App() {
    const [currencies, setCurrencies] = useState({});
    const [currentCurrency, setCurrentCurrency] = useState('');
    const [targetCurrency, setTargetCurrency] = useState('');
    const [conversionAmount, setConversionAmount] = useState('');
    const [conversionResult, setConversionResult] = useState('');

    const calculateResult = async () => {
        const exchangeRateJson = await axios.get(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currentCurrency}/${targetCurrency}.json`)
        const exchangeRate = exchangeRateJson.data[targetCurrency];
        setConversionResult(Math.round(((conversionAmount * exchangeRate) + Number.EPSILON) * 100) / 100);
    }

    useEffect(() => {
        (async () => {
            const currenciesJson = await axios.get('https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.min.json');
            setCurrencies(currenciesJson.data);
        })();
    }, []);

    return (
        <div className="app">
            <h1>Currency Converter</h1>
            <label>Amount to convert</label>
            <input type="number" onChange={e => setConversionAmount(e.target.value)} />
            <label>Current Currency</label>
            <CurrencySelector currencies={currencies} setter={setCurrentCurrency}/>
            <label>Target Currency</label>
            <CurrencySelector currencies={currencies} setter={setTargetCurrency}/>
            <button onClick={() => calculateResult()}>Convert</button>
            {conversionResult ? <p>Result: {conversionResult.toLocaleString()}</p> : null}
        </div>
    );
}

export default App;
