const { Construct } = require('constructs');
const { NodejsFunction } = require('aws-cdk-lib/aws-lambda-nodejs');
const { join } = require('path');
const { Runtime } = require('aws-cdk-lib/aws-lambda');
const { Duration } = require('aws-cdk-lib');

class BookingCleanupLambda extends Construct {
  bookingCleanupLambda;

  constructor(scope, id, props) {
    super(scope, id);

    this.bookingCleanupLambda = new NodejsFunction(this, 'booking-cleanup-lambda-deployment', {
      entry: join(__dirname, '../../src/lambdas/bookingCleanup.js'),
      runtime: Runtime.NODEJS_20_X,
      handler: 'handler',
      timeout: Duration.seconds(5),
      memorySize: 128,
      environment: {
        DYNAMODB_TABLE: props.tableName,
      }
    })
  }
}

module.exports = { BookingCleanupLambda };