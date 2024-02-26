"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const postContact_controller_1 = __importDefault(require("../controllers/postContact.controller"));
const contactRoutes = (0, express_1.Router)();
contactRoutes.post('/contact', postContact_controller_1.default);
exports.default = contactRoutes;
