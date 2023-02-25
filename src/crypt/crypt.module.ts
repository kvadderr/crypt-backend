import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CryptService } from './crypt.service';
import { CryptController } from './crypt.controller';
import { Crypt } from './crypt.model';

@Module({
    imports: [
        TypeOrmModule.forFeature([Crypt]),
    ],
    providers: [CryptService],
    controllers: [CryptController],
    exports: [CryptModule],
})
export class CryptModule {}