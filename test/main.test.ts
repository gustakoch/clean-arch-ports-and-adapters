import axios from "axios";

test("Deve criar uma transação", async function() {
    const code = `${Math.floor(Math.random() * 10000)}`;
    const input = {
        code,
        amount: 1000,
        numberInstallments: 12,
        paymentMethod: "credit_card"
    };
    await axios.post("http://localhost:3000/transactions", input);
    const response = await axios.get(`http://localhost:3000/transactions/${code}`);
    const transaction = response.data;
    expect(transaction.code).toBe(code);
    expect(transaction.amount).toBe(1000);
    expect(transaction.paymentMethod).toBe("credit_card");
    expect(transaction.installments).toHaveLength(12);
    expect(transaction.installments[0].amount).toBe(83.33);
    expect(transaction.installments[11].amount).toBe(83.37);
});
