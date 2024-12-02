export type Identity = string | number

export interface BaseIdentity {
  readonly id: Identity
}

export interface BaseModel extends BaseIdentity {
  readonly createdAt: Date
  deletedAt?: Date | null
  updatedAt: Date
}

export interface MapperBase<T, U> {
  mapToDto(entity: T): U
  mapToEntity(dto: U): T
}
