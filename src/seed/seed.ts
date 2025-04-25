import { sql } from '../config/db';

async function seedDatabase() {
  try {
    await sql`
      INSERT INTO incidents (title, description, severity, reported_at)
      VALUES
        ('AI failed to detect anomaly', 'A misclassification led to undetected financial fraud.', 'High', NOW()),
        ('Language model fabricated citation', 'Chatbot provided fake references in a response.', 'Medium', NOW()),
        ('Response time exceeded limit', 'Failsafe system responded too late to override.', 'Low', NOW())
    `;
    
    console.log('Seed data inserted successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    process.exit(0);
  }
}

seedDatabase();