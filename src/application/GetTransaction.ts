import TransactionRepository from '../domain/repositories/TransactionRepository';

export default class GetTransaction {
    constructor(readonly transactionRepository: TransactionRepository) {
    }

    async execute(code: string): Promise<Output> {
        const transaction = await this.transactionRepository.get(code);
        return transaction;
    }
}

type Output = {
    id?: number;
    code: string;
    amount: number;
    paymentMethod: string;
    numberInstallments: number;
    installments: { number: number, amount: number }[]
};
