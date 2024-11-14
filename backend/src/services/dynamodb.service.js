import {
  DynamoDBDocumentClient,
  PutCommand,
  QueryCommand,
  UpdateCommand,
  DeleteCommand
} from '@aws-sdk/lib-dynamodb';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

export class DynamoDBService {
  static tableName = process.env.DYNAMODB_TABLE;
  static ddbDocClient = DynamoDBDocumentClient.from(new DynamoDBClient())

  static buildExhibitionID(theaterId, roomId, sessionId) {
    return `${theaterId}#${roomId}#${sessionId}`;
  }

  static async getBookedSeats(exhibitionId) {
    const currentTime = Math.floor(Date.now() / 1000);
    const params = {
      TableName: this.tableName,
      KeyConditionExpression: 'exhibitionId = :exhibitionId',
      FilterExpression: "attribute_not_exists(expires) OR expires >= :currentTime",
      ProjectionExpression: 'seatId',
      ExpressionAttributeValues: {
        ':exhibitionId': exhibitionId,
        ':currentTime': currentTime,
      },
    }
    return this.ddbDocClient.send(new QueryCommand(params));
  }

  static async bookSeat(seatData) {
    const params = {
      TableName: this.tableName,
      ConditionExpression: '(attribute_not_exists(exhibitionId) AND attribute_not_exists(seatId))' +
        ' OR (expires < :currentTime)',
      ExpressionAttributeValues: { ':currentTime': Math.floor(Date.now() / 1000) },
      Item: seatData,
    }
    return this.ddbDocClient.send(new PutCommand(params));
  }

  static async getBookingByPaymentCode(paymentCode) {
    const currentTime = Math.floor(Date.now() / 1000);
    const params = {
      TableName: this.tableName,
      IndexName: 'paymentCodeIndex',
      KeyConditionExpression: 'paymentCode = :paymentCode',
      FilterExpression: 'expires >= :currentTime',
      ExpressionAttributeValues: {
        ':paymentCode': paymentCode,
        ':currentTime': currentTime,
      },
      Limit: 1,
    }
    return this.ddbDocClient.send(new QueryCommand(params));
  }

  static async removeBookingExpiration(exhibitionId, seatId) {
    const params = {
      TableName: this.tableName,
      Key: {
        exhibitionId,
        seatId,
      },
      UpdateExpression: 'REMOVE expires',
    }
    return this.ddbDocClient.send(new UpdateCommand(params));
  }

  static async removeBooking(exhibitionId, seatId) {
    const params = {
      TableName: this.tableName,
      Key: {
        exhibitionId,
        seatId,
      },
    }
    return this.ddbDocClient.send(new DeleteCommand(params));
  }
}
