
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  GraduationCap, 
  Search, 
  BarChart3, 
  Heart, 
  User, 
  Menu, 
  X,
  LogOut,
  BellRing,
  MessageCircle,
  Settings,
  ChevronLeft
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isDesktopSidebarVisible, setIsDesktopSidebarVisible] = React.useState(true);
  const location = useLocation();
  
  const navItems = [
    { name: "Discover", path: "/", icon: Search },
    { name: "Dashboard", path: "/dashboard", icon: BarChart3 },
    { name: "Scholarships", path: "/scholarships", icon: GraduationCap },
    { name: "Fundraising", path: "/fundraising", icon: Heart },
    { name: "Profile", path: "/profile", icon: User },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      {/* Mobile menu overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <motion.aside
        className={`fixed lg:sticky top-0 h-screen w-[280px] bg-card z-50 shadow-lg lg:shadow-md flex flex-col transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } ${!isDesktopSidebarVisible ? "lg:translate-x-[-100%]" : ""}`}
        initial={{ x: "-100%" }}
        animate={{ 
          x: window.innerWidth >= 1024 
              ? (isDesktopSidebarVisible ? 0 : "-100%") 
              : (isOpen ? 0 : "-100%") 
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="flex items-center justify-between p-6 border-b">
          <Link to="/" className="flex items-center space-x-2" onClick={() => setIsOpen(false)}>
            <div className="bg-primary rounded-lg p-1.5">
              <GraduationCap className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold gradient-text">ScholarMatch</span>
          </Link>
          
          {/* Sidebar Close Button - Mobile */}
          <button 
            className="lg:hidden p-1 rounded-full hover:bg-secondary"
            onClick={() => setIsOpen(false)}
            aria-label="Close Sidebar"
          >
            <X className="w-5 h-5" />
          </button>
          
          {/* Sidebar Toggle Button - Desktop */}
          <button 
            className="hidden lg:flex p-1 rounded-full hover:bg-secondary"
            onClick={() => setIsDesktopSidebarVisible(prev => !prev)}
            aria-label="Toggle Sidebar"
          >
            <ChevronLeft className={`w-5 h-5 transition-transform duration-300 ${isDesktopSidebarVisible ? '' : 'rotate-180'}`} />
          </button>
        </div>
        
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "hover:bg-secondary"
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? "text-primary-foreground" : "text-muted-foreground"}`} />
                <span className={isActive ? "font-medium" : ""}>{item.name}</span>
                {item.name === "Scholarships" && (
                  <Badge variant="secondary" className="ml-auto bg-accent/10 text-accent-foreground">3 New</Badge>
                )}
              </Link>
            );
          })}
        </nav>
        
        <div className="px-4 py-6 border-t">
          <div className="flex items-center justify-between mb-4">
            <button className="p-2 rounded-lg hover:bg-secondary transition-colors">
              <BellRing className="w-5 h-5 text-muted-foreground" />
            </button>
            <button className="p-2 rounded-lg hover:bg-secondary transition-colors">
              <MessageCircle className="w-5 h-5 text-muted-foreground" />
            </button>
            <button className="p-2 rounded-lg hover:bg-secondary transition-colors">
              <Settings className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
          <button className="flex items-center justify-center space-x-2 w-full p-3 rounded-lg hover:bg-secondary transition-colors text-muted-foreground bg-secondary/50">
            <LogOut className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </motion.aside>
      
      {/* Main content */}
      <main className="flex-1 bg-transparent">
        {/* Mobile header */}
        <div className="sticky top-0 z-30 bg-card/70 backdrop-blur-md shadow-sm lg:hidden">
          <div className="flex items-center justify-between p-4">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg hover:bg-secondary"
            >
              <Menu className="w-6 h-6" />
            </button>
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-primary rounded-lg p-1">
                <GraduationCap className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold gradient-text">ScholarMatch</span>
            </Link>
            <div className="w-6" />
          </div>
        </div>
        
        {/* Desktop header with toggle button when sidebar is closed */}
        {!isDesktopSidebarVisible && (
          <div className="hidden lg:flex sticky top-0 z-30 py-2 px-4">
            <button 
              onClick={() => setIsDesktopSidebarVisible(true)}
              className="p-2 rounded-lg hover:bg-secondary transition-colors"
              aria-label="Open Sidebar"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        )}
        
        <div className="p-4 sm:p-6 md:p-8 animate-in">
          {children}
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
