const { 
    client,
    getAllUsers,
    createUser,
 } = require('./index');

 async function createInitialUsers() {
    const albertTwo = await createUser({ username: 'albert', password: 'imposter_albert' });
    try {
      console.log("Starting to create users...");
  
      const albert = await createUser({ username: 'albert', password: 'bertie99' });
      const sandra = await createUser({ username: 'sandra', password: '2sandy4me' });
      const glamgal = await createUser({ username: 'glamgal', password: 'soglam' });
  
      console.log(albert);
  
      console.log("Finished creating users!");
    } catch(error) {
      console.error("Error creating users!");
      throw error;
    }
  }

 async function dropTables() {
    try {
      await client.query(`
        DROP TABLE IF EXISTS users;
      `);
    } catch (error) {
      throw error;
    }
  }
   
  async function createTables() {
    try {
      await client.query(`
        CREATE TABLE users (
          id SERIAL PRIMARY KEY,
          username varchar(255) UNIQUE NOT NULL,
          password varchar(255) NOT NULL
        );
      `);
    } catch (error) {
      throw error;
    }
  }
  
  async function rebuildDB() {
    try {
      client.connect();
  
      await dropTables();
      await createTables();
      await createInitialUsers();
    } catch (error) {
      throw error;
    }
  }

  async function testDB() {
    try {
      console.log("Starting to test database...");
  
      const users = await getAllUsers();
      console.log("getAllUsers:", users);
  
      console.log("Finished database tests!");
    } catch (error) {
      console.error("Error testing database!");
      throw error;
    }
  }
  
  rebuildDB()
    .then(testDB)
    .catch(console.error)
    .finally(() => client.end());