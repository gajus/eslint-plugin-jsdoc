declare module 'gitdown' {
  interface Gitdown {
    setConfig: (info: {
      gitinfo: {
        defaultBranchName: string,
        gitPath: string
      }
    }) => void
    get: () => string
  }
  export function readFile(path: string): Gitdown
}
