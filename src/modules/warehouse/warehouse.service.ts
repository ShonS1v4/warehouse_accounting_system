import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Warehouse } from './entities/warehouse.entity';
import { Repository } from 'typeorm';
import { ProductService } from '../product/product.service';

@Injectable()
export class WarehouseService {
  constructor(
    @InjectRepository(Warehouse) private wareHouseRepo: Repository<Warehouse>,
    @Inject(forwardRef(() => ProductService))
    private readonly productService: ProductService,
  ) {}

 async create() {
    return false
 }

 async createWithProduct() {
    return false
 }

 async update(){
    return false
 }

 async getById(){
    return false
 }

 async getAll(){
    return false
 }

  async save() {
    return false
  }
}
