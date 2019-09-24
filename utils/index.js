
const AWS = require('aws-sdk');

const ddb = new AWS.DynamoDB.DocumentClient();

const s3 = new AWS.S3();

exports.handler = async (event, context, callback) => {
    // Retrieve the bucket & key for the uploaded S3 object that
    // caused this Lambda function to be triggered

    const Bucket = event.Records[0].s3.bucket.name;
    const Key = event.Records[0].s3.object.key;

    // Retrieve the object
    s3.getObject({ 
        Bucket, 
        Key
    }, function(err, data) {
        if (err) {
            console.log(err, err.stack);
            callback(err);
        } else {

            data.Body.toString('utf8')
            callback(null, null);
        }
    });

};
