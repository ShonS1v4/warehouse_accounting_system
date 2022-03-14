import {forwardRef, HttpException, Inject, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Product} from './entities/product.entity';
import {Repository} from 'typeorm';
import {WarehouseService} from '../warehouse/warehouse.service';
import {ProductDto} from './dto/product.dto';
import {Stash} from './entities/stash.entity';
import {MoveDto} from './dto/move.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(Stash) private stashRepo: Repository<Stash>,
    @Inject(forwardRef(() => WarehouseService))
    private readonly warehouseService: WarehouseService,
  ) {}

  async create(data: ProductDto) {
    const candidate = await this.productCandidate(data.name)
    if (candidate)
      return new HttpException(`Product already exist! Please, use PATCH http://localhost:300/product?id=${candidate.id}`, 409);

    const product = this.stashRepo.create({
      name: data.name,
      stock: data.stock
    });
    if (data.warehouse) {
      let total = 0;
      data.warehouse.map(item => total += item.stock)
      if (total>data.stock)
        return new HttpException(`You can't add more items then in stock!`, 409)
      product.stock -= total;
      await this.stashRepo.save(product);
      await this.unStash(data)
    }
    await this.stashRepo.save(product);
    throw new HttpException(`Created`, 201)
  }

  async moveTo(data: MoveDto) {
    const warehouse = await this.warehouseService.getById(data.to)
    const product = await this.getById(data.id)
    if (data.stock > product.stock)
      return new HttpException(`You can't add more items then in stock!`, 409)
    if (data.stock === product.stock)
      await this.productRepo.remove(product)
    product.stock -= data.stock
    const newProduct = this.productRepo.create({
      name: product.name,
      stock: data.stock,
    })
    await this.save(newProduct)
    warehouse.products = [newProduct]
    await this.warehouseService.save(warehouse)
    if (data.stock != product.stock)
      await this.save(product)
    return new HttpException(`Moved`, 201)
  }

  async unStash(product: ProductDto) {
    product.warehouse.map(async item => {
      const warehouse = await this.warehouseService.getById(item.warehouseId);
      const newProduct = this.productRepo.create(
          {
            name: product.name,
            stock: item.stock
          }
      );
      await this.save(newProduct);
      warehouse.products = [newProduct]
      await this.warehouseService.save(warehouse)
    })
    return true;
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
    return await this.stashRepo.findOne({where: {name: name}});
  }
}
