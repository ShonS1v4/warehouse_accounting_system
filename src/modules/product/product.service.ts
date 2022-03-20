import { forwardRef, HttpException, Inject, Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";

import { Product } from './entities/product.entity';
import { WarehouseService } from '../warehouse/warehouse.service';
import { Stash } from './entities/stash.entity';

import { MoveDto } from './dto/move.dto';
import { ProductDto } from './dto/product.dto';
import { ProductWarehouseDto } from './dto/productWarehouse.dto';


@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product) private productRepo: typeof Product,
    @InjectModel(Stash) private stashRepo: typeof Stash,
    @Inject(forwardRef(() => WarehouseService))
    private readonly warehouseService: WarehouseService,
  ) {}

  async create(data: ProductDto): Promise<HttpException> {
    const candidate = await this.stashRepo.findOne({
      where: {
        name: data.name,
      },
    });

    console.log(candidate)

    if (candidate) return new HttpException(`${data.name} already exist!`, 409);

    const product = await this.stashRepo.create({
      name: data.name,
      stock: data.stock,
    });

    console.log(product)
    await product.save();

    if (data.warehouse) {
      console.log(true)
      data.warehouse.map(
          async (item) => await this.unStash(item, product.name),
      );
    }

    return new HttpException(`Created`, 201);
  }

  async unStash(product: ProductWarehouseDto, name: string): Promise<HttpException> {
    const candidate = await this.warehouseService.getById(product.warehouseId);

    if (candidate) {

      const stashed = await this.stashRepo.findOne({where: {name: name}})

      if (!stashed)
        return new HttpException(`Product ${name} not found`, 404);

      const newProduct = await this.productRepo.create({
        name: name,
        stock: product.stock,
        warehouseId: candidate.id,
      });

      stashed.stock -= product.stock;
      await stashed.save();
      await newProduct.save();
      await candidate.save();

      return new HttpException(`UnStashed`, 201)
    }

    return new HttpException(`Warehouse with id: ${product.warehouseId} not found`, 404);
  }

  async getById(id: number): Promise<Product | HttpException> {
    const candidate = await this.productRepo.findOne({
      where: { id: id },
    });
    if (!candidate)
      return new HttpException(`Product with ${id} not found!`, 404)
    return candidate
  }

  async getAll(): Promise<any> {
    const products = await this.productRepo.findAll();
    const stashed = await this.stashRepo.findAll();
    const allProducts = {
      products: [],
      stashed: []
    };
    if (products.length === 0)
      allProducts.products.push({warning: "Products in warehouse not found"})
    if (products.length > 0)
      allProducts.products.push(products)
    if (stashed.length === 0)
      allProducts.stashed.push({warning: "Stashed products not found"})
    if (stashed.length > 0)
      allProducts.stashed.push(stashed)
    return allProducts
  }

  async remove(id: number): Promise<Product | HttpException> {
    const candidate = await this.getById(id);
    if (candidate instanceof Product)
      await candidate.destroy()
    return new HttpException('Removed', 205)
  }

  async moveTo(data: MoveDto, id: number): Promise<HttpException> {
    const warehouse = await this.warehouseService.getById(data.warehouseId);

    if (!warehouse)
      return new HttpException('Warehouse to move not found!', 404)

    const product = await this.productRepo.findOne({ where: { id: id } });

    if (!product)
      return new HttpException('Product to move not found!', 404)

    if (data.stock > product.stock)
      return new HttpException(`You cant move more product when you have in warehouse`, 409);

    if (data.stock == product.stock) await product.destroy();

    const newProduct = await this.productRepo.create({
      name: product.name,
      stock: data.stock,
      warehouseId: warehouse.id,
    });

    product.stock -= data.stock;
    await newProduct.save();
    await product.save();
    await warehouse.save();

    return new HttpException(`Moved`, 201)
  }
}
