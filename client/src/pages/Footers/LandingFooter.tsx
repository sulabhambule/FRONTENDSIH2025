import { GraduationCap, Mail, Phone, MapPin, Users, Award, BookOpen } from "lucide-react"

export function Footer() {
  const footerSections = [
    {
      title: "For Students",
      links: ["Achievement Tracker", "Digital Portfolio", "Certification Manager", "Project Showcase", "Academic Records"],
    },
    {
      title: "For Faculty",
      links: ["Student Management", "Approval System", "Progress Tracking", "Report Generation", "Verification Tools"],
    },
    {
      title: "Institution",
      links: ["Administrative Panel", "Analytics Dashboard", "NAAC Compliance", "AICTE Reports", "Integration Support"],
    },
    {
      title: "Support",
      links: ["Help Center", "User Guide", "Training Resources", "Technical Support", "FAQ"],
    },
  ]

  const quickStats = [
    { icon: Users, label: "Active Students", value: "10K+" },
    { icon: Award, label: "Achievements Tracked", value: "50K+" },
    { icon: BookOpen, label: "Partner Institutions", value: "500+" },
  ]

  return (
    <footer id="footer" className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 border-t border-primary/10">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Main Footer Content */}
        <div className="py-12 lg:py-16">
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Brand and Contact Section - Takes 2 columns */}
            <div className="lg:col-span-2">
              {/* Brand Section */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="h-12 w-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg">
                  <GraduationCap className="h-7 w-7 text-primary-foreground" />
                </div>
                <div>
                  <span className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Smart Student Hub
                  </span>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <BookOpen className="h-3 w-3" />
                    Academic Excellence Portal
                  </p>
                </div>
              </div>

              <p className="text-muted-foreground leading-relaxed mb-8 text-sm lg:text-base">
                Empowering students to digitally catalogue and showcase their complete academic journey.
                From classroom achievements to extracurricular excellence - document every milestone.
              </p>

              {/* Contact Information */}
              <div className="space-y-3">
                <h4 className="font-semibold text-foreground mb-3 text-base">Get in Touch</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                    <span>support@smartstudenthub.edu</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                    <span>+91 (800) 123-4567</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                    <span>Education Hub, Tech City, India</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Links - Takes 3 columns, organized in 4 sub-columns */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                {footerSections.map((section, index) => (
                  <div key={index}>
                    <h4 className="font-semibold text-foreground mb-4 text-base">{section.title}</h4>
                    <ul className="space-y-2.5">
                      {section.links.map((link, linkIndex) => (
                        <li key={linkIndex}>
                          <a
                            href="#"
                            className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 hover:underline block"
                          >
                            {link}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Stats Section */}
          <div className="mt-12 pt-8 border-t border-border/50">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-3xl mx-auto">
              {quickStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <stat.icon className="h-5 w-5 text-primary mr-2" />
                    <span className="text-2xl lg:text-3xl font-bold text-primary">{stat.value}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-border/50 py-6">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground text-center lg:text-left">
              &copy; 2025 Smart Student Hub. All rights reserved.
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 lg:gap-6 text-sm">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Academic Integrity
              </a>
            </div>
          </div>
          <div className="text-center mt-4">
            <p className="text-xs text-muted-foreground">
              🎓 Transforming Academic Excellence • Empowering Student Success • Building Tomorrow's Leaders
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
