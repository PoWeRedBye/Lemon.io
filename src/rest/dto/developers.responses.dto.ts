import { ApiModel, ApiModelProperty } from 'swagger-express-ts';
import {
  IDeveloper,
  IDeveloperWithRevenue,
} from '../../domain/developers/types';

@ApiModel()
export class DeveloperDto implements IDeveloper {
  @ApiModelProperty()
  id: string;

  @ApiModelProperty()
  firstName?: string;

  @ApiModelProperty()
  lastName?: string;

  @ApiModelProperty()
  email: string;
}

@ApiModel()
export class DeveloperWitRevenueDto implements IDeveloperWithRevenue {
  @ApiModelProperty()
  id: string;

  @ApiModelProperty()
  firstName?: string;

  @ApiModelProperty()
  lastName?: string;

  @ApiModelProperty()
  email: string;

  @ApiModelProperty()
  totalRevenue: number;
}
