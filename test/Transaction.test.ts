import Transaction from "../src/domain/entities/Transaction";

test("Deve criar uma transação", function() {
    const transaction = new Transaction("8596", 2000, 12, "credit_card");
    transaction.generateInstallments();
    expect(transaction.code).toBe("8596");
    expect(transaction.amount).toBe(2000);
    expect(transaction.installments).toHaveLength(12);
    expect(transaction.installments[0].amount).toBe(166.67);
    expect(transaction.installments[11].amount).toBe(166.75);
});
