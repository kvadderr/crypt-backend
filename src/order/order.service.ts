import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Order } from './order.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Order) private orderRepository: Repository<Order>,
    ) {}

    async create(order: Order) {

        const orderData = await this.orderRepository.save(order);

        if (!orderData) {
          throw new HttpException(
            { message: 'Ошибка при создании заказа' },
            HttpStatus.BAD_REQUEST,
          );
        }
    
        return orderData;
    }

    async getAllData() {
        return await this.orderRepository.find({
            order: {id: "DESC"}
        });
    }

}
