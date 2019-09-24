const createEvent = require('aws-event-mocks');
const event = createEvent({
  template: 'aws:s3',
  merge: {
    Records: [{
      eventName: 'ObjectCreated:Put',
      s3: {
        bucket: {
          name: 'my-bucket-name'
        },
        object: {
          key: 'object-key'
        }
      }
    }]
  }
});
console.log(JSON.stringify(event));
