const fs = require('fs'); 
const csv = require('csv-parser')




function getTokenLatestValue(date,cryptoPrice) {
  return new Promise(function (resolve) {
    const btcLatestToken = { token: "BTC", amount: 0, timestamp: 0 };
    const ethLatestToken = { token: "ETH", amount: 0, timestamp: 0 };
    const xrpLatestToken = { token: "XRP", amount: 0, timestamp: 0 };
    const data = [];
    const btcDateTokenArr = [];
    const ethDateTokenArr = [];
    const xrpDateTokenArr = [];

   
    fs.createReadStream("transactions.csv")
      .pipe(csv())
      .on("data", function (info) {
        let dateFromCSV;
        if(date) {
            const d = new Date(info.timestamp * 1000);
            dateFromCSV = d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear();
        }    
        if (info.token === "ETH") {
          if (info.timestamp > ethLatestToken.timestamp) {
            ethLatestToken.amount = info.amount;
            ethLatestToken.timestamp = info.timestamp;
          }
          if(date && date === dateFromCSV){
            ethDateTokenArr.push({
              token: info.token,
              amount: info.amount * cryptoPrice.ETH.USD,
            });
          }
        } else if (info.token === "BTC") {
          if (info.timestamp > btcLatestToken.timestamp) {
            btcLatestToken.amount = info.amount;
            btcLatestToken.timestamp = info.timestamp;
          }
          if(date && date === dateFromCSV){
            btcDateTokenArr.push({
                token: info.token,
                amount: info.amount * cryptoPrice.BTC.USD,
              });
          }
        } else if (info.token === "XRP") {
          if (info.timestamp > xrpLatestToken.timestamp) {
            xrpLatestToken.amount = info.amount;
            xrpLatestToken.timestamp = info.timestamp;
          }
          if(date && date === dateFromCSV){
            xrpDateTokenArr.push({
              token: info.token,
              amount: info.amount * cryptoPrice.XRP.USD,
            });
          }
        }
      })
      .on("end", function () {
            ethLatestToken.amount = ethLatestToken.amount * cryptoPrice.ETH.USD;
            btcLatestToken.amount = btcLatestToken.amount * cryptoPrice.BTC.USD;
            xrpLatestToken.amount = xrpLatestToken.amount * cryptoPrice.XRP.USD;

            data.push(ethLatestToken);
            data.push(btcLatestToken);
            data.push(xrpLatestToken);
            resolve([data,{ethDateTokenArr,btcDateTokenArr,xrpDateTokenArr}]);
         
      });
  });
}

module.exports =  {
    getTokenLatestValue,
}