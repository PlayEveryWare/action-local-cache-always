import path from 'path'

import * as core from '@actions/core'

const { GITHUB_REPOSITORY } = process.env
const CWD = process.cwd()

type Vars = {
  cacheDir: string
  cachePath: string
  options: {
    key: string
    path: string
  }
  targetDir: string
  targetPath: string
}

export const getVars = (): Vars => {
  if (!GITHUB_REPOSITORY) {
    throw new TypeError('Expected GITHUB_REPOSITORY environment variable to be defined.')
  }

  const options = {
    key: core.getInput('key') || 'no-key',
    path: core.getInput('path'),
  }

  if (!options.path) {
    throw new TypeError('path is required but was not provided.')
  }

  const share_root = core.getInput('share_root')
  if (!share_root) {
    throw new TypeError('share_root is required but was not provided.')
  }

  const cacheDir = path.join(share_root, GITHUB_REPOSITORY, options.key)
  const cachePath = path.join(cacheDir, options.path)
  const targetPath = path.resolve(CWD, options.path)
  const { dir: targetDir } = path.parse(targetPath)

  return {
    cacheDir,
    cachePath,
    options,
    targetDir,
    targetPath,
  }
}
