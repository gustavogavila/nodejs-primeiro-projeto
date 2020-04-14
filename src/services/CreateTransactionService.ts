import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(request: Request): Transaction {
    const transaction = new Transaction(request);

    if (request.type === 'outcome') {
      const balance = this.transactionsRepository.getBalance();

      if (request.value > balance.total) {
        throw Error('This value exceeds the available limit.');
      }
    }
    return this.transactionsRepository.create(transaction);
  }
}

export default CreateTransactionService;
