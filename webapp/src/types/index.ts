export interface User {
  id: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  plan: 'free' | 'pro' | 'enterprise';
  createdAt: Date;
}

export interface PricingTier {
  name: string;
  price: number;
  period: string;
  proofs: number;
  description: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
}

export interface DashboardStats {
  totalProofs: number;
  proofsThisMonth: number;
  verificationSuccess: number;
  averageVerificationTime: number;
}

export interface Proof {
  id: string;
  modelName: string;
  inputHash: string;
  outputHash: string;
  proofHash: string;
  timestamp: Date;
  status: 'pending' | 'verified' | 'failed';
  merkleRoot: string;
  treeDepth: number;
}

export interface MerkleNode {
  id: string;
  hash: string;
  level: number;
  position: number;
  children?: MerkleNode[];
  data?: string;
}

export interface ProofChain {
  id: string;
  proofId: string;
  parentProofId?: string;
  timestamp: Date;
  status: 'valid' | 'invalid' | 'pending';
  tamperDetected: boolean;
}

export interface ApiKey {
  id: string;
  name: string;
  key: string;
  createdAt: Date;
  lastUsed?: Date;
  isActive: boolean;
}

export interface BillingInfo {
  currentPlan: 'free' | 'pro' | 'enterprise';
  usagePercent: number;
  proofsUsed: number;
  proofsLimit: number;
  renewalDate: Date;
  nextInvoiceAmount: number;
}

export type ThemeMode = 'light' | 'dark' | 'system';
