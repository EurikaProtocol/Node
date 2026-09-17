export interface AuthorizationRequest {
  authorized: boolean
  actor: string
  reason: string
}

export class AuthorizationError extends Error {
  constructor(message = 'Explicit authorization is required before any transaction function can run.') {
    super(message)
    this.name = 'AuthorizationError'
  }
}

export class NotImplementedError extends Error {
  constructor(message = 'This function is intentionally not implemented in the static client build.') {
    super(message)
    this.name = 'NotImplementedError'
  }
}

export function requireAuthorization(request: AuthorizationRequest): void {
  if (!request.authorized) {
    throw new AuthorizationError()
  }
}
