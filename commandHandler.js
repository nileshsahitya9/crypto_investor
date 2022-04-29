const argv = require('minimist')(process.argv);
const csvParser = require('./csvParser');


async function commandHelper() {
  if (!argv.token && !argv.date) {
    const response = await csvParser.getTokenLatestValue();
    console.log("With no param, Result: ", response);
  } else if (argv.token && !argv.date) {
    const response = await csvParser.getTokenLatestValue();
    const resultPerToken = response.filter(function (record) {
      return record.token === argv.token;
    });
    console.log("With token param, Result: ", resultPerToken);
    
  } else if (!argv.token && argv.date) {
    const response = await csvParser.getTokenLatestValue();
    console.log("With date param, Result: ", response);
  } else {
    const response = await csvParser.getTokenLatestValue();
    console.log("With token and date params, Result: ", response);
  }
}

commandHelper();