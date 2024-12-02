import { Container } from 'inversify'

import container from './inversifyConfig'
import Symbols from '../../domain/types/symbols'
import { LoggerContract } from '../../domain/contracts/utils/loggerContract'

class ServiceCollection {
  readonly symbols = Symbols
  private readonly container: Container = container

  constructor () {
    console.log('IoC container initialized')
  }

  get<T>(type: symbol): T {
    return this.container.get<T>(type)
  }

  getLogger (): LoggerContract {
    return this.get<LoggerContract>(this.symbols.Logger)
  }
}

const IoC = new ServiceCollection()

export default IoC
