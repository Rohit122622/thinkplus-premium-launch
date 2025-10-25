import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Award, Target, Clock, PlayCircle, MoreVertical } from "lucide-react";
import Navbar from "@/components/Navbar";

const Dashboard = () => {
  const user = {
    name: "Rohit",
    enrolledCourses: [
      { id: 1, title: "Introduction to React", progress: 65, category: "Web Development" },
      { id: 2, title: "Advanced TypeScript", progress: 30, category: "Web Development" },
      { id: 3, title: "UI/UX Design Principles", progress: 80, category: "Design" },
    ],
    recentActivity: [
      { id: 1, activity: "Completed 'State Management' in 'Introduction to React'", time: "2 hours ago" },
      { id: 2, activity: "Commented on 'Advanced Components' lesson", time: "1 day ago" },
      { id: 3, activity: "Enrolled in 'UI/UX Design Principles'", time: "3 days ago" },
    ]
  };

  const stats = [
    { title: "Total Courses Enrolled", value: "12", icon: BookOpen, color: "text-primary" },
    { title: "Courses Completed", value: "5", icon: Award, color: "text-green-500" },
    { title: "Certificates Earned", value: "3", icon: Target, color: "text-yellow-500" },
    { title: "Learning Hours", value: "78", icon: Clock, color: "text-indigo-500" },
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-muted/40">
        <main className="container mx-auto px-4 lg:px-8 py-24">
          <div className="space-y-8">
            <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user.name}!</h1>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => (
                <Card key={stat.title} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className="text-xs text-muted-foreground">+2 from last month</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
              {/* Continue Learning */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Continue Learning</CardTitle>
                    <CardDescription>Pick up where you left off.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {user.enrolledCourses.map(course => (
                      <div key={course.id} className="flex items-center gap-4 group">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
                          <PlayCircle className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold">{course.title}</h3>
                              <p className="text-sm text-muted-foreground">{course.category}</p>
                            </div>
                            <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            <Progress value={course.progress} className="w-full" />
                            <span className="text-sm font-medium text-muted-foreground">{course.progress}%</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      {user.recentActivity.map(item => (
                        <li key={item.id} className="flex gap-3">
                          <div className="h-5 w-5 bg-primary/20 rounded-full flex items-center justify-center mt-1">
                            <div className="h-2 w-2 bg-primary rounded-full"></div>
                          </div>
                          <div>
                            <p className="text-sm">{item.activity}</p>
                            <p className="text-xs text-muted-foreground">{item.time}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Dashboard;
