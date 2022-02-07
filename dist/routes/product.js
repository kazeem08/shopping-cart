"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-misused-promises */
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const express_1 = require("express");
const productService_1 = __importDefault(require("../services/productService"));
// Constants
const router = (0, express_1.Router)();
const { OK } = http_status_codes_1.default;
/**
 * Get all products.
 */
router.get('/', (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield productService_1.default.getAll();
    return res.status(OK).json(products);
}));
/**
 * Get one product.
 */
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    // Fetch data
    const product = yield productService_1.default.getOne(id);
    return res.status(OK).json(product);
}));
// Export default
exports.default = router;
