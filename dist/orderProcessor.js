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
Object.defineProperty(exports, "__esModule", { value: true });
// import pool from './db';
const { query } = require('./db');
function processOrders(items) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Filtering out orders
            const filteredOrders = items.filter(item => item.OrderBlocks.some((block) => block.LineNo % 3 !== 0));
            // Storing orderIDs in PostgreSQL database iteratively
            for (const order of filteredOrders) {
                const orderId = order.id;
                // Insert orderID into PostgreSQL using pool
                yield query('INSERT INTO orders (orderID) VALUES ($1)', [orderId]);
            }
            return { message: 'Orders processed and stored successfully.' };
        }
        catch (error) {
            console.error('Error processing orders:', error);
            throw new Error('Internal server error');
        }
    });
}
exports.default = processOrders;
//# sourceMappingURL=orderProcessor.js.map