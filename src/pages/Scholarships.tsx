
import { useState } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import Card from "@/components/ui-components/Card";
import Badge from "@/components/ui-components/Badge";
import GovernmentSchemes from "@/components/scholarship/GovernmentSchemes";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  Award,
  Calendar,
  Clock,
  BookOpen,
  Users,
  ChevronRight,
  ArrowUpRight,
  Briefcase,
  GraduationCap,
  ArrowUpDown,
} from "lucide-react";

const Scholarships = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const scholarships = [
    {
      id: 1,
      name: "STEM Excellence Scholarship",
      provider: "National Science Foundation",
      amount: "$5,000",
      deadline: "April 15, 2023",
      category: "STEM",
      match: 92,
      requirements: ["GPA 3.5+", "STEM Major", "Research Experience"],
    },
    {
      id: 2,
      name: "Future Leaders Fund",
      provider: "Global Leadership Institute",
      amount: "$2,500",
      deadline: "May 1, 2023",
      category: "Leadership",
      match: 87,
      requirements: ["Leadership Experience", "Community Service", "Essay"],
    },
    {
      id: 3,
      name: "Community Service Award",
      provider: "United Community Foundation",
      amount: "$3,000",
      deadline: "May 30, 2023",
      category: "Service",
      match: 85,
      requirements: ["100+ Community Service Hours", "Reference Letter"],
    },
    {
      id: 4,
      name: "Diversity in Technology Grant",
      provider: "Tech for All Foundation",
      amount: "$4,000",
      deadline: "June 15, 2023",
      category: "Technology",
      match: 78,
      requirements: ["Computer Science/IT Major", "Underrepresented Group", "Technical Project"],
    },
    {
      id: 5,
      name: "First-Generation Student Scholarship",
      provider: "Educational Opportunity Fund",
      amount: "$3,500",
      deadline: "July 1, 2023",
      category: "First-Generation",
      match: 95,
      requirements: ["First-Generation College Student", "Financial Need", "GPA 3.0+"],
    },
  ];

  const filters = ["All", "STEM", "Leadership", "Service", "Technology", "First-Generation"];

  const filteredScholarships = scholarships.filter(
    (scholarship) =>
      (activeFilter === "All" || scholarship.category === activeFilter) &&
      (searchQuery === "" ||
        scholarship.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        scholarship.provider.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold">Scholarships</h1>
            <p className="text-muted-foreground mt-1">
              Discover opportunities tailored to your profile
            </p>
          </div>
          
          {/* Search and filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <input
                type="text"
                placeholder="Search scholarships or providers..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
              <button className="flex items-center gap-1 px-3 py-2 rounded-lg border bg-white text-sm font-medium">
                <Filter className="w-4 h-4" />
                <span>Filters</span>
              </button>
              <button className="flex items-center gap-1 px-3 py-2 rounded-lg border bg-white text-sm font-medium">
                <ArrowUpDown className="w-4 h-4" />
                <span>Sort</span>
              </button>
            </div>
          </div>
          
          {/* Category filters */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {filters.map((filter) => (
              <button
                key={filter}
                className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  activeFilter === filter
                    ? "bg-primary text-white"
                    : "bg-secondary hover:bg-secondary/80"
                }`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
        </header>

        {/* Private Scholarships list */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">Private Scholarships</h2>
          <div className="space-y-6">
            {filteredScholarships.map((scholarship, index) => (
              <motion.div
                key={scholarship.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge>{scholarship.category}</Badge>
                        <span className="text-sm text-muted-foreground">
                          {scholarship.match}% Match
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold mb-1">{scholarship.name}</h3>
                      <p className="text-muted-foreground">{scholarship.provider}</p>
                      
                      <div className="flex flex-wrap gap-x-4 gap-y-2 mt-3">
                        <span className="inline-flex items-center gap-1 text-sm">
                          <Award className="w-4 h-4 text-primary" />
                          {scholarship.amount}
                        </span>
                        <span className="inline-flex items-center gap-1 text-sm">
                          <Calendar className="w-4 h-4 text-yellow-500" />
                          Due: {scholarship.deadline}
                        </span>
                      </div>
                      
                      <div className="mt-4">
                        <p className="text-sm font-medium mb-2">Requirements:</p>
                        <div className="flex flex-wrap gap-2">
                          {scholarship.requirements.map((req, idx) => (
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
                    
                    <div className="flex flex-col sm:flex-row lg:flex-col gap-3 self-start lg:self-center">
                      <button className="px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors">
                        Apply Now
                      </button>
                      <button className="px-4 py-2 border border-primary/20 text-primary rounded-lg font-medium hover:bg-primary/5 transition-colors inline-flex items-center justify-center gap-1">
                        View Details <ArrowUpRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {filteredScholarships.length === 0 && (
          <div className="text-center py-16">
            <GraduationCap className="w-12 h-12 text-muted mx-auto mb-4" />
            <h3 className="text-xl font-medium mb-2">No scholarships found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filters to find more opportunities
            </p>
          </div>
        )}

        {/* Government Schemes Section */}
        <GovernmentSchemes />
      </div>
    </MainLayout>
  );
};

export default Scholarships;
