import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, CheckCircle, Shield, FileText, BarChart3, Trophy, Star, GraduationCap, Users, Award, BookOpen } from "lucide-react"

export function Hero() {
  return (
    <section className="relative py-16 lg:py-16 min-h-screen flex items-center">
      {/* Simple Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5"></div>

      <div className="container mx-auto px-4 relative w-full">
        <div className="max-w-5xl mx-auto text-center">
          {/* Simple Badge */}
          <Badge className="mb-8 bg-primary text-primary-foreground px-4 py-2 text-sm font-medium">
            <Trophy className="w-4 h-4 mr-2" />
            🎓 Academic Excellence Portal
          </Badge>

          {/* Clean Hero Title */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-8 text-balance leading-tight">
            <span className="block text-foreground mb-2">Your Complete</span>
            <span className="block text-primary">Student Achievement</span>
            <span className="block text-2xl md:text-4xl lg:text-5xl text-foreground mt-2">
              Management System
            </span>
          </h1>

          {/* Simple Description */}
          <p className="text-base md:text-lg lg:text-xl text-muted-foreground mb-10 max-w-4xl mx-auto leading-relaxed">
            Digitally catalogue and manage your academic and non-academic achievements.
            Document conferences, certifications, competitions, projects, and build a comprehensive
            portfolio throughout your college journey.
          </p>

          {/* Simple Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button
              size="lg"
              className="text-base md:text-lg px-8 md:px-10 py-4 md:py-5 bg-primary text-primary-foreground font-semibold"
            >
              <GraduationCap className="mr-2 h-5 w-5" />
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-base md:text-lg px-8 md:px-10 py-4 md:py-5 border-2 border-primary/30 font-medium"
            >
              <BookOpen className="mr-2 h-5 w-5" />
              Learn More
            </Button>
          </div>

          {/* Simple Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-16">
            <div className="flex flex-col items-center p-6 rounded-xl bg-card border border-border shadow-sm">
              <div className="h-14 w-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <CheckCircle className="h-7 w-7 text-primary" />
              </div>
              <span className="text-base font-semibold text-foreground mb-2">Track Achievements</span>
              <span className="text-sm text-muted-foreground text-center">Document every academic success</span>
            </div>

            <div className="flex flex-col items-center p-6 rounded-xl bg-card border border-border shadow-sm">
              <div className="h-14 w-14 bg-secondary/10 rounded-xl flex items-center justify-center mb-4">
                <Shield className="h-7 w-7 text-secondary" />
              </div>
              <span className="text-base font-semibold text-foreground mb-2">Verified Records</span>
              <span className="text-sm text-muted-foreground text-center">Authenticated certificates</span>
            </div>

            <div className="flex flex-col items-center p-6 rounded-xl bg-card border border-border shadow-sm">
              <div className="h-14 w-14 bg-accent/10 rounded-xl flex items-center justify-center mb-4">
                <FileText className="h-7 w-7 text-accent" />
              </div>
              <span className="text-base font-semibold text-foreground mb-2">Digital Portfolio</span>
              <span className="text-sm text-muted-foreground text-center">Comprehensive showcase</span>
            </div>

            <div className="flex flex-col items-center p-6 rounded-xl bg-card border border-border shadow-sm">
              <div className="h-14 w-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <BarChart3 className="h-7 w-7 text-primary" />
              </div>
              <span className="text-base font-semibold text-foreground mb-2">Analytics & Reports</span>
              <span className="text-sm text-muted-foreground text-center">Performance insights</span>
            </div>
          </div>

          {/* Simple Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Star className="h-5 w-5 text-primary mr-2" />
                <span className="text-2xl lg:text-3xl font-bold text-primary">50K+</span>
              </div>
              <p className="text-sm lg:text-base text-muted-foreground">Achievements Catalogued</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Users className="h-5 w-5 text-secondary mr-2" />
                <span className="text-2xl lg:text-3xl font-bold text-secondary">10K+</span>
              </div>
              <p className="text-sm lg:text-base text-muted-foreground">Active Students</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Award className="h-5 w-5 text-accent mr-2" />
                <span className="text-2xl lg:text-3xl font-bold text-accent">500+</span>
              </div>
              <p className="text-sm lg:text-base text-muted-foreground">Partner Institutions</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
