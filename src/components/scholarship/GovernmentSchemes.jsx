
import React from "react";
import Card from "@/components/ui-components/Card";
import Badge from "@/components/ui-components/Badge";
import { motion } from "framer-motion";
import { Building2, Users, Award, BookOpen, Landmark, FileCheck } from "lucide-react";

const GovernmentSchemes = () => {
  const schemes = [
    {
      id: 1,
      name: "Student Credit Card Scheme",
      provider: "Government",
      description: "Provides financial assistance to students pursuing higher education through easy access to credit with favorable terms.",
      eligibility: ["Enrolled in higher education", "Family income criteria", "Age limit varies by program"],
      category: "Financial Assistance",
      icon: FileCheck,
    },
    {
      id: 2,
      name: "Swami Vivekananda Merit Cum Means Scholarship",
      provider: "Government",
      description: "Supports meritorious students from economically weaker sections to pursue higher education.",
      eligibility: ["Merit-based selection", "Family income below threshold", "Full-time enrollment"],
      category: "Merit-Based",
      icon: Award,
    },
    {
      id: 3,
      name: "Aikyashree Scholarships",
      provider: "Government",
      description: "Financial assistance program specifically designed for students from minority communities.",
      eligibility: ["Belongs to minority community", "Academic merit", "Income criteria"],
      category: "Minority Support",
      icon: Users,
    },
    {
      id: 4,
      name: "National Scholarship Portal Schemes",
      provider: "Central Government",
      description: "Consolidated platform offering various central government scholarships for students across different categories.",
      eligibility: ["Category-specific criteria", "Merit requirements", "Income thresholds"],
      category: "Multiple Categories",
      icon: Landmark,
    },
    {
      id: 5,
      name: "Education Loan Interest Subsidy",
      provider: "Government",
      description: "Provides interest subsidy on education loans for eligible students during the moratorium period.",
      eligibility: ["Active education loan", "Family income criteria", "Enrolled in approved institutions"],
      category: "Loan Assistance",
      icon: Building2,
    },
  ];

  return (
    <div className="mt-10">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Government Schemes</h2>
        <p className="text-muted-foreground">
          Official government programs providing financial support for education
        </p>
      </div>

      <div className="space-y-5">
        {schemes.map((scheme, index) => (
          <motion.div
            key={scheme.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="p-5 hover:shadow-md transition-all duration-300">
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2 lg:mb-0">
                  <scheme.icon className="w-6 h-6 text-primary" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="info">{scheme.category}</Badge>
                  </div>
                  <h3 className="text-xl font-semibold mb-1">{scheme.name}</h3>
                  <p className="text-muted-foreground mb-3">{scheme.description}</p>
                  
                  <div className="mt-3">
                    <p className="text-sm font-medium mb-2">Eligibility:</p>
                    <div className="flex flex-wrap gap-2">
                      {scheme.eligibility.map((req, idx) => (
                        <span
                          key={idx}
                          className="inline-block px-2 py-1 bg-secondary text-xs rounded-md"
                        >
                          {req}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col gap-3 self-start lg:self-center mt-4 lg:mt-0">
                  <button className="px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors">
                    Apply Now
                  </button>
                  <button className="px-4 py-2 border border-primary/20 text-primary rounded-lg font-medium hover:bg-primary/5 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default GovernmentSchemes;
