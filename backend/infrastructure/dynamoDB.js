const { AttributeType, BillingMode, ProjectionType, Table } = require('aws-cdk-lib/aws-dynamodb');
const { RemovalPolicy } = require('aws-cdk-lib');
const { Construct } = require('constructs');

class DynamoDB extends Construct {
  table;

  constructor(scope, id) {
    super(scope, id);

    this.table = new Table(this, 'dynamodb-table', {
      tableName: 'booked-seats',
      partitionKey: {
        name: 'exhibitionId',
        type: AttributeType.STRING,
      },
      sortKey: {
        name: 'seatId',
        type: AttributeType.STRING,
      },
      billingMode: BillingMode.PAY_PER_REQUEST,
      timeToLiveAttribute: 'expires',
      removalPolicy: RemovalPolicy.DESTROY,
    });

    this.table.addGlobalSecondaryIndex({
      indexName: 'paymentCodeIndex',
      partitionKey: {
        name: 'paymentCode',
        type: AttributeType.STRING,
      },
      projectionType: ProjectionType.ALL,
    });
  }
}

module.exports = { DynamoDB };