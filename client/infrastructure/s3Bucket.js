const { Construct } = require('constructs');
const { BlockPublicAccess, Bucket } = require('aws-cdk-lib/aws-s3');
const { RemovalPolicy } = require('aws-cdk-lib');

class S3Bucket extends Construct {
  s3Bucket;

  constructor(scope, id) {
    super(scope, id);

    this.s3Bucket = new Bucket(this, "s3-bucket-resource", {
      websiteIndexDocument: "index.html",
      websiteErrorDocument: "index.html",
      blockPublicAccess: BlockPublicAccess.BLOCK_ACLS,
      publicReadAccess: true,
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });
  }
}

module.exports = { S3Bucket };