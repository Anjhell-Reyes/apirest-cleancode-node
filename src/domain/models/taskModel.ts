import { TaskEntity } from "../../infrastructure/persistence/entities/taskEntity";
import { BaseModel, MapperBase } from "./base/baseModel";

export interface TaskModel extends BaseModel {
    title: string
    description: string
    completed: boolean
    startDate: Date
    endDate: Date
}

export interface TaskDto extends Partial<Omit<TaskModel, 'deletedAt'>> { }

export interface TaskRequestDto extends Partial<Omit<TaskDto, 'id' | 'createdAt' | 'updatedAt'>> { }

export class TaskMapper implements MapperBase<TaskModel, TaskDto> {
    mapToDto(entity: TaskModel): TaskDto {
        const { deletedAt, ...omitted } = entity as TaskModel
        return omitted as TaskDto
    }

    public mapToEntity(dto: TaskRequestDto): TaskEntity {
        const entity = new TaskEntity();
        entity.title = dto.title || '';
        entity.description = dto.description || '';
        entity.completed = dto.completed || false;
        entity.startDate = new Date(dto.startDate || new Date());
        entity.endDate = new Date(dto.endDate || new Date());
        return entity
    }
}
