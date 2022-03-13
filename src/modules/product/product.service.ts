import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { WarehouseService } from '../warehouse/warehouse.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @Inject(forwardRef(() => WarehouseService))
    private readonly warehouseService: WarehouseService,
  ) {}

  async create(data: ProductService) {
    return false;
  }

  async moveTo(productId: number, warehouseId: number) {

  }

  //ГОТОВО
  async getById(id: number) {
    return this.productRepo.findOne({where: {id: id}, relations: ['warehouses']})
  }

  //ГОТВО
  async getAll() {
    return this.productRepo.find({relations: ['warehouses']})
  }

  //ГОТВО
  async remove(id: number) {
    const candidate = await this.getById(id);
    return this.productRepo.remove(candidate)
  }

  //ГОТОВО
  async save(product: Product) {
    return this.productRepo.save(product);
  }
}
