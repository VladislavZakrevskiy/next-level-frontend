declare module '*.module.css' {
  const classes: Record<string, string>
  export default classes
}

declare module '*.module.scss' {
  const classes: Record<string, string>
  export default classes
}

declare const __IS_DEV__: boolean
declare const __API__: string
