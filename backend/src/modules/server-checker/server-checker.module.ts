import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ServerCheckerController } from './controllers/server-checker.controller';
import { ServerCheckerService } from './services/server-checker.service';

@Module({
  imports: [HttpModule],
  controllers: [ServerCheckerController],
  providers: [ServerCheckerService],
  exports: [],
})
export class ServerCheckerModule {}
