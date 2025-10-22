import { Users, Award, FileCheck, MessageCircle, Smartphone } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Expert Mentorship",
    description: "Learn directly from industry professionals with years of real-world experience",
    color: "from-primary to-secondary",
  },
  {
    icon: Award,
    title: "Certification",
    description: "Earn recognized certificates that boost your resume and career prospects",
    color: "from-secondary to-accent",
  },
  {
    icon: FileCheck,
    title: "Mock Exams",
    description: "Practice with realistic assessments to build confidence before the real test",
    color: "from-accent to-primary",
  },
  {
    icon: MessageCircle,
    title: "Student Community",
    description: "Connect with peers, share knowledge, and grow together in a supportive network",
    color: "from-primary to-accent",
  },
  {
    icon: Smartphone,
    title: "Mobile Learning",
    description: "Learn on-the-go with our mobile app, available on iOS and Android",
    color: "from-secondary to-primary",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-16 lg:py-24 bg-background" id="features">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16 animate-fade-in-up">
          <span className="text-primary font-semibold text-sm uppercase tracking-wide">
            Why Choose ThinkPlus
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-3 mb-4">
            Everything You Need to{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Succeed
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Comprehensive learning tools and resources designed to help you achieve your goals
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group relative bg-card rounded-2xl p-8 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-hover)] transition-all duration-300 hover:-translate-y-2 animate-fade-in-up"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                {/* Gradient border effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="relative">
                  {/* Icon */}
                  <div
                    className={`w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-8 h-8 text-primary-foreground" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}

          {/* CTA Card */}
          <div className="group relative bg-gradient-to-br from-primary via-secondary to-accent rounded-2xl p-8 shadow-[var(--shadow-hover)] hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-fade-in-up text-primary-foreground" style={{ animationDelay: "0.5s" }}>
            <div className="relative">
              <div className="text-5xl mb-4">🚀</div>
              <h3 className="text-2xl font-bold mb-3">
                Ready to Start?
              </h3>
              <p className="mb-6 text-primary-foreground/90">
                Join thousands of students already transforming their careers with ThinkPlus
              </p>
              <button className="w-full bg-background text-primary font-semibold py-3 px-6 rounded-xl hover:bg-background/90 transition-colors">
                Get Started Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
