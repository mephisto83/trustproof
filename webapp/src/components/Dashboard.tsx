import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faCheck,
  faTimes,
  faCopy,
  faKey,
  faRefresh,
  faChain,
  faTree,
} from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '@/contexts/AuthContext';
import { Proof, MerkleNode, ProofChain, ApiKey } from '@/types';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'generate' | 'verify' | 'chain' | 'api'>('overview');
  const [proofs, setProofs] = useState<Proof[]>([
    {
      id: 'prf_001',
      modelName: 'GPT-4 Fine-tuned',
      inputHash: 'a7f3c8e2d5b9f1e4c6a8d2e5f7a9b1c3',
      outputHash: 'd5e7f9a1b3c5d7e9f1a2b4c6d8e0a2c4',
      proofHash: 'e4f8a0b2c4d6e8f0a2b4c6d8e0a2c4e6',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      status: 'verified',
      merkleRoot: 'f5e8b1c3d5e7f9a1b3c5d7e9f1a2b4c6',
      treeDepth: 4,
    },
    {
      id: 'prf_002',
      modelName: 'Claude 2',
      inputHash: 'b8e4d9f2a6c1e3f5b7d9f1a3c5e7f9b1',
      outputHash: 'c6e8a0b2d4e6f8a0c2e4f6a8b0c2d4e6',
      proofHash: 'd7f9a1b3c5d7e9f1a3c5d7e9f1a3c5d7',
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
      status: 'verified',
      merkleRoot: 'e6f8b0c2d4e6f8a0c2e4f6a8b0c2d4e6',
      treeDepth: 5,
    },
  ]);

  const [proofChains, setProofChains] = useState<ProofChain[]>([
    {
      id: 'chain_001',
      proofId: 'prf_001',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      status: 'valid',
      tamperDetected: false,
    },
    {
      id: 'chain_002',
      proofId: 'prf_002',
      parentProofId: 'prf_001',
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
      status: 'valid',
      tamperDetected: false,
    },
  ]);

  const [apiKeys, setApiKeys] = useState<ApiKey[]>([
    {
      id: 'key_001',
      name: 'Production API Key',
      key: 'tp_live_abc123def456ghi789jkl012mno345pqr',
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      lastUsed: new Date(Date.now() - 2 * 60 * 60 * 1000),
      isActive: true,
    },
  ]);

  const [merkleTree, setMerkleTree] = useState<MerkleNode>({
    id: 'root',
    hash: 'f5e8b1c3d5e7f9a1b3c5d7e9f1a2b4c6',
    level: 0,
    position: 0,
    children: [
      {
        id: 'node_1',
        hash: 'a7f3c8e2d5b9f1e4c6a8d2e5f7a9b1c3',
        level: 1,
        position: 0,
        children: [
          {
            id: 'node_1_1',
            hash: 'b8e4d9f2a6c1e3f5b7d9f1a3c5e7f9b1',
            level: 2,
            position: 0,
            data: 'Input Data 1',
          },
          {
            id: 'node_1_2',
            hash: 'c6e8a0b2d4e6f8a0c2e4f6a8b0c2d4e6',
            level: 2,
            position: 1,
            data: 'Input Data 2',
          },
        ],
      },
      {
        id: 'node_2',
        hash: 'd5e7f9a1b3c5d7e9f1a2b4c6d8e0a2c4',
        level: 1,
        position: 1,
        children: [
          {
            id: 'node_2_1',
            hash: 'd7f9a1b3c5d7e9f1a3c5d7e9f1a3c5d7',
            level: 2,
            position: 0,
            data: 'Input Data 3',
          },
          {
            id: 'node_2_2',
            hash: 'e8a0b2c4d6e8f0a2b4c6d8e0a2c4e6f8',
            level: 2,
            position: 1,
            data: 'Input Data 4',
          },
        ],
      },
    ],
  });

  const [newProof, setNewProof] = useState({
    modelName: '',
    inputHash: '',
    outputHash: '',
  });

  const [verifyHash, setVerifyHash] = useState('');
  const [verifyResult, setVerifyResult] = useState<{ status: 'verified' | 'invalid' | null; message: string }>({
    status: null,
    message: '',
  });

  const [expandedNode, setExpandedNode] = useState<string | null>('root');
  const [newApiKeyName, setNewApiKeyName] = useState('');
  const [showApiKeyForm, setShowApiKeyForm] = useState(false);

  const generateProof = () => {
    if (!newProof.modelName || !newProof.inputHash || !newProof.outputHash) {
      alert('Please fill in all fields');
      return;
    }

    const proof: Proof = {
      id: `prf_${Date.now()}`,
      modelName: newProof.modelName,
      inputHash: newProof.inputHash,
      outputHash: newProof.outputHash,
      proofHash: `pf_${Math.random().toString(16).substr(2, 32)}`,
      timestamp: new Date(),
      status: 'verified',
      merkleRoot: `mr_${Math.random().toString(16).substr(2, 32)}`,
      treeDepth: Math.floor(Math.random() * 5) + 3,
    };

    setProofs([proof, ...proofs]);
    setNewProof({ modelName: '', inputHash: '', outputHash: '' });
    alert('Proof generated successfully!');
  };

  const verifyProof = () => {
    if (!verifyHash) {
      alert('Please enter a proof hash');
      return;
    }

    const exists = proofs.some((p) => p.proofHash === verifyHash);

    if (exists) {
      setVerifyResult({
        status: 'verified',
        message: 'Proof verified successfully! This proof has not been tampered with.',
      });
    } else {
      setVerifyResult({
        status: 'invalid',
        message: 'Proof verification failed. This proof does not exist or has been modified.',
      });
    }
  };

  const generateApiKey = () => {
    if (!newApiKeyName) {
      alert('Please enter a name for the API key');
      return;
    }

    const apiKey: ApiKey = {
      id: `key_${Date.now()}`,
      name: newApiKeyName,
      key: `tp_live_${Math.random().toString(16).substr(2, 32)}`,
      createdAt: new Date(),
      isActive: true,
    };

    setApiKeys([...apiKeys, apiKey]);
    setNewApiKeyName('');
    setShowApiKeyForm(false);
    alert('API key generated successfully!');
  };

  const revokeApiKey = (keyId: string) => {
    setApiKeys(apiKeys.map((k) => (k.id === keyId ? { ...k, isActive: false } : k)));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const TreeNode: React.FC<{ node: MerkleNode; depth: number }> = ({ node, depth }) => {
    const isExpanded = expandedNode === node.id;

    return (
      <div className="ml-4" style={{ marginLeft: `${depth * 20}px` }}>
        <div
          className="p-3 bg-gradient-to-r from-primary-50 to-amber-50 dark:from-primary-950 dark:to-gray-900 rounded-lg border border-primary-200 dark:border-primary-700 cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => setExpandedNode(isExpanded ? null : node.id)}
        >
          <div className="flex items-center gap-2">
            {node.children && node.children.length > 0 && (
              <span className={`text-primary-600 dark:text-primary-400 transform transition-transform ${isExpanded ? 'rotate-90' : ''}`}>
                ▶
              </span>
            )}
            {!node.children && <span className="w-4"></span>}
            <div className="flex-1">
              <p className="text-xs font-mono text-gray-600 dark:text-gray-400">
                Level {node.level} | Position {node.position}
              </p>
              <p className="text-xs font-mono text-primary-600 dark:text-primary-400 break-all font-semibold">
                {node.hash}
              </p>
              {node.data && (
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  {node.data}
                </p>
              )}
            </div>
          </div>
        </div>

        {isExpanded && node.children && (
          <div className="mt-2">
            {node.children.map((child) => (
              <TreeNode key={child.id} node={child} depth={depth + 1} />
            ))}
          </div>
        )}
      </div>
    );
  };

  const stats = {
    totalProofs: proofs.length,
    proofsThisMonth: proofs.filter((p) => {
      const now = new Date();
      return p.timestamp.getMonth() === now.getMonth();
    }).length,
    verificationSuccess: proofs.filter((p) => p.status === 'verified').length,
    averageVerificationTime: 245,
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Welcome back, {user?.displayName || user?.email}
          </p>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats */}
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Total Proofs</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{stats.totalProofs}</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">This Month</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{stats.proofsThisMonth}</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Verified</p>
                <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-2">{stats.verificationSuccess}</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Avg. Time (ms)</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{stats.averageVerificationTime}</p>
              </div>
            </div>

            {/* Recent Proofs */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Recent Proofs</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">Model</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">Proof Hash</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">Status</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">Created</th>
                    </tr>
                  </thead>
                  <tbody>
                    {proofs.map((proof) => (
                      <tr key={proof.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                        <td className="py-3 px-4">{proof.modelName}</td>
                        <td className="py-3 px-4 font-mono text-xs text-primary-600 dark:text-primary-400 truncate">
                          {proof.proofHash}
                        </td>
                        <td className="py-3 px-4">
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-medium">
                            <FontAwesomeIcon icon={faCheck} size="sm" />
                            Verified
                          </span>
                        </td>
                        <td className="py-3 px-4 text-gray-500 dark:text-gray-400">
                          {proof.timestamp.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Merkle Tree Tab */}
        {activeTab === 'generate' && (
          <div className="space-y-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Generate New Proof</h2>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Form */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Model Name
                    </label>
                    <input
                      type="text"
                      value={newProof.modelName}
                      onChange={(e) => setNewProof({ ...newProof, modelName: e.target.value })}
                      placeholder="e.g., GPT-4, Claude 2"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Input Hash
                    </label>
                    <input
                      type="text"
                      value={newProof.inputHash}
                      onChange={(e) => setNewProof({ ...newProof, inputHash: e.target.value })}
                      placeholder="SHA-256 hash of input"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none font-mono text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Output Hash
                    </label>
                    <input
                      type="text"
                      value={newProof.outputHash}
                      onChange={(e) => setNewProof({ ...newProof, outputHash: e.target.value })}
                      placeholder="SHA-256 hash of output"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none font-mono text-xs"
                    />
                  </div>

                  <button
                    onClick={generateProof}
                    className="w-full py-2 rounded-lg bg-gradient-br text-white font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                  >
                    <FontAwesomeIcon icon={faPlus} />
                    Generate Proof
                  </button>
                </div>

                {/* Merkle Tree */}
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <FontAwesomeIcon icon={faTree} className="text-primary-600 dark:text-primary-400" />
                    Merkle Tree Structure
                  </h3>
                  <div className="overflow-auto max-h-96">
                    <TreeNode node={merkleTree} depth={0} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Verify Tab */}
        {activeTab === 'verify' && (
          <div className="space-y-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Verify Proof</h2>

              <div className="max-w-2xl">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Proof Hash to Verify
                  </label>
                  <input
                    type="text"
                    value={verifyHash}
                    onChange={(e) => setVerifyHash(e.target.value)}
                    placeholder="Enter proof hash..."
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none font-mono text-xs"
                  />
                </div>

                <button
                  onClick={verifyProof}
                  className="py-2 px-6 rounded-lg bg-gradient-br text-white font-semibold hover:opacity-90 transition-opacity flex items-center gap-2"
                >
                  <FontAwesomeIcon icon={faCheck} />
                  Verify Proof
                </button>

                {verifyResult.status && (
                  <div
                    className={`mt-6 p-6 rounded-lg border ${
                      verifyResult.status === 'verified'
                        ? 'bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800'
                        : 'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <FontAwesomeIcon
                        icon={verifyResult.status === 'verified' ? faCheck : faTimes}
                        className={`text-2xl ${
                          verifyResult.status === 'verified'
                            ? 'text-green-600 dark:text-green-400'
                            : 'text-red-600 dark:text-red-400'
                        }`}
                      />
                      <div>
                        <p
                          className={`font-semibold ${
                            verifyResult.status === 'verified'
                              ? 'text-green-900 dark:text-green-100'
                              : 'text-red-900 dark:text-red-100'
                          }`}
                        >
                          {verifyResult.status === 'verified' ? 'Proof Verified' : 'Proof Invalid'}
                        </p>
                        <p
                          className={
                            verifyResult.status === 'verified'
                              ? 'text-green-700 dark:text-green-300'
                              : 'text-red-700 dark:text-red-300'
                          }
                        >
                          {verifyResult.message}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Proof Chain Tab */}
        {activeTab === 'chain' && (
          <div className="space-y-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <FontAwesomeIcon icon={faChain} className="text-primary-600 dark:text-primary-400" />
                Proof Chain Timeline
              </h2>

              <div className="space-y-4">
                {proofChains.map((chain, idx) => (
                  <div key={chain.id} className="relative">
                    {/* Timeline line */}
                    {idx < proofChains.length - 1 && (
                      <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-gradient-to-b from-primary-400 to-primary-200 dark:from-primary-600 dark:to-primary-700"></div>
                    )}

                    {/* Timeline item */}
                    <div className="flex gap-4">
                      <div className="flex flex-col items-center pt-1">
                        <div className="w-4 h-4 rounded-full bg-gradient-br border-4 border-white dark:border-gray-800"></div>
                      </div>
                      <div className="flex-1 pb-4">
                        <div className="bg-gradient-to-r from-primary-50 to-amber-50 dark:from-primary-950 dark:to-gray-900 rounded-lg p-4 border border-primary-200 dark:border-primary-700">
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="font-semibold text-gray-900 dark:text-white">
                                {proofs.find((p) => p.id === chain.proofId)?.modelName}
                              </p>
                              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 font-mono">
                                {chain.proofId}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                                {chain.timestamp.toLocaleString()}
                              </p>
                            </div>
                            <span
                              className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                                chain.status === 'valid'
                                  ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                                  : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                              }`}
                            >
                              <FontAwesomeIcon icon={faCheck} size="sm" />
                              {chain.status === 'valid' ? 'Valid' : 'Pending'}
                            </span>
                          </div>
                          {!chain.tamperDetected && (
                            <p className="text-xs text-green-600 dark:text-green-400 mt-2 flex items-center gap-1">
                              <FontAwesomeIcon icon={faCheck} /> No tampering detected
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* API Keys Tab */}
        {activeTab === 'api' && (
          <div className="space-y-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <FontAwesomeIcon icon={faKey} className="text-primary-600 dark:text-primary-400" />
                  API Keys
                </h2>
                <button
                  onClick={() => setShowApiKeyForm(!showApiKeyForm)}
                  className="px-4 py-2 rounded-lg bg-primary-600 dark:bg-primary-700 text-white font-semibold hover:bg-primary-700 dark:hover:bg-primary-600 transition-colors flex items-center gap-2"
                >
                  <FontAwesomeIcon icon={faPlus} />
                  New Key
                </button>
              </div>

              {showApiKeyForm && (
                <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex gap-4">
                    <input
                      type="text"
                      value={newApiKeyName}
                      onChange={(e) => setNewApiKeyName(e.target.value)}
                      placeholder="Key name (e.g., Production)"
                      className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
                    />
                    <button
                      onClick={generateApiKey}
                      className="px-6 py-2 rounded-lg bg-gradient-br text-white font-semibold hover:opacity-90 transition-opacity"
                    >
                      Generate
                    </button>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                {apiKeys.map((key) => (
                  <div key={key.id} className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">{key.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          Created {key.createdAt.toLocaleDateString()}
                        </p>
                        {key.lastUsed && (
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Last used {key.lastUsed.toLocaleString()}
                          </p>
                        )}
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          key.isActive
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-400'
                        }`}
                      >
                        {key.isActive ? 'Active' : 'Revoked'}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                      <code className="flex-1 text-xs font-mono bg-gray-900 dark:bg-gray-950 text-gray-100 p-2 rounded break-all">
                        {key.key}
                      </code>
                      <button
                        onClick={() => copyToClipboard(key.key)}
                        className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
                      >
                        <FontAwesomeIcon icon={faCopy} />
                      </button>
                    </div>

                    {key.isActive && (
                      <button
                        onClick={() => revokeApiKey(key.id)}
                        className="text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium"
                      >
                        Revoke Key
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 mb-8 sticky top-0 z-10">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'overview'
                ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('generate')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'generate'
                ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            Generate Proof
          </button>
          <button
            onClick={() => setActiveTab('verify')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'verify'
                ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            Verify Proof
          </button>
          <button
            onClick={() => setActiveTab('chain')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'chain'
                ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            Proof Chain
          </button>
          <button
            onClick={() => setActiveTab('api')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'api'
                ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            API Keys
          </button>
          <Link
            to="/billing"
            className="px-4 py-2 rounded-lg font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors ml-auto"
          >
            Billing
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
