# Encrypted Timeseries

This repository contains a TCP-based encrypted data streaming system.

## Services
- emitter-service: Generates encrypted data streams
- listener-service: Decrypts, validates, and stores data in MongoDB
- frontend: Real-time React UI displaying data and success rate

## Tech Stack
- Node.js
- MongoDB
- React
- TCP Sockets
- AES-256-CTR Encryption

## How to Run
1. Start MongoDB
2. Run listener-service (node index.js)
3. Run emitter-service (node index.js)
4. Start frontend (npm start)
