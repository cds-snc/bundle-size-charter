let AWS = require("aws-sdk");

AWS.config.update({
  region: "ca-central-1"
});

module.exports.getFromDynamo = async repo => {
  let docClient = new AWS.DynamoDB.DocumentClient({ dynamoDbCrc32: false });
  let params = {
    TableName: "bundle_sizes",
    KeyConditionExpression: "#repo = :name",
    ExpressionAttributeNames: {
      "#repo": "repo"
    },
    ExpressionAttributeValues: {
      ":name": repo
    }
  };

  const p = new Promise((resolve, reject) => {
    docClient.query(params, function(err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data.Items);
      }
    });
  });
  let r = await p;
  return r;
};
