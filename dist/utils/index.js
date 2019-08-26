"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EMAIL = "meschelle.stringer@wpengine.com";
function getDateArray(date1, date2) {
    const numDays = daysBetween(date1, date2);
    const dateArray = [];
    const curDate = new Date(parseInt(date1.slice(0, 4), 10), parseInt(date1.slice(5, 7), 10), parseInt(date1.slice(8, 10), 10) - 1);
    for (let i = 0; i < numDays + 1; i++) {
        curDate.setDate(curDate.getDate() + 1);
        const dateString = curDate.getFullYear() + "-"
            + ("0" + (curDate.getMonth())).slice(-2) + "-"
            + ("0" + curDate.getDate()).slice(-2);
        dateArray.push(dateString);
    }
    return dateArray;
}
exports.getDateArray = getDateArray;
const ONE_DAY = 1000 * 60 * 60 * 24;
function daysBetween(date1, date2) {
    const firstDate = new Date(parseInt(date1.slice(0, 4), 10), parseInt(date1.slice(5, 7), 10), parseInt(date1.slice(8, 10), 10));
    const lastDate = new Date(parseInt(date2.slice(0, 4), 10), parseInt(date2.slice(5, 7), 10), parseInt(date2.slice(8, 10), 10)); // Get 1 day in milliseconds
    // Convert both dates to milliseconds
    const startMS = firstDate.getTime();
    const endMS = lastDate.getTime();
    // Calculate the difference in milliseconds
    const differenceMS = endMS - startMS;
    // Convert back to days and return
    return Math.round(differenceMS / ONE_DAY);
}
// use reduce to sum our array
const add = (a, b) => a + b;
function getSumArray(arr) {
    const summed = new Array();
    arr.forEach((array) => {
        summed.push(array.reduce(add));
    });
    return summed;
}
exports.getSumArray = getSumArray;
//# sourceMappingURL=index.js.map