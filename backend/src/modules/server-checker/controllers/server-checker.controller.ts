import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { NullableType } from '../../../utils/types/nullable.type';
import { Server } from '../domain/server';
import { ServerCheckerService } from '../services/server-checker.service';

@ApiTags('ServerChecker')
@Controller({
  path: 'server-checker',
  version: '1',
})
export class ServerCheckerController {
  constructor(private readonly serverCheckerService: ServerCheckerService) {}

  @ApiOkResponse({
    type: Server,
  })
  @Get('')
  @HttpCode(HttpStatus.OK)
  checkServerStatus(): Promise<NullableType<Server>> {
    return this.serverCheckerService.checkServerStatus();
  }
}
