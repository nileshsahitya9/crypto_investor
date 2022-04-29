const fs = require('fs'); 
const csv = require('csv-parser')
const utils = require('./util');




function getTokenLatestValue() {
  return new Promise(function (resolve) {
    const btcLatestToken = { token: "BTC", amount: 0, timestamp: 0 };
    const ethLatestToken = { token: "ETH", amount: 0, timestamp: 0 };
    const xrpLatestToken = { token: "XRP", amount: 0, timestamp: 0 };
    const data = [];

    fs.createReadStream("transactions.csv")
      .pipe(csv())
      .on("data", function (info) {
        if (info.token === "ETH") {
          if (info.timestamp > ethLatestToken.timestamp) {
            ethLatestToken.amount = info.amount;
            ethLatestToken.timestamp = info.timestamp;
          }
        } else if (info.token === "BTC") {
          if (info.timestamp > btcLatestToken.timestamp) {
            btcLatestToken.amount = info.amount;
            btcLatestToken.timestamp = info.timestamp;
          }
        } else if (info.token === "XRP") {
          if (info.timestamp > xrpLatestToken.timestamp) {
            xrpLatestToken.amount = info.amount;
            xrpLatestToken.timestamp = info.timestamp;
          }
        }
      })
      .on("end", function () {
        cryptoCompare = utils.getUSDValues();

        cryptoCompare.then(
          function (result) {
            usdValues = result;
            ethLatestToken.amount = ethLatestToken.amount * usdValues.ETH.USD;
            btcLatestToken.amount = btcLatestToken.amount * usdValues.ETH.USD;
            xrpLatestToken.amount = xrpLatestToken.amount * usdValues.ETH.USD;

            data.push(ethLatestToken);
            data.push(btcLatestToken);
            data.push(xrpLatestToken);
            resolve(data);
          },
        );
      });
  });
}

module.exports =  {
    getTokenLatestValue,
}