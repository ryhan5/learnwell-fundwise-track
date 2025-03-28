
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
  AlertCircle
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
    { name: "New Application", icon: Plus, color: "bg-primary/10 text-primary" },
    { name: "Find Scholarships", icon: Bookmark, color: "bg-accent/10 text-accent" },
    { name: "Update Skills", icon: Target, color: "bg-green-500/10 text-green-500" },
    { name: "Complete Tasks", icon: CheckSquare, color: "bg-yellow-500/10 text-yellow-500" },
  ];

  // Calculate deadline countdown for closest scholarship
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

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold">Dashboard</h1>
            <p className="text-muted-foreground mt-1">Track your scholarships and progress</p>
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <button 
                className="bg-secondary hover:bg-secondary/80 text-foreground font-medium px-2 py-2 rounded-lg inline-flex items-center gap-1 transition-colors"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell className="w-5 h-5" />
                <Badge variant="notification" className="absolute -top-1 -right-1">
                  {notifications.length}
                </Badge>
              </button>
              
              {/* Notification dropdown */}
              {showNotifications && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} 
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 mt-2 w-72 bg-card border rounded-lg shadow-lg z-50"
                >
                  <div className="p-3 border-b">
                    <h3 className="font-medium">Notifications</h3>
                  </div>
                  <div className="max-h-72 overflow-y-auto">
                    {notifications.map(notification => (
                      <div key={notification.id} className="p-3 border-b hover:bg-muted/50 transition-colors">
                        <div className="flex gap-3">
                          <div className="flex-shrink-0 mt-1">
                            {notificationIcon[notification.type]}
                          </div>
                          <div>
                            <p className="font-medium text-sm">{notification.title}</p>
                            <p className="text-xs text-muted-foreground mb-1">{notification.message}</p>
                            <p className="text-xs text-muted-foreground/70">{notification.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-2 text-center border-t">
                    <Link to="/notifications" className="text-xs text-primary font-medium">
                      View all notifications
                    </Link>
                  </div>
                </motion.div>
              )}
            </div>
            
            <button className="bg-primary/10 hover:bg-primary/20 text-primary font-medium px-4 py-2 rounded-lg inline-flex items-center gap-1 transition-colors">
              <Plus className="w-4 h-4" />
              <span>New Application</span>
            </button>
          </div>
        </header>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {quickActions.map((action, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
            >
              <Card 
                className="p-4 flex flex-col items-center text-center hover:shadow-md transition-all cursor-pointer"
                role="action"
              >
                <div className={`${action.color} p-3 rounded-full mb-3`}>
                  <action.icon className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium">{action.name}</span>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Profile Completion */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-6 flex flex-col items-center" variant="dashboard">
              <h3 className="text-lg font-medium text-center mb-4">Profile Completion</h3>
              <ProgressRing value={75} size={120} strokeWidth={10}>
                <span className="text-2xl font-bold">75%</span>
              </ProgressRing>
              <p className="text-sm text-muted-foreground mt-4 text-center">
                Complete your profile to improve your scholarship matches
              </p>
              <button className="mt-4 text-primary font-medium inline-flex items-center gap-1">
                Complete Profile <ArrowUpRight className="w-4 h-4" />
              </button>
            </Card>
          </motion.div>

          {/* Scholarship Stats */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Card className="p-6" variant="dashboard">
              <h3 className="text-lg font-medium mb-4">Scholarship Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-secondary/50 rounded-lg p-4 flex flex-col items-center">
                  <Award className="w-8 h-8 text-primary mb-2" />
                  <span className="text-2xl font-bold">12</span>
                  <span className="text-sm text-muted-foreground">Matches</span>
                </div>
                <div className="bg-secondary/50 rounded-lg p-4 flex flex-col items-center">
                  <Clock className="w-8 h-8 text-yellow-500 mb-2" />
                  <span className="text-2xl font-bold">3</span>
                  <span className="text-sm text-muted-foreground">Pending</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t">
                <Link
                  to="/scholarships"
                  className="text-primary font-medium inline-flex items-center gap-1 w-full justify-center"
                >
                  View All Scholarships <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </Card>
          </motion.div>

          {/* Deadline Countdown */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Card className="p-6" variant="dashboard" role="info">
              <h3 className="text-lg font-medium mb-4">Next Deadline</h3>
              <div className="flex flex-col items-center">
                <div className="mb-3 p-3 bg-accent/10 rounded-full">
                  <GraduationCap className="w-8 h-8 text-accent" />
                </div>
                <h4 className="font-medium text-center mb-1">{closestDeadline.name}</h4>
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="primary">{closestDeadline.amount}</Badge>
                  <Badge variant="warning">
                    <Clock className="w-3 h-3 mr-1" /> {closestDeadline.daysLeft} days left
                  </Badge>
                </div>
                <div className="w-full bg-secondary/50 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-primary h-full rounded-full" 
                    style={{ width: `${Math.min(100, (1 - closestDeadline.daysLeft/60) * 100)}%` }} 
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-3 text-center">
                  Due {closestDeadline.deadline}
                </p>
              </div>
              <div className="mt-4 pt-4 border-t">
                <Link
                  to={`/scholarships/${closestDeadline.id}`}
                  className="text-primary font-medium inline-flex items-center gap-1 w-full justify-center"
                >
                  Complete Application <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </Card>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Recent Scholarships */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="lg:col-span-2"
          >
            <Card className="p-6" variant="dashboard">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Recent Scholarships</h3>
                <Link to="/scholarships" className="text-primary text-sm font-medium">
                  View all
                </Link>
              </div>
              <div className="space-y-4">
                {recentScholarships.map((scholarship) => (
                  <div
                    key={scholarship.id}
                    className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 border rounded-lg hover:bg-muted/20 transition-colors"
                  >
                    <div className="sm:flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{scholarship.name}</h4>
                        <Badge
                          variant={scholarship.status === "Applied" ? "success" : "default"}
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
                          size={40}
                          strokeWidth={5}
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
                        className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Skills Assessment */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <Card className="p-6" variant="dashboard">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Skills Assessment</h3>
                <button className="text-primary text-sm font-medium">Update</button>
              </div>
              <div className="flex items-center justify-center mb-4">
                <PieChart className="w-12 h-12 text-primary opacity-50" />
              </div>
              <div className="space-y-2">
                {skills.map((skill, index) => (
                  <SkillBadge
                    key={index}
                    name={skill.name}
                    score={skill.score}
                    color={skill.color}
                  />
                ))}
              </div>
              <div className="mt-4 pt-4 border-t">
                <button className="text-primary font-medium inline-flex items-center gap-1 w-full justify-center">
                  Take Skills Assessment <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Upcoming Tasks */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          className="mb-8"
        >
          <Card className="p-6" variant="dashboard">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Upcoming Tasks</h3>
              <button className="text-primary text-sm font-medium">Add Task</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {upcomingTasks.map((task) => (
                <div key={task.id} className="flex items-start gap-3 p-4 bg-secondary/50 rounded-lg">
                  <div className="mt-0.5">
                    <Calendar className="w-5 h-5 text-primary flex-shrink-0" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{task.name}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                      <Clock className="w-3 h-3" />
                      <span className={priorityColor[task.priority]}>{task.deadline}</span>
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <button className="w-6 h-6 rounded-full border border-muted flex items-center justify-center hover:border-primary hover:bg-primary/5 transition-colors"></button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
