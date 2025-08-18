import { handleSupabaseResponse } from './database'
import { adminDatabase } from './admin-database'
import { WaterFountain } from '../types/water-fountains'
import { CreateWaterFountainData } from './water-fountain'

// Admin functions for seeding - bypass RLS policies
export async function adminGetWaterFountains(): Promise<WaterFountain[]> {
  return handleSupabaseResponse(
    // @ts-ignore
    adminDatabase.supabase
      .from('water_fountains')
      .select('*')
      .order('name')
  )
}

export async function adminInsertWaterFountains(fountains: CreateWaterFountainData[]): Promise<WaterFountain[]> {
  return handleSupabaseResponse(
    // @ts-ignore
    adminDatabase.supabase
      .from('water_fountains')
      .insert(fountains)
      .select()
  )
}

export async function adminClearAllWaterFountains(): Promise<void> {
  const { error } = await adminDatabase.supabase
    .from('water_fountains')
    .delete()
    .gte('created_at', '1970-01-01') // Delete all records (all dates after 1970)
  
  if (error) {
    throw adminDatabase.createError(`Failed to clear water fountains: ${error.message}`)
  }
}