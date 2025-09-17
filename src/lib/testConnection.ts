// Test Django backend connection
export const testDjangoConnection = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/health/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log('✅ Django backend connection successful:', data);
      return { success: true, data };
    } else {
      console.error('❌ Django backend connection failed:', response.status, response.statusText);
      return { success: false, error: `HTTP ${response.status}: ${response.statusText}` };
    }
  } catch (error) {
    console.error('❌ Django backend connection error:', error);
    return { success: false, error: error.message };
  }
};

// Test all API endpoints
export const testAllEndpoints = async () => {
  const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
  
  const endpoints = [
    { name: 'Health Check', url: '/api/health/', method: 'GET', auth: false },
    { name: 'User Registration', url: '/api/auth/register/', method: 'POST', auth: false },
    { name: 'User Login', url: '/api/auth/login/', method: 'POST', auth: false },
    { name: 'Portfolio Summary', url: '/api/portfolio/summary/', method: 'GET', auth: true },
    { name: 'Market Stocks', url: '/api/market/stocks/', method: 'GET', auth: false },
    { name: 'Community Posts', url: '/api/community/posts/', method: 'GET', auth: true },
    { name: 'Trading Orders', url: '/api/trading/orders/', method: 'GET', auth: true },
    { name: 'Broker List', url: '/api/broker/brokers/', method: 'GET', auth: true },
  ];

  const results = [];
  
  for (const endpoint of endpoints) {
    try {
      const response = await fetch(`${baseUrl}${endpoint.url}`, {
        method: endpoint.method,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      results.push({
        name: endpoint.name,
        url: endpoint.url,
        status: response.status,
        success: response.ok,
        auth_required: endpoint.auth,
      });
    } catch (error) {
      results.push({
        name: endpoint.name,
        url: endpoint.url,
        status: 'ERROR',
        success: false,
        error: error.message,
        auth_required: endpoint.auth,
      });
    }
  }
  
  return results;
};

// Test authentication endpoints
export const testAuthEndpoints = async () => {
  const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
  
  const endpoints = [
    '/api/auth/login/',
    '/api/auth/register/',
    '/api/auth/logout/',
    '/api/auth/token/refresh/',
    '/api/auth/profile/',
  ];

  const results = [];
  
  for (const endpoint of endpoints) {
    try {
      const response = await fetch(`${baseUrl}${endpoint}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      results.push({
        endpoint,
        status: response.status,
        available: response.status !== 404,
      });
    } catch (error) {
      results.push({
        endpoint,
        status: 'ERROR',
        available: false,
        error: error.message,
      });
    }
  }
  
  return results;
};
