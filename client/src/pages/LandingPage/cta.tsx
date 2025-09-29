import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CTA() {
  return (
    <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.08),transparent_50%)]"></div>

      <div className="container mx-auto px-4 text-center relative">
        <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-balance">Ready to Transform Your Academic Journey?</h2>
        <p className="text-xl lg:text-2xl mb-12 opacity-90 max-w-3xl mx-auto leading-relaxed">
          Join thousands of students and faculty already using Smart Student Hub to track, verify, and showcase their
          academic achievements.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Button size="lg" variant="secondary" className="text-lg px-10 py-6 shadow-lg hover:shadow-xl transition-all">
            Start Free Trial
            <ArrowRight className="ml-3 h-5 w-5" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="text-lg px-10 py-6 border-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
          >
            Schedule Demo
          </Button>
        </div>
      </div>
    </section>
  )
}
