import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Crypt } from './crypt.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import fetch from "node-fetch";

@Injectable()
export class CryptService {
    constructor(
        @InjectRepository(Crypt) public cryptRepository: Repository<Crypt>,
    ) {}

    async create(crypt: Crypt) {

        const cryptData = await this.cryptRepository.save(crypt);

        if (!cryptData) {
          throw new HttpException(
            { message: 'Ошибка при создании крипты' },
            HttpStatus.BAD_REQUEST,
          );
        }
    
        return cryptData;
    }

    async getAllData() {
        return await this.cryptRepository.find({
            order: {id: "ASC"}
        });
    }

    async changePercent(percent: number) {
        return await this.cryptRepository.update({}, {percent: percent});
    }

    async changeWell(key: string, well: number) {
        return await this.cryptRepository.update({name: key}, {well: well});
    }

    async updateCrypt(crypt: Crypt){
        return await this.cryptRepository.save(crypt);
    }

    async updateWell(percent: number) {

        const response = await fetch(
            'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=BTC,ETH,USDT,BNB', {
                method: 'GET', 
                headers: {'X-CMC_PRO_API_KEY': '90d9f3bf-9143-4ab1-b503-9f423a8231b1'},
            }
        )

        const data = await response.json();
        let BTC = await this.changeWell('BTC', data.data.BTC.quote.USD.price);
        let ETH = await this.changeWell('ETH', data.data.ETH.quote.USD.price);
        let USDT = await this.changeWell('USDT', data.data.USDT.quote.USD.price);
        let BNB = await this.changeWell('BNB', data.data.BNB.quote.USD.price);
        return data;
    }

}
