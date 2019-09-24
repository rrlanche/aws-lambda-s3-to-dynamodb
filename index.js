
const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });
const s3 = new AWS.S3();
const convert = require('./utils/convert');
const configs = require('./configs');

exports.handler = (event, context, callback) => {
    // Retrieve the bucket & key for the uploaded S3 object that
    // caused this Lambda function to be triggered
    console.log('S3 TRIGGER');
    const Bucket = event.Records[0].s3.bucket.name;
    const Key = event.Records[0].s3.object.key;

    console.log(`${Bucket}:${Key}`);

    // Retrieve the object
    s3.getObject({ 
        Bucket, 
        Key
    }, async (err, data) => {
        if (err) {
            console.log(err, err.stack);
            callback(err);
        } else {
            console.log('PROCESS CONFIG', configs[Key]);

            if (configs[Key]){
                const { headers, mapper = false, table } = configs[Key];                
                await convert({ csvStr: data.Body.toString('utf8'), headers, mapper, table });
            }

            callback(null, null);
        }
    });
};
