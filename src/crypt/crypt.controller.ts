import { CryptService } from './crypt.service';
import { Crypt } from './crypt.model';

import { Body, Controller, Get, Post, Patch } from '@nestjs/common';

@Controller('crypt')
export class CryptController {
    constructor(private readonly cryptService: CryptService) {}

    @Post()
    async create(@Body() data) {
        return await this.cryptService.create(data);
    }

    @Get()
    async get() {
        return await this.cryptService.getAllData();
    }

    @Post('/updateWell')
    async updateWell(@Body() data) {
        return await this.cryptService.updateWell(data);
    }

}