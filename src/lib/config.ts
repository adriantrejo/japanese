/**
 * App Configuration
 * 
 * Toggle features for development/testing
 */

export const APP_CONFIG = {
  // Set to false to disable login/paywall for testing
  // When false, all content is accessible without authentication
  ENABLE_AUTH: false, // ← Change to true when you want to test auth
  
  // Mock mode for API (true = local data, false = real backend)
  MOCK_MODE: true,
  
  // API base URL (only used when MOCK_MODE = false)
  API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000',
}

