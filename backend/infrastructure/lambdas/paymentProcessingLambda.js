const { Construct } = require('constructs');
const { NodejsFunction } = require('aws-cdk-lib/aws-lambda-nodejs');
const { join } = require('path');
const { Runtime } = require('aws-cdk-lib/aws-lambda');
const { Duration } = require('aws-cdk-lib');

class PaymentProcessingLambda extends Construct {
  paymentProcessingLambda;

  constructor(scope, id) {
    super(scope, id);

    this.paymentProcessingLambda = new NodejsFunction(this, 'payment-processing-lambda-deployment', {
      entry: join(__dirname, '../../src/lambdas/paymentProcessing.js'),
      runtime: Runtime.NODEJS_20_X,
      handler: 'handler',
      timeout: Duration.seconds(5),
      memorySize: 128,
    })
  }
}

module.exports = { PaymentProcessingLambda };