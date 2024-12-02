import { Router } from 'express'

import IoC from '../../bootstrap/ioc/serviceCollection'
import { ResponsableControllerContract } from '../../app/controllers/responsableController'

const resource = '/responsables'
const router = Router()
const controller = IoC.get<ResponsableControllerContract>(IoC.symbols.ResponsableController)

router.get(resource, (req, res, next) => {
  controller.list(req, res, next)
    .then(() => { })
    .catch(next)
})

router.get(`${resource}/:id`, (req, res, next) => {
  controller.find(req, res, next)
    .then(() => { })
    .catch(next)
})

router.post(resource, (req, res, next) => {
  controller.create(req, res, next)
    .then(() => { })
    .catch(next)
})

router.put(`${resource}/:id`, (req, res, next) => {
  controller.update(req, res, next)
    .then(() => { })
    .catch(next)
})

router.delete(`${resource}/:id`, (req, res, next) => {
  controller.delete(req, res, next)
    .then(() => { })
    .catch(next)
})

export default router
