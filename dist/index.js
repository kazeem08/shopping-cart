"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/restrict-template-expressions */
const jet_logger_1 = __importDefault(require("jet-logger"));
const server_1 = __importDefault(require("./server"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
mongoose_1.default.connect(`${process.env.MONGO_URI}`);
// Constants
const serverStartMsg = 'Express server started on port: ', port = (process.env.PORT || 3000);
// Start server
server_1.default.listen(port, () => {
    jet_logger_1.default.info(serverStartMsg + port);
});
