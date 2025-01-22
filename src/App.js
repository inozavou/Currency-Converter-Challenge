// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { useState, useEffect } from "react";

export default function App() {
  const [amount, setAmount] = useState(1);
  const [currency1, setCurrency1] = useState("EUR");
  const [currency2, setCurrency2] = useState("USD");
  const [convertedAmount, setConvertedAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleSetAmount(e) {
    setAmount(Number(e.target.value));
  }

  function handleCurrency1(e) {
    setCurrency1(e.target.value);
  }

  function handleCurrency2(e) {
    setCurrency2(e.target.value);
  }

  useEffect(
    function () {
      if (amount !== null && amount !== "") {
        async function getConvertedAmount() {
          setIsLoading(true);
          const res = await fetch(
            `https://api.frankfurter.app/latest?amount=${amount}&from=${currency1}&to=${currency2}`
          );
          // if (!res.ok) throw new Error("Something went wrong...");
          const data = await res.json();
          setConvertedAmount(data.rates[currency2]);
          setIsLoading(false);
        }
        if (currency1 === currency2) return setConvertedAmount(amount);
        getConvertedAmount();
      } else {
        console.log("Invalid Input");
      }
    },
    [amount, currency1, currency2]
  );

  return (
    <div>
      <input
        type="text"
        value={amount}
        onChange={handleSetAmount}
        disabled={isLoading}
      />
      <select value={currency1} onChange={handleCurrency1} disabled={isLoading}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select value={currency2} onChange={handleCurrency2} disabled={isLoading}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>
        {convertedAmount} {currency2}
      </p>
    </div>
  );
}

//Transform the elements into controlled elements.
// Use effect in order to do an API call to the url
