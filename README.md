Electronic Health Record Storage
Project Overview
A secure blockchain-based Electronic Health Record system designed to protect sensitive patient data while ensuring privacy and integrity. This project leverages blockchain technology to create an immutable record system with advanced security features including two-factor authentication.
Key Features
Blockchain Security

Immutable record storage ensuring data integrity
Smart contract implementation on Ethereum blockchain
Decentralized data architecture preventing single points of failure

Advanced Two-Factor Authentication

Firebase-integrated OTP verification system
MetaMask wallet security for blockchain interaction
Multi-layer security approach for patient data protection

Privacy-Preserving Architecture

Double encryption methodology using AES algorithm
SHA-256 cryptographic hashing for secure key generation
Third-party system integration for key management

User Access Controls

Permission-based data sharing capabilities
Patient-controlled access to medical records
Healthcare provider authentication system

Technical Architecture
Components
1. Blockchain Layer

Ethereum-based distributed ledger
Smart contracts for automated record management
Cryptographic verification of transactions

2. Third-Party System

Centralized key management server
Advanced Encryption Standard (AES) implementation
SHA-256 hash function for key generation

3. Client Interface

User-friendly front end application
Local encryption processing
Secure communication channels

Working Mechanism
Data Storage Process

Client generates encryption key using SHA-256 with patient data as key-text
Data is encrypted locally using AES encryption algorithm
Encrypted data is sent to Third Party System for secondary encryption
System stores generated key in database with owner identification
Twice-encrypted data is returned to client
Client sends encrypted data with locally generated key to blockchain
Blockchain records transaction in an immutable block

Data Retrieval Process

Encrypted data and locally generated key are fetched from blockchain
Encrypted data is sent to Third Party System
System decrypts data using stored key (requires permission from data owner)
Partially decrypted data is sent back to client
Client performs final decryption using the key from blockchain
Original data is displayed to authorized user

Security Implementation
Two-Factor Authentication System

Primary authentication through username/password
Secondary verification through Firebase OTP system
Additional blockchain security layer through MetaMask wallet integration
User session management with secure timeout features

Privacy Protection

Double encryption ensures data remains unreadable without proper authorization
Key deletion capability provides "effective" data removal from blockchain
Permission-based access control system

Technical Requirements

Ganache (local blockchain environment)
MetaMask browser extension
Truffle framework
Node.js and npm
Modern web browser

Installation Instructions
Setup Environment

Install Ganache for local blockchain testing
Install MetaMask browser extension
Configure Truffle for smart contract deployment

Deploy Smart Contracts

Use Truffle to deploy contracts to the blockchain network
Update contract addresses in application configuration

Configure Authentication

Set up Firebase project for OTP functionality
Connect MetaMask for blockchain interaction
Configure authentication parameters

Run Application

Install dependencies: npm update
Start application: npm start
Create user account and begin storing patient data

Conclusion
This blockchain-based Electronic Health Record system provides a secure and privacy-preserving solution for managing sensitive patient information. By implementing multi-layer encryption and two-factor authentication, the system ensures that only authorized users can access specific health records while maintaining the immutability and integrity benefits of blockchain technology.
