"use client";

import React from "react";
import { Check, X } from "lucide-react";
import { motion } from "framer-motion";

interface FeatureRow {
  feature: string;
  professional: boolean | string;
  team: boolean | string;
  enterprise: boolean | string;
}

interface FeatureCategory {
  category?: string;
  features: FeatureRow[];
}

const featureData: FeatureCategory[] = [
  {
    category: "Core Features",
    features: [
      {
        feature: "Unlimited document requests",
        professional: true,
        team: true,
        enterprise: true,
      },
      {
        feature: "AI-powered client reminders",
        professional: true,
        team: true,
        enterprise: true,
      },
      {
        feature: "Real-time document verification",
        professional: true,
        team: true,
        enterprise: true,
      },
      {
        feature: "Branded client portal",
        professional: true,
        team: true,
        enterprise: true,
      },
      {
        feature: "Email & SMS notifications",
        professional: true,
        team: true,
        enterprise: true,
      },
    ],
  },
  {
    category: "Integrations",
    features: [
      {
        feature: "Google Drive & Dropbox",
        professional: true,
        team: true,
        enterprise: true,
      },
      {
        feature: "API access",
        professional: false,
        team: true,
        enterprise: true,
      },
      {
        feature: "Custom integrations",
        professional: false,
        team: false,
        enterprise: true,
      },
    ],
  },
  {
    category: "Security & Compliance",
    features: [
      {
        feature: "Bank-level encryption",
        professional: true,
        team: true,
        enterprise: true,
      },
      {
        feature: "Audit logs & activity tracking",
        professional: true,
        team: true,
        enterprise: true,
      },
      {
        feature: "SSO & advanced security",
        professional: false,
        team: true,
        enterprise: true,
      },
      {
        feature: "Custom compliance requirements",
        professional: false,
        team: false,
        enterprise: true,
      },
    ],
  },
  {
    category: "Support & Training",
    features: [
      {
        feature: "Priority support",
        professional: true,
        team: true,
        enterprise: true,
      },
      {
        feature: "Dedicated account manager",
        professional: false,
        team: true,
        enterprise: true,
      },
      {
        feature: "24/7 premium support",
        professional: false,
        team: false,
        enterprise: true,
      },
    ],
  },
  {
    category: "Advanced Features",
    features: [
      {
        feature: "Document retention",
        professional: "30 days",
        team: "90 days",
        enterprise: "Custom",
      },
      {
        feature: "User limits",
        professional: "5 users",
        team: "6-20 users",
        enterprise: "Unlimited",
      },
      {
        feature: "Custom branding",
        professional: false,
        team: true,
        enterprise: true,
      },
      {
        feature: "Advanced analytics",
        professional: false,
        team: true,
        enterprise: true,
      },
    ],
  },
];

function FeatureCell({ value }: { value: boolean | string }) {
  if (typeof value === "string") {
    return <span className="text-text-primary">{value}</span>;
  }
  return value ? (
    <Check className="text-success" size={16} />
  ) : (
    <X className="text-text-tertiary" size={16} />
  );
}

export default function FeatureComparisonTable() {
  return (
    <section className="bg-progressive-1 py-32">
      <div className="mx-auto max-w-[1200px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
          className="overflow-hidden rounded-xl border border-border bg-surface"
        >
          {/* Desktop Table */}
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-surface-secondary">
                  <th className="p-5 text-left font-semibold text-text-high-contrast">
                    Features
                  </th>
                  <th className="p-5 text-center font-semibold text-text-high-contrast">
                    Professional
                  </th>
                  <th className="p-5 text-center font-semibold text-text-high-contrast">
                    Team
                  </th>
                  <th className="p-5 text-center font-semibold text-text-high-contrast">
                    Enterprise
                  </th>
                </tr>
              </thead>
              <tbody>
                {featureData.map((category, catIndex) => (
                  <React.Fragment key={catIndex}>
                    {category.category && (
                      <tr>
                        <td
                          colSpan={4}
                          className="border-b border-border bg-surface-tertiary px-5 py-3 text-xs font-medium uppercase tracking-widest text-text-secondary"
                        >
                          {category.category}
                        </td>
                      </tr>
                    )}
                    {category.features.map((row, rowIndex) => (
                      <tr
                        key={rowIndex}
                        className="border-b border-border transition-colors hover:bg-surface-hover"
                      >
                        <td className="p-4 text-text-primary">{row.feature}</td>
                        <td className="p-4 text-center">
                          <FeatureCell value={row.professional} />
                        </td>
                        <td className="p-4 text-center">
                          <FeatureCell value={row.team} />
                        </td>
                        <td className="p-4 text-center">
                          <FeatureCell value={row.enterprise} />
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Stacked View */}
          <div className="md:hidden">
            {featureData.map((category, catIndex) => (
              <div key={catIndex}>
                {category.category && (
                  <div className="border-b border-border bg-surface-tertiary px-5 py-3 text-xs font-medium uppercase tracking-widest text-text-secondary">
                    {category.category}
                  </div>
                )}
                {category.features.map((row, rowIndex) => (
                  <div
                    key={rowIndex}
                    className="border-b border-border p-4 last:border-b-0"
                  >
                    <div className="mb-3 font-medium text-text-high-contrast">
                      {row.feature}
                    </div>
                    <div className="flex flex-col gap-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-text-secondary">Professional</span>
                        <FeatureCell value={row.professional} />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-text-secondary">Team</span>
                        <FeatureCell value={row.team} />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-text-secondary">Enterprise</span>
                        <FeatureCell value={row.enterprise} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
