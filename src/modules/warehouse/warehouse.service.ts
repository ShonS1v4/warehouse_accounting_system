import { forwardRef, HttpException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Warehouse } from './entities/warehouse.entity';
import { Repository } from 'typeorm';
import { ProductService } from '../product/product.service';
import { WarehouseDto } from './dto/warehouse.dto';

@Injectable()
export class WarehouseService {
  constructor(
    @InjectRepository(Warehouse) private wareHouseRepo: Repository<Warehouse>,
    @Inject(forwardRef(() => ProductService))
    private readonly productService: ProductService,
  ) {}

  /*
   * Функционал создания нового склада
   * Реализован функционал добавления продуктов при создании склада
   * */
  public async create(warehouseData: WarehouseDto) {
    const warehouse = this.wareHouseRepo.create({
      name: warehouseData.name,
    });
    await this.wareHouseRepo.save(warehouse);
    if (warehouseData.products)
      if (warehouse.products.length > 0)
        warehouseData.products.map(async (id) => {
          await this.productService.setWarehouse(id, warehouse.id);
        });
    throw new HttpException(`Created`, 201);
  }

  /*
   * Функционал поиска одного определенного склада по его идентификационному номеру.
   * Возвращает склад с продукцией внутри, либо без нее
   * */
  getById(id: number, relation: boolean) {
    if (relation)
      return this.wareHouseRepo.findOne({
        where: { id: id },
        relations: ['products'],
      });
    if (!relation) return this.wareHouseRepo.findOne({ where: { id: id } });
  }

  /*
  * Функционал удаления склада. Вся имеющаяся продукция будет отправлина во временное хранилище
  * */
  public async remove(id: number) {
    const candidate = await this.getById(id, true)
    if (candidate) {
      if (candidate.products.length > 0) {
        candidate.products.map(async (product) => {
          await this.productService.moveToStash(product.id)
        })
      }
      return this.wareHouseRepo.remove(candidate)
    }
  }

  /*
  * Функционал обновления
  * Реализована возможность добавить продукты из временного хранилища
  * */
  public async update(id: number,  warehouseData: WarehouseDto) {
    const candidate = await this.getById(id, true);
    if (!candidate) throw new HttpException(`Warehouse with ${id} not found`, 404);
    await this.productService.unStashProducts(warehouseData.products);
    candidate.name = warehouseData.name;
    return this.save(candidate);
  }

  /*
    Интегрируемый функционал для сохранения нового склада в базе данных
  */
  public async save(warehouse: Warehouse) {
    return this.wareHouseRepo.save(warehouse);
  }
}
