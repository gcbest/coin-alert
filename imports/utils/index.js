export function getCurrentPrice(symbol) {
        return fetch(
                // `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${symbol}&to_currency=USD&apikey=`
                `https://api.coinbase.com/v2/prices/spot?currency=USD`
        )
                .then(res => res.json())
                .then(data => data)
                .catch(err => err);
}

export const calculateBTCAmount = (dollarAmount, btcPrice) => parseFloat(dollarAmount) / parseFloat(btcPrice);
