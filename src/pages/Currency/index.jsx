import React from 'react'
import currencyFreaks from '../../config/currencyFreaks';

export default function Currency() {
  const [currencies, setCurrencies] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const getCurrencies = async () => {
      const res = await fetch(`https://api.currencyfreaks.com/v2.0/rates/latest?apikey=${currencyFreaks.API_KEY}&symbols=${currencyFreaks.SYMBOLS.join(',')}`);
      const data = await res.json();
      setCurrencies(data.rates);
      setIsLoading(false);
    };

    getCurrencies();
  }, []);

  return (
    <div className='w-screen h-screen flex flex-col justify-center items-center text-white bg-orange-500'>
      {isLoading ? 'Loading...' : (
        <div className='text-center space-y-8'>
          <table className='text-lg'>
            <thead>
              <tr>
                <th>Currency</th>
                <th>We Buy</th>
                <th>Exchange Rate</th>
                <th>We Sell</th>
              </tr>
            </thead>
            <tbody>
            {currencyFreaks?.SYMBOLS?.map((currency, index) => (
              <tr key={index}>
                <td>{currency}</td>
                <td className='px-5'>{Number(currencies[currency] * 1.05).toFixed(4)}</td>
                <td className='px-5'>{Number(currencies[currency]).toFixed(5)}</td>
                <td>{Number(currencies[currency] * 0.95).toFixed(4)}</td>
              </tr>
            ))}
            </tbody>
          </table>

          <div className='text-sm'>
            <p>Rates are based from 1 USD</p>
            <p>This application uses API from <a href="https://currencyfreaks.com">https://currencyfreaks.com</a></p>
          </div>
        </div>
      )}
    </div>
  )
}
