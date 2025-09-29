import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Trophy, Shield, FileText, BarChart3, Award, CheckCircle } from "lucide-react"

export function Features() {
  const features = [
    {
      icon: BookOpen,
      title: "Dynamic Dashboard",
      description:
        "Real-time updates on academic performance, attendance, and credit-based activities all in one comprehensive view.",
      color: "primary"
    },
    {
      icon: Trophy,
      title: "Activity Tracker",
      description:
        "Upload and validate participation in seminars, conferences, MOOCs, internships, and extracurricular activities.",
      color: "secondary"
    },
    {
      icon: Shield,
      title: "Faculty Approval System",
      description:
        "Robust faculty and admin approval workflow to maintain credibility and authenticity of all academic records.",
      color: "accent"
    },
    {
      icon: FileText,
      title: "Digital Portfolio Generator",
      description: "Auto-generated, downloadable, and shareable verified student portfolio in PDF or web link format.",
      color: "primary"
    },
    {
      icon: BarChart3,
      title: "Analytics & Reporting",
      description:
        "Generate comprehensive reports for NAAC, AICTE, NIRF accreditations, and internal institutional evaluations.",
      color: "secondary"
    },
    {
      icon: Award,
      title: "Seamless Integration",
      description:
        "Connect effortlessly with existing LMS, ERP, and digital university platforms for unified academic management.",
      color: "accent"
    },
  ]

  return (
    <section id="features" className="py-20 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Simple Header Section */}
        <div className="text-center mb-16">
          <Badge className="mb-6 bg-primary text-primary-foreground px-4 py-2 text-sm font-medium">
            <CheckCircle className="w-4 h-4 mr-2" />
            🚀 Powerful Features for Academic Excellence
          </Badge>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">
            <span className="text-foreground">Everything You Need to</span>
            <span className="block text-primary mt-2">Excel Academically</span>
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Comprehensive tools designed for students, faculty, and institutions to manage and showcase academic excellence.
          </p>
        </div>

        {/* Simple Feature Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            const colorClasses = {
              primary: "text-primary",
              secondary: "text-secondary",
              accent: "text-accent"
            };

            return (
              <Card
                key={index}
                className="border border-border bg-card shadow-sm"
              >
                <CardHeader className="p-6">
                  {/* Simple Icon Container */}
                  <div className="mb-4">
                    <div className={`
                      h-14 w-14 
                      bg-${feature.color}/10
                      rounded-xl flex items-center justify-center
                    `}>
                      <IconComponent className={`h-7 w-7 ${colorClasses[feature.color as keyof typeof colorClasses]}`} />
                    </div>
                  </div>

                  {/* Simple Title */}
                  <CardTitle className="text-xl font-bold text-foreground mb-3">
                    {feature.title}
                  </CardTitle>

                  {/* Simple Description */}
                  <CardDescription className="text-muted-foreground leading-relaxed text-base">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>

        {/* Simple Call to Action Section */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <CheckCircle className="h-4 w-4 text-primary" />
            <span>Trusted by 500+ Educational Institutions</span>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of students and educators who are already using our platform to
            <span className="text-primary font-semibold"> transform their academic journey</span>
          </p>
        </div>
      </div>
    </section>
  )
}