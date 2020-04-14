import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
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
    const income = this.transactions
      .filter(t => t.type === 'income')
      .reduce((total, next) => total + next.value, 0);
    const outcome = this.transactions
      .filter(t => t.type === 'outcome')
      .reduce((total, next) => total + next.value, 0);
    const total = income - outcome;
    return { income, outcome, total };
  }

  public create({ title, value, type }: Transaction): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions = [...this.transactions, transaction];
    return transaction;
  }
}

export default TransactionsRepository;
