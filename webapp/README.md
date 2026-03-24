# TrustProof - Cryptographic AI Verification Platform

A complete Vite + React + TypeScript SaaS web application for cryptographic verification of AI inference without revealing model weights.

## Features

### Core Capabilities
- **Merkle Tree Proofs**: Cryptographic hash trees that verify data integrity without revealing sensitive information
- **Zero-Knowledge Verification**: Prove AI output correctness without exposing model architecture or training data
- **Proof Chains**: Build immutable chains of proofs linking inference results to their cryptographic origins
- **Tamper-Evident Audit Logs**: Complete audit trails recording every proof operation with tampering detection

### Platform Features
- **Interactive Merkle Tree Visualization**: Expandable tree nodes displaying hash values at each level
- **Proof Generation Panel**: Form-based interface to create new proofs with model/input/output fields
- **Verification Interface**: Paste proof hash to verify with immediate green/red result feedback
- **Proof Chain Timeline**: Vertical timeline visualization of generated proofs with timestamps and status
- **API Key Management**: Generate and revoke API keys for programmatic access

## Project Structure

```
trustproof/webapp/
├── src/
│   ├── components/
│   │   ├── Dashboard.tsx           # Main dashboard with all verification tools
│   │   ├── LandingPage.tsx         # Hero and features landing page
│   │   ├── PricingPage.tsx         # Pricing tiers with FAQ
│   │   ├── SignIn.tsx              # Email/password and Google auth
│   │   ├── SignUp.tsx              # Account creation with validation
│   │   ├── Navigation.tsx          # Header with theme toggle
│   │   └── Billing.tsx             # Subscription and usage management
│   ├── contexts/
│   │   ├── AuthContext.tsx         # Firebase authentication state
│   │   └── ThemeContext.tsx        # Light/dark theme management
│   ├── types/
│   │   └── index.ts                # TypeScript interfaces
│   ├── firebase.ts                 # Firebase configuration
│   ├── App.tsx                     # Router and route protection
│   ├── main.tsx                    # React entry point
│   └── index.css                   # Tailwind imports
├── public/
├── index.html                      # HTML entry point
├── tailwind.config.js              # Amber-to-yellow gradient theme
├── postcss.config.js               # PostCSS configuration
├── vite.config.ts                  # Vite bundler config
├── tsconfig.json                   # TypeScript configuration
├── package.json                    # Dependencies and scripts
├── firebase.json                   # Firebase project config
└── .env.example                    # Environment variables template
```

## Installation

1. **Clone and navigate to the project:**
   ```bash
   cd /sessions/awesome-lucid-volta/mnt/outputs/ts-repos/trustproof/webapp
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Firebase:**
   - Copy `.env.example` to `.env.local`
   - Add your Firebase project credentials:
     ```
     VITE_FIREBASE_API_KEY=your_api_key
     VITE_FIREBASE_AUTH_DOMAIN=trustproof-saas.firebaseapp.com
     VITE_FIREBASE_PROJECT_ID=trustproof-saas
     VITE_FIREBASE_STORAGE_BUCKET=trustproof-saas.appspot.com
     VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
     VITE_FIREBASE_APP_ID=your_app_id
     ```

4. **Start development server:**
   ```bash
   npm run dev
   ```
   Opens at http://localhost:5173

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Compile TypeScript and build production bundle
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint with strict warnings

## Authentication

- **Firebase Authentication**: Email/password and Google OAuth sign-in
- **Protected Routes**: Dashboard and Billing require authentication
- **Session Persistence**: Auth state persists across browser sessions
- **Automatic Logout**: Sign out available from navigation menu

## Pricing Plans

1. **Free** - 100 proofs/month, basic features, community support
2. **Pro** - 10,000 proofs/month, advanced tools, API access, email support ($39/month)
3. **Enterprise** - Unlimited proofs, custom integration, dedicated support (custom pricing)

## Dashboard Functionality

### Overview Tab
- Statistics dashboard (total proofs, this month, verification success rate, avg time)
- Recent proofs table with status and timestamps

### Generate Proof Tab
- Form to create new proofs (model name, input hash, output hash)
- Interactive Merkle tree visualization with expandable nodes
- Real-time hash display for each tree node

### Verify Proof Tab
- Paste proof hash for instant verification
- Green checkmark for valid proofs
- Red X for invalid or tampered proofs
- Detailed verification messages

### Proof Chain Tab
- Vertical timeline visualization of generated proofs
- Connected nodes showing proof relationships
- Status indicators (valid/pending)
- Tamper detection badges

### API Keys Tab
- List of active and revoked API keys
- Copy-to-clipboard functionality
- Key generation with custom names
- Revoke keys with one click
- Last used timestamps

## Branding

- **Color Scheme**: Amber-to-yellow gradient (from-amber-600 to-yellow-500)
- **Dark Mode**: Full dark theme support with system preference detection
- **Typography**: System fonts with smooth rendering
- **Responsive**: Mobile-first design with Tailwind CSS

## Technology Stack

- **React 18.2**: UI component library with hooks
- **TypeScript 5.3**: Type-safe development
- **Vite 5**: Fast bundler with hot module reload
- **Tailwind CSS 3.4**: Utility-first styling
- **Firebase 10.7**: Authentication and backend services
- **React Router 6.28**: Client-side routing
- **Recharts 2.10**: Data visualization (included for future use)
- **FontAwesome 6.5**: Icon library

## Environment Variables

Required for Firebase integration:

```env
VITE_FIREBASE_API_KEY              # Firebase API key
VITE_FIREBASE_AUTH_DOMAIN          # Firebase auth domain
VITE_FIREBASE_PROJECT_ID           # Firebase project ID
VITE_FIREBASE_STORAGE_BUCKET       # Firebase storage bucket
VITE_FIREBASE_MESSAGING_SENDER_ID  # Firebase messaging sender ID
VITE_FIREBASE_APP_ID               # Firebase app ID
```

## Type Definitions

### User
- `id`: Firebase UID
- `email`: User email address
- `displayName`: User's full name
- `photoURL`: Avatar URL
- `plan`: Subscription tier (free/pro/enterprise)
- `createdAt`: Account creation timestamp

### Proof
- `id`: Unique proof identifier
- `modelName`: AI model name
- `inputHash`: SHA-256 hash of input data
- `outputHash`: SHA-256 hash of output
- `proofHash`: Cryptographic proof hash
- `timestamp`: Proof generation time
- `status`: Verification status (pending/verified/failed)
- `merkleRoot`: Root hash of Merkle tree
- `treeDepth`: Depth of proof tree

### ApiKey
- `id`: Key identifier
- `name`: User-defined key name
- `key`: API key string (stored only at creation)
- `createdAt`: Key creation timestamp
- `lastUsed`: Last API call timestamp
- `isActive`: Revocation status

## Performance Optimizations

- Code splitting via Vite
- Tree-shaking of unused dependencies
- Dark mode CSS optimization
- Image lazy loading ready
- Responsive design for all screen sizes

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

Proprietary - TrustProof SaaS Platform

## Support

For issues, feature requests, or questions, contact support@trustproof.io
