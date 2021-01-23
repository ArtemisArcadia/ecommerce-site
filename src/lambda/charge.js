const stripe = require('stripe')('you-secret-key') //secret stripe key

exports.handler = (event, context, callback) => {

    //allow POST method
    if(event.httpMethod  !=='POST'){
      return callback (null, {statusCode: 405, body: 'Method Not Allows'});
    }

    const data  = JSON.parse(event.body);

    if(!data)
}