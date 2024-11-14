const { Stack, CfnOutput } = require('aws-cdk-lib');
const { DynamoDB } = require('./dynamoDB');
const { ApiGtw } = require('./apiGtw');
const { ApiLambda } = require('./lambdas/apiLambda');
const { LambdaIntegration } = require('aws-cdk-lib/aws-apigateway');
const { MailingLambda } = require('./lambdas/mailingLambda');
const { PaymentProcessingLambda } = require('./lambdas/paymentProcessingLambda');
const { StepFunctionsWorkflow } = require('./stepFunctionsWorkflow');
const { BookingCleanupLambda } = require('./lambdas/bookingCleanupLambda');

class BackendStack extends Stack {
  constructor(scope, id) {
    super(scope, id);

    const dynamodbTable = new DynamoDB(this, 'dynamodb').table;
    const paymentProcessingLambda = new PaymentProcessingLambda(this, 'payment-processing-lambda').paymentProcessingLambda
    const mailingLambda = new MailingLambda(this, 'mailing-lambda').mailingLambda;
    const bookingCleanupLambda = new BookingCleanupLambda(
      this,
      'booking-cleanup-lambda',
      {
        tableName: dynamodbTable.tableName,
      }
    ).bookingCleanupLambda;
    dynamodbTable.grantReadWriteData(bookingCleanupLambda);

    const stateMachine = new StepFunctionsWorkflow(
      this,
      'step-functions-workflow',
      {
        paymentProcessingLambda,
        mailingLambda,
        bookingCleanupLambda
      }
    ).stateMachine;

    const apiLambda = new ApiLambda(
      this,
      'api-lambda',
      {
        tableName: dynamodbTable.tableName,
        stateMachineArn: stateMachine.stateMachineArn
      },
      ).apiLambda;
    stateMachine.grantStartExecution(apiLambda);
    dynamodbTable.grantReadWriteData(apiLambda);

    const restApi = new ApiGtw(this, 'api-gtw').api;
    const restApiIntegration = new LambdaIntegration(apiLambda);
    const seatsResource = restApi.root.addResource('seats');
    seatsResource.addMethod('GET', restApiIntegration);
    seatsResource.addResource('book').addMethod('POST', restApiIntegration);
    seatsResource.addResource('checkout').addMethod('POST', restApiIntegration);
  }
}

module.exports = { BackendStack };