import Joi from 'joi'
import { ValidationError } from '../../domain/errors/ValidationError'

function validateModel<T>(model: any, schema: Joi.ObjectSchema<any>): T {
  const { error, value } = schema.validate(model, { abortEarly: false })
  if (error) {
    let errors: string[] = error.details.map((e: any) => `${e.context.label}: ${e.message}`)
    for (let i = errors.length - 1; i >= 0; i--) {
      if (errors.indexOf(errors[i]) !== i) {
        errors.splice(i, 1)
      }
    }
    throw new ValidationError(errors)
  }
  return value as T
}

export default validateModel
