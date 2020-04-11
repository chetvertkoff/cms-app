"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var dbName = 'CRUD';
var db;
mongodb_1.MongoClient(process.env.URL, { useUnifiedTopology: true })
    .connect(function (err, client) {
    db = client.db(dbName);
});
exports.getMenu = function (callback) {
    db
        .collection('menu')
        .find({})
        .toArray(function (err, data) {
        callback(data, err);
    });
};
