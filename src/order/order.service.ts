import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Order } from './order.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import fetch from "node-fetch";

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Order) private orderRepository: Repository<Order>,
    ) {}

    async create(order: Order) {

        const id = order.id;
        
        const orderData = await this.orderRepository.save(order);

        if (!orderData) {
          throw new HttpException(
            { message: 'Ошибка при создании заказа' },
            HttpStatus.BAD_REQUEST,
          );
        }

        const HTML_MESSAGE = 
        '<b>Новая заявка на вывод средств!</b>\n '+
        '<i>'+ orderData.amount + ' ' + orderData.crypt + '</i>\n'+
        '<i>Способ вывода: ' + orderData.payment + '</i>\n'+
        '<i>Валюта для вывода: ' + orderData.currency + '</i>';

        const data = {
            chat_id: -1001758934936,
            text: HTML_MESSAGE,
            parse_mode: "HTML"
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };

        console.log(requestOptions);

        if (!id) {
        const resp = await fetch(
            'https://api.telegram.org/bot5828856128:AAGwW4JLpeX0B4rQ1uyuGbcGLvxnqk3SFZE/sendMessage', 
            requestOptions);
        
            console.log(await resp.json());
        }
        return orderData;
    }

    async getAllData() {
        return await this.orderRepository.find({
            order: {id: "DESC"}
        });
    }

}
