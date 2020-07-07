"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var path_1 = tslib_1.__importDefault(require("path"));
var express_1 = tslib_1.__importDefault(require("express"));
var froalaEditor_js_1 = tslib_1.__importDefault(require("../lib/froalaEditor.js"));
var multer_1 = tslib_1.__importDefault(require("multer"));
var sha256_1 = tslib_1.__importDefault(require("sha256"));
var settings_1 = tslib_1.__importDefault(require("../settings"));
var storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path_1.default.resolve() + "/uploads/avatar/");
    },
    filename: function (req, file, cb) {
        var name = sha256_1.default(file.originalname.replace(/([A-Za-zа-яА-Я.0-9-]+)(\.[pngPNGjpgJPGjpegJPEG]+)/gm, '$1'));
        var format = file.originalname.replace(/([A-Za-zа-яА-Я.0-9-]+)(\.[pngPNGjpgJPGjpegJPEG]+)/gm, '$2');
        cb(null, name + format);
    }
});
var uploading = multer_1.default({ storage: storage });
var upload = express_1.default.Router();
upload.post('/image', function (req, res) {
    var currentPath = { path: '' };
    currentPath.path = '../uploads/';
    try {
        froalaEditor_js_1.default.Image.upload(req, currentPath.path, function (err, data) {
            if (err) {
                return res.send(JSON.stringify(err));
            }
            data.link = data.link.slice(2);
            if (settings_1.default.MODE = 'prod') {
                data.link = data.link.replace(/\/public/, '');
            }
            res.send(data);
        });
    }
    catch (error) {
        res.status(400).send('Incorrect query');
    }
});
upload.post('/avatar', uploading.single('avatar'), function (req, res) {
    try {
        var avatar = req.file;
        var path_2 = "/uploads/avatar/" + avatar.filename;
        res.send({ avatar: path_2 });
    }
    catch (error) {
        res.status(400).send('Incorrect query');
    }
});
exports.default = upload;
