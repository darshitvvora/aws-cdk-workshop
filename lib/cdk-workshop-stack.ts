import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as apigw from '@aws-cdk/aws-apigateway';
import {HitCounter} from './hitcounter';

export class CdkWorkshopStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Define an AWS lambda resource
    const hello = new lambda.Function(this, 'HelloHandler',{
      runtime: lambda.Runtime.NODEJS_10_X,   // Uses NodeJS as runtime
      code: lambda.Code.fromAsset('lambda'),  //Code is loaded from lambda directory
      handler: 'hello.handler'      // handler function code filename.handler function
    });

    const helloWithCounter = new HitCounter(this, 'HelloHitCounter',{
        downstream: hello
      });

    new apigw.LambdaRestApi(this, 'Endpoint', {
      handler: helloWithCounter.handler
    });
  }
}
