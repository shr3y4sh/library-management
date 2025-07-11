import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { Datasource } from '../utilities/database.util.js';

export default class MemoryDBServer implements Datasource {
    clearCache = async (): Promise<void> => {
        const collections = await mongoose.connection.db.collections();
        for (const collection of collections) {
            await collection.deleteMany({});
        }
    };
    #dbConnect: MongoMemoryServer;
    create = async (): Promise<Datasource> => {
        this.#dbConnect = await MongoMemoryServer.create();
        return this;
    };

    connect = async (): Promise<void> => {
        const url = this.#dbConnect.getUri();

        await mongoose.connect(url);
    };

    disconnect = async (): Promise<void> => {
        await mongoose.connection.close();
        await this.#dbConnect.stop();
    };
}
