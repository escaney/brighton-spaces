/** @format */

import { createClient } from '@supabase/supabase-js';
import { handleSupabaseResponse, DatabaseError } from './database';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl) {
    throw new Error('REACT_APP_SUPABASE_URL is required');
}

if (!serviceRoleKey) {
    throw new Error(
        'SUPABASE_SERVICE_ROLE_KEY is required for admin operations',
    );
}

// Admin client with service role key - bypasses RLS
export const adminSupabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false,
    },
});

export function createAdminDatabaseClient() {
    return {
        supabase: adminSupabase,
        handleResponse: handleSupabaseResponse,
        createError: (message: string, status?: number, code?: string) =>
            new DatabaseError(message, status, code),
    };
}

export const adminDatabase = createAdminDatabaseClient();
