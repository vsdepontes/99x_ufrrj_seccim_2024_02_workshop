export const createResponse = (statusCode, body = {}) => ({
  statusCode,
  body: JSON.stringify(body),
  headers: {'Access-Control-Allow-Origin': '*'},
});