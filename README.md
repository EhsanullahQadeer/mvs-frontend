# MVSSIVE Frontend

## Running Locally

1. Clone the repository:
```bash
git clone https://github.com/mvssive-network/mvs-frontend/ frontend/
cd frontend/
```

2. Use .env 
```bash
REACT_APP_STRIPE_PUBLISHABLE_KEY=""
REACT_APP_API_URL="http://localhost:4000"  # Should point to local or live APIs
REACT_APP_APIGATEWAY_URL=""
```

3. Install dependencies and run the server:
```bash
yarn install
yarn start
```
