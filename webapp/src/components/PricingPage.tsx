import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { PricingTier } from '@/types';

const PricingPage: React.FC = () => {
  const pricingTiers: PricingTier[] = [
    {
      name: 'Free',
      price: 0,
      period: 'forever',
      proofs: 100,
      description: 'Perfect for getting started with cryptographic proofs',
      features: [
        '100 proofs per month',
        'Merkle tree visualization',
        'Basic proof verification',
        'Audit logs (7 days)',
        'Community support',
      ],
      cta: 'Get Started',
    },
    {
      name: 'Pro',
      price: 39,
      period: 'month',
      proofs: 10000,
      description: 'For teams scaling AI verification',
      features: [
        '10,000 proofs per month',
        'Advanced Merkle tree tools',
        'Zero-knowledge verification',
        'Proof chain visualization',
        'Audit logs (90 days)',
        'API access (up to 1000 req/day)',
        'Email support',
        '5 API keys',
      ],
      cta: 'Start Pro Trial',
      highlighted: true,
    },
    {
      name: 'Enterprise',
      price: 0,
      period: 'custom',
      proofs: 0,
      description: 'For organizations with custom requirements',
      features: [
        'Unlimited proofs',
        'Custom Merkle tree implementations',
        'Advanced zero-knowledge protocols',
        'Real-time proof chain updates',
        'Unlimited audit logs',
        'Unlimited API access',
        'Dedicated support',
        'Unlimited API keys',
        'Custom integrations',
        'SLA guarantee',
      ],
      cta: 'Contact Sales',
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Choose the plan that fits your cryptographic proof needs
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {pricingTiers.map((tier, idx) => (
            <div
              key={idx}
              className={`relative rounded-2xl border transition-all duration-300 ${
                tier.highlighted
                  ? 'border-primary-400 dark:border-primary-600 shadow-2xl scale-105 bg-gradient-to-br from-primary-50 to-white dark:from-primary-950 dark:to-gray-900'
                  : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800'
              }`}
            >
              {tier.highlighted && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-br text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </div>
              )}

              <div className="p-8">
                {/* Tier Name */}
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {tier.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
                  {tier.description}
                </p>

                {/* Pricing */}
                <div className="mb-6">
                  {tier.price === 0 && tier.period === 'custom' ? (
                    <div>
                      <p className="text-4xl font-bold text-gray-900 dark:text-white">
                        Custom
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
                        Contact for pricing
                      </p>
                    </div>
                  ) : tier.price === 0 ? (
                    <div>
                      <p className="text-4xl font-bold text-gray-900 dark:text-white">
                        Free
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
                        {tier.period}
                      </p>
                    </div>
                  ) : (
                    <div>
                      <span className="text-4xl font-bold text-gray-900 dark:text-white">
                        ${tier.price}
                      </span>
                      <span className="text-gray-600 dark:text-gray-400">
                        /{tier.period}
                      </span>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
                        Up to {tier.proofs.toLocaleString()} proofs per month
                      </p>
                    </div>
                  )}
                </div>

                {/* CTA Button */}
                <Link
                  to="/signup"
                  className={`w-full block text-center py-3 rounded-lg font-semibold transition-all duration-300 mb-8 ${
                    tier.highlighted
                      ? 'bg-gradient-br text-white hover:opacity-90'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {tier.cta}
                </Link>

                {/* Features */}
                <div className="space-y-4">
                  {tier.features.map((feature, fidx) => (
                    <div key={fidx} className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        <FontAwesomeIcon
                          icon={faCheck}
                          className="text-primary-600 dark:text-primary-400"
                        />
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 text-sm">
                        {feature}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            <details className="group bg-gray-50 dark:bg-gray-800 rounded-lg p-6 open:bg-gradient-to-br open:from-primary-50 open:to-white dark:open:from-primary-950 dark:open:to-gray-900 cursor-pointer">
              <summary className="font-semibold text-gray-900 dark:text-white text-lg flex justify-between items-center">
                What are Merkle tree proofs?
                <span className="text-primary-600 dark:text-primary-400 group-open:rotate-180 transition-transform">
                  ▼
                </span>
              </summary>
              <p className="text-gray-600 dark:text-gray-400 mt-4">
                Merkle trees are cryptographic data structures that hash pairs of data recursively, creating a single root hash. They enable efficient verification of large datasets without revealing the underlying data, making them perfect for proving AI model outputs.
              </p>
            </details>

            <details className="group bg-gray-50 dark:bg-gray-800 rounded-lg p-6 open:bg-gradient-to-br open:from-primary-50 open:to-white dark:open:from-primary-950 dark:open:to-gray-900 cursor-pointer">
              <summary className="font-semibold text-gray-900 dark:text-white text-lg flex justify-between items-center">
                How does zero-knowledge verification work?
                <span className="text-primary-600 dark:text-primary-400 group-open:rotate-180 transition-transform">
                  ▼
                </span>
              </summary>
              <p className="text-gray-600 dark:text-gray-400 mt-4">
                Zero-knowledge proofs allow you to prove a statement is true without revealing any information about the statement itself. In TrustProof, this means you can verify AI outputs without exposing model weights, training data, or proprietary algorithms.
              </p>
            </details>

            <details className="group bg-gray-50 dark:bg-gray-800 rounded-lg p-6 open:bg-gradient-to-br open:from-primary-50 open:to-white dark:open:from-primary-950 dark:open:to-gray-900 cursor-pointer">
              <summary className="font-semibold text-gray-900 dark:text-white text-lg flex justify-between items-center">
                Can I exceed my monthly proof limit?
                <span className="text-primary-600 dark:text-primary-400 group-open:rotate-180 transition-transform">
                  ▼
                </span>
              </summary>
              <p className="text-gray-600 dark:text-gray-400 mt-4">
                Each plan comes with a monthly proof limit. Once you exceed it, we'll notify you and you can upgrade anytime. Contact our sales team for custom arrangements or high-volume discounts.
              </p>
            </details>

            <details className="group bg-gray-50 dark:bg-gray-800 rounded-lg p-6 open:bg-gradient-to-br open:from-primary-50 open:to-white dark:open:from-primary-950 dark:open:to-gray-900 cursor-pointer">
              <summary className="font-semibold text-gray-900 dark:text-white text-lg flex justify-between items-center">
                What does the API include?
                <span className="text-primary-600 dark:text-primary-400 group-open:rotate-180 transition-transform">
                  ▼
                </span>
              </summary>
              <p className="text-gray-600 dark:text-gray-400 mt-4">
                Our API lets you integrate proof generation and verification into your applications. It includes endpoints for creating Merkle proofs, verifying proof chains, and accessing audit logs. API rate limits depend on your plan.
              </p>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
