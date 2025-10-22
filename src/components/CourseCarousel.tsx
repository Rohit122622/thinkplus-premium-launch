import { useState } from "react";
import { ChevronLeft, ChevronRight, Star, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import webDevImg from "@/assets/course-web-dev.png";
import dataScienceImg from "@/assets/course-data-science.png";
import marketingImg from "@/assets/course-marketing.png";
import designImg from "@/assets/course-design.png";
import businessImg from "@/assets/course-business.png";

const courses = [
  {
    id: 1,
    title: "Full-Stack Web Development",
    description: "Master React, Node.js, and modern web technologies",
    image: webDevImg,
    rating: 4.9,
    students: "12.5K",
    duration: "12 weeks",
    price: "$499",
    badge: "Bestseller",
  },
  {
    id: 2,
    title: "Data Science & Analytics",
    description: "Learn Python, Machine Learning, and Data Visualization",
    image: dataScienceImg,
    rating: 4.8,
    students: "9.2K",
    duration: "10 weeks",
    price: "$549",
    badge: "Popular",
  },
  {
    id: 3,
    title: "Digital Marketing Mastery",
    description: "SEO, Social Media, Content Marketing & Growth Hacking",
    image: marketingImg,
    rating: 4.7,
    students: "8.1K",
    duration: "8 weeks",
    price: "$399",
    badge: "New",
  },
  {
    id: 4,
    title: "UI/UX Design Pro",
    description: "Figma, Design Systems, User Research & Prototyping",
    image: designImg,
    rating: 4.9,
    students: "11.3K",
    duration: "9 weeks",
    price: "$449",
    badge: "Trending",
  },
  {
    id: 5,
    title: "Business Management",
    description: "Leadership, Strategy, Operations & Financial Planning",
    image: businessImg,
    rating: 4.8,
    students: "7.8K",
    duration: "11 weeks",
    price: "$529",
    badge: "Featured",
  },
];

const CourseCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % courses.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + courses.length) % courses.length);
  };

  const getVisibleCourses = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      visible.push(courses[(currentIndex + i) % courses.length]);
    }
    return visible;
  };

  return (
    <section className="py-16 lg:py-24 bg-muted/30" id="courses">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <span className="text-primary font-semibold text-sm uppercase tracking-wide">
            Popular Courses
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-3 mb-4">
            Explore Our{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Top Courses
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Industry-leading courses designed by experts to accelerate your career
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 bg-card rounded-full shadow-[var(--shadow-card)] flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all hover:scale-110"
            aria-label="Previous course"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 bg-card rounded-full shadow-[var(--shadow-card)] flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all hover:scale-110"
            aria-label="Next course"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Course Cards */}
          <div className="overflow-hidden px-2">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getVisibleCourses().map((course, idx) => (
                <div
                  key={`${course.id}-${idx}`}
                  className="bg-card rounded-2xl overflow-hidden shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-hover)] transition-all duration-300 hover:-translate-y-2 group animate-scale-in"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-semibold">
                        {course.badge}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      {course.description}
                    </p>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-accent text-accent" />
                        <span className="font-semibold text-foreground">{course.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{course.students}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{course.duration}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <span className="text-2xl font-bold text-primary">{course.price}</span>
                      <Button variant="default" size="default">
                        Enroll Now
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {courses.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === currentIndex
                    ? "bg-primary w-8"
                    : "bg-border hover:bg-primary/50"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            View All Courses
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CourseCarousel;
