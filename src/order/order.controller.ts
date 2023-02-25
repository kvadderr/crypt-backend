import { OrderService } from './order.service';
import { Order } from './order.model';

import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @Post()
    async create(@Body() data) {
        return await this.orderService.create(data);
    }

    @Get()
    async get() {
        return await this.orderService.getAllData();
    }

}