// import { CompileOptions } from 'joi'

export interface HandlebarsCompilerContract {
  compileTemplateByName: <T>(templateName: string, data: T, options?: CompileOptions) => Promise<string>
  compileTemplateByPath: <T>(templatePath: string, data: T, options?: CompileOptions) => Promise<string>
  registerPartialByPath: (partialName: string, partialPath: string) => Promise<void>
}
