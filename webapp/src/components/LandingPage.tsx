import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTree,
  faShieldHalved,
  faChain,
  faClipboardList,
  faArrowRight,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';

const LandingPage: React.FC = () => {
  const features = [
    {
      icon: faTree,
      title: 'Merkle Tree Proofs',
      description: 'Cryptographic hash trees that verify data integrity without revealing sensitive model weights or parameters.',
    },
    {
      icon: faShieldHalved,
      title: 'Zero-Knowledge Verification',
      description: 'Prove AI inference correctness without exposing the underlying model architecture or training data.',
    },
    {
      icon: faChain,
      title: 'Proof Chains',
      description: 'Build immutable chains of proofs linking inference results to their cryptographic origins.',
    },
    {
      icon: faClipboardList,
      title: 'Audit Logs',
      description: 'Tamper-evident audit trails recording every proof generation and verification event.',
    },
  ];

  const howItWorks = [
    {
      step: 1,
      title: 'Generate Proof',
      description: 'Submit your AI model output and input for cryptographic proof generation using Merkle trees.',
    },
    {
      step: 2,
      title: 'Create Hash Chain',
      description: 'TrustProof generates a chain of cryptographic hashes linking your proof to previous proofs.',
    },
    {
      step: 3,
      title: 'Verify Integrity',
      description: 'Use the verification interface to confirm proof validity without revealing sensitive data.',
    },
    {
      step: 4,
      title: 'Audit Trail',
      description: 'Access complete audit logs showing all proof operations with tamper detection.',
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-8">
            <div className="inline-block">
              <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-br mb-4">
                TrustProof
              </div>
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
              Cryptographic Verification for AI
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Prove AI inference integrity and authenticity without revealing model weights. Build trust in AI systems through cryptographic proofs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/signup"
                className="px-8 py-4 rounded-lg bg-gradient-br text-white font-semibold hover:opacity-90 transition-opacity"
              >
                Get Started Free
              </Link>
              <a
                href="/#features"
                className="px-8 py-4 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white font-semibold hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
              >
                Learn More
              </a>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="mt-16 relative">
            <div className="absolute inset-0 bg-gradient-br opacity-10 rounded-2xl blur-3xl"></div>
            <div className="relative bg-gradient-to-br from-primary-50 to-amber-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl p-8 border border-primary-200 dark:border-gray-700">
              <div className="text-center py-12">
                <div className="text-gray-600 dark:text-gray-400 space-y-2">
                  <p className="font-mono text-sm">Merkle Root Hash</p>
                  <p className="font-mono text-xs text-primary-600 dark:text-primary-400 break-all">
                    a7f3c8e2d5b9f1e4c6a8d2e5f7a9b1c3d5e7f9a1b3c5d7e9f1a2b4c6d8e0
                  </p>
                  <p className="font-mono text-sm mt-4">Proof Chain Status</p>
                  <p className="flex items-center justify-center gap-2 text-green-600 dark:text-green-400">
                    <FontAwesomeIcon icon={faCheck} />
                    Verified & Tamper-Proof
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Everything you need for cryptographic AI verification
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="p-8 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600 transition-colors"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-br flex items-center justify-center text-white mb-4">
                  <FontAwesomeIcon icon={feature.icon} size="lg" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Four simple steps to cryptographic AI verification
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {howItWorks.map((item, idx) => (
              <div key={idx} className="relative">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-br flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {item.description}
                  </p>
                </div>
                {idx < howItWorks.length - 1 && (
                  <div className="hidden md:block absolute top-8 -right-4 w-8 h-8 text-primary-600 dark:text-primary-400">
                    <FontAwesomeIcon icon={faArrowRight} size="lg" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-br">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-6">
            Ready to verify AI with cryptography?
          </h2>
          <p className="text-xl mb-8 text-amber-50">
            Start your free account today and generate unlimited proofs.
          </p>
          <Link
            to="/signup"
            className="inline-block px-8 py-4 rounded-lg bg-white text-primary-600 font-semibold hover:bg-gray-100 transition-colors"
          >
            Create Free Account
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
