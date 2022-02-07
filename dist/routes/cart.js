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
const constants_1 = require("../shared/constants");
const cartService_1 = __importDefault(require("../services/cartService"));
// Constants
const router = (0, express_1.Router)();
const { BAD_REQUEST, CREATED, OK } = http_status_codes_1.default;
/**
 * Get all carts.
 */
router.get('/', (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const carts = yield cartService_1.default.getAll();
    return res.status(OK).json(carts);
}));
/**
 * get one cart.
 */
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    // Check param
    if (!id) {
        return res.status(BAD_REQUEST).json({
            error: constants_1.errors.paramMissing,
        });
    }
    // Fetch data
    yield cartService_1.default.getOne(id);
    return res.status(OK).end();
}));
/**
 * add to cart.
 */
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    // Fetch data
    const cart = yield cartService_1.default.addToCart(data);
    return res.status(CREATED).json(cart);
}));
router.delete('/:cartId/:productId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cartId, productId } = req.params;
    // Fetch data
    yield cartService_1.default.removeFromCart({ cartId, productId });
    return res.status(OK).end();
}));
// Export default
exports.default = router;
