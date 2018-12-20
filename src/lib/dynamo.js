let AWS = require("aws-sdk");

AWS.config.update({
  region: "ca-central-1"
});

module.exports.getFromDynamo = async repo => {
  let docClient = new AWS.DynamoDB.DocumentClient({ dynamoDbCrc32: false });
  let params = {
    TableName: "bundle_sizes",
    KeyConditionExpression: "#repo = :repo",
    ExpressionAttributeNames: {
      "#repo": "repo",
      "#branch": "branch"
    },
    ExpressionAttributeValues: {
      ":repo": repo,
      ":branch": "refs/heads/master"
    },
    FilterExpression: "#branch = :branch"
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
