const csv = require("csvtojson");
const fs = require('fs');
const AWS = require('aws-sdk');

AWS.config.update({ region: 'us-east-1' });
var ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

module.exports = async function ({ csvStr, headers, mapper, table }) {  
  let results = await csv({ noheader: false, headers, ignoreEmpty: true }).fromString(csvStr);
  let payload = { RequestItems: {} };
  if (mapper) {
    results = results.map(mapper);
  }
  results = results.map(item => ({ PutRequest: { Item: AWS.DynamoDB.Converter.input(item)['M'] } }));

  var i, j, temparray, batch = 25;
  for (i = 0, j = results.length; i < j; i += batch) {
    temparray = results.slice(i, i + batch);
    payload['RequestItems'][table] = temparray;
    ddb.batchWriteItem(payload, (err, data) => {
      if (err) {
        console.log(err.message); // an error occurred
      } else {
        console.log('Loaded Data!');           // successful response
      }
    });
  }
}