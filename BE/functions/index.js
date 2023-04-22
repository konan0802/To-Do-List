/* eslint-disable max-len */
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

const db = admin.firestore();

// タスクの作成
exports.addTask = functions.https.onCall(async (data, context) => {
  const newTask = {
    type: data.type,
    name: data.name,
    est: data.est,
    passed: data.passed,
    order: data.order,
  };
  const docRef = await db.collection("tasks").add(newTask);
  const doc = await docRef.get();
  return {...doc.data(), id: doc.id};
});

// タスクの読み込み
exports.getTasks = functions.https.onRequest(async (req, res) => {
  const tasksSnapshot = await admin.firestore().collection("tasks").orderBy("order").get();
  const tasks = [];
  tasksSnapshot.forEach((doc) => {
    tasks.push({id: doc.id, ...doc.data()});
  });
  res.status(200).send(tasks);
});

// タスクの更新
exports.updateTask = functions.https.onCall(async (data, context) => {
  await db.collection("tasks").doc(data.id).update(data.updates);
  return {success: true};
});

// タスクの削除
exports.deleteTask = functions.https.onCall(async (data, context) => {
  await db.collection("tasks").doc(data.id).delete();
  return {success: true};
});
