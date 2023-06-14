import TransactionRepository from './repositories/TransactionRepository';
import Transaction from '../domain/entities/Transaction';

export default class CreateTransaction {
    constructor(readonly transactionRepository: TransactionRepository) {
    }

    async execute(input: Input): Promise<void> {
        const transaction = new Transaction(input.code, input.amount, input.numberInstallments, input.paymentMethod);
        transaction.generateInstallments();
        await this.transactionRepository.save(transaction);
    }
}

type Input = {
    code: string;
    amount: number;
    numberInstallments: number;
    paymentMethod: string;
};
