
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
  LogOut
} from "lucide-react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();
  
  const navItems = [
    { name: "Discover", path: "/", icon: Search },
    { name: "Dashboard", path: "/dashboard", icon: BarChart3 },
    { name: "Scholarships", path: "/scholarships", icon: GraduationCap },
    { name: "Fundraising", path: "/fundraising", icon: Heart },
    { name: "Profile", path: "/profile", icon: User },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Mobile menu overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <motion.aside
        className={`fixed lg:sticky top-0 h-screen w-[280px] bg-white z-50 shadow-md lg:shadow-none flex flex-col transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
        initial={{ x: "-100%" }}
        animate={{ 
          x: window.innerWidth >= 1024 ? 0 : (isOpen ? 0 : "-100%") 
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="flex items-center justify-between p-6 border-b">
          <Link to="/" className="flex items-center space-x-2" onClick={() => setIsOpen(false)}>
            <GraduationCap className="w-8 h-8 text-primary" />
            <span className="text-xl font-semibold">ScholarMatch</span>
          </Link>
          <button 
            className="lg:hidden"
            onClick={() => setIsOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <nav className="flex-1 p-6 space-y-1 overflow-y-auto">
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
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-secondary"
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? "text-primary-foreground" : "text-muted-foreground"}`} />
                <span className={isActive ? "font-medium" : ""}>{item.name}</span>
              </Link>
            );
          })}
        </nav>
        
        <div className="p-6 border-t">
          <button className="flex items-center space-x-2 w-full p-3 rounded-lg hover:bg-secondary transition-colors text-muted-foreground">
            <LogOut className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </motion.aside>
      
      {/* Main content */}
      <main className="flex-1 bg-background">
        {/* Mobile header */}
        <div className="sticky top-0 z-30 bg-background/70 backdrop-blur-md shadow-sm lg:hidden">
          <div className="flex items-center justify-between p-4">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg hover:bg-secondary"
            >
              <Menu className="w-6 h-6" />
            </button>
            <Link to="/" className="flex items-center space-x-2">
              <GraduationCap className="w-6 h-6 text-primary" />
              <span className="text-lg font-semibold">ScholarMatch</span>
            </Link>
            <div className="w-6" />
          </div>
        </div>
        
        <div className="p-4 sm:p-6 md:p-8 animate-in">
          {children}
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
