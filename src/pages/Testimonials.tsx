import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "Sarah L.",
    course: "Full-Stack Web Development",
    testimonial: "ThinkPlus transformed my career. The hands-on projects and AI mentorship were game-changers. I landed a senior developer role within a month of graduating!",
    avatar: "/placeholder.svg",
  },
  {
    name: "Mike R.",
    course: "Data Science & ML",
    testimonial: "The curriculum is top-notch and always up-to-date. I was able to apply what I learned directly to my job and got a promotion. Highly recommended!",
    avatar: "/placeholder.svg",
  },
  {
    name: "Emily C.",
    course: "UX/UI Design Fundamentals",
    testimonial: "I went from knowing nothing about design to building a professional portfolio that got me hired. The community is incredibly supportive.",
    avatar: "/placeholder.svg",
  },
  {
    name: "David H.",
    course: "Cybersecurity Essentials",
    testimonial: "The instructors are industry experts who provide real-world insights. The certification I earned was instrumental in my job search.",
    avatar: "/placeholder.svg",
  },
  {
    name: "Jessica P.",
    course: "Digital Marketing Mastery",
    testimonial: "I loved the flexibility of learning at my own pace. The mobile app is fantastic and allowed me to study during my commute.",
    avatar: "/placeholder.svg",
  },
  {
    name: "Alex T.",
    course: "Cloud Computing with AWS",
    testimonial: "The best investment I've made in my professional development. The course content is comprehensive and the AI mentor helped me through complex topics.",
    avatar: "/placeholder.svg",
  },
    {
    name: "Maria G.",
    course: "Python for Everybody",
    testimonial: "I finally understand Python! The interactive exercises made coding so much less intimidating. I'm already building my own small applications.",
    avatar: "/placeholder.svg",
  },
  {
    name: "Chris B.",
    course: "Business Analytics",
    testimonial: "The progress tracking tools kept me motivated, and the community forums were a great place to get help. I feel much more confident in my data analysis skills.",
    avatar: "/placeholder.svg",
  },
];

const Testimonials = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 lg:px-8 py-24 lg:py-32">
        <div className="text-center mb-12 lg:mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            What Our <span className="text-primary">Students Say</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Hear from thousands of successful learners who have transformed their careers with ThinkPlus.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name} className="flex flex-col justify-between hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <p className="italic text-muted-foreground">"{testimonial.testimonial}"</p>
              </CardContent>
              <div className="flex items-center gap-4 p-6 bg-muted/40 rounded-b-lg">
                <Avatar>
                  <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                  <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.course}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
