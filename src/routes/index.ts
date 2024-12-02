/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Router } from 'express'
import * as path from 'path'
import { readdirSync, statSync } from 'fs'

import IoC from '../bootstrap/ioc/serviceCollection'

const SEPARATOR: string = '.'
const MAIN_FOLDER: string = __dirname

const logger = IoC.getLogger()

const isFolder = (dirname: string): boolean => {
  return statSync(dirname).isDirectory()
}

const getFiles = (dirname: string, prefix: string = ''): Array<[string, string, string]> => {
  let result: Array<[string, string, string]> = []
  readdirSync(dirname).filter((filename) => {
    const fullFilename = `${dirname}/${filename}`
    const cleanFilename = filename.split(SEPARATOR).slice(0, -1).join(SEPARATOR)
    const cleanFullFilename = `${dirname}/${cleanFilename}`
    if (isFolder(fullFilename)) {
      result = [...result, ...getFiles(fullFilename, `${prefix}/${filename}`)]
    } else if (cleanFilename !== 'index') {
      result.push([prefix, cleanFilename, path.relative(MAIN_FOLDER, cleanFullFilename)])
    }
    return filename
  })
  return result
}

export async function registerRoutes (router: Router, appPrefix: String): Promise<Router> {
  const fileList = getFiles(MAIN_FOLDER)

  try {
    for (const [prefix, _filename, path] of fileList) {
      const module = await import(`./${path}`)
      router.use(appPrefix + prefix, module.default)
    }
  } catch (err) {
    logger.error(err)
  }

  return router
}
