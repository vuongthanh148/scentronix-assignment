import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Observable, forkJoin, lastValueFrom, of } from 'rxjs';
import { catchError, map, timeout } from 'rxjs/operators';
import { NullableType } from 'src/utils/types/nullable.type';
import { Server, serverData } from '../domain/server';

@Injectable()
export class ServerCheckerService {
  private readonly logger = new Logger(ServerCheckerService.name);

  constructor(private httpService: HttpService) {}

  async checkServerStatus(): Promise<NullableType<Server>> {
    this.logger.log(
      `Checking status of servers: ${serverData.map((server) => JSON.stringify(server))}`,
    );
    const requests: Observable<Server | null>[] = serverData.map((server) =>
      this.httpService.get(server.url).pipe(
        timeout(5000),
        map(() => server!),
        catchError((error) => {
          this.logger.error(
            `Server at url ${server.url} with priority ${server.priority} is not online: ${error.message}`,
          );
          return of(null);
        }),
      ),
    );

    const onlineServers: Server[] = await lastValueFrom(forkJoin(requests))
      .then((result) =>
        result.filter(
          (server): server is Server => server !== null && server !== undefined,
        ),
      )
      .catch((error) => {
        this.logger.error(error.message);
        return [];
      });

    if (onlineServers.length === 0) {
      throw new HttpException(
        'No server is online',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    } else
      this.logger.log(
        `Online servers: ${onlineServers.map((server) => JSON.stringify(server))}`,
      );

    onlineServers.sort((a, b) => (a?.priority || 0) - (b?.priority || 0));

    return onlineServers[0];
  }
}
