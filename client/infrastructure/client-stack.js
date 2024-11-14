const { BucketDeployment, Source } = require("aws-cdk-lib/aws-s3-deployment");
const { Stack, CfnOutput } = require("aws-cdk-lib");
const { resolve } = require("path");
const { S3Bucket } = require('./s3Bucket');
const { CloudFront } = require('./cloudFront');

class ClientStack extends Stack {
  constructor(scope, id) {
    super(scope, id);

    const s3Bucket = new S3Bucket(this, 's3-bucket').s3Bucket;
    const cfDistribution = new CloudFront(
      this,
      'cloud-front',
      {
        s3Bucket,
      }).cfDistribution;

    new BucketDeployment(this, "bucket-deployment", {
      sources: [Source.asset(resolve(__dirname, "../build"))],
      destinationBucket: s3Bucket,
      distribution: cfDistribution,
      distributionPaths: ['/*'],
    });

    new CfnOutput(this, "distribution-url", {
      value: `https://${cfDistribution.domainName}`,
      description: "URL of the static website served via CloudFront",
    });
  }
}

module.exports = { ClientStack };
