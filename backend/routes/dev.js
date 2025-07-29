export default async function devRoutes(fastify, options) {
  // Check the db data
  fastify.get('/api/allTable', async (request, reply) => {
    const tablesMeta = await fastify.db.all(
      "SELECT name FROM sqlite_master WHERE type='table'"
    );
    const dbTables = [];
    for (const table of tablesMeta) {
      const db = await fastify.db.all(`SELECT * FROM ${table.name}`);
      dbTables.push({ name: table.name, data: db });
    }
    return { dbTables };
  });

  // Create Dummy Products
  fastify.get('/api/resetDummyProducts', async (request, reply) => {
    await fastify.db.run(' DELETE FROM products');
    await fastify.db.run(
      `INSERT INTO products (name, stock, price) VALUES 
      ('BBQ Chips', 100, 600),
      ('Salted Pretzels', 150, 450),
      ('Cheddar Popcorn', 120, 550),
      ('Spicy Nachos', 80, 700),
      ('Honey Roasted Peanuts', 200, 500),
      ('Cinnamon Apple Chips', 90, 650),
      ('Dark Chocolate Almonds', 110, 800),
      ('Sea Salted Cashews', 130, 750),
      ('BBQ Flavored Peanuts', 140, 600),
      ('Spicy Cheese Puffs', 160, 700),
      ('Sour Cream and Onion Chips', 170, 550),
      ('Buffalo Wing Pretzels', 180, 600),
      ('Ranch Flavored Popcorn', 190, 650),
      ('Garlic Parmesan Nachos', 200, 700),
      ('Sweet Chili Peanuts', 210, 500), 
      ('Maple Glazed Apple Chips', 220, 650),
      ('Dark Chocolate Covered Almonds', 230, 800),
      ('Sea Salted Caramel Cashews', 240, 750),
      ('BBQ Flavored Trail Mix', 250, 600),
      ('Spicy Cheese Crackers', 260, 700),
      ('Sour Cream and Onion Pretzels', 270, 550),
      ('Buffalo Wing Popcorn', 280, 600),
      ('Ranch Flavored Nachos', 290, 650),
      ('Garlic Parmesan Peanuts', 300, 700),
      ('Sweet Chili Apple Chips', 310, 500),
      ('Dark Chocolate Covered Cashews', 320, 800),
      ('Sea Salted Caramel Almonds', 330, 750),
      ('BBQ Flavored Cheese Puffs', 340, 600),
      ('Spicy Nacho Crackers', 350, 700),
      ('Sour Cream and Onion Trail Mix', 360, 550),
      ('Buffalo Wing Chips', 370, 600),
      ('Ranch Flavored Popcorn Mix', 380, 650),
      ('Garlic Parmesan Pretzels', 390, 700),
      ('Sweet Chili Cheese Puffs', 400, 500),
      ('Dark Chocolate Covered Trail Mix', 410, 800),
      ('Sea Salted Caramel Popcorn', 420, 750)      `
    );
    reply.send({ status: 'ok' });
  });
}
