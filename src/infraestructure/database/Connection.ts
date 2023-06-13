export default interface Connection {
    query(statement: string, binds: any): Promise<any>;
    one(statement: string, binds: any): Promise<any>;
    close(): Promise<void>;
}
