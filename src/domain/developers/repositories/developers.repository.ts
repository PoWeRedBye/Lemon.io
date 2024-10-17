// **************************************************************************
// Репозиторій імітує шар підключення до бази данних. Данні знаходяться в data.ts
// **************************************************************************

import { injectable } from 'inversify';
import { IContractStatus, IDeveloperWithRevenue, IDeveloper } from '../types';
import { contracts, developers } from './data';

@injectable()
export class DevelopersRepository {
  async getDevelopers(
    status: IContractStatus,
    withRevenue?: boolean,
  ): Promise<IDeveloper[] | IDeveloperWithRevenue[]> {
    if (withRevenue) {
      return developers.map((developer) => {
        const devContracts = contracts.filter(
          (contract) =>
            developer.id === contract.developerId && contract.status === status,
        );

        return {
          ...developer,
          totalRevenue:
            devContracts && devContracts.length > 0
              ? devContracts.reduce(
                  (total, contract) => total + contract.amount,
                  0,
                )
              : 0,
        };
      });
    }

    return developers;
  }

  async getDeveloperById(
    id: string,
    status: IContractStatus,
    withRevenue?: boolean,
  ): Promise<IDeveloper | IDeveloperWithRevenue> {
    const developer = developers.find((d) => d.id === id);

    if (withRevenue) {
      const devContracts = contracts.filter(
        (contract) =>
          developer.id === contract.developerId && contract.status === status,
      );

      return {
        ...developer,
        totalRevenue:
          devContracts && devContracts.length > 0
            ? devContracts.reduce(
                (total, contract) => total + contract.amount,
                0,
              )
            : 0,
      };
    }

    return developer;
  }
}
