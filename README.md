# SmartToll Blockchain System


A modern, **blockchain-based toll management system** designed for Indian highways and expressways. This system provides **secure**, **transparent**, and **efficient** toll collection with real-time monitoring and blockchain verification.

![Alt text](https://github.com/Shreyas-Kadapatti/TOLL/blob/main/Toll.webp)

---

## 🚗 Features

### Core Functionality
- **Secure Authentication** – Role-based access for administrators and operators  
- **Toll Payment Processing** – Quick and secure toll payments with blockchain verification  
- **Transaction History** – Complete record of all toll transactions with search functionality  
- **Toll Booth Management** – Monitor and manage toll booths across major Indian highways  
- **Blockchain Explorer** – View and verify transactions on the immutable blockchain ledger  

### Technical Highlights
- **Blockchain Integration** – Secure transaction verification with immutable records  
- **Real-time Monitoring** – Live updates on toll booth status and transactions  
- **Responsive Design** – Works seamlessly on desktop and mobile devices  
- **Indian Localization** – Indian highways, locations, and Rupee (₹) currency  

---

## 🛠️ Technologies Used

### Frontend
- **Next.js 14** (App Router)  
- **React 18**  
- **TypeScript**  
- **Tailwind CSS**  
- **shadcn/ui Components**  
- **Lucide React Icons**  

### Backend
- **Next.js API Routes**  
- **Blockchain Simulation**  
- **In-memory Database** (expandable to real DB)  

### Authentication
- **Custom JWT-based authentication**  
- **Local storage persistence**  

---

## 📋 Prerequisites

Make sure you have the following installed:
- **Node.js** v18.0.0 or higher  
- **npm** or **yarn**

---

## 🚀 Installation

Clone the repository and install dependencies:

```bash
1.git clone https://github.com/Shreyas-Kadapatti/TOLL.git
2.cd TOLL
## 📂 Project Structure

TOLL/
├── app/                # App router pages
├── components/         # Reusable UI components
├── lib/                # Utility libraries
├── pages/              # API routes
├── public/             # Static assets
├── styles/             # Tailwind & global styles
└── ...                 # Config and setup files
npm install
#
3. **Run the development server**


```shellscript
npm run dev
# or
yarn dev
```

4. **Open your browser**


Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 🔑 Demo Credentials

- **Admin User**:

- Email: [admin@smarttoll.com](mailto:admin@smarttoll.com)
- Password: admin123



- **Toll Operator**:

- Email: [operator@smarttoll.com](mailto:operator@smarttoll.com)
- Password: operator123





## 📱 Usage Guide

### Making a Toll Payment

1. Log in using the provided credentials
2. Navigate to the "Payment" tab
3. Click on "Make Payment"
4. Enter vehicle details and select toll booth
5. Complete the payment
6. View transaction confirmation with blockchain verification


### Viewing Transaction History

1. Navigate to the "Transactions" tab
2. View all transactions in the system
3. Use the search functionality to find specific transactions
4. Click on blockchain hash to view verification details


### Managing Toll Booths

1. Navigate to the "Toll Booths" tab
2. View status and statistics for all toll booths
3. Configure booth settings or monitor real-time activity


### Exploring the Blockchain

1. Navigate to the "Blockchain" tab
2. View all blocks in the blockchain
3. Examine transaction details and verification status
4. Copy blockchain hashes for external verification


## 🛣️ Toll Locations

The system currently includes the following major Indian toll locations:

- Delhi-Mumbai Expressway (Haryana)
- Mumbai-Pune Expressway (Maharashtra)
- Yamuna Expressway (Greater Noida)
- Chennai-Bangalore Highway (Tamil Nadu)
- Ahmedabad-Vadodara Expressway (Gujarat)


## 📊 API Endpoints

### Authentication

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration


### Transactions

- `GET /api/transactions` - Get all transactions
- `POST /api/transactions` - Create a new transaction


### Toll Booths

- `GET /api/booths` - Get all toll booths
- `GET /api/booths/:id` - Get specific toll booth details
- `PUT /api/booths/:id` - Update toll booth information


## 🔗 Blockchain Integration

The system uses a simulated blockchain for demonstration purposes, with the following features:

- **Transaction Hashing** - Each transaction receives a unique hash
- **Block Creation** - Transactions are grouped into blocks
- **Chain Verification** - Each block links to the previous block via its hash
- **Immutable Records** - Once verified, transactions cannot be altered


In a production environment, this can be connected to actual blockchain networks like Ethereum or a private blockchain.

## 🔮 Future Roadmap

- **FASTag Integration** - Connect with India's electronic toll collection system
- **Multi-language Support** - Add Hindi and other regional languages
- **Mobile App** - Dedicated mobile application for drivers
- **Real Database** - Replace in-memory storage with MongoDB or PostgreSQL
- **Advanced Analytics** - Traffic patterns and revenue forecasting
- **Vehicle Recognition** - Automatic number plate recognition (ANPR)
- **GST Integration** - Automated tax calculations and reporting


## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


