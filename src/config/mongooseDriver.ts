import mongoose from 'mongoose';
import { Datasource } from '../utilities/database.util.js';

export default class MongooseDatabase implements Datasource {
    create = async (): Promise<Datasource> => {
        return this;
    };
    connect = async (): Promise<void> => {
        const mongodbURI = process.env.DATABASE_URI;
        await mongoose.connect(mongodbURI, {
            dbName: 'library',
        });
    };
    disconnect = async (): Promise<void> => {
        await mongoose.disconnect();
    };
    clearCache = async (): Promise<void> => {
        //
    };
}
