#!/usr/bin/env tsx

import { adminGetWaterFountains, adminInsertWaterFountains, adminClearAllWaterFountains } from '../services/admin-water-fountain'
import { seedWaterFountains } from '../data/seed-data'

async function seedDatabase() {
  try {
    console.log('🌊 Starting database seeding...')
    
    // Check current data
    const existingFountains = await adminGetWaterFountains()
    console.log(`📊 Found ${existingFountains.length} existing water fountains`)
    
    if (existingFountains.length > 0) {
      console.log('🧹 Clearing existing data...')
      await adminClearAllWaterFountains()
      console.log('✅ Existing data cleared')
    }
    
    // Insert seed data
    console.log(`📝 Inserting ${seedWaterFountains.length} water fountains...`)
    const insertedFountains = await adminInsertWaterFountains(seedWaterFountains)
    
    console.log(`✅ Successfully seeded ${insertedFountains.length} water fountains!`)
    
    // Verify the data
    const finalCount = await adminGetWaterFountains()
    console.log(`🎉 Database now contains ${finalCount.length} water fountains`)
    
    process.exit(0)
  } catch (error) {
    console.error('❌ Error seeding database:', error)
    process.exit(1)
  }
}

// Run if this file is executed directly
if (require.main === module) {
  seedDatabase()
}

export { seedDatabase }