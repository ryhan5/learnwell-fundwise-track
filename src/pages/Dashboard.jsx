
import MainLayout from "@/components/layouts/MainLayout";
import Card from "@/components/ui-components/Card";
import Badge from "@/components/ui-components/Badge";
import ProgressRing from "@/components/ui-components/ProgressRing";
import SkillBadge from "@/components/ui-components/SkillBadge";
import { motion } from "framer-motion";
import { 
  ArrowUpRight, 
  Clock, 
  Award, 
  BarChart3, 
  PieChart, 
  Calendar, 
  ChevronRight, 
  Plus, 
  Bell, 
  BookOpen,
  Bookmark,
  GraduationCap,
  Target,
  CheckSquare,
  AlertCircle,
  Sparkles,
  Loader2,
  TrendingUp,
  File
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Dashboard = () => {
  const [showNotifications, setShowNotifications] = useState(false);

  const recentScholarships = [
    {
      id: 1,
      name: "STEM Excellence Scholarship",
      amount: "$5,000",
      deadline: "April 15, 2023",
      status: "Recommended",
      match: 92,
      daysLeft: 14
    },
    {
      id: 2,
      name: "Future Leaders Fund",
      amount: "$2,500",
      deadline: "May 1, 2023",
      status: "Applied",
      match: 87,
      daysLeft: 30
    },
    {
      id: 3,
      name: "Community Service Award",
      amount: "$3,000",
      deadline: "May 30, 2023",
      status: "Recommended",
      match: 85,
      daysLeft: 59
    },
  ];

  const skills = [
    { name: "Leadership", score: 8, color: "bg-blue-500" },
    { name: "Public Speaking", score: 7, color: "bg-purple-500" },
    { name: "Problem Solving", score: 9, color: "bg-green-500" },
    { name: "Critical Thinking", score: 8, color: "bg-pink-500" },
    { name: "Time Management", score: 6, color: "bg-yellow-500" },
  ];

  const upcomingTasks = [
    { id: 1, name: "Complete personal statement", deadline: "2 days left", priority: "high" },
    { id: 2, name: "Upload transcript", deadline: "5 days left", priority: "medium" },
    { id: 3, name: "Request recommendation letter", deadline: "1 week left", priority: "medium" },
  ];

  const notifications = [
    { id: 1, title: "Application Deadline", message: "STEM Excellence Scholarship deadline in 2 weeks", time: "2 hours ago", type: "deadline" },
    { id: 2, title: "Application Submitted", message: "Your Future Leaders Fund application has been received", time: "Yesterday", type: "success" },
    { id: 3, title: "Profile Update Needed", message: "Complete your academic history to improve matches", time: "3 days ago", type: "warning" },
  ];

  const quickActions = [
    { name: "New Application", icon: Plus, color: "bg-gradient-to-br from-primary/20 to-primary/10 text-primary" },
    { name: "Find Scholarships", icon: Bookmark, color: "bg-gradient-to-br from-accent/20 to-accent/10 text-accent" },
    { name: "Update Skills", icon: Target, color: "bg-gradient-to-br from-green-500/20 to-green-500/10 text-green-500" },
    { name: "Complete Tasks", icon: CheckSquare, color: "bg-gradient-to-br from-yellow-500/20 to-yellow-500/10 text-yellow-500" },
  ];

  const closestDeadline = recentScholarships.reduce((prev, current) => 
    (prev.daysLeft < current.daysLeft) ? prev : current);

  const priorityColor = {
    high: "text-rose-500",
    medium: "text-amber-500",
    low: "text-green-500"
  };

  const notificationIcon = {
    deadline: <Clock className="w-5 h-5 text-primary" />,
    success: <CheckSquare className="w-5 h-5 text-green-500" />,
    warning: <AlertCircle className="w-5 h-5 text-amber-500" />,
  };

  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Dashboard Header */}
        <motion.header 
          className="mb-8 bg-gradient-to-r from-background to-secondary/10 p-6 rounded-2xl shadow-sm border border-secondary/20"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold">
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Your Dashboard
                </span>
              </h1>
              <p className="text-muted-foreground mt-1">Track your scholarships and educational opportunities</p>
            </div>
            <div className="flex gap-3 self-end md:self-auto">
              <div className="relative">
                <button 
                  className="bg-background hover:bg-secondary text-foreground font-medium px-3 py-2 rounded-lg inline-flex items-center gap-1 transition-colors border shadow-sm"
                  onClick={() => setShowNotifications(!showNotifications)}
                >
                  <Bell className="w-5 h-5" />
                  <Badge variant="notification" className="absolute -top-1 -right-1">
                    {notifications.length}
                  </Badge>
                </button>
                
                {showNotifications && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} 
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute right-0 mt-2 w-80 bg-card border rounded-lg shadow-lg z-50"
                  >
                    <div className="p-3 border-b bg-gradient-to-r from-background to-card rounded-t-lg">
                      <h3 className="font-medium text-primary">Notifications</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map(notification => (
                        <motion.div 
                          key={notification.id} 
                          className="p-3 border-b hover:bg-muted/30 transition-colors"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="flex gap-3">
                            <div className="flex-shrink-0 mt-1 p-2 rounded-full bg-primary/5">
                              {notificationIcon[notification.type]}
                            </div>
                            <div>
                              <p className="font-semibold text-sm">{notification.title}</p>
                              <p className="text-xs text-muted-foreground mb-1">{notification.message}</p>
                              <p className="text-xs text-muted-foreground/70">{notification.time}</p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    <div className="p-3 text-center border-t bg-gradient-to-r from-card to-background rounded-b-lg">
                      <Link to="/notifications" className="text-xs text-primary font-medium hover:underline transition-all">
                        View all notifications
                      </Link>
                    </div>
                  </motion.div>
                )}
              </div>
              
              <button className="bg-gradient-to-r from-primary to-accent text-primary-foreground font-medium px-4 py-2 rounded-lg inline-flex items-center gap-2 transition-all hover:shadow-md">
                <Plus className="w-4 h-4" />
                <span>New Application</span>
              </button>
            </div>
          </div>
        </motion.header>

        {/* Quick Actions */}
        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {quickActions.map((action, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <Card 
                className="p-5 flex flex-col items-center text-center hover:shadow-md transition-all cursor-pointer"
                variant="glass"
                role="action"
              >
                <div className={`${action.color} p-3 rounded-full mb-3 shadow-sm`}>
                  <action.icon className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium">{action.name}</span>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Widgets Row */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {/* Profile Completion */}
          <motion.div variants={itemVariants}>
            <Card className="p-6 flex flex-col items-center overflow-visible" variant="glass">
              <div className="flex items-center gap-2 mb-5">
                <Sparkles className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Profile Completion
                </h3>
              </div>
              <div className="relative">
                <ProgressRing value={75} size={140} strokeWidth={12} color="stroke-gradient-primary">
                  <div className="flex flex-col items-center">
                    <span className="text-3xl font-bold">75%</span>
                    <span className="text-xs text-muted-foreground">Complete</span>
                  </div>
                </ProgressRing>
                <motion.div 
                  className="absolute -right-4 -top-4 w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg"
                  animate={{ rotate: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <GraduationCap className="w-6 h-6 text-white" />
                </motion.div>
              </div>
              <p className="text-sm text-muted-foreground mt-5 text-center max-w-xs">
                Complete your profile to improve your scholarship matches
              </p>
              <button className="mt-4 text-primary font-medium inline-flex items-center gap-1 hover:gap-2 transition-all group">
                Complete Profile 
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </Card>
          </motion.div>

          {/* Scholarship Stats */}
          <motion.div variants={itemVariants}>
            <Card className="p-6 overflow-visible" variant="glass">
              <div className="flex items-center gap-2 mb-5">
                <BarChart3 className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Scholarship Stats
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-primary/5 rounded-lg p-4 flex flex-col items-center shadow-sm border border-primary/10">
                  <div className="bg-primary/10 p-2 rounded-full mb-2">
                    <Award className="w-8 h-8 text-primary" />
                  </div>
                  <span className="text-2xl font-bold">12</span>
                  <span className="text-sm text-muted-foreground">Matches</span>
                </div>
                <div className="bg-amber-500/5 rounded-lg p-4 flex flex-col items-center shadow-sm border border-amber-500/10">
                  <div className="bg-amber-500/10 p-2 rounded-full mb-2">
                    <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
                  </div>
                  <span className="text-2xl font-bold">3</span>
                  <span className="text-sm text-muted-foreground">Pending</span>
                </div>
              </div>
              <div className="mt-5 pt-4 border-t">
                <Link
                  to="/scholarships"
                  className="text-primary font-medium inline-flex items-center gap-1 w-full justify-center hover:gap-2 transition-all group"
                >
                  View All Scholarships 
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </Card>
          </motion.div>

          {/* Next Deadline */}
          <motion.div variants={itemVariants}>
            <Card className="p-6 overflow-visible" variant="glass" role="info">
              <div className="flex items-center gap-2 mb-5">
                <Clock className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Next Deadline
                </h3>
              </div>
              <div className="flex flex-col items-center">
                <motion.div 
                  className="mb-4 p-3 bg-accent/10 rounded-full border border-accent/20"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <File className="w-8 h-8 text-accent" />
                </motion.div>
                <h4 className="font-medium text-center mb-2">{closestDeadline.name}</h4>
                <div className="flex flex-wrap justify-center items-center gap-2 mb-4">
                  <Badge variant="primary" className="shadow-sm">{closestDeadline.amount}</Badge>
                  <Badge variant="warning" className="shadow-sm">
                    <Clock className="w-3 h-3 mr-1" /> {closestDeadline.daysLeft} days left
                  </Badge>
                </div>
                <div className="w-full h-3 rounded-full overflow-hidden shadow-inner bg-secondary/30">
                  <motion.div 
                    className="bg-gradient-to-r from-primary to-accent h-full rounded-full" 
                    style={{ width: `${Math.min(100, (1 - closestDeadline.daysLeft/60) * 100)}%` }}
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, (1 - closestDeadline.daysLeft/60) * 100)}%` }}
                    transition={{ duration: 1 }}
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-3 text-center">
                  Due {closestDeadline.deadline}
                </p>
              </div>
              <div className="mt-5 pt-4 border-t">
                <Link
                  to={`/scholarships/${closestDeadline.id}`}
                  className="text-primary font-medium inline-flex items-center gap-1 w-full justify-center hover:gap-2 transition-all group"
                >
                  Complete Application 
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </Card>
          </motion.div>
        </motion.div>

        {/* Recent Scholarships and Skills */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {/* Recent Scholarships */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-2"
          >
            <Card className="p-6 overflow-hidden" variant="glass">
              <div className="flex justify-between items-center mb-5">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Recent Scholarships
                  </h3>
                </div>
                <Link to="/scholarships" className="text-primary text-sm font-medium hover:underline">
                  View all
                </Link>
              </div>
              <div className="space-y-4">
                {recentScholarships.map((scholarship, index) => (
                  <motion.div
                    key={scholarship.id}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 * index, duration: 0.3 }}
                  >
                    <div
                      className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 border rounded-lg bg-background/40 hover:bg-gradient-to-r hover:from-background/60 hover:to-card/50 transition-all hover:shadow-md group"
                    >
                      <div className="sm:flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium group-hover:text-primary transition-colors">{scholarship.name}</h4>
                          <Badge
                            variant={scholarship.status === "Applied" ? "success" : "default"}
                            className="shadow-sm"
                          >
                            {scholarship.status}
                          </Badge>
                        </div>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-sm text-muted-foreground">
                          <span className="inline-flex items-center gap-1">
                            <Award className="w-4 h-4" />
                            {scholarship.amount}
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            Due {scholarship.deadline}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <ProgressRing
                            value={scholarship.match}
                            size={48}
                            strokeWidth={6}
                            color={
                              scholarship.match >= 90
                                ? "stroke-green-500"
                                : scholarship.match >= 80
                                ? "stroke-blue-500"
                                : "stroke-yellow-500"
                            }
                          >
                            <span className="text-xs font-medium">{scholarship.match}%</span>
                          </ProgressRing>
                          <span className="text-sm hidden sm:block">Match</span>
                        </div>
                        <Link
                          to={`/scholarships/${scholarship.id}`}
                          className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-all group-hover:scale-110"
                        >
                          <ArrowUpRight className="w-5 h-5" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Skills Assessment */}
          <motion.div variants={itemVariants}>
            <Card className="p-6 overflow-visible" variant="glass">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Skills
                  </h3>
                </div>
                <button className="text-primary text-sm font-medium hover:underline">Update</button>
              </div>
              <div className="flex items-center justify-center mb-5">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="relative"
                >
                  <TrendingUp className="w-16 h-16 text-primary opacity-20" />
                </motion.div>
              </div>
              <div className="space-y-2.5">
                {skills.map((skill, index) => (
                  <motion.div
                    key={index}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 * index, duration: 0.3 }}
                  >
                    <SkillBadge
                      name={skill.name}
                      score={skill.score}
                      color={skill.color}
                    />
                  </motion.div>
                ))}
              </div>
              <div className="mt-5 pt-4 border-t">
                <button className="text-primary font-medium inline-flex items-center gap-1 w-full justify-center hover:gap-2 transition-all group">
                  Take Skills Assessment 
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </Card>
          </motion.div>
        </motion.div>

        {/* Upcoming Tasks */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="mb-8"
        >
          <Card className="p-6 overflow-visible" variant="glass">
            <div className="flex justify-between items-center mb-5">
              <div className="flex items-center gap-2">
                <CheckSquare className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Upcoming Tasks
                </h3>
              </div>
              <button className="text-primary text-sm font-medium hover:underline">Add Task</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {upcomingTasks.map((task, index) => (
                <motion.div 
                  key={task.id}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-start gap-3 p-4 bg-background/40 rounded-lg shadow-sm hover:shadow-md transition-all border border-secondary/20">
                    <div className="mt-0.5 p-2 rounded-full bg-primary/10">
                      <Calendar className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold truncate">{task.name}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                        <Clock className="w-3 h-3" />
                        <span className={priorityColor[task.priority]}>{task.deadline}</span>
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <button className="w-6 h-6 rounded-full border border-muted flex items-center justify-center hover:border-primary hover:bg-primary/5 transition-colors"></button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
