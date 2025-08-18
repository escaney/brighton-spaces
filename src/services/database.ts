import { supabase } from '../lib/supabase'

export class DatabaseError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string
  ) {
    super(message)
    this.name = 'DatabaseError'
  }
}

export interface DatabaseResponse<T> {
  data: T
  error: null
}

export interface DatabaseErrorResponse {
  data: null
  error: DatabaseError
}

export type DatabaseResult<T> = DatabaseResponse<T> | DatabaseErrorResponse

export async function handleSupabaseResponse<T>(
  promise: Promise<{ data: T | null; error: any }>
): Promise<T> {
  try {
    const { data, error } = await promise

    if (error) {
      throw new DatabaseError(
        error.message || 'An error occurred',
        error.status,
        error.code
      )
    }

    if (data === null) {
      throw new DatabaseError('No data returned from server')
    }

    return data
  } catch (error) {
    if (error instanceof DatabaseError) {
      throw error
    }
    
    throw new DatabaseError(
      error instanceof Error ? error.message : 'Unknown error occurred'
    )
  }
}

export function createDatabaseClient() {
  return {
    supabase,
    handleResponse: handleSupabaseResponse,
    createError: (message: string, status?: number, code?: string) => 
      new DatabaseError(message, status, code)
  }
}

export const database = createDatabaseClient()