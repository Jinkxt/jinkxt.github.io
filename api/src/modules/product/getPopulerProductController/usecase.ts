import { UseCase } from '../../../shared/core/usecase';
import { UseCaseError } from '../../../shared/core/errors-models';
import { Result, Fail } from '../../../shared/core/result';
import { ImpProductRepo } from '../repo/implementation/impRepo';
import { ProductsDTO } from '../mapper/product-mapper';

interface DTO {
  query: string;
}

export class GetPopulerProductsUseCase
  implements UseCase<DTO, Result<ProductsDTO[], UseCaseError>>
{
  constructor(private repo: ImpProductRepo) {}
  public async execute() {
    const resultOrError = await this.repo.getPopulerProducts();
    if (resultOrError.isSuccess()) {
      return resultOrError;
    } else {
      const err = new UseCaseError(resultOrError.error);
      return new Fail<UseCaseError>(err);
    }
  }
}
