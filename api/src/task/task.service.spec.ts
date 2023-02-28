import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './entities/task.entity';
import { TaskService } from './task.service';

describe('TaskService', () => {
  let service: TaskService;
  const mockRepository = {
    save: jest.fn(),
    find: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskService,
        {
          provide: getRepositoryToken(Task),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<TaskService>(TaskService);
  });

  describe('definitions', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });

    it('should have all methods defined', () => {
      expect(service.findAll).toBeDefined();
      expect(service.create).toBeDefined();
      expect(service.findOne).toBeDefined();
      expect(service.remove).toBeDefined();
      expect(service.update).toBeDefined();
    });
  });

  describe('CRUD', () => {
    describe('Create', () => {
      it('should create a task', async () => {
        const payload = {
          title: 'Hi!',
          isChecked: false,
        };

        await service.create(payload);

        expect(mockRepository.save).toBeCalledTimes(1);
      });
    });
    describe('Read', () => {
      it('should get all tasks', async () => {
        await service.findAll();

        expect(mockRepository.find).toBeCalledTimes(1);
      });
    });
  });
});
