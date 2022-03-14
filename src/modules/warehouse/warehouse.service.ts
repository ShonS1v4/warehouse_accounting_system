import { forwardRef, HttpException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Warehouse } from './entities/warehouse.entity';
import { Repository } from 'typeorm';
import { ProductService } from '../product/product.service';
import { WarehouseDto } from './dto/warehouse.dto';
import {WarehouseProductsDto} from "./dto/warehouseProducts.dto";

@Injectable()
export class WarehouseService {
  constructor(
    @InjectRepository(Warehouse) private wareHouseRepo: Repository<Warehouse>,
    @Inject(forwardRef(() => ProductService))
    private readonly productService: ProductService,
  ) {}

  //ГОТОВО
  async create(warehouse: WarehouseDto) {
    const candidate = await this.wareHouseRepo.findOne({where: {name: warehouse.name}})
    if (candidate)
      return new HttpException(`Warehouse already exist!`, 409)

    const newWarehouse = this.wareHouseRepo.create({
      name: warehouse.name
    })

    await this.wareHouseRepo.save(newWarehouse)

    if (warehouse.products)
      await this.setProduct(warehouse.products, newWarehouse.id)


    return new HttpException(`Created`, 201)
  }

  //TODO rework it
  async setProduct(product: WarehouseProductsDto[], id: number) {
    const warehouse = await this.getById(id)
    product.map(async item => {
      const product = await this.productService.create(item)
    })
  }

  //ГОТОВО
  async update(warehouse: WarehouseDto) {
    const candidate = await this.wareHouseRepo.findOne({where: {name: warehouse.name}})
    if (!candidate) return new HttpException(`Warehouse ${warehouse.name} doesn't exist!`, 404)
    if (warehouse.name)
      candidate.name = warehouse.name
    if (warehouse.products)
      await this.setProduct(warehouse.products, candidate.id)
    return new HttpException(`Updated!`, 201)
  }

  //ГОТОВО
  async getById(id: number): Promise<Warehouse> {
    return this.wareHouseRepo.findOne({
      where: { id: id },
      relations: ['products'],
    });
  }

  //ГОТОВО
  async getAll(): Promise<Warehouse[]> {
    return this.wareHouseRepo.find({ relations: ['products'] });
  }

  //ГОТОВО
  async remove(id: number) {
    const candidate = await this.getById(id);
    if (!candidate)
      throw new HttpException('Warehouse with current email not found', 404);
    return this.wareHouseRepo.remove(candidate);
  }

  //ГОТОВО
  async save(warehouse: Warehouse) {
    return this.wareHouseRepo.save(warehouse);
  }
}
