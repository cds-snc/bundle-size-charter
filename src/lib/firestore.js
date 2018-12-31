const admin = require("firebase-admin");

let db;

switch (process.env.NODE_ENV) {
  case "dev":
    const serviceAccount = require("../../../bundle-size-tools-firebase-adminsdk.json");
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: process.env.FIRESTORE_URL
    });
    db = admin.firestore();
    break;
  case "test":
    const MockCloudFirestore = require("mock-cloud-firestore");
    const { fixtureData } = require("../__mocks__/firestore.js");
    let firebase = new MockCloudFirestore(fixtureData);
    db = firebase.firestore();
    break;
  default:
    const functions = require("firebase-functions");
    admin.initializeApp(functions.config().firebase);
    db = admin.firestore();
}

module.exports.loadFromFirestore = async (repo, branch) => {
  const reposRef = db.collection("bundle_sizes");
  const query = reposRef
    .where("repo", "==", repo)
    .where("branch", "==", `refs/heads/${branch}`)
    .orderBy("timestamp", "asc");
  return query.get().then(resp => {
    var items = [];
    resp.forEach(r => items.push(r.data()));
    return items;
  });
};
