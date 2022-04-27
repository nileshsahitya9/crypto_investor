const argv = require('minimist')(process.argv);


function getTokenLatestValue() {};

if ( !argv.token && !argv.date ) {
    const response = getTokenLatestValue()
    console.log('With no param, Result: ',response);
} else if ( argv.token && !argv.date ) {
    const response = getTokenLatestValue();
    console.log('With token param, Result: ',response);
} else if ( !argv.token && argv.date ) {
    const response = getTokenLatestValue();
    console.log('With date param, Result: ',response);
} else {
    const response = getTokenLatestValue();
    console.log('With token and date params, Result: ',response);
}