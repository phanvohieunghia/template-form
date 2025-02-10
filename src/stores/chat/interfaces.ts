export type ChatResponse = {
  success: false
  error?: Error
  message: string
  [key: string]: unknown
}

export type ChatOneVariables = {
  chatInput: string
}
export type ChatOneResponse = {
  output: string
}
