/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { injectable } from 'inversify'
//import symbols from '../../../domain/types/symbols'

//import { HandlebarsCompilerContract } from '../../../domain/contracts/utils/handlebarsCompilerContract'
import { HandlebarsLoaderContract } from '../../../domain/contracts/utils/handlebarsLoaderContract'

@injectable()
export class HandlebarsLoader implements HandlebarsLoaderContract {
  constructor (
    //@inject(symbols.HandlebarsCompiler) private readonly handlebarsCompiler: HandlebarsCompilerContract
  ) {
  }

  async registerPartials () {
    //await this.registerPartialsVehicleTransferRightPetition()
  }  
}
