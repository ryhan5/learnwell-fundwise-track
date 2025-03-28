
import { useState } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import Card from "@/components/ui-components/Card";
import Badge from "@/components/ui-components/Badge";
import SkillBadge from "@/components/ui-components/SkillBadge";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  MapPin,
  School,
  Award,
  Briefcase,
  BookOpen,
  PenLine,
  Clock,
  Check,
  X,
  ChevronDown,
  Upload,
  Download,
  FileText,
  Sparkles,
} from "lucide-react";

const Profile = () => {
  const [selectedTab, setSelectedTab] = useState("overview");

  const skills = [
    { name: "Leadership", score: 8, color: "bg-blue-500" },
    { name: "Public Speaking", score: 7, color: "bg-purple-500" },
    { name: "Problem Solving", score: 9, color: "bg-green-500" },
    { name: "Critical Thinking", score: 8, color: "bg-pink-500" },
    { name: "Time Management", score: 6, color: "bg-yellow-500" },
    { name: "Research", score: 7, color: "bg-orange-500" },
    { name: "Writing", score: 8, color: "bg-teal-500" },
    { name: "Teamwork", score: 9, color: "bg-indigo-500" },
  ];

  const education = [
    {
      school: "University of Technology",
      degree: "Bachelor of Science in Computer Science",
      dates: "2021 - Present",
      gpa: "3.8/4.0",
    },
    {
      school: "Westlake High School",
      degree: "High School Diploma",
      dates: "2017 - 2021",
      gpa: "4.0/4.0",
    },
  ];

  const achievements = [
    {
      title: "Dean's List",
      issuer: "University of Technology",
      date: "2022",
      description: "Awarded for academic excellence for three consecutive semesters.",
    },
    {
      title: "Hackathon Winner",
      issuer: "TechInnovate",
      date: "2021",
      description: "First place for developing an AI-powered educational app.",
    },
    {
      title: "Community Service Award",
      issuer: "Volunteer Foundation",
      date: "2020",
      description: "Recognized for 200+ hours of community service.",
    },
  ];

  const documents = [
    { name: "Academic Transcript", type: "PDF", size: "1.2 MB", date: "Aug 15, 2022" },
    { name: "Recommendation Letter", type: "PDF", size: "450 KB", date: "Sep 3, 2022" },
    { name: "Personal Statement", type: "DOCX", size: "320 KB", date: "Oct 10, 2022" },
    { name: "Financial Aid Form", type: "PDF", size: "890 KB", date: "Nov 5, 2022" },
  ];

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto">
        {/* Profile header */}
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="relative bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl p-6 sm:p-8"
          >
            <div className="flex flex-col sm:flex-row gap-6 sm:items-center">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/80 to-primary-foreground flex items-center justify-center text-white text-4xl font-medium border-4 border-white">
                  JD
                </div>
                <button className="absolute bottom-0 right-0 bg-white rounded-full p-1.5 shadow-md border">
                  <PenLine className="w-4 h-4 text-primary" />
                </button>
              </div>

              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-semibold">Jamie Douglas</h1>
                    <p className="text-muted-foreground">Computer Science Student</p>
                  </div>
                  <button className="px-4 py-2 bg-white border rounded-lg text-sm font-medium hover:bg-muted/20 transition-colors self-start">
                    Edit Profile
                  </button>
                </div>

                <div className="flex flex-wrap gap-4 mt-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span>jamie.douglas@example.com</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span>Boston, MA</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <School className="w-4 h-4 text-muted-foreground" />
                    <span>University of Technology</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-secondary/50 p-1 rounded-lg mb-8 overflow-x-auto scrollbar-hide">
          {["overview", "education", "achievements", "documents"].map((tab) => (
            <button
              key={tab}
              className={`py-2 px-4 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                selectedTab === tab
                  ? "bg-white shadow-sm"
                  : "hover:bg-white/50 text-muted-foreground"
              }`}
              onClick={() => setSelectedTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {selectedTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* About section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:col-span-2"
            >
              <Card className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">About</h2>
                  <button className="text-primary text-sm font-medium">Edit</button>
                </div>
                <p className="text-muted-foreground mb-4">
                  Computer Science student passionate about AI and machine learning. I'm seeking
                  scholarships to fund my education and research projects. I have experience in web
                  development, data science, and have participated in multiple hackathons.
                </p>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Academic Interests</h3>
                    <div className="flex flex-wrap gap-2">
                      {["Artificial Intelligence", "Machine Learning", "Data Science", "Web Development"].map(
                        (interest, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-secondary text-sm rounded-full"
                          >
                            {interest}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Career Goals</h3>
                    <p className="text-muted-foreground">
                      My goal is to become a machine learning engineer and develop AI solutions that
                      make education more accessible and personalized for students worldwide.
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* AI Skills Assessment */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Card className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">AI Skills Assessment</h2>
                  <button className="text-primary text-sm font-medium">Update</button>
                </div>
                <div className="flex items-center justify-center mb-4">
                  <Sparkles className="w-10 h-10 text-primary opacity-70" />
                </div>
                <p className="text-sm text-muted-foreground mb-4 text-center">
                  Skills identified from your profile, activities, and assessments
                </p>
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
              </Card>
            </motion.div>

            {/* Education quick view */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <Card className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Education</h2>
                  <button
                    className="text-primary text-sm font-medium"
                    onClick={() => setSelectedTab("education")}
                  >
                    View All
                  </button>
                </div>
                <div className="space-y-4">
                  {education.slice(0, 1).map((item, index) => (
                    <div key={index} className="border-l-2 border-primary pl-4">
                      <h3 className="font-medium">{item.school}</h3>
                      <p className="text-muted-foreground">{item.degree}</p>
                      <div className="flex justify-between mt-1 text-sm">
                        <span>{item.dates}</span>
                        <span className="font-medium">GPA: {item.gpa}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Achievements quick view */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="lg:col-span-2"
            >
              <Card className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Achievements</h2>
                  <button
                    className="text-primary text-sm font-medium"
                    onClick={() => setSelectedTab("achievements")}
                  >
                    View All
                  </button>
                </div>
                <div className="space-y-4">
                  {achievements.slice(0, 2).map((achievement, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="rounded-full bg-primary/10 p-2 h-fit">
                        <Award className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">{achievement.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {achievement.issuer} • {achievement.date}
                        </p>
                        <p className="text-sm mt-1">{achievement.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>
        )}

        {/* Education tab */}
        {selectedTab === "education" && (
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-6"
            >
              <Card className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Education History</h2>
                  <button className="px-4 py-2 bg-primary/10 text-primary rounded-lg text-sm font-medium hover:bg-primary/20 transition-colors">
                    Add Education
                  </button>
                </div>
                <div className="space-y-8">
                  {education.map((item, index) => (
                    <div key={index} className="border-l-2 border-primary pl-6 relative">
                      <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-primary"></div>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                        <h3 className="text-lg font-medium">{item.school}</h3>
                        <Badge variant="outline">{item.dates}</Badge>
                      </div>
                      <p className="text-muted-foreground mb-2">{item.degree}</p>
                      <div className="flex flex-wrap gap-4 mt-3">
                        <div className="bg-secondary/50 px-3 py-1 rounded-lg text-sm">
                          GPA: {item.gpa}
                        </div>
                        <div className="bg-secondary/50 px-3 py-1 rounded-lg text-sm">
                          {index === 0 ? "In Progress" : "Completed"}
                        </div>
                      </div>
                      
                      {index === 0 && (
                        <div className="mt-4">
                          <h4 className="font-medium mb-2">Relevant Coursework</h4>
                          <div className="flex flex-wrap gap-2">
                            {["Data Structures & Algorithms", "Machine Learning", "Computer Networks", "Database Systems"].map((course, i) => (
                              <span key={i} className="px-2 py-1 bg-secondary text-xs rounded-md">
                                {course}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <div className="flex justify-end mt-4">
                        <button className="text-primary text-sm font-medium">Edit</button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>
        )}

        {/* Achievements tab */}
        {selectedTab === "achievements" && (
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-6"
            >
              <Card className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Achievements & Awards</h2>
                  <button className="px-4 py-2 bg-primary/10 text-primary rounded-lg text-sm font-medium hover:bg-primary/20 transition-colors">
                    Add Achievement
                  </button>
                </div>
                <div className="space-y-6">
                  {achievements.map((achievement, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="p-4 border rounded-lg hover:shadow-sm transition-shadow"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-3">
                          <div className="rounded-full bg-primary/10 p-2">
                            <Award className="w-5 h-5 text-primary" />
                          </div>
                          <h3 className="text-lg font-medium">{achievement.title}</h3>
                        </div>
                        <Badge variant="outline">{achievement.date}</Badge>
                      </div>
                      <p className="text-muted-foreground mb-2">
                        <span className="font-medium">Issuer:</span> {achievement.issuer}
                      </p>
                      <p className="text-sm">{achievement.description}</p>
                      <div className="flex justify-end mt-4 gap-2">
                        <button className="text-primary text-sm font-medium">Edit</button>
                        <button className="text-destructive text-sm font-medium">Delete</button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>
        )}

        {/* Documents tab */}
        {selectedTab === "documents" && (
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-6"
            >
              <Card className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">My Documents</h2>
                  <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-1">
                    <Upload className="w-4 h-4" />
                    <span>Upload</span>
                  </button>
                </div>
                <div className="space-y-4">
                  {documents.map((doc, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/10 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-secondary/50 p-2">
                          <FileText className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">{doc.name}</h3>
                          <p className="text-xs text-muted-foreground">
                            {doc.type} • {doc.size} • Uploaded {doc.date}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="p-1.5 rounded-lg hover:bg-muted/20 transition-colors">
                          <Download className="w-4 h-4 text-primary" />
                        </button>
                        <button className="p-1.5 rounded-lg hover:bg-muted/20 transition-colors">
                          <PenLine className="w-4 h-4 text-muted-foreground" />
                        </button>
                        <button className="p-1.5 rounded-lg hover:bg-muted/20 transition-colors">
                          <X className="w-4 h-4 text-destructive" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Profile;
