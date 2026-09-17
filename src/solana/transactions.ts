import { NotImplementedError, requireAuthorization, type AuthorizationRequest } from '../sdk/shared'

export async function submitSolanaTransaction(request: AuthorizationRequest): Promise<never> {
  requireAuthorization(request)
  throw new NotImplementedError('Solana transaction submission is not implemented in the static client.')
}
