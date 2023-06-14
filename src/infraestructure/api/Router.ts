import CreateTransaction from "../../application/CreateTransaction";
import GetTransaction from "../../application/GetTransaction";
import TransactionRepository from "../../application/repositories/TransactionRepository";
import HttpServer from "./HttpServer";

export default class Router {
    constructor(readonly httpServer: HttpServer, readonly transactionRepository: TransactionRepository) {
    }

    async init() {
        this.httpServer.on("post", "/transactions", async (params: any, body: any) => {
            const createTransaction = new CreateTransaction(this.transactionRepository);
            await createTransaction.execute(body);
        });

        this.httpServer.on("get", "/transactions/:code", async (params: any, body: any) => {
            const getTransaction = new GetTransaction(this.transactionRepository);
            const transaction = await getTransaction.execute(params.code);
            return transaction;
        });
    }
}
