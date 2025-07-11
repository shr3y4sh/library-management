export interface Datasource {
    create: () => Promise<Datasource>;
    connect: () => Promise<void>;
    disconnect: () => Promise<void>;
    clearCache: () => Promise<void>;
}
