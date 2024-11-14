const { Construct } = require('constructs');
const { NodejsFunction } = require('aws-cdk-lib/aws-lambda-nodejs');
const { join } = require('path');
const { Runtime } = require('aws-cdk-lib/aws-lambda');
const { Duration } = require('aws-cdk-lib');

class ApiLambda extends Construct {
  apiLambda;

  constructor(scope, id, props) {
    super(scope, id);

    this.apiLambda = new NodejsFunction(this, 'api-lambda-deployment', {
      entry: join(__dirname, '../../src/lambdas/api.js'),
      runtime: Runtime.NODEJS_20_X,
      handler: 'handler',
      timeout: Duration.seconds(5),
      memorySize: 128,
      environment: {
        DYNAMODB_TABLE: props.tableName,
        STATE_MACHINE_ARN: props.stateMachineArn,
      }
    })
  }
}

module.exports = { ApiLambda };