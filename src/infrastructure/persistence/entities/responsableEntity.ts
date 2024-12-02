// npm install typeorm
// habilitar los decoradores con
// npm install typescript ts-node
// npx tsc --init
// y en el tsconfig.json habilitar "experimentalDecorators": true

import 'reflect-metadata';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn
} from 'typeorm'
import { ResponsableModel } from '../../../domain/models/responsableModel'
import { Identity } from '../../../domain/models/base/baseModel'

@Entity('responsables')
export class ResponsableEntity implements ResponsableModel {
    @PrimaryGeneratedColumn()
    readonly id!: Identity

    @Column()
    nombre!: string

    @Column()
    correo!: string

    @Column()
    telefono!: string

    @Column()
    cargo!: string

    @Column({ name: 'id_task' })
    taskId!: number
}
