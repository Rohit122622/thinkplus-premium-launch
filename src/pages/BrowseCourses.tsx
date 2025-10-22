import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, X, ChevronDown, Clock, Users, Star, BookOpen, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Import course images
import webDevImg from "@/assets/course-web-dev.png";
import dataScienceImg from "@/assets/course-data-science.png";
import marketingImg from "@/assets/course-marketing.png";
import designImg from "@/assets/course-design.png";
import businessImg from "@/assets/course-business.png";
import pythonImg from "@/assets/course-python.png";
import mlImg from "@/assets/course-ml.png";
import cloudImg from "@/assets/course-cloud.png";
import securityImg from "@/assets/course-security.png";
import mobileImg from "@/assets/course-mobile.png";
import blockchainImg from "@/assets/course-blockchain.png";

interface Course {
  id: number;
  title: string;
  description: string;
  image: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  category: string;
  duration: string;
  students: string;
  rating: number;
  format: "Projects" | "Exam Prep" | "Interactive" | "Video";
  price: string;
}

const allCourses: Course[] = [
  {
    id: 1,
    title: "Full-Stack Web Development",
    description: "Master React, Node.js, and modern web technologies from scratch",
    image: webDevImg,
    level: "Beginner",
    category: "Development",
    duration: "12 weeks",
    students: "12.5K",
    rating: 4.9,
    format: "Projects",
    price: "$499",
  },
  {
    id: 2,
    title: "Data Science & Analytics",
    description: "Learn Python, Machine Learning, and Data Visualization techniques",
    image: dataScienceImg,
    level: "Intermediate",
    category: "Data Science",
    duration: "10 weeks",
    students: "9.2K",
    rating: 4.8,
    format: "Interactive",
    price: "$549",
  },
  {
    id: 3,
    title: "Digital Marketing Mastery",
    description: "SEO, Social Media, Content Marketing & Growth Hacking strategies",
    image: marketingImg,
    level: "Beginner",
    category: "Marketing",
    duration: "8 weeks",
    students: "8.1K",
    rating: 4.7,
    format: "Video",
    price: "$399",
  },
  {
    id: 4,
    title: "UI/UX Design Pro",
    description: "Figma, Design Systems, User Research & Prototyping masterclass",
    image: designImg,
    level: "Intermediate",
    category: "Design",
    duration: "9 weeks",
    students: "11.3K",
    rating: 4.9,
    format: "Projects",
    price: "$449",
  },
  {
    id: 5,
    title: "Business Management",
    description: "Leadership, Strategy, Operations & Financial Planning essentials",
    image: businessImg,
    level: "Advanced",
    category: "Business",
    duration: "11 weeks",
    students: "7.8K",
    rating: 4.8,
    format: "Video",
    price: "$529",
  },
  {
    id: 6,
    title: "Python Programming Fundamentals",
    description: "Complete Python bootcamp from basics to advanced concepts",
    image: pythonImg,
    level: "Beginner",
    category: "Development",
    duration: "8 weeks",
    students: "15.2K",
    rating: 4.9,
    format: "Interactive",
    price: "$399",
  },
  {
    id: 7,
    title: "Machine Learning Engineering",
    description: "Build and deploy ML models with TensorFlow and PyTorch",
    image: mlImg,
    level: "Advanced",
    category: "Data Science",
    duration: "14 weeks",
    students: "6.5K",
    rating: 4.8,
    format: "Projects",
    price: "$649",
  },
  {
    id: 8,
    title: "Cloud Computing with AWS",
    description: "Master AWS services, DevOps practices, and cloud architecture",
    image: cloudImg,
    level: "Intermediate",
    category: "Development",
    duration: "10 weeks",
    students: "8.9K",
    rating: 4.7,
    format: "Interactive",
    price: "$499",
  },
  {
    id: 9,
    title: "Cybersecurity Essentials",
    description: "Network security, ethical hacking, and threat prevention",
    image: securityImg,
    level: "Intermediate",
    category: "Security",
    duration: "12 weeks",
    students: "7.3K",
    rating: 4.8,
    format: "Exam Prep",
    price: "$549",
  },
  {
    id: 10,
    title: "Mobile App Development",
    description: "Build iOS and Android apps with React Native",
    image: mobileImg,
    level: "Intermediate",
    category: "Development",
    duration: "11 weeks",
    students: "9.8K",
    rating: 4.9,
    format: "Projects",
    price: "$499",
  },
  {
    id: 11,
    title: "Blockchain & Web3",
    description: "Smart contracts, DApps, and cryptocurrency development",
    image: blockchainImg,
    level: "Advanced",
    category: "Development",
    duration: "13 weeks",
    students: "5.4K",
    rating: 4.7,
    format: "Projects",
    price: "$599",
  },
  {
    id: 12,
    title: "Product Management",
    description: "Product strategy, roadmapping, and stakeholder management",
    image: businessImg,
    level: "Intermediate",
    category: "Business",
    duration: "9 weeks",
    students: "6.7K",
    rating: 4.8,
    format: "Video",
    price: "$479",
  },
];

const BrowseCourses = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedFormats, setSelectedFormats] = useState<string[]>([]);
  const [selectedDurations, setSelectedDurations] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("popular");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const coursesPerPage = 9;

  const categories = ["Development", "Data Science", "Design", "Marketing", "Business", "Security"];
  const levels = ["Beginner", "Intermediate", "Advanced"];
  const formats = ["Projects", "Interactive", "Exam Prep", "Video"];
  const durations = ["8 weeks", "9 weeks", "10 weeks", "11 weeks", "12 weeks", "13 weeks", "14 weeks"];

  const toggleFilter = (filterArray: string[], setFilterArray: (arr: string[]) => void, value: string) => {
    if (filterArray.includes(value)) {
      setFilterArray(filterArray.filter((item) => item !== value));
    } else {
      setFilterArray([...filterArray, value]);
    }
    setCurrentPage(1);
  };

  const filteredAndSortedCourses = useMemo(() => {
    let filtered = allCourses.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesLevel = selectedLevels.length === 0 || selectedLevels.includes(course.level);
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(course.category);
      const matchesFormat = selectedFormats.length === 0 || selectedFormats.includes(course.format);
      const matchesDuration = selectedDurations.length === 0 || selectedDurations.includes(course.duration);
      return matchesSearch && matchesLevel && matchesCategory && matchesFormat && matchesDuration;
    });

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "popular":
          return parseInt(b.students.replace("K", "")) - parseInt(a.students.replace("K", ""));
        case "rating":
          return b.rating - a.rating;
        case "newest":
          return b.id - a.id;
        case "price-low":
          return parseInt(a.price.replace("$", "")) - parseInt(b.price.replace("$", ""));
        case "price-high":
          return parseInt(b.price.replace("$", "")) - parseInt(a.price.replace("$", ""));
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchQuery, selectedLevels, selectedCategories, selectedFormats, selectedDurations, sortBy]);

  const totalPages = Math.ceil(filteredAndSortedCourses.length / coursesPerPage);
  const currentCourses = filteredAndSortedCourses.slice(
    (currentPage - 1) * coursesPerPage,
    currentPage * coursesPerPage
  );

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedLevels([]);
    setSelectedCategories([]);
    setSelectedFormats([]);
    setSelectedDurations([]);
    setCurrentPage(1);
  };

  const activeFiltersCount =
    selectedLevels.length + selectedCategories.length + selectedFormats.length + selectedDurations.length;

  const formatBadgeColor = (format: string) => {
    switch (format) {
      case "Projects":
        return "bg-primary/10 text-primary";
      case "Interactive":
        return "bg-secondary/10 text-secondary";
      case "Exam Prep":
        return "bg-accent/10 text-accent";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Header */}
          <div className="mb-8 animate-fade-in-up">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Browse{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                All Courses
              </span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Discover {allCourses.length} expert-led courses to accelerate your career
            </p>
          </div>

          <div className="flex gap-6">
            {/* Sidebar Filters - Desktop */}
            <aside className="hidden lg:block w-72 flex-shrink-0 animate-fade-in">
              <div className="sticky top-24 bg-card rounded-2xl p-6 shadow-[var(--shadow-card)]">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-lg">Filters</h3>
                  {activeFiltersCount > 0 && (
                    <Button variant="ghost" size="sm" onClick={resetFilters}>
                      Reset
                    </Button>
                  )}
                </div>

                {/* Search */}
                <div className="mb-6">
                  <label className="text-sm font-semibold text-foreground mb-2 block">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search courses..."
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Level Filter */}
                <div className="mb-6">
                  <label className="text-sm font-semibold text-foreground mb-3 block">Level</label>
                  <div className="space-y-2">
                    {levels.map((level) => (
                      <button
                        key={level}
                        onClick={() => toggleFilter(selectedLevels, setSelectedLevels, level)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                          selectedLevels.includes(level)
                            ? "bg-primary text-primary-foreground font-medium"
                            : "bg-muted hover:bg-muted/80 text-foreground"
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Category Filter */}
                <div className="mb-6">
                  <label className="text-sm font-semibold text-foreground mb-3 block">Category</label>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <Badge
                        key={category}
                        variant={selectedCategories.includes(category) ? "default" : "outline"}
                        className="cursor-pointer transition-all hover:scale-105"
                        onClick={() => toggleFilter(selectedCategories, setSelectedCategories, category)}
                      >
                        {category}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Format Filter */}
                <div className="mb-6">
                  <label className="text-sm font-semibold text-foreground mb-3 block">Format</label>
                  <div className="flex flex-wrap gap-2">
                    {formats.map((format) => (
                      <Badge
                        key={format}
                        variant={selectedFormats.includes(format) ? "default" : "outline"}
                        className="cursor-pointer transition-all hover:scale-105"
                        onClick={() => toggleFilter(selectedFormats, setSelectedFormats, format)}
                      >
                        {format}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Duration Filter */}
                <div>
                  <label className="text-sm font-semibold text-foreground mb-3 block">Duration</label>
                  <div className="space-y-2">
                    {durations.map((duration) => (
                      <button
                        key={duration}
                        onClick={() => toggleFilter(selectedDurations, setSelectedDurations, duration)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                          selectedDurations.includes(duration)
                            ? "bg-primary text-primary-foreground font-medium"
                            : "bg-muted hover:bg-muted/80 text-foreground"
                        }`}
                      >
                        {duration}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              {/* Mobile Filter Toggle */}
              <div className="lg:hidden mb-4 flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
                </Button>
                {activeFiltersCount > 0 && (
                  <Button variant="ghost" onClick={resetFilters}>
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>

              {/* Mobile Filters */}
              {showFilters && (
                <div className="lg:hidden mb-6 bg-card rounded-2xl p-6 shadow-[var(--shadow-card)] animate-fade-in-up">
                  <div className="space-y-6">
                    {/* Mobile Search */}
                    <div>
                      <label className="text-sm font-semibold mb-2 block">Search</label>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          placeholder="Search courses..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    {/* Mobile Filters - Same structure as desktop */}
                    <div>
                      <label className="text-sm font-semibold mb-3 block">Level</label>
                      <div className="flex flex-wrap gap-2">
                        {levels.map((level) => (
                          <Badge
                            key={level}
                            variant={selectedLevels.includes(level) ? "default" : "outline"}
                            className="cursor-pointer"
                            onClick={() => toggleFilter(selectedLevels, setSelectedLevels, level)}
                          >
                            {level}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-semibold mb-3 block">Category</label>
                      <div className="flex flex-wrap gap-2">
                        {categories.map((category) => (
                          <Badge
                            key={category}
                            variant={selectedCategories.includes(category) ? "default" : "outline"}
                            className="cursor-pointer"
                            onClick={() => toggleFilter(selectedCategories, setSelectedCategories, category)}
                          >
                            {category}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-semibold mb-3 block">Format</label>
                      <div className="flex flex-wrap gap-2">
                        {formats.map((format) => (
                          <Badge
                            key={format}
                            variant={selectedFormats.includes(format) ? "default" : "outline"}
                            className="cursor-pointer"
                            onClick={() => toggleFilter(selectedFormats, setSelectedFormats, format)}
                          >
                            {format}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Sort and Results */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <p className="text-muted-foreground">
                  Showing <span className="font-semibold text-foreground">{currentCourses.length}</span> of{" "}
                  <span className="font-semibold text-foreground">{filteredAndSortedCourses.length}</span> courses
                </p>

                <div className="relative w-full sm:w-auto">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full sm:w-auto appearance-none bg-card border border-border rounded-lg px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
                  >
                    <option value="popular">Most Popular</option>
                    <option value="rating">Highest Rated</option>
                    <option value="newest">Newest First</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                </div>
              </div>

              {/* Course Grid */}
              {currentCourses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                  {currentCourses.map((course, idx) => (
                    <div
                      key={course.id}
                      className="bg-card rounded-2xl overflow-hidden shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-hover)] transition-all duration-300 hover:-translate-y-2 group animate-fade-in-up"
                      style={{ animationDelay: `${idx * 0.05}s` }}
                    >
                      <div className="relative overflow-hidden">
                        <img
                          src={course.image}
                          alt={course.title}
                          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute top-4 left-4">
                          <Badge className={formatBadgeColor(course.format)}>{course.format}</Badge>
                        </div>
                        <div className="absolute top-4 right-4">
                          <Badge variant="secondary">{course.level}</Badge>
                        </div>
                      </div>

                      <div className="p-6">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                          <BookOpen className="w-3 h-3" />
                          <span>{course.category}</span>
                        </div>

                        <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors line-clamp-1">
                          {course.title}
                        </h3>

                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{course.description}</p>

                        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 fill-accent text-accent" />
                            <span className="font-semibold text-foreground">{course.rating}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            <span>{course.students}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{course.duration}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-border">
                          <span className="text-xl font-bold text-primary">{course.price}</span>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              Syllabus
                            </Button>
                            <Button variant="pill" size="sm">
                              Enroll
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-10 h-10 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">No courses found</h3>
                  <p className="text-muted-foreground mb-4">Try adjusting your filters or search query</p>
                  <Button variant="outline" onClick={resetFilters}>
                    Reset Filters
                  </Button>
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>

                  <div className="flex items-center gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-10 h-10 rounded-lg font-medium transition-all ${
                          currentPage === page
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted hover:bg-muted/80 text-foreground"
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BrowseCourses;
