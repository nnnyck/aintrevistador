import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('listener')
@Controller('listener')
export class ListenerController {
  @Get('health')
  @ApiOperation({ summary: 'Checa se o módulo listener está rodando' })
  @ApiResponse({ status: 200, description: 'OK' })
  healthCheck() {
    return { status: 'ok' };
  }
}
