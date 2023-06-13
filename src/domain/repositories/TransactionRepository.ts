import Transaction from "../entities/Transaction";

export default interface TransactionRepository {
    save(transaction: Transaction): Promise<void>;
    get(code: string): Promise<Transaction>;
}
