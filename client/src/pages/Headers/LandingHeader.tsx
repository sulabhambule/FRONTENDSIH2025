import { Button } from "@/components/ui/button"
import { GraduationCap, Menu, BookOpen, Users } from "lucide-react"
import { useNavigate } from "react-router-dom";

export function Header() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const navigateToLogin = useNavigate();

  const handleLoginClick = () => {
    navigateToLogin('/login');
  };

  return (
    <header className="border-b border-primary/10 bg-background/80 backdrop-blur-lg sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 lg:px-6 py-3 lg:py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Brand Section */}
          <div className="flex items-center space-x-3 lg:space-x-4">
            <div className="relative">
              <div className="h-10 w-10 lg:h-12 lg:w-12 bg-gradient-to-br from-primary via-primary/90 to-secondary rounded-xl lg:rounded-2xl flex items-center justify-center shadow-md">
                <GraduationCap className="h-5 w-5 lg:h-7 lg:w-7 text-primary-foreground" />
              </div>
              <div className="absolute -top-0.5 -right-0.5 lg:-top-1 lg:-right-1 h-3 w-3 lg:h-4 lg:w-4 bg-accent rounded-full flex items-center justify-center">
                <BookOpen className="h-2 w-2 lg:h-2.5 lg:w-2.5 text-accent-foreground" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg lg:text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Smart Student Hub
              </span>
              <p className="text-xs text-muted-foreground hidden sm:flex items-center gap-1">
                <Users className="h-3 w-3" />
                Academic Excellence Portal
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="mr-35">
            <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
              <button
                onClick={() => scrollToSection('features')}
                className="text-muted-foreground hover:text-primary transition-all duration-300 font-medium relative group cursor-pointer"
              >
                Features
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </button>
              <button
                onClick={() => scrollToSection('benefits')}
                className="text-muted-foreground hover:text-primary transition-all duration-300 font-medium relative group cursor-pointer"
              >
                Benefits
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </button>
              <button
                onClick={() => scrollToSection('footer')}
                className="text-muted-foreground hover:text-primary transition-all duration-300 font-medium relative group cursor-pointer"
              >
                About
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </button>
              <button
                onClick={() => scrollToSection('footer')}
                className="text-muted-foreground hover:text-primary transition-all duration-300 font-medium relative group cursor-pointer"
              >
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </button>
            </nav>
          </div>


          {/* Action Buttons */}
          <div className="flex items-center space-x-2 lg:space-x-3">
            {/* Mobile Menu Button */}
            <Button variant="ghost" size="sm" className="md:hidden hover:bg-primary/10 p-2">
              <Menu className="h-5 w-5" />
            </Button>

            {/* Login Button */}
            <Button
              size="sm"
              className="
                bg-gradient-to-r from-primary to-secondary 
                hover:from-primary/90 hover:to-secondary/90 
                text-primary-foreground font-semibold 
                shadow-md hover:shadow-lg 
                transition-all duration-300 
                border border-primary/20
                px-4 lg:px-6 py-2 lg:py-2.5
                rounded-lg lg:rounded-xl
                text-sm
              "
              onClick={() => {
                handleLoginClick();
              }}
            >
              <GraduationCap className="h-4 w-4 mr-1 lg:mr-2" />
              Login
            </Button>
          </div>
        </div>
      </div>

      {/* Educational accent line */}
      <div className="h-0.5 lg:h-1 bg-gradient-to-r from-primary via-accent to-secondary opacity-20"></div>
    </header>
  )
}
