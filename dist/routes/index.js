"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const errors_1 = __importDefault(require("./errors"));
const installs_1 = __importDefault(require("./installs"));
const router = express_1.default.Router();
router.use("/api", installs_1.default);
router.use("/api", errors_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map