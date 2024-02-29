import glob from 'glob'
import { join } from 'path'
import fs from 'fs'

export const deleteFile = () => {
  return {
    name: 'deleteFile',
    buildEnd() {
      const ctx = process.cwd()
      glob.sync(ctx + '/src/pages/**/main.ts').forEach((entry: string) => {
        const pathArr: string[] = entry.split('/')
        const name: string = pathArr[pathArr.length - 2]
        try {
          const temp = join(ctx, `/src/pages/${name}/index.html`)
          console.log('delete----', temp)

          fs.unlinkSync(temp)
        } catch (error) {
          console.log(
            'delete---file---error',
            `/src/pages/${name}/index.html`,
            error
          )
        }
      })
    }
  }
}
