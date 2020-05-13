import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  title: string;
  type: 'income' | 'outcome';
  value: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions.reduce(
      (acumulador: number, valorAtual: Transaction) => {
        return (
          acumulador + (valorAtual.type === 'income' ? valorAtual.value : 0)
        );
      },
      0,
    );

    const outcome = this.transactions.reduce(
      (acumulador: number, valorAtual: Transaction) => {
        return (
          acumulador + (valorAtual.type === 'outcome' ? valorAtual.value : 0)
        );
      },
      0,
    );

    const total = income - outcome;

    const balance: Balance = {
      income,
      outcome,
      total,
    };

    return balance;
  }

  public create({ title, type, value }: TransactionDTO): Transaction {
    const transaction = new Transaction({ title, type, value });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
