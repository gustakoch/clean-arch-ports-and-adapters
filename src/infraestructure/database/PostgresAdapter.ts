import Connection from "./Connection";
import pgp from 'pg-promise';

export default class PostgresAdapter implements Connection {
    connection: any;

    constructor() {
        this.connection = pgp()("postgres://postgres:postgres@localhost:5432/app");
    }

    query(statement: string, binds: any): Promise<any> {
        return this.connection.query(statement, binds);
    }

    one(statement: string, binds: any): Promise<any> {
        return this.connection.one(statement, binds);
    }

    close(): Promise<void> {
        return this.connection.$pool.end();
    }
}
