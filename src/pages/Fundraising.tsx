
import { useState } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import Card from "@/components/ui-components/Card";
import ProgressRing from "@/components/ui-components/ProgressRing";
import Badge from "@/components/ui-components/Badge";
import { motion } from "framer-motion";
import {
  HeartHandshake,
  Users,
  Plus,
  ArrowUpRight,
  Heart,
  Share2,
  MessageSquare,
  Clock,
  Calendar,
  Search,
  Tag,
  ChevronRight,
  ArrowUpDown,
} from "lucide-react";

const Fundraising = () => {
  const [activeTab, setActiveTab] = useState("discover");

  const campaigns = [
    {
      id: 1,
      title: "Computer Science Degree Fund",
      student: "Alex Johnson",
      goal: 8000,
      raised: 5240,
      supporters: 47,
      daysLeft: 23,
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97",
      tags: ["Computer Science", "Undergraduate"],
    },
    {
      id: 2,
      title: "Medical School Tuition Support",
      student: "Sarah Williams",
      goal: 12000,
      raised: 3750,
      supporters: 28,
      daysLeft: 45,
      image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528",
      tags: ["Medical", "Graduate"],
    },
    {
      id: 3,
      title: "Engineering Lab Equipment Fund",
      student: "Michael Chen",
      goal: 5000,
      raised: 4200,
      supporters: 39,
      daysLeft: 12,
      image: "https://images.unsplash.com/photo-1581092921461-7384261d7ced",
      tags: ["Engineering", "Research"],
    },
  ];

  const myCampaigns = [
    {
      id: 4,
      title: "Study Abroad Program - Paris",
      goal: 6000,
      raised: 2300,
      supporters: 18,
      daysLeft: 60,
      image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
      tags: ["Study Abroad", "Undergraduate"],
      status: "active",
    },
  ];

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold">Fundraising</h1>
            <p className="text-muted-foreground mt-1">
              Create and discover campaigns for educational funding
            </p>
          </div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <button className="bg-primary text-white font-medium px-4 py-2 rounded-lg inline-flex items-center gap-1 shadow-md shadow-primary/20">
              <Plus className="w-4 h-4" />
              <span>Create Campaign</span>
            </button>
          </motion.div>
        </header>

        {/* Tabs */}
        <div className="flex space-x-1 bg-secondary/50 p-1 rounded-lg mb-8 sticky top-0 z-10 backdrop-blur-sm">
          <button
            className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === "discover"
                ? "bg-white shadow-sm"
                : "hover:bg-white/50 text-muted-foreground"
            }`}
            onClick={() => setActiveTab("discover")}
          >
            Discover
          </button>
          <button
            className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === "myCampaigns"
                ? "bg-white shadow-sm"
                : "hover:bg-white/50 text-muted-foreground"
            }`}
            onClick={() => setActiveTab("myCampaigns")}
          >
            My Campaigns
          </button>
          <button
            className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === "supported"
                ? "bg-white shadow-sm"
                : "hover:bg-white/50 text-muted-foreground"
            }`}
            onClick={() => setActiveTab("supported")}
          >
            Supported
          </button>
        </div>

        {/* Search and filters */}
        {activeTab === "discover" && (
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <input
                type="text"
                placeholder="Search campaigns..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1 px-3 py-2 rounded-lg border bg-white text-sm font-medium">
                <Tag className="w-4 h-4" />
                <span>Categories</span>
              </button>
              <button className="flex items-center gap-1 px-3 py-2 rounded-lg border bg-white text-sm font-medium">
                <ArrowUpDown className="w-4 h-4" />
                <span>Sort</span>
              </button>
            </div>
          </div>
        )}

        {/* Featured campaign */}
        {activeTab === "discover" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <div className="relative rounded-xl overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644"
                alt="Featured campaign"
                className="w-full h-[300px] md:h-[400px] object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20 text-white">
                <Badge variant="outline" className="mb-2 bg-primary/10 backdrop-blur-sm text-white border-white/20">
                  Featured Campaign
                </Badge>
                <h2 className="text-2xl md:text-3xl font-semibold mb-2">
                  Architectural Design Master's Program
                </h2>
                <p className="text-white/80 mb-4 max-w-xl">
                  Help Emily achieve her dream of studying architectural design at the prestigious
                  Design Institute of Barcelona.
                </p>
                <div className="flex flex-wrap gap-4 mb-4">
                  <div className="bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm">
                    $9,250 raised of $15,000
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    87 supporters
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    18 days left
                  </div>
                </div>
                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-primary rounded-lg flex items-center gap-2 font-medium"
                  >
                    <Heart className="w-4 h-4" /> Support
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg flex items-center gap-2 hover:bg-white/30 transition-colors"
                  >
                    <ArrowUpRight className="w-4 h-4" /> Learn More
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Campaigns grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(activeTab === "discover" ? campaigns : activeTab === "myCampaigns" ? myCampaigns : []).map(
            (campaign, index) => (
              <motion.div
                key={campaign.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="relative h-40">
                    <img
                      src={campaign.image}
                      alt={campaign.title}
                      className="w-full h-full object-cover"
                    />
                    {activeTab === "myCampaigns" && (
                      <div className="absolute top-2 right-2">
                        <Badge variant="success" className="capitalize">
                          {campaign.status}
                        </Badge>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-1 line-clamp-1">{campaign.title}</h3>
                    {campaign.student && (
                      <p className="text-sm text-muted-foreground mb-3">by {campaign.student}</p>
                    )}

                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium">
                          ${campaign.raised.toLocaleString()} raised
                        </span>
                        <span className="text-muted-foreground">
                          of ${campaign.goal.toLocaleString()}
                        </span>
                      </div>
                      <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${(campaign.raised / campaign.goal) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {campaign.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 bg-secondary text-xs rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {campaign.supporters} supporters
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {campaign.daysLeft} days left
                      </span>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <button className="flex-1 px-3 py-2 bg-primary text-white rounded-lg text-sm font-medium">
                        {activeTab === "myCampaigns" ? "Manage" : "Support"}
                      </button>
                      <button className="px-3 py-2 border border-input rounded-lg flex items-center justify-center">
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )
          )}
        </div>

        {/* Empty state for "supported" tab */}
        {activeTab === "supported" && (
          <div className="text-center py-16">
            <HeartHandshake className="w-16 h-16 text-muted mx-auto mb-4" />
            <h3 className="text-xl font-medium mb-2">No supported campaigns yet</h3>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              When you support a campaign, you'll be able to track its progress and receive updates
              here.
            </p>
            <button
              className="px-4 py-2 bg-primary text-white rounded-lg font-medium inline-flex items-center gap-1"
              onClick={() => setActiveTab("discover")}
            >
              Discover Campaigns <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Empty state for "my campaigns" when empty */}
        {activeTab === "myCampaigns" && myCampaigns.length === 0 && (
          <div className="text-center py-16">
            <HeartHandshake className="w-16 h-16 text-muted mx-auto mb-4" />
            <h3 className="text-xl font-medium mb-2">No campaigns created yet</h3>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Create your first fundraising campaign to help finance your educational journey.
            </p>
            <button className="px-4 py-2 bg-primary text-white rounded-lg font-medium inline-flex items-center gap-1">
              <Plus className="w-4 h-4" />
              Create Campaign
            </button>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Fundraising;
