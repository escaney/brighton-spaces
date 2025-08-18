import { handleSupabaseResponse, database, DatabaseError } from './database'
import { WaterFountain } from '../types/water-fountains'

export type CreateWaterFountainData = Omit<WaterFountain, 'id' | 'created_at' | 'updated_at'>

export async function getWaterFountains(): Promise<WaterFountain[]> {
  return handleSupabaseResponse(
    // @ts-ignore
    database.supabase
      .from('water_fountains')
      .select('*')
      .order('name')
  )
}

export async function insertWaterFountains(fountains: CreateWaterFountainData[]): Promise<WaterFountain[]> {
  return handleSupabaseResponse(
    // @ts-ignore
    database.supabase
      .from('water_fountains')
      .insert(fountains)
      .select()
  )
}

export async function clearAllWaterFountains(): Promise<void> {
  const { error } = await database.supabase
    .from('water_fountains')
    .delete()
    .gte('created_at', '1970-01-01') // Delete all records (all dates after 1970)
  
  if (error) {
    throw new DatabaseError(`Failed to clear water fountains: ${error.message}`)
  }
}