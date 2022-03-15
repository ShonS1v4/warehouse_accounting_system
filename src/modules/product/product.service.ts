import { forwardRef, HttpException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { WarehouseService } from '../warehouse/warehouse.service';
import { ProductDto } from './dto/product.dto';
import { Stash } from './entities/stash.entity';
import { MoveDto } from './dto/move.dto';
import { ProductWarehouseDto } from './dto/productWarehouse.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(Stash) private stashRepo: Repository<Stash>,
    @Inject(forwardRef(() => WarehouseService))
    private readonly warehouseService: WarehouseService,
  ) {}

  async create(data: ProductDto) {
    const candidate = await this.stashRepo.findOne({
      where: {
        name: data.name,
      },
    });
    if (candidate) return new HttpException(`${data.name} already exist!`, 409);
    const product = await this.stashRepo.create({
      name: data.name,
      stock: data.stock,
    });
    await this.stashRepo.save(product);
    if (data.warehouse)
      data.warehouse.map(
        async (item) => await this.unStash(item, product.name),
      );
    return new HttpException(`Created`, 201);
  }

  async unStash(product: ProductWarehouseDto, name: string) {
    const candidate = await this.warehouseService.getById(product.warehouseId);
    if (candidate) {
      const newProduct = this.productRepo.create({
        name: name,
        stock: product.stock,
      });
      await this.productRepo.save(newProduct);
      candidate.products.push(newProduct);
      await this.warehouseService.save(candidate);
    }
    return new HttpException(`Product ${name} not found`, 404);
  }

  //ГОТОВО
  async getById(id: number) {
    return this.productRepo.findOne({
      where: { id: id },
      relations: ['warehouses'],
    });
  }

  //ГОТВО
  async getAll() {
    return this.productRepo.find({ relations: ['warehouses'] });
  }

  //ГОТВО
  async remove(id: number) {
    const candidate = await this.getById(id);
    return this.productRepo.remove(candidate);
  }

  //ГОТОВО
  async save(product: Product) {
    return this.productRepo.save(product);
  }

  async productCandidate(name: string) {
    return await this.stashRepo.findOne({ where: { name: name } });
  }

  async moveTo(data: MoveDto, id: number) {
    const warehouse = await this.warehouseService.getById(data.warehouseId);
    const product = await this.productRepo.findOne({ where: { id: id } });
    if (data.stock > product.stock)
      return new HttpException(`You cant move more product when you have`, 409);
    if (data.stock == product.stock) await this.productRepo.remove(product);
    const newProduct = await this.productRepo.create({
      name: product.name,
      stock: data.stock,
    });
    product.stock -= data.stock;

    await this.save(newProduct);
    await this.save(product);
    warehouse.products.push(newProduct);
    await this.warehouseService.save(warehouse);
  }
}
