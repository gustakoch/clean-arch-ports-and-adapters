import ExpressAdapter from "./infraestructure/api/ExpressAdapter";
import Router from "./infraestructure/api/Router";
import PostgresAdapter from "./infraestructure/database/PostgresAdapter";
import TransactionDatabaseRepository from "./infraestructure/repositories/TransactionDatabaseRepository";

const connection = new PostgresAdapter();
const transactionRepository = new TransactionDatabaseRepository(connection);
const httpServer = new ExpressAdapter();
const router = new Router(httpServer, transactionRepository);
router.init();
httpServer.listen(3000);
