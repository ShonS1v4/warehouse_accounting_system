import {forwardRef, Inject, Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { WarehouseService } from '../warehouse/warehouse.service';
import { Stashed } from './entities/stashed.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(Stashed) private stashedRepo: Repository<Stashed>,
    @Inject(forwardRef(() => WarehouseService))
    private readonly warehouseService: WarehouseService,
  ) {}

  async setWarehouse(id: number, warehouseId) {
    const candidate = await this.productRepo.findOne({ where: { id: 1 } });
    const warehouse = await this.warehouseService.getById(warehouseId, false);
    if (candidate) {
      warehouse.products = [candidate];
      await this.warehouseService.save(warehouse);
    }
  }

  async x() {
    const y = this.productRepo.create({
      name: 'x',
      stock: 100,
    });
    await this.productRepo.save(y);
  }

  /*
  * Функционал перемещения продукта во временное хранилище
  * */
  async moveToStash(id: number) {
    const candidate = await this.productRepo.findOne({where: {id: id}});
    if (!candidate) return false
    const stashCandidate = await this.stashedRepo.findOne({where: {id: id}})
    if (stashCandidate) await this.updateStashCandidate(stashCandidate, candidate)
    const newStash = await this.stashedRepo.create({
      name: candidate.name,
      stock: candidate.stock,
      productId: candidate.id
    })
    await this.productRepo.remove(candidate)
    return this.saveStash(newStash);
  }

  // async unStashProducts(productIds: number[]) {
  //   productIds.map(async productId => {
  //     const candidate = await this.stashedRepo.findOne({where: {productId: productId}})
  //   })
  // }

  /*
  * Функционал обновления уже существующего продуквта во временном хранилище
  * */
  private updateStashCandidate(stashCandidate: Stashed, product: Product) {
    stashCandidate.stock += product.stock;
    return this.saveStash(stashCandidate)
  }

  async save(product: Product) {
    return this.productRepo.save(product);
  }

  async saveStash(stash: Stashed) {
    return this.stashedRepo.save(stash);
  }
}
