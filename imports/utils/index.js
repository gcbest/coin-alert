// C8ASDU8L03FOASTG
// UYH9VBU0JOF1D2HH
export function getCurrentPrice(symbol) {
        return fetch(
                // `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${symbol}&to_currency=USD&apikey=UYH9VBU0JOF1D2HH`
                `https://api.coinbase.com/v2/prices/spot?currency=USD`
        )
                .then(res => res.json())
                .then(data => {
                        console.log(data);
                        return data;
                })
                .catch(err => err);
}
