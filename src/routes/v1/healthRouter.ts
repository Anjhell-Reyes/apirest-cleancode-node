import { Router } from 'express'
import { HealthController } from '../../app/controllers/healthController'

const router = Router()
const healthController = new HealthController()

router.get('/health', healthController.healthCheck.bind(healthController))
router.get('/ping', healthController.ping.bind(healthController))

export default router
