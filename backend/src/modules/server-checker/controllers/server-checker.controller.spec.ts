import { Test, TestingModule } from '@nestjs/testing';
import { Server, serverData } from '../domain/server';
import { ServerCheckerService } from '../services/server-checker.service';
import { ServerCheckerController } from './server-checker.controller';

describe('ServerCheckerController', () => {
  let controller: ServerCheckerController;
  let service: ServerCheckerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServerCheckerController],
      providers: [
        {
          provide: ServerCheckerService,
          useValue: { checkServerStatus: jest.fn() },
        },
      ],
    }).compile();

    controller = module.get<ServerCheckerController>(ServerCheckerController);
    service = module.get<ServerCheckerService>(ServerCheckerService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('checkServerStatus', () => {
    it('should return a server status when the server is up', async () => {
      const server: Server = serverData[1];
      jest.spyOn(service, 'checkServerStatus').mockResolvedValue(server);

      expect(await controller.checkServerStatus()).toBe(server);
    });

    it('should return null when the server is down', async () => {
      jest.spyOn(service, 'checkServerStatus').mockResolvedValue(null);

      expect(await controller.checkServerStatus()).toBeNull();
    });

    it('should throw an error when the service fails', async () => {
      jest
        .spyOn(service, 'checkServerStatus')
        .mockRejectedValue(new Error('Service failure'));

      await expect(controller.checkServerStatus()).rejects.toThrow(
        'Service failure',
      );
    });
  });
});
