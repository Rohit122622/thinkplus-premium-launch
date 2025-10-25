import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Zap,
  BrainCircuit,
  Target,
  Award,
  Users,
  Smartphone,
} from "lucide-react";

const features = [
  {
    icon: <Zap className="w-10 h-10 text-primary" />,
    title: "Interactive Learning Tools",
    description:
      "Engage with hands-on exercises, quizzes, and real-world projects that make learning effective and fun.",
  },
  {
    icon: <BrainCircuit className="w-10 h-10 text-primary" />,
    title: "AI-Powered Mentorship",
    description:
      "Get instant feedback, personalized guidance, and 24/7 support from our advanced AI mentors.",
  },
  {
    icon: <Target className="w-10 h-10 text-primary" />,
    title: "Progress Tracking",
    description:
      "Visualize your learning journey, track your achievements, and stay motivated with our intuitive dashboards.",
  },
  {
    icon: <Award className="w-10 h-10 text-primary" />,
    title: "Certification Programs",
    description:
      "Earn industry-recognized certificates upon course completion to boost your resume and career prospects.",
  },
  {
    icon: <Users className="w-10 h-10 text-primary" />,
    title: "Community Support",
    description:
      "Collaborate with peers, join study groups, and get help from a vibrant community of learners and experts.",
  },
  {
    icon: <Smartphone className="w-10 h-10 text-primary" />,
    title: "Mobile Learning Access",
    description:
      "Learn on the go with our mobile-friendly platform. Access your courses anytime, anywhere, on any device.",
  },
];

const Features = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 lg:px-8 py-24 lg:py-32">
        <div className="text-center mb-12 lg:mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Our <span className="text-primary">Features</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover the powerful tools and resources that make ThinkPlus the
            best place to learn and grow your skills.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <Card key={feature.title} className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
                  {feature.icon}
                </div>
                <CardTitle className="pt-4">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
