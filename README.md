# Encrypted Time-Series Streaming Application

This repository contains a **small end-to-end backend system** that demonstrates:

- Encrypted data generation
- Streaming data over raw sockets
- Decryption and decoding of streamed data
- Storage of data in a time-series–friendly database
- Emitting stored data to a frontend for visualization

The project was built as part of a technical assignment to demonstrate backend fundamentals such as **socket programming, encryption, data pipelines, and time-series storage**.

---

## 📌 Background & Context

My **primary backend experience is in Ruby on Rails (≈2.5 years)**.  
I have **limited prior exposure to Node.js**, but since the job description specifically mentioned Node.js, I intentionally chose to implement this assignment using Node.js to demonstrate:

- Ability to **adapt to a new technology stack**
- Strong backend fundamentals transferable across languages
- Willingness to learn and apply unfamiliar tools when required

The focus of this project is **clarity, correctness, and architecture**, rather than production-grade optimizations.

---

## 🧠 High-Level Architecture

[ Data Emitter ]
|
| (Encrypted TCP Stream)
v
[ Socket Listener ]
|
| (Decrypted & Decoded Data)
v
[ Time-Series Database ]
|
| (HTTP / WebSocket)
v
[ Frontend Application ]


---

## ⚙️ Components Overview

### 1. Data Emitter Service
- Periodically generates sample time-series data
- Encrypts the data using symmetric encryption
- Sends encrypted payloads over a **TCP socket**

### 2. Listener / Consumer Service
- Listens on a TCP socket
- Receives encrypted data streams
- Decrypts and parses incoming data
- Stores decoded data in a database with timestamps

### 3. Database
- Used to store **time-ordered data**
- Suitable for time-series workloads
- Each record contains:
  - Timestamp
  - Value(s)

### 4. Frontend
- Fetches stored data from the backend
- Displays time-series values
- UI is intentionally minimal

---

## 🛠️ Tech Stack

- **Node.js** – Backend services
- **TCP Sockets** – Streaming communication
- **AES (Symmetric Encryption)** – Securing data in transit
- **MongoDB** – Time-series data storage
- **React** – Frontend UI

---

## 📁 Project Structure

encrypted-timeseries/
│
├── emitter-service/ # Generates & encrypts data
├── listener-service/ # Decrypts & stores data
├── frontend/ # Displays stored data
└── README.md

---

## 🔑 Encryption Details

- Symmetric encryption is used to encrypt data before sending it over the socket
- The same encryption key is shared between the emitter and listener services
- Ensures data confidentiality during transmission

> Note: Encryption key management is intentionally simplified for the scope of this assignment.

---

## 🚀 Setup & Run Instructions

### ✅ Prerequisites

Ensure the following are installed:

- **Node.js** (v16+ recommended)
- **MongoDB** (running locally or remotely)

---

### 🔧 Installation

Clone the repository:

git clone https://github.com/Skshmkhurana/encrypted-timeseries.git
cd encrypted-timeseries
Install dependencies for each service:

cd emitter-service
npm install

cd ../listener-service
npm install

cd ../frontend
npm install
▶️ Running the Application
Run each service in a separate terminal.

Start MongoDB
(Ensure MongoDB is running)

Start the Listener Service:

bash
Copy code
cd listener-service
node index.js
Start the Emitter Service:

bash
Copy code
cd emitter-service
node index.js
Start the Frontend:

bash
Copy code
cd frontend
npm start
The frontend should open in the browser and begin displaying streamed data.

