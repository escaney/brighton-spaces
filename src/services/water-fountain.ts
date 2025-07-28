import { supabase } from '../lib/supabase'
import { WaterFountain } from '../types/water-fountains'

export async function getWaterFountains(): Promise<WaterFountain[]> {
  try {
    const { data, error } = await supabase
      .from('water_fountains')
      .select('*')
      .order('name')

    if (error) {
      console.error('Error fetching water fountains:', error)
      throw new Error('Failed to fetch water fountains')
    }

    return data || []
  } catch (error) {
    console.error('Service error:', error)
    throw error
  }
}