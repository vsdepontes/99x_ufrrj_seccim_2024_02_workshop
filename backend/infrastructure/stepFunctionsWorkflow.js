const { Construct } = require('constructs');
const { Duration } = require('aws-cdk-lib');
const { LambdaInvoke } = require('aws-cdk-lib/aws-stepfunctions-tasks');
const {
  Succeed,
  StateMachine,
  DefinitionBody,
  Condition,
  Choice,
} = require('aws-cdk-lib/aws-stepfunctions');

class StepFunctionsWorkflow extends Construct {
  stateMachine;

  constructor(scope, id, props) {
    super(scope, id);

    const paymentProcessingTask = new LambdaInvoke(this, 'payment-processing-task', {
      lambdaFunction: props.paymentProcessingLambda,
      outputPath: '$.Payload',
    });

    const mailingTask = new LambdaInvoke(this, 'mailing-task', {
      lambdaFunction: props.mailingLambda,
      outputPath: '$.Payload',
    });

    const mailingTaskCatch = new LambdaInvoke(this, 'mailing-task-catch', {
      lambdaFunction: props.mailingLambda,
      outputPath: '$.Payload',
    });

    const mailingTaskChoice = new LambdaInvoke(this, 'mailing-task-choice', {
      lambdaFunction: props.mailingLambda,
      outputPath: '$.Payload',
    });

    const bookingCleanupTaskCatch = new LambdaInvoke(this, 'booking-cleanup-task-catch', {
      lambdaFunction: props.bookingCleanupLambda,
      outputPath: '$.Payload',
    });

    const bookingCleanupTaskChoice = new LambdaInvoke(this, 'booking-cleanup-task-choice', {
      lambdaFunction: props.bookingCleanupLambda,
      outputPath: '$.Payload',
    });

    const succeedState = new Succeed(this, 'workflow-complete');

    paymentProcessingTask.addCatch(
      bookingCleanupTaskCatch
        .next(mailingTaskCatch)
        .next(succeedState),
      {
        errors: ['States.ALL'],
        resultPath: '$.errorInfo',
      }
    );

    const checkPaymentStatus = new Choice(this, 'check-payment-status')
      .when(
        Condition.booleanEquals('$.paymentApproved', false),
        bookingCleanupTaskChoice
          .next(mailingTaskChoice)
          .next(succeedState)
      )
      .otherwise(
        mailingTask
          .next(succeedState)
      );

    const workflowDefinition = paymentProcessingTask
      .next(checkPaymentStatus);

    this.stateMachine = new StateMachine(this, 'step-functions-state-machine', {
      definitionBody: DefinitionBody.fromChainable(workflowDefinition),
      timeout: Duration.minutes(2),
    });
  }
}

module.exports = { StepFunctionsWorkflow };