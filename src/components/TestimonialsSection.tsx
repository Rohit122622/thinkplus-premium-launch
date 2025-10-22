import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Web Developer",
    company: "Tech Innovations Inc.",
    content: "ThinkPlus transformed my career! The mentorship program and hands-on projects gave me the confidence to land my dream job. The instructors are incredibly knowledgeable and supportive.",
    rating: 5,
    image: "👩‍💻",
  },
  {
    name: "Michael Chen",
    role: "Data Analyst",
    company: "Analytics Pro",
    content: "Best investment in my education. The courses are well-structured, and the community is amazing. I went from zero to hero in data science within 6 months!",
    rating: 5,
    image: "👨‍💼",
  },
  {
    name: "Emily Rodriguez",
    role: "Digital Marketer",
    company: "Creative Agency",
    content: "The practical approach and real-world projects made all the difference. I learned skills that I use every day in my job. Highly recommend ThinkPlus to anyone serious about growth.",
    rating: 5,
    image: "👩‍🎨",
  },
  {
    name: "David Kumar",
    role: "UX Designer",
    company: "Design Studio",
    content: "Outstanding learning experience! The certification helped me stand out in interviews, and the mock exams prepared me perfectly for industry challenges.",
    rating: 5,
    image: "👨‍🎨",
  },
  {
    name: "Lisa Thompson",
    role: "Business Analyst",
    company: "Global Corp",
    content: "The flexibility to learn at my own pace while working full-time was crucial. ThinkPlus made it possible for me to upskill without compromising my career.",
    rating: 5,
    image: "👩‍💼",
  },
  {
    name: "James Wilson",
    role: "Software Engineer",
    company: "StartUp Ventures",
    content: "From the quality of content to the support from mentors, everything exceeded my expectations. The community aspect kept me motivated throughout my journey.",
    rating: 5,
    image: "👨‍💻",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-16 lg:py-24 bg-muted/30 relative overflow-hidden" id="testimonials">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16 animate-fade-in-up">
          <span className="text-primary font-semibold text-sm uppercase tracking-wide">
            Student Success Stories
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-3 mb-4">
            What Our Students{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Are Saying
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Join thousands of satisfied learners who have transformed their careers
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, idx) => (
            <div
              key={testimonial.name}
              className="relative bg-card rounded-2xl p-6 lg:p-8 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-hover)] transition-all duration-300 hover:-translate-y-2 animate-fade-in-up group"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              {/* Gradient border effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative">
                {/* Quote Icon */}
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Quote className="w-6 h-6 text-primary-foreground" />
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-accent text-accent"
                    />
                  ))}
                </div>

                {/* Content */}
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-2xl">
                    {testimonial.image}
                  </div>
                  <div>
                    <div className="font-bold text-foreground">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role} at {testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
          <p className="text-muted-foreground mb-4">
            Join our community of successful learners
          </p>
          <div className="flex items-center justify-center gap-2 text-sm">
            <div className="flex -space-x-2">
              {["👨‍💻", "👩‍💼", "👨‍🎨", "👩‍🔬"].map((emoji, i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-lg border-2 border-background"
                >
                  {emoji}
                </div>
              ))}
            </div>
            <span className="text-foreground font-semibold">
              50,000+ students already enrolled
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
