/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { injectable } from 'inversify'
import path from 'path'
import { readFile } from 'fs/promises'
import handlebars from 'handlebars'

import {
  HandlebarsCompilerContract
} from '../../../domain/contracts/utils/handlebarsCompilerContract'

@injectable()
export class HandlebarsCompiler implements HandlebarsCompilerContract {
  private readonly registeredPartials: string[] = []

  async compileTemplateByName<T>(templateName: string, data: T, options?: CompileOptions): Promise<string> {
    const templatePath = path.join(__dirname, templateName)
    return await this.compileTemplateByPath(templatePath, data, options)
  }

  async compileTemplateByPath<T>(templatePath: string, data: T, options?: CompileOptions): Promise<string> {
    const template = await this.readFileAsync(templatePath)
    const handlebarsTemplate = handlebars.compile(template, options || {})
    return handlebarsTemplate(data)
  }

  async registerPartialByPath (partialName: string, partialPath: string): Promise<void> {
    const key = `${partialName}`
    const fullPartialPath = path.join(__dirname, partialPath)

    if (this.registeredPartials.includes(key)) {
      return
    }

    const partial = await this.readFileAsync(fullPartialPath)

    handlebars.registerPartial(partialName, partial)
    this.registeredPartials.push(key)
  }

  private async readFileAsync (filePath: string): Promise<string> {
    return await readFile(filePath, {
      encoding: 'utf8',
      flag: 'r'
    })
  }
}
