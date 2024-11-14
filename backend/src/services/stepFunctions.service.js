import { SFNClient, StartExecutionCommand } from '@aws-sdk/client-sfn';

export class StepFunctionsService {
  static stateMachineArn = process.env.STATE_MACHINE_ARN;
  static sfnClient = new SFNClient();

  static async startWorkflow(payload) {
    const params = {
      stateMachineArn: this.stateMachineArn,
      input: JSON.stringify(payload),
    }
    const command = new StartExecutionCommand(params);
    return this.sfnClient.send(command);
  }
}