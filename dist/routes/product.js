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
const jet_logger_1 = __importDefault(require("jet-logger"));
const productService_1 = __importDefault(require("../services/productService"));
// Constants
const router = (0, express_1.Router)();
const { OK, NOT_FOUND, BAD_REQUEST, CREATED } = http_status_codes_1.default;
/**
 * Get all products.
 */
router.get('/', (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield productService_1.default.getAll();
        return res.status(OK).json({
            message: 'products fetched successfully',
            data: products,
            error: false,
        });
    }
    catch (e) {
        jet_logger_1.default.err(e.message);
        return res.status(BAD_REQUEST).json({
            error: true,
            message: e.message,
        });
    }
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    // Fetch data
    try {
        const product = yield productService_1.default.addProduct(data);
        return res.status(CREATED).json({
            message: 'product added successfully',
            data: product,
            error: false,
        });
    }
    catch (e) {
        jet_logger_1.default.err(e.message);
        return res.status(BAD_REQUEST).json({
            error: true,
            message: e.message,
        });
    }
}));
/**
 * Get one product.
 */
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        // Fetch data
        const product = yield productService_1.default.getOne(id);
        return res.status(OK).json({
            message: 'product fetched successfully',
            data: product,
            error: false,
        });
    }
    catch (e) {
        jet_logger_1.default.err(e.message);
        return res.status(NOT_FOUND).json({
            error: true,
            message: e.message,
        });
    }
}));
// Export default
exports.default = router;
