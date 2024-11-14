const { Construct } = require('constructs');
const { NodejsFunction } = require('aws-cdk-lib/aws-lambda-nodejs');
const { join } = require('path');
const { Runtime } = require('aws-cdk-lib/aws-lambda');
const { Duration } = require('aws-cdk-lib');

class MailingLambda extends Construct {
  mailingLambda;

  constructor(scope, id) {
    super(scope, id);

    this.mailingLambda = new NodejsFunction(this, 'mailing-lambda-deployment', {
      entry: join(__dirname, '../../src/lambdas/mailing.js'),
      runtime: Runtime.NODEJS_20_X,
      handler: 'handler',
      timeout: Duration.seconds(5),
      memorySize: 128,
    })
  }
}

module.exports = { MailingLambda };