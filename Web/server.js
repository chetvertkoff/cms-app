"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var express_1 = tslib_1.__importDefault(require("express"));
var body_parser_1 = tslib_1.__importDefault(require("body-parser"));
var menu_1 = tslib_1.__importDefault(require("./routes/menu"));
var parentPages_1 = tslib_1.__importDefault(require("./routes/parentPages"));
var pages_1 = tslib_1.__importDefault(require("./routes/pages"));
var cors_1 = tslib_1.__importDefault(require("cors"));
var upload_1 = tslib_1.__importDefault(require("./routes/upload"));
var user_1 = tslib_1.__importDefault(require("./routes/user"));
var compression_1 = tslib_1.__importDefault(require("compression"));
var app = express_1.default();
var port = process.env.PORT || 5000;
if (process.env.MODE = 'prod') {
    app.use(compression_1.default());
}
app.use(cors_1.default());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ limit: '10mb', extended: true }));
app.use("/uploads", express_1.default.static("uploads", { redirect: false }));
app.use(express_1.default.static('public', { redirect: false }));
app.use('/api/user/', user_1.default);
app.use('/api/parentPage/', parentPages_1.default);
app.use('/api/page/', pages_1.default);
app.use('/api/menu/', menu_1.default);
app.use('/api/upload/', upload_1.default);
if (process.env.MODE = 'prod') {
    app.get('*', function (req, res) {
        res.sendFile('index.html', { root: 'public' });
    });
}
app.listen(port, function () { return console.log("Server running on " + port); });
