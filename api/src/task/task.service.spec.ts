import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Entity } from 'typeorm';
import { Task } from './entities/task.entity';
import { TaskService } from './task.service';

describe('TaskService', () => {
  let service: TaskService;

  const mockTask: Task = { id: 1, title: 'My mocked task', isChecked: false };

  const tasksArray: Task[] = [
    mockTask,
    { id: 2, title: 'My other mocked task', isChecked: true },
    { id: 3, title: 'My last mocked task', isChecked: true },
  ];

  const mockRepository = {
    save: jest.fn(),
    find: jest.fn().mockResolvedValue(tasksArray),
    findOneBy: jest.fn().mockResolvedValue(mockTask),
    update: jest.fn((entity) => entity),
    remove: jest.fn(),
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
      expect(service.create).toBeDefined();
      expect(service.findAll).toBeDefined();
      expect(service.findOne).toBeDefined();
      expect(service.update).toBeDefined();
      expect(service.remove).toBeDefined();
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
        const tasks = await service.findAll();
        expect(tasks).toEqual(tasksArray);
      });

      it('should get single task', () => {
        const repoSpy = jest.spyOn(mockRepository, 'findOneBy');
        expect(service.findOne(1)).resolves.toEqual(mockTask);
        expect(repoSpy).toBeCalledWith({ id: 1 });
      });
    });

    describe('Update', () => {
      it('should update a task', async () => {
        const randomId = Math.floor(Math.random() * Math.floor(100));
        const payload = {
          title: 'Bye!',
          isChecked: true,
        };

        await service.update(randomId, payload);

        expect(mockRepository.update).toBeCalledTimes(1);
      });
    });

    describe('Delete', () => {
      it('should delete a task', async () => {
        const randomId = Math.floor(Math.random() * Math.floor(100));

        await service.remove(randomId);

        expect(mockRepository.remove).toBeCalledTimes(1);
      });
    });
  });
});
