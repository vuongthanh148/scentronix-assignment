import { HttpService } from '@nestjs/axios';
import { Test } from '@nestjs/testing';
import { AxiosResponse } from 'axios';
import { map, of, throwError, timer } from 'rxjs';
import { serverData } from '../domain/server';
import { ServerCheckerService } from './server-checker.service';

describe('ServerCheckerService', () => {
  let service: ServerCheckerService;
  let httpService: HttpService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        ServerCheckerService,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    service = moduleRef.get<ServerCheckerService>(ServerCheckerService);
    httpService = moduleRef.get<HttpService>(HttpService);
  });

  it('should return the server with the highest priority when all servers are online', async () => {
    jest.spyOn(httpService, 'get').mockImplementation(() =>
      of({
        data: {},
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
      } as AxiosResponse),
    );

    const result = await service.checkServerStatus();

    expect(result).toEqual(serverData[0]);
  });

  it('should return the server with the highest priority when some servers are offline', async () => {
    jest.spyOn(httpService, 'get').mockImplementation((url) =>
      url === serverData[0].url
        ? throwError(new Error())
        : of({
            data: {},
            status: 200,
            statusText: 'OK',
            headers: {},
            config: {},
          } as AxiosResponse),
    );

    const result = await service.checkServerStatus();

    expect(result).toEqual(serverData[3]);
  });

  it('should throw an error when no servers are online', async () => {
    jest
      .spyOn(httpService, 'get')
      .mockImplementation(() => throwError(() => new Error()));

    await expect(service.checkServerStatus()).rejects.toThrow(
      'No server is online',
    );
  });

  it('should throw an error when all servers timeout', async () => {
    const mockResponse: AxiosResponse = {
      data: {},
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    } as AxiosResponse;

    jest
      .spyOn(httpService, 'get')
      .mockImplementation(() => timer(5001).pipe(map(() => mockResponse)));

    await expect(service.checkServerStatus()).rejects.toThrow(
      'No server is online',
    );
  }, 6000);
});
