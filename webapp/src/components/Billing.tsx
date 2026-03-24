import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faDownload, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '@/contexts/AuthContext';
import { BillingInfo } from '@/types';

const Billing: React.FC = () => {
  const { user } = useAuth();
  const [billingInfo] = useState<BillingInfo>({
    currentPlan: 'free',
    usagePercent: 45,
    proofsUsed: 45,
    proofsLimit: 100,
    renewalDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    nextInvoiceAmount: 0,
  });

  const [invoices] = useState([
    {
      id: 'inv_001',
      date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      amount: 0,
      status: 'free',
      proofs: 100,
    },
    {
      id: 'inv_002',
      date: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
      amount: 0,
      status: 'free',
      proofs: 100,
    },
  ]);

  const plans = [
    {
      name: 'Free',
      price: 0,
      proofs: 100,
      features: ['100 proofs/month', 'Basic visualization', 'Community support'],
      current: billingInfo.currentPlan === 'free',
    },
    {
      name: 'Pro',
      price: 39,
      proofs: 10000,
      features: ['10,000 proofs/month', 'Advanced tools', 'API access', 'Email support'],
      current: billingInfo.currentPlan === 'pro',
    },
    {
      name: 'Enterprise',
      price: 0,
      proofs: 0,
      features: ['Unlimited proofs', 'Custom integration', 'Dedicated support'],
      current: billingInfo.currentPlan === 'enterprise',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Billing & Subscription
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage your plan and view usage
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Current Plan */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Your Current Plan
              </h2>

              <div className="bg-gradient-to-br from-primary-50 to-amber-50 dark:from-primary-950 dark:to-gray-900 rounded-lg p-8 border border-primary-200 dark:border-primary-700 mb-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Current Plan</p>
                    <p className="text-4xl font-bold text-gray-900 dark:text-white">
                      {billingInfo.currentPlan.charAt(0).toUpperCase() + billingInfo.currentPlan.slice(1)}
                    </p>
                  </div>
                  {billingInfo.nextInvoiceAmount > 0 && (
                    <div className="text-right">
                      <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Next Invoice</p>
                      <p className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                        ${billingInfo.nextInvoiceAmount}
                      </p>
                    </div>
                  )}
                </div>

                <p className="text-gray-700 dark:text-gray-300">
                  Renewal date: {billingInfo.renewalDate.toLocaleDateString()}
                </p>
              </div>

              {/* Usage Bar */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                  <p className="font-semibold text-gray-900 dark:text-white">Monthly Proof Usage</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {billingInfo.proofsUsed} / {billingInfo.proofsLimit}
                  </p>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div
                    className="bg-gradient-br h-3 rounded-full transition-all duration-500"
                    style={{ width: `${billingInfo.usagePercent}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  {billingInfo.usagePercent}% of monthly quota used
                </p>
              </div>

              {billingInfo.usagePercent > 80 && (
                <div className="p-4 bg-yellow-50 dark:bg-yellow-950/30 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                  <p className="text-sm text-yellow-800 dark:text-yellow-200">
                    You're using more than 80% of your monthly quota. Consider upgrading to avoid interruptions.
                  </p>
                </div>
              )}
            </div>

            {/* Available Plans */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Available Plans
              </h2>

              <div className="grid md:grid-cols-3 gap-6">
                {plans.map((plan, idx) => (
                  <div
                    key={idx}
                    className={`rounded-lg border-2 p-6 transition-all ${
                      plan.current
                        ? 'border-primary-500 bg-gradient-to-br from-primary-50 to-white dark:from-primary-950 dark:to-gray-900 shadow-lg'
                        : 'border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    {plan.current && (
                      <div className="inline-block px-3 py-1 rounded-full bg-primary-600 text-white text-xs font-semibold mb-4">
                        Current Plan
                      </div>
                    )}

                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      {plan.name}
                    </h3>

                    <div className="mb-4">
                      {plan.price === 0 ? (
                        <p className="text-3xl font-bold text-gray-900 dark:text-white">
                          {plan.name === 'Enterprise' ? 'Custom' : 'Free'}
                        </p>
                      ) : (
                        <>
                          <span className="text-3xl font-bold text-gray-900 dark:text-white">
                            ${plan.price}
                          </span>
                          <span className="text-gray-600 dark:text-gray-400">/month</span>
                        </>
                      )}
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                        Up to {plan.proofs.toLocaleString()} proofs per month
                      </p>
                    </div>

                    <button
                      disabled={plan.current}
                      className={`w-full py-2 rounded-lg font-semibold mb-6 transition-colors ${
                        plan.current
                          ? 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-400 cursor-not-allowed'
                          : 'bg-primary-600 dark:bg-primary-700 text-white hover:bg-primary-700 dark:hover:bg-primary-600'
                      }`}
                    >
                      {plan.current ? 'Current Plan' : 'Upgrade'}
                    </button>

                    <div className="space-y-3">
                      {plan.features.map((feature, fidx) => (
                        <div key={fidx} className="flex items-start gap-3">
                          <FontAwesomeIcon
                            icon={faCheck}
                            className="text-primary-600 dark:text-primary-400 mt-1"
                          />
                          <p className="text-sm text-gray-700 dark:text-gray-300">
                            {feature}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Invoices */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Invoices
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">
                        Date
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">
                        Amount
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">
                        Proofs
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">
                        Status
                      </th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoices.map((invoice) => (
                      <tr
                        key={invoice.id}
                        className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                      >
                        <td className="py-3 px-4">
                          {invoice.date.toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4 font-semibold">
                          ${invoice.amount.toFixed(2)}
                        </td>
                        <td className="py-3 px-4">
                          {invoice.proofs.toLocaleString()}
                        </td>
                        <td className="py-3 px-4">
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-medium">
                            <FontAwesomeIcon icon={faCheck} />
                            Paid
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium flex items-center gap-1 ml-auto">
                            <FontAwesomeIcon icon={faDownload} />
                            Download
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Quick Actions
              </h3>

              <div className="space-y-3">
                <Link
                  to="/dashboard"
                  className="w-full block text-center py-2 rounded-lg bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 font-medium hover:bg-primary-200 dark:hover:bg-primary-900/50 transition-colors"
                >
                  Back to Dashboard
                </Link>
                <button className="w-full py-2 rounded-lg border border-primary-600 dark:border-primary-400 text-primary-600 dark:text-primary-400 font-medium hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors">
                  Change Payment Method
                </button>
                <button className="w-full py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  Contact Support
                </button>
              </div>
            </div>

            {/* Billing Info */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Account Information
              </h3>

              <div className="space-y-4 text-sm">
                <div>
                  <p className="text-gray-600 dark:text-gray-400 mb-1">Email</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {user?.email}
                  </p>
                </div>

                <div>
                  <p className="text-gray-600 dark:text-gray-400 mb-1">Member Since</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {user?.createdAt.toLocaleDateString()}
                  </p>
                </div>

                <div>
                  <p className="text-gray-600 dark:text-gray-400 mb-1">Proofs Used</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {billingInfo.proofsUsed} / {billingInfo.proofsLimit}
                  </p>
                </div>

                <div>
                  <p className="text-gray-600 dark:text-gray-400 mb-1">Next Renewal</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {billingInfo.renewalDate.toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Upgrade CTA */}
            {billingInfo.currentPlan === 'free' && (
              <div className="bg-gradient-to-br from-primary-100 to-amber-100 dark:from-primary-950 dark:to-gray-900 rounded-lg p-6 border border-primary-300 dark:border-primary-700">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                  Ready to scale?
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                  Upgrade to Pro for 10,000 proofs per month and advanced features.
                </p>
                <button className="w-full py-2 rounded-lg bg-gradient-br text-white font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                  Upgrade Now
                  <FontAwesomeIcon icon={faArrowRight} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billing;
