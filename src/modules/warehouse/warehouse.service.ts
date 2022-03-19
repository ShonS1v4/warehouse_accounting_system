import { forwardRef, HttpException, Inject, Injectable } from '@nestjs/common';

import { Warehouse } from './entities/warehouse.entity';
import { ProductService } from '../product/product.service';

import { WarehouseDto } from './dto/warehouse.dto';
import { WarehouseProductsDto } from './dto/warehouseProducts.dto';
import { ProductWarehouseDto } from '../product/dto/productWarehouse.dto';
import {InjectModel} from "@nestjs/sequelize";

@Injectable()
export class WarehouseService {
  constructor(
    @InjectModel(Warehouse) private wareHouseRepo: typeof Warehouse,
    @Inject(forwardRef(() => ProductService))
    private readonly productService: ProductService,
  ) {}

  async create(warehouse: WarehouseDto): Promise<HttpException> {
    const candidate = await this.wareHouseRepo.findOne({
      where: { name: warehouse.name },
    });
    if (candidate) return new HttpException(`Warehouse already exist!`, 409);

    const newWarehouse = await this.wareHouseRepo.create({
      name: warehouse.name,
    });

    await newWarehouse.save();

    if (warehouse.products)
      await this.setProduct(warehouse.products, newWarehouse.id);

    return new HttpException(`Created`, 201);
  }

  async setProduct(product: WarehouseProductsDto[], id: number): Promise<HttpException> {
    const products: ProductWarehouseDto[] = [];

    product.map(async (item) => {
      const productAdd: ProductWarehouseDto = {
        warehouseId: id,
        stock: item.stock,
      };
      products.push(productAdd);
    });

    for (let i = 0; i < products.length; i++) {
      await this.productService.unStash(products[i], product[i].name);
    }

    return new HttpException(`Moved`, 201)
  }

  async update(warehouse: WarehouseDto): Promise<HttpException> {
    const candidate = await this.wareHouseRepo.findOne({
      where: { name: warehouse.name },
    });

    if (!candidate)
      return new HttpException(
        `Warehouse ${warehouse.name} doesn't exist!`,
        404,
      );

    if (warehouse.name) candidate.name = warehouse.name;

    if (warehouse.products)
      await this.setProduct(warehouse.products, candidate.id);
    return new HttpException(`Updated!`, 201);
  }

  async getById(id: number): Promise<Warehouse> {
    return this.wareHouseRepo.findOne({
      where: { id: id },
      //TODO get relations
    });
  }

  async getAll(): Promise<Warehouse[]> {
    return this.wareHouseRepo.findAll({ //TODO get relations
       });
  }

  async remove(id: number): Promise<HttpException> {
    const candidate = await this.getById(id);

    if (!candidate)
      throw new HttpException('Warehouse with current email not found', 404);

    await candidate.destroy();

    return new HttpException('Removed', 205)
  }
}
