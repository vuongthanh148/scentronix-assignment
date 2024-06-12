import { ApiResponseProperty } from '@nestjs/swagger';
import { serverList } from '../../../data/server-list';

export class Server {
  @ApiResponseProperty({
    type: String,
    example: 'https://does-not-work.perfume.new',
  })
  url: string;

  @ApiResponseProperty({
    type: Number,
    example: 1,
  })
  priority: number;
}

export const serverData: Server[] = Array.from(serverList).map((server) => {
  return {
    url: server.url,
    priority: server.priority,
  };
});
