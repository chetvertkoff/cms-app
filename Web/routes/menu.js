"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var express_1 = tslib_1.__importDefault(require("express"));
var menu_1 = require("./../controller/menu");
var menu = express_1.default.Router();
menu.get('/', menu_1.getFullmenu);
exports.default = menu;
