import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from './config/app.config';
import { ServerCheckerModule } from './modules/server-checker/server-checker.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
      envFilePath: ['.env'],
    }),
    ServerCheckerModule,
  ],
})
export class AppModule {}
