import { motion } from "framer-motion";
import MainLayout from "@/components/layouts/MainLayout";
import { ArrowRight, Search, Sparkles, GraduationCap, Users, Award } from "lucide-react";
import { Link } from "react-router-dom";
import Card from "@/components/ui-components/Card";

const Index = () => {
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Your Path to Educational
                <span className="text-primary block"> Opportunity</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
                AI-powered scholarship matching, skills assessment, and crowdfunding to help students
                overcome financial barriers to education.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/dashboard"
                    className="px-6 py-3 bg-primary rounded-lg text-white font-medium flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
                  >
                    Get Started <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/scholarships"
                    className="px-6 py-3 bg-white border rounded-lg font-medium flex items-center justify-center gap-2"
                  >
                    Browse Scholarships <Search className="w-4 h-4" />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-secondary/50 rounded-3xl">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl font-bold tracking-tight sm:text-4xl"
            >
              How LearnLeap Works
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="mt-4 text-lg text-muted-foreground"
            >
              Our platform uses advanced AI to connect students with opportunities.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: <Sparkles className="w-8 h-8 text-blue-500" />,
                title: "AI-Powered Matching",
                description:
                  "Our AI analyzes your profile and matches you with scholarships that fit your unique skills and background.",
              },
              {
                icon: <GraduationCap className="w-8 h-8 text-purple-500" />,
                title: "Skills Assessment",
                description:
                  "Understand your strengths with our AI skills evaluation, and showcase them to scholarship providers.",
              },
              {
                icon: <Users className="w-8 h-8 text-green-500" />,
                title: "Community Funding",
                description:
                  "Create campaigns to receive support from individuals and organizations that believe in your potential.",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 h-full flex flex-col items-center text-center">
                  <div className="rounded-full bg-white p-3 shadow-md mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <Award className="w-12 h-12 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
              Start Your Journey Today
            </h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
              Join thousands of students who have found financial support and achieved their
              educational goals through LearnLeap.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <Link
                to="/dashboard"
                className="px-8 py-4 bg-primary rounded-lg text-white font-medium inline-flex items-center gap-2 shadow-lg shadow-primary/20"
              >
                Create Your Profile <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </motion.div>
        </section>
      </div>
    </MainLayout>
  );
};

export default Index;
