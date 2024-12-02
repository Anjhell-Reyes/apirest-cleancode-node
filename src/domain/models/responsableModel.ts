import { ResponsableEntity } from "../../infrastructure/persistence/entities/responsableEntity";
import { BaseIdentity , MapperBase } from "./base/baseModel";

export interface ResponsableModel extends BaseIdentity {
    nombre: string;
    correo: string;
    telefono: string; 
    cargo: string;
    taskId: number;
}

export interface ResponsableDto extends ResponsableModel { }

export interface ResponsableRequestDto {
    nombre?: string;
    correo?: string;
    telefono?: string;
    cargo?: string;
    taskId?: number
}

export class ResponsableMapper implements MapperBase<ResponsableModel, ResponsableDto> {
    mapToDto(entity: ResponsableModel): ResponsableDto {
        return entity; // ResponsableModel ya extiende ResponsableDto.
    }

    public mapToEntity(dto: ResponsableRequestDto): ResponsableEntity {
        const entity = new ResponsableEntity();
        entity.nombre = dto.nombre || '';
        entity.correo = dto.correo || '';
        entity.telefono = dto.telefono || '';
        entity.cargo = dto.cargo || '';
        entity.taskId = dto.taskId || 0;
        return entity;
    }
}