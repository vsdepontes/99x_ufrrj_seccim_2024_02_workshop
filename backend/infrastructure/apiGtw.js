const { Construct } = require('constructs');
const { Cors, RestApi } = require('aws-cdk-lib/aws-apigateway');

class ApiGtw extends Construct {
  api;

  constructor(scope, id) {
    super(scope, id);

    this.api = new RestApi(this, 'api-gtw-rest-api', {
      defaultCorsPreflightOptions: {
        allowOrigins: Cors.ALL_ORIGINS,
        allowMethods: ['POST', 'GET', 'OPTIONS'],
        allowHeaders: Cors.DEFAULT_HEADERS,
      },
      restApiName: 'Seats Service',
    })
  }
}

module.exports = { ApiGtw };