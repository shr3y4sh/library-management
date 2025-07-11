import MongooseDatabase from './config/mongooseDriver.js';
import app from './main.js';
import { Datasource } from './utilities/database.util.js';

const port = process.env.PORT || 3001;

const database: Datasource = new MongooseDatabase();

database.create().then(async (server) => {
    await server.connect();

    console.log('Database connected');

    app.listen(port, () => {
        console.log(`Server listening on Port: ${port}`);
    });
});
