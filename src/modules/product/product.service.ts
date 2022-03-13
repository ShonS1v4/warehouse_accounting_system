import {forwardRef, Inject, Injectable} from '@nestjs/common';
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

  async create() {
    return false
  }

  async createToWarehouse() {
    return false
  }

  async moveTo() {

  }

  async

  async save() {
    return false
  }

}
