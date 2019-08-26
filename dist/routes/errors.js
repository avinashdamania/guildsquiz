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
router.use(express_1.default.json());
router.use(express_1.default.urlencoded({ extended: true }));
// define a route handler for the default home page
router.get("/errors/:startDate/:endDate", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    console.log("Called api errors (table)");
    try {
        // TODO: paxss in parameter for custom requested email
        const installs = yield db_1.BQ.getInstallsList(utils_1.EMAIL);
        // Get final results and return as JSON
        const queryCommand = db_1.BQ.buildErrorsQuery(installs, req.params.startDate, req.params.endDate);
        const response = yield db_1.BQ.runQuery(queryCommand);
        res.status(200).json(response);
    }
    catch (err) {
        console.log(err);
        // TODO: res.status() with appropriate error code
    }
}));
router.post("/datedErrors", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    console.log("Called api datedErrors (chart) with startDate: "
        + req.body.startDate + ", endDate: " + req.body.endDate);
    // Get array of dates
    const dateArray = utils_1.getDateArray(req.body.startDate, req.body.endDate);
    // Maps installs to arrays with sum of errors on each day
    const code500Map = new Map();
    const code403Map = new Map();
    const code200Map = new Map();
    try {
        // Query to get sum of codes for each day
        const installs = yield db_1.BQ.getInstallsList(utils_1.EMAIL);
        const queryCommand = db_1.BQ.buildDatedErrorsQuery(installs, req.body.startDate, req.body.endDate);
        const response = yield db_1.BQ.runQuery(queryCommand);
        console.log("Finished Job");
        // Build map for each error type
        installs.forEach((ins) => {
            code500Map.set(ins, new Array(dateArray.length).fill(0));
            code403Map.set(ins, new Array(dateArray.length).fill(0));
            code200Map.set(ins, new Array(dateArray.length).fill(0));
        });
        // console.log(response);
        response.forEach((errorEntry) => {
            const curInstall = errorEntry.install_name;
            const curDate = errorEntry.date.value;
            const requests = errorEntry.requests;
            const code = errorEntry.status;
            if (!code500Map.has(curInstall) || !code403Map.has(curInstall) || !code200Map.has(curInstall)) {
                console.log("ERROR: datedErrors: install name not in prebuilt list");
            }
            let curArr;
            if (code === "500") {
                curArr = code500Map.get(curInstall);
            }
            else if (code === "403") {
                curArr = code403Map.get(curInstall);
            }
            else if (code === "200") {
                curArr = code200Map.get(curInstall);
            }
            else {
                console.log("ERROR: datedErrors API unknown error");
            }
            curArr[dateArray.indexOf(curDate)] = requests;
        });
        const nameArray = new Array();
        const code500Arr = new Array();
        const code403Arr = new Array();
        const code200Arr = new Array();
        for (const [key, value] of code500Map) {
            if (!code403Map.has(key) || !code200Map.has(key)) {
                console.log("ERROR: datedErrorsAPI different keys between maps");
            }
            nameArray.push(key);
            code500Arr.push(value);
            code403Arr.push(code403Map.get(key));
            code200Arr.push(code200Map.get(key));
        }
        const dateData = {
            datesArr: dateArray,
            nameArr: nameArray,
            status200: {
                data: code200Arr,
                sum: utils_1.getSumArray(code200Arr)
            },
            status403: {
                data: code403Arr,
                sum: utils_1.getSumArray(code403Arr)
            },
            status500: {
                data: code500Arr,
                sum: utils_1.getSumArray(code500Arr)
            },
        };
        res.status(200).json(dateData);
    }
    catch (err) {
        console.log(err);
        // TODO: res.status() with appropriate error code
    }
}));
exports.default = router;
//# sourceMappingURL=errors.js.map