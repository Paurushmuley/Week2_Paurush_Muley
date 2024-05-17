// import pool from './db';
const { query } = require('./db');


async function processOrders(items: any[]) {
  try {
    // Filtering out orders
    const filteredOrders = items.filter(item => item.OrderBlocks.some((block: any) => block.LineNo % 3 !== 0));

    // Storing orderIDs in PostgreSQL database iteratively
    for (const order of filteredOrders) {
      const orderId = order.id;

      // Insert orderID into PostgreSQL using pool
      await query('INSERT INTO orders (orderID) VALUES ($1)', [orderId]);
    }

    return { message: 'Orders processed and stored successfully.' };
  } catch (error) {
    console.error('Error processing orders:', error);
    throw new Error('Internal server error');
  }
}

export default processOrders;