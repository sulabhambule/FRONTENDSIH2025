import { GraduationCap, Users, Award, CheckCircle } from "lucide-react"

export function Benefits() {
  const benefitGroups = [
    {
      icon: GraduationCap,
      title: "For Students",
      benefits: [
        "Build verified, holistic digital academic profiles",
        "Better preparation for placements and higher education",
        "Showcase achievements to potential employers effectively",
        "Track progress throughout your entire academic journey",
      ],
    },
    {
      icon: Users,
      title: "For Faculty",
      benefits: [
        "Access real-time data for effective student mentoring",
        "Streamlined approval and validation processes",
        "Comprehensive student progress tracking dashboard",
        "Significantly reduced administrative workload",
      ],
    },
    {
      icon: Award,
      title: "For Institutions",
      benefits: [
        "Enhanced efficiency during accreditation processes",
        "Data-driven decision making capabilities",
        "Improved transparency and institutional accountability",
        "Seamless digital transformation alignment",
      ],
    },
  ]

  return (
    <section id="benefits" className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
            Empowering Every Stakeholder
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Tailored benefits that create value for students, faculty, and institutions alike.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
          {benefitGroups.map((group, index) => (
            <div key={index} className="text-center group">
              <div className="h-20 w-20 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:bg-primary/20 transition-colors">
                <group.icon className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-8">{group.title}</h3>
              <ul className="space-y-4 text-left">
                {group.benefits.map((benefit, benefitIndex) => (
                  <li key={benefitIndex} className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-primary mr-4 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground text-lg leading-relaxed">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
