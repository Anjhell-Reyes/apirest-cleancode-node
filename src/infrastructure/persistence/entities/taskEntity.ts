// npm install typeorm
// habilitar los decoradores con
// npm install typescript ts-node
// npx tsc --init
// y en el tsconfig.json habilitar "experimentalDecorators": true

import 'reflect-metadata';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
} from 'typeorm'
import { TaskModel } from '../../../domain/models/taskModel'
import { Identity } from '../../../domain/models/base/baseModel'

@Entity('tasks')
export class TaskEntity implements TaskModel {
    @PrimaryGeneratedColumn()
    id!: Identity

    @Column()
    title!: string

    @Column()
    description!: string

    @Column('boolean')
    completed!: boolean

    @Column()
    startDate!: Date

    @Column()
    endDate!: Date

    @CreateDateColumn()
    readonly createdAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date

    @DeleteDateColumn()
    deletedAt?: Date | null
}
