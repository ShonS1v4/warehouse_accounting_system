import {forwardRef, HttpException, Inject, Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Warehouse } from './entities/warehouse.entity';
import { Repository } from 'typeorm';
import { ProductService } from '../product/product.service';
import {WarehouseDto} from "./dto/warehouse.dto";
import {Product} from "../product/entities/product.entity";

@Injectable()
export class WarehouseService {
  constructor(
    @InjectRepository(Warehouse) private wareHouseRepo: Repository<Warehouse>,
    @Inject(forwardRef(() => ProductService))
    private readonly productService: ProductService,
  ) {}

  async create(warehouse: WarehouseDto) {
    const candidate = await this.wareHouseRepo.findOne({where: {name: warehouse.name}})
    if (!candidate) {

    }
    throw new HttpException('Warehouse with current name already exist', 409)
  }

  async setProduct(product: Product) {

  }

  async update() {
    return false;
  }

  //ГОТОВО
  async getById(id: number): Promise<Warehouse> {
    return this.wareHouseRepo.findOne({where: {id: id}, relations: ['products']});
  }

  //ГОТОВО
  async getAll(): Promise<Warehouse[]> {
    return this.wareHouseRepo.find({relations: ['products']});
  }

  //ГОТОВО
  async remove(id: number) {
    const candidate = await this.getById(id)
    if (!candidate) throw new HttpException('Warehouse with current email not found', 404)
    return this.wareHouseRepo.remove(candidate)
  }

  //ГОТОВО
  async save(warehouse: Warehouse) {
    return this.wareHouseRepo.save(warehouse);
  }
}
