"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("../db");
const utils_1 = require("../utils");
const router = express_1.default.Router();
router.get("/installs", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    console.log("Called api installs (get list of install names)");
    // TODO: pass in parameter for custom requested email
    const installs = yield db_1.BQ.getInstallsList(utils_1.EMAIL);
    res.status(200).json(installs);
}));
exports.default = router;
//# sourceMappingURL=installs.js.map