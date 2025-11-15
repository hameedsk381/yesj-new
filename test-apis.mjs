// API Test Script
const BASE_URL = 'http://localhost:3000'

// Color output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[36m',
  reset: '\x1b[0m'
}

const log = {
  success: (msg) => console.log(`${colors.green}✓${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}✗${colors.reset} ${msg}`),
  info: (msg) => console.log(`${colors.blue}ℹ${colors.reset} ${msg}`),
  warn: (msg) => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`)
}

async function testAPI(name, url, options = {}) {
  try {
    const response = await fetch(`${BASE_URL}${url}`, options)
    const data = await response.json()
    
    if (response.ok) {
      log.success(`${name}: ${response.status} - ${data.message || 'OK'}`)
      return { success: true, data }
    } else {
      log.error(`${name}: ${response.status} - ${data.message || 'Failed'}`)
      return { success: false, data }
    }
  } catch (error) {
    log.error(`${name}: ${error.message}`)
    return { success: false, error: error.message }
  }
}

async function runTests() {
  console.log('\n🧪 Testing AICUF APIs...\n')
  
  let adminToken = null

  // 1. Test Admin Login
  log.info('Testing Admin Login...')
  const loginResult = await testAPI('POST /api/auth/login', '/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: process.env.ADMIN_USERNAME || 'admin',
      password: process.env.ADMIN_PASSWORD || 'admin123'
    })
  })
  
  if (loginResult.success) {
    adminToken = loginResult.data.token
  }

  console.log('')

  // 2. Test Admin APIs (with token)
  if (adminToken) {
    log.info('Testing Admin APIs...')
    
    await testAPI('GET /api/admin/registrations', '/api/admin/registrations', {
      headers: { 'Authorization': `Bearer ${adminToken}` }
    })
    
    await testAPI('GET /api/admin/nominations', '/api/admin/nominations', {
      headers: { 'Authorization': `Bearer ${adminToken}` }
    })
    
    await testAPI('GET /api/admin/contacts', '/api/admin/contacts', {
      headers: { 'Authorization': `Bearer ${adminToken}` }
    })
  } else {
    log.warn('Skipping admin APIs - no token available')
  }

  console.log('')

  // 3. Test Public APIs (these should fail validation but test the endpoint)
  log.info('Testing Public APIs (validation tests)...')
  
  await testAPI('POST /api/contact (empty)', '/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({})
  })

  await testAPI('POST /api/register (empty)', '/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({})
  })

  await testAPI('POST /api/newsletter (empty)', '/api/newsletter', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({})
  })

  console.log('\n✅ API Testing Complete!\n')
}

// Wait for server to be ready
console.log('Waiting for server to be ready...')
setTimeout(() => {
  runTests().catch(console.error)
}, 3000)
