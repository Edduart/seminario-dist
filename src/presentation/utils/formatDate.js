"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDate = void 0;
function formatDate(dateString) {
    if (!dateString)
        return null;
    const parts = dateString.split("T")[0].split("-");
    return parts.length === 3 ? parts.join("-") : null;
}
exports.formatDate = formatDate;
