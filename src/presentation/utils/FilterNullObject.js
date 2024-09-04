"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterNullValues = void 0;
function filterNullValues(obj) {
    if (typeof obj !== "object" || obj === null)
        return obj;
    return Object.fromEntries(Object.entries(obj)
        .filter(([, value]) => value !== null)
        .map(([key, value]) => [key, filterNullValues(value)]));
}
exports.filterNullValues = filterNullValues;
