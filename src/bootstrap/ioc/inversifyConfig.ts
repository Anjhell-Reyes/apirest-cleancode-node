import 'reflect-metadata'
import { Container } from 'inversify'

import symbols from '../../domain/types/symbols'
import { CrudControllerContract } from '../../app/controllers/baseController'
import { PaginationQueryBuilder } from '../../infrastructure/utils/pagination/paginationQueryBuilder'
import { PaginationQueryBuilderContract } from '../../domain/contracts/utils/paginationContract'
//import { PdfGeneratorContract } from '../../domain/contracts/utils/pdfGeneratorContract'
//import { PdfGenerator } from '../../infrastructure/utils/pdf/pdfGenerator'
import { HandlebarsCompilerContract } from '../../domain/contracts/utils/handlebarsCompilerContract'
import { HandlebarsCompiler } from '../../infrastructure/utils/handlebars/handlebarsCompiler'
import { HandlebarsLoader } from '../../infrastructure/utils/handlebars/handlebarsLoader'
import {
  HandlebarsLoaderContract
} from '../../domain/contracts/utils/handlebarsLoaderContract'
import { LoggerContract } from '../../domain/contracts/utils/loggerContract'
import { Logger } from '../../infrastructure/utils/logger/logger'

import { ResponsableRepositoryContract, TaskRepositoryContract } from '../../domain/contracts/repositoryContract'
import { TaskRepository } from '../../infrastructure/persistence/repositories/taskRepository'
import { TaskService, TaskServiceContract } from '../../app/services/taskService'
import { TaskController } from '../../app/controllers/taskController'
import { ResponsableController } from '../../app/controllers/responsableController'
import { ResponsableRepository } from '../../infrastructure/persistence/repositories/responsableRepository'
import { ResponsableService, ResponsableServiceContract } from '../../app/services/responsableService'

const container = new Container()

container.bind<TaskRepositoryContract>(symbols.TaskRepository).to(TaskRepository).inSingletonScope()
container.bind<TaskServiceContract>(symbols.TaskService).to(TaskService).inSingletonScope()
container.bind<CrudControllerContract>(symbols.TaskController).to(TaskController).inSingletonScope()

container.bind<ResponsableRepositoryContract>(symbols.ResponsableRepository).to(ResponsableRepository).inSingletonScope()
container.bind<ResponsableServiceContract>(symbols.ResponsableService).to(ResponsableService).inSingletonScope()
container.bind<CrudControllerContract>(symbols.ResponsableController).to(ResponsableController).inSingletonScope()

container.bind<PaginationQueryBuilderContract>(symbols.PaginationQueryBuilder).to(PaginationQueryBuilder).inSingletonScope()
//container.bind<PdfGeneratorContract>(symbols.PdfGenerator).to(PdfGenerator).inSingletonScope()
container.bind<HandlebarsCompilerContract>(symbols.HandlebarsCompiler).to(HandlebarsCompiler).inSingletonScope()
container.bind<HandlebarsLoaderContract>(symbols.HandlebarsLoader).to(HandlebarsLoader).inSingletonScope()
container.bind<LoggerContract>(symbols.Logger).to(Logger).inSingletonScope()

export default container
