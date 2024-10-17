export interface IDeveloper {
  id: string;

  firstName?: string;
  lastName?: string;

  email: string;
}

export interface IDeveloperWithRevenue extends IDeveloper {
  totalRevenue: number;
}

export enum IContractStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  ONGOING = 'ongoing',
}
