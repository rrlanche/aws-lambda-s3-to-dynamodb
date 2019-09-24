const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });
const ddb = new AWS.DynamoDB.DocumentClient();

exports.handler = (event, context, cb) => {
  console.log('Received event');
  console.log(JSON.stringify(event));

  const { queryStringParameters = {} } = event || {};
  const { awsRequestId } = context || {};
  const { params = { TableName : 'sample' }, method = 'query', accesskey ='' } = queryStringParameters;

  if (accesskey !== 'regeneron!@2323432432') {
    cb(null, errorResponse('test', awsRequestId));
  }

  ddb[method](params, (err, data) => {
    if (err) {
      cb(null, errorResponse(err.message, awsRequestId));
    }

    cb(null, {
      statusCode: 200,
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        "Access-Control-Allow-Credentials": true // Required for cookies, authorization headers with HTTPS          
      }
    });
  });
};

function errorResponse(errorMessage, awsRequestId) {
  const errResp = {
    statusCode: 200,
    body: JSON.stringify({ errorMessage, awsRequestId }),
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      "Access-Control-Allow-Credentials": true
    },
  };
  console.error(errResp);
  return errResp;
}


// {
//   "resource": "/sample",
//   "path": "/sample",
//   "httpMethod": "GET",
//   "headers": {
//       "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3",
//       "Accept-Encoding": "gzip, deflate, br",
//       "Accept-Language": "en-US,en;q=0.9",
//       "cache-control": "max-age=0",
//       "CloudFront-Forwarded-Proto": "https",
//       "CloudFront-Is-Desktop-Viewer": "true",
//       "CloudFront-Is-Mobile-Viewer": "false",
//       "CloudFront-Is-SmartTV-Viewer": "false",
//       "CloudFront-Is-Tablet-Viewer": "false",
//       "CloudFront-Viewer-Country": "US",
//       "Host": "igg7pnktd5.execute-api.us-east-1.amazonaws.com",
//       "sec-fetch-mode": "navigate",
//       "sec-fetch-site": "none",
//       "sec-fetch-user": "?1",
//       "upgrade-insecure-requests": "1",
//       "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 Safari/537.36",
//       "Via": "2.0 a00eb4657c3b62cedb9b6571825eb82d.cloudfront.net (CloudFront)",
//       "X-Amz-Cf-Id": "J-C76IaGcYueC1XAjMHpmqG8e3LqM4s0YFRWts6L-19Sd65m0V40yg==",
//       "X-Amzn-Trace-Id": "Root=1-5d878f23-a3ec891756a8723b42c0e3fc",
//       "X-Forwarded-For": "108.35.24.18, 52.46.46.181",
//       "X-Forwarded-Port": "443",
//       "X-Forwarded-Proto": "https"
//   },
//   "multiValueHeaders": {
//       "Accept": [
//           "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3"
//       ],
//       "Accept-Encoding": [
//           "gzip, deflate, br"
//       ],
//       "Accept-Language": [
//           "en-US,en;q=0.9"
//       ],
//       "cache-control": [
//           "max-age=0"
//       ],
//       "CloudFront-Forwarded-Proto": [
//           "https"
//       ],
//       "CloudFront-Is-Desktop-Viewer": [
//           "true"
//       ],
//       "CloudFront-Is-Mobile-Viewer": [
//           "false"
//       ],
//       "CloudFront-Is-SmartTV-Viewer": [
//           "false"
//       ],
//       "CloudFront-Is-Tablet-Viewer": [
//           "false"
//       ],
//       "CloudFront-Viewer-Country": [
//           "US"
//       ],
//       "Host": [
//           "igg7pnktd5.execute-api.us-east-1.amazonaws.com"
//       ],
//       "sec-fetch-mode": [
//           "navigate"
//       ],
//       "sec-fetch-site": [
//           "none"
//       ],
//       "sec-fetch-user": [
//           "?1"
//       ],
//       "upgrade-insecure-requests": [
//           "1"
//       ],
//       "User-Agent": [
//           "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 Safari/537.36"
//       ],
//       "Via": [
//           "2.0 a00eb4657c3b62cedb9b6571825eb82d.cloudfront.net (CloudFront)"
//       ],
//       "X-Amz-Cf-Id": [
//           "J-C76IaGcYueC1XAjMHpmqG8e3LqM4s0YFRWts6L-19Sd65m0V40yg=="
//       ],
//       "X-Amzn-Trace-Id": [
//           "Root=1-5d878f23-a3ec891756a8723b42c0e3fc"
//       ],
//       "X-Forwarded-For": [
//           "108.35.24.18, 52.46.46.181"
//       ],
//       "X-Forwarded-Port": [
//           "443"
//       ],
//       "X-Forwarded-Proto": [
//           "https"
//       ]
//   },
//   "queryStringParameters": null,
//   "multiValueQueryStringParameters": null,
//   "pathParameters": null,
//   "stageVariables": null,
//   "requestContext": {
//       "resourceId": "w59zq8",
//       "resourcePath": "/sample",
//       "httpMethod": "GET",
//       "extendedRequestId": "AbNNiH1sIAMFoBg=",
//       "requestTime": "22/Sep/2019:15:11:31 +0000",
//       "path": "/prod/sample",
//       "accountId": "918111936165",
//       "protocol": "HTTP/1.1",
//       "stage": "prod",
//       "domainPrefix": "igg7pnktd5",
//       "requestTimeEpoch": 1569165091379,
//       "requestId": "ab4261d1-7260-48f0-8c78-ac1f54d00b92",
//       "identity": {
//           "cognitoIdentityPoolId": null,
//           "accountId": null,
//           "cognitoIdentityId": null,
//           "caller": null,
//           "sourceIp": "108.35.24.18",
//           "principalOrgId": null,
//           "accessKey": null,
//           "cognitoAuthenticationType": null,
//           "cognitoAuthenticationProvider": null,
//           "userArn": null,
//           "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 Safari/537.36",
//           "user": null
//       },
//       "domainName": "igg7pnktd5.execute-api.us-east-1.amazonaws.com",
//       "apiId": "igg7pnktd5"
//   },
//   "body": null,
//   "isBase64Encoded": false
// }
