const argv = require('minimist')(process.argv);
const csvParser = require('./csvParser');
const utils = require('./util');

let cryptoUSDPrice;


async function setCryptpPriceGloablly() {
    cryptoUSDPrice = await utils.getUSDValues();
}

async function commandHelper() {
  if (!argv.token && !argv.date) {
    const response = await csvParser.getTokenLatestValue(null, cryptoUSDPrice);
    console.log("With no param, Result: ", response);
  } else if (argv.token && !argv.date) {
    const response = await csvParser.getTokenLatestValue(null, cryptoUSDPrice);
    const resultPerToken = response[0].filter(function (record) {
      return record.token === argv.token;
    });
    console.log("With token param, Result: ", resultPerToken);
    
  } else if (!argv.token && argv.date) {
    const response = await csvParser.getTokenLatestValue(argv.date, cryptoUSDPrice);
    console.log("With date param, Result: ", response[1]);
  } else {
    const response = await csvParser.getTokenLatestValue(argv.date, cryptoUSDPrice);
    const obj = response[1];
    const input = argv.token.toLowerCase() + 'DateTokenArr';
    
    console.log("With token and date params, Result: ",obj[input]);
  }
}
 async function callCommands() {
    await setCryptpPriceGloablly();
    commandHelper();
 }


 callCommands();