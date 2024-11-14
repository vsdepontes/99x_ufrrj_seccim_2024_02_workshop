const { Construct } = require('constructs');
const { Distribution, ViewerProtocolPolicy } = require('aws-cdk-lib/aws-cloudfront');
const { S3StaticWebsiteOrigin} = require('aws-cdk-lib/aws-cloudfront-origins');

class CloudFront extends Construct {
  cfDistribution;

  constructor(scope, id, props) {
    super(scope, id);

    this.cfDistribution = new Distribution(this, 'cloud-front-distribution', {
      defaultRootObject: 'index.html',
      defaultBehavior: {
        origin: new S3StaticWebsiteOrigin(props.s3Bucket),
        viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      },
    });
  }
}

module.exports = { CloudFront };