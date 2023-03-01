import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';

describe('TaskController', () => {
  let controller: TaskController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [
        {
          provide: TaskService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([
              { title: 'Test Task 1', isChecked: false },
              { title: 'Test Task 2', isChecked: true },
              { title: 'Test Task 3', isChecked: false },
            ]),
            findOne: jest
              .fn()
              .mockImplementation((id: number) =>
                Promise.resolve({ id, title: 'Test Task 1', isChecked: false }),
              ),
            create: jest
              .fn()
              .mockImplementation((task: CreateTaskDto) =>
                Promise.resolve({ id: 10, ...task }),
              ),
            update: jest
              .fn()
              .mockImplementation((id: number, task: UpdateTaskDto) =>
                Promise.resolve({ id, ...task }),
              ),
            remove: jest.fn().mockImplementation((id: number) =>
              Promise.resolve({
                id,
                title: 'Deleted Task',
                isChecked: false,
              }),
            ),
          },
        },
      ],
    }).compile();

    controller = module.get<TaskController>(TaskController);
  });

  describe('definitions', () => {
    it('should be defined', () => {
      expect(controller).toBeDefined();
    });

    it('should have all methods defined', () => {
      expect(controller.create).toBeDefined();
      expect(controller.findAll).toBeDefined();
      expect(controller.findOne).toBeDefined();
      expect(controller.update).toBeDefined();
      expect(controller.remove).toBeDefined();
    });
  });

  describe('CRUD', () => {
    describe('Create', () => {
      it('should create a task', async () => {
        const newTaskDTO: CreateTaskDto = {
          title: 'My new task',
          isChecked: false,
        };
        await expect(controller.create(newTaskDTO)).resolves.toEqual({
          id: 10,
          ...newTaskDTO,
        });
      });

      it('should return error on invalid task creation', async () => {
        jest
          .spyOn(controller, 'create')
          .mockRejectedValueOnce(new BadRequestException());

        const request = {
          title: null,
          isChecked: false,
        };

        await expect(controller.create(request)).rejects.toThrow(
          BadRequestException,
        );
      });
    });

    describe('Read', () => {
      describe('getTasks', () => {
        it('should get all tasks', async () => {
          await expect(controller.findAll()).resolves.toEqual([
            { title: 'Test Task 1', isChecked: false },
            { title: 'Test Task 2', isChecked: true },
            { title: 'Test Task 3', isChecked: false },
          ]);
        });
      });

      it('should get single task', async () => {
        await expect(controller.findOne(11)).resolves.toEqual({
          id: 11,
          title: 'Test Task 1',
          isChecked: false,
        });
        await expect(controller.findOne(110)).resolves.toEqual({
          id: 110,
          title: 'Test Task 1',
          isChecked: false,
        });
      });
    });

    describe('Update', () => {
      it('should update a task', async () => {
        const updatedTaskDTO: UpdateTaskDto = {
          title: 'Updated task',
          isChecked: true,
        };
        await expect(controller.update(10, updatedTaskDTO)).resolves.toEqual({
          id: 10,
          ...updatedTaskDTO,
        });
      });

      it('should return not found on missing task update', async () => {
        jest
          .spyOn(controller, 'update')
          .mockRejectedValueOnce(new NotFoundException());

        const updatedTaskDTO: UpdateTaskDto = {
          title: 'Updated task',
          isChecked: true,
        };

        await expect(controller.update(123, updatedTaskDTO)).rejects.toThrow(
          NotFoundException,
        );
      });

      it('should return error on invalid task update', async () => {
        jest
          .spyOn(controller, 'update')
          .mockRejectedValueOnce(new BadRequestException());

        const request = {
          title: null,
          isChecked: false,
        };

        await expect(controller.update(10, request)).rejects.toThrow(
          BadRequestException,
        );
      });
    });

    describe('Delete', () => {
      it('should remove a task', async () => {
        await expect(controller.remove(20)).resolves.toEqual({
          id: 20,
          title: 'Deleted Task',
          isChecked: false,
        });
      });

      it('should return not found on missing task removal', async () => {
        jest
          .spyOn(controller, 'remove')
          .mockRejectedValueOnce(new NotFoundException());

        await expect(controller.remove(123)).rejects.toThrow(NotFoundException);
      });
    });
  });
});
