import { inject, injectable } from 'inversify';
import { DevelopersRepository } from '../repositories/developers.repository';
import { IContractStatus, IDeveloper } from '../types';

@injectable()
export class DevelopersService {
  constructor(
    @inject('DevelopersRepository')
    private developersRepository: DevelopersRepository,
  ) {}

  async getDevelopers(
    withRevenue?: boolean,
    status = IContractStatus.COMPLETED,
  ): Promise<IDeveloper[]> {
    return this.developersRepository.getDevelopers(status, withRevenue);
  }

  async getDeveloperById(
    id: string,
    withRevenue?: boolean,
    status = IContractStatus.COMPLETED,
  ) {
    return this.developersRepository.getDeveloperById(id, status, withRevenue);
  }
}
