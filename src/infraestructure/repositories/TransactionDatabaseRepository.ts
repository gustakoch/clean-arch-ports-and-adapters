import Installment from "../../domain/entities/Installment";
import Transaction from "../../domain/entities/Transaction";
import TransactionRepository from "../../domain/repositories/TransactionRepository";
import Connection from "../database/Connection";

export default class TransactionDatabaseRepository implements TransactionRepository {
    constructor(readonly connection: Connection) {
    }

    async save(transaction: Transaction): Promise<void> {
        const [{ id: transactionId }] = await this.connection.query("insert into transactions (code, amount, number_installments, payment_method) values ($1, $2, $3, $4) returning id", [
                transaction.code,
                transaction.amount,
                transaction.numberInstallments,
                transaction.paymentMethod
            ]);
        for (const installment of transaction.installments) {
            await this.connection.query("insert into installments (transaction_id, number, amount) values ($1, $2, $3)", [transactionId, installment.number, installment.amount]);
        }
    }

    async get(code: string): Promise<Transaction> {
        const transactionData = await this.connection.one("select * from transactions where code = $1", [code]);
        const transaction = new Transaction(
            transactionData.code,
            parseFloat(transactionData.amount),
            transactionData.number_installments,
            transactionData.payment_method
        );
        const installmentsData = await this.connection.query("select * from installments where transaction_id = $1", [transactionData.id]);
        for (const installmentData of installmentsData) {
            const installment = new Installment(installmentsData.number, parseFloat(installmentData.amount));
            transaction.installments.push(installment);
        }
        return transaction;
    }
}
