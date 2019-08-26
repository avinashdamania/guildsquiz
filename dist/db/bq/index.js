"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const bigquery_1 = require("@google-cloud/bigquery");
// Create bigquery client
const bigqueryClient = new bigquery_1.BigQuery();
// Build the SQL query string for querying errors from the database
function buildErrorsQuery(listOfInstallNames, startDate, endDate) {
    // TODO: format list of install names and build query string
    const tempString = listOfInstallNames.toString();
    const listNames = "(\'" + tempString.substr(0, tempString.length) + "\')";
    const correctedListNames = listNames.replace(/,/g, "\',\'");
    const queryCommand = "select Installs.install_name as Install, \
    errors.Errors as ServerErrors, forbidden.Forbidden as Forbidden, ok.OK as OK from \
    (SELECT distinct install_name \
    FROM \`wp-engine-data.access_logs.summary\`  \
    WHERE date between \"" + startDate + "\" and \"" + endDate + "\"  \
    AND install_name in " + correctedListNames + ") as Installs \
    LEFT JOIN  \
    (SELECT install_name, sum(requests) as Errors \
    FROM \`wp-engine-data.access_logs.summary\`  \
    WHERE date between \"" + startDate + "\" and \"" + endDate + "\" \
    AND install_name in " + correctedListNames + " \
    AND status = \'500\'  \
    group by install_name) as errors on Installs.install_name = errors.install_name \
    LEFT JOIN  \
    (SELECT install_name, sum(requests) as Forbidden \
    FROM \`wp-engine-data.access_logs.summary\`  \
    WHERE date between \"" + startDate + "\" and \"" + endDate + "\"  \
    AND install_name in " + correctedListNames + " \
    AND status = \'403\' \
    group by install_name) as forbidden on Installs.install_name = forbidden.install_name \
    LEFT JOIN  \
    (SELECT install_name, sum(requests) as OK \
    FROM \`wp-engine-data.access_logs.summary\`  \
    WHERE date between \"" + startDate + "\" and \"" + endDate + "\"  \
    AND install_name in " + correctedListNames + " \
    AND status = \'200\' \
    group by install_name) as ok on Installs.install_name = ok.install_name \
    order by Installs.install_name \
    LIMIT 1000";
    return queryCommand;
}
exports.buildErrorsQuery = buildErrorsQuery;
function buildDatedErrorsQuery(listOfInstallNames, startDate, endDate) {
    const tempString = listOfInstallNames.toString();
    const listNames = "(\'" + tempString.substr(0, tempString.length) + "\')";
    const correctedListNames = listNames.replace(/,/g, "\',\'");
    const queryCommand1 = "SELECT install_name, date, status, sum(requests) as requests \
    FROM `wp-engine-data.access_logs.summary` \
    WHERE date between \"";
    const queryCommand2 = '\" and \"';
    const queryCommand3 = "\" \
    AND install_name in " + correctedListNames + " \
    AND status in ('500','403','200') \
    group by date, install_name, status \
    order by date, install_name \
    LIMIT 1000";
    const queryCommand = queryCommand1 + startDate + queryCommand2 + endDate + queryCommand3;
    return queryCommand;
}
exports.buildDatedErrorsQuery = buildDatedErrorsQuery;
function buildGetInstallsFromEmailQuery(email) {
    const queryCommand = "SELECT email, install_name FROM \
     \`wp-engine-data.customer_master.view_install_20190611\` \
     WHERE email = \'" + email + "\' \
     GROUP BY email, install_name LIMIT 500";
    return queryCommand;
}
exports.buildGetInstallsFromEmailQuery = buildGetInstallsFromEmailQuery;
// Returns final error results from a list of install names
function runQuery(queryCommand) {
    return __awaiter(this, void 0, void 0, function* () {
        const options = {
            location: "US",
            query: queryCommand
        };
        // Create query job
        const [job] = yield bigqueryClient.createQueryJob(options);
        console.log(`Job ${job.id} started.`);
        // Wait for results and return
        const [rows] = yield job.getQueryResults();
        // rows.forEach((row) => console.log(row));
        return rows;
    });
}
exports.runQuery = runQuery;
function getInstallsList(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const queryCommand = "SELECT email, install_name FROM \
     \`wp-engine-data.customer_master.view_install_20190611\` \
     WHERE email = \'" + email + "\' \
     GROUP BY email, install_name LIMIT 500";
        const installsResponse = yield runQuery(queryCommand);
        const installs = new Array();
        installsResponse.forEach((entry) => {
            installs.push(entry.install_name);
        });
        return installs;
    });
}
exports.getInstallsList = getInstallsList;
//# sourceMappingURL=index.js.map