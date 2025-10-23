import { useState, useRef, MouseEvent } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Mail, Lock, User, Upload, MessageCircle, Loader2 } from "lucide-react";

// Validation schemas
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().default(false),
  agreeToPolicy: z.boolean().refine((val) => val === true, {
    message: "You must agree to the Privacy Policy and Terms of Service",
  }),
});

const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50, "Name is too long"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  agreeToPolicy: z.boolean().refine((val) => val === true, {
    message: "You must agree to the Privacy Policy and Terms of Service",
  }),
});

type LoginFormData = z.infer<typeof loginSchema>;
type SignupFormData = z.infer<typeof signupSchema>;

const Auth = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [tiltStyle, setTiltStyle] = useState({});
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Login form
  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
      agreeToPolicy: false,
    },
  });

  // Signup form
  const signupForm = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      agreeToPolicy: false,
    },
  });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    
    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload an image smaller than 5MB",
          variant: "destructive",
        });
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogin = async (data: LoginFormData) => {
    setIsLoading(true);
    
    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email: data.email, password: data.password }),
      // });
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Simulate successful login
      toast({
        title: "Welcome back!",
        description: "You have successfully signed in.",
      });
      
      // Store remember me preference
      if (data.rememberMe) {
        localStorage.setItem('rememberMe', 'true');
      }
      
      // Redirect to home page
      setTimeout(() => {
        navigate("/");
      }, 500);
      
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Invalid email or password. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (data: SignupFormData) => {
    setIsLoading(true);
    
    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/auth/signup', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     name: data.name,
      //     email: data.email,
      //     password: data.password,
      //     profileImage: profileImage,
      //   }),
      // });
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Simulate successful signup
      toast({
        title: "Account created!",
        description: "Welcome to ThinkPlus. Redirecting to dashboard...",
      });
      
      // Redirect to home page
      setTimeout(() => {
        navigate("/");
      }, 500);
      
    } catch (error) {
      toast({
        title: "Signup failed",
        description: "An error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider: 'google' | 'apple') => {
    toast({
      title: `${provider === 'google' ? 'Google' : 'Apple'} Sign In`,
      description: "Social authentication will be available soon.",
    });
  };

  const flipToSignup = () => {
    setIsFlipped(true);
    signupForm.reset();
  };

  const flipToLogin = () => {
    setIsFlipped(false);
    loginForm.reset();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4 overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Toggle buttons */}
        <div className="flex gap-4 mb-8 justify-center" role="tablist" aria-label="Authentication mode">
          <Button
            variant={!isFlipped ? "hero" : "outline"}
            size="lg"
            onClick={flipToLogin}
            className="min-w-[140px]"
            role="tab"
            aria-selected={!isFlipped}
            aria-controls="login-form"
          >
            Sign In
          </Button>
          <Button
            variant={isFlipped ? "hero" : "outline"}
            size="lg"
            onClick={flipToSignup}
            className="min-w-[140px]"
            role="tab"
            aria-selected={isFlipped}
            aria-controls="signup-form"
          >
            Sign Up
          </Button>
        </div>

        {/* 3D Flip Card */}
        <div
          ref={cardRef}
          className="relative w-full h-[600px]"
          style={{ perspective: '1000px' }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div
            className="relative w-full h-full transition-all duration-700 ease-out"
            style={{
              transformStyle: 'preserve-3d',
              transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
              ...tiltStyle,
            }}
          >
            {/* Login Card (Front) */}
            <div
              id="login-form"
              role="tabpanel"
              aria-hidden={isFlipped}
              className="absolute inset-0 w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl shadow-2xl p-8 border border-gray-700 overflow-y-auto"
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
              }}
            >
              <div className="flex flex-col h-full">
                <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
                <p className="text-gray-400 mb-6">Sign in to continue your learning journey</p>

                <form onSubmit={loginForm.handleSubmit(handleLogin)} className="flex-1 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-email" className="text-gray-300">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" aria-hidden="true" />
                        <Input
                          id="login-email"
                          type="email"
                          placeholder="your@email.com"
                          className="pl-10 bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-500"
                          aria-required="true"
                          aria-invalid={!!loginForm.formState.errors.email}
                          aria-describedby={loginForm.formState.errors.email ? "login-email-error" : undefined}
                          {...loginForm.register("email")}
                        />
                      </div>
                      {loginForm.formState.errors.email && (
                        <p id="login-email-error" className="text-xs text-red-400" role="alert">
                          {loginForm.formState.errors.email.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="login-password" className="text-gray-300">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" aria-hidden="true" />
                        <Input
                          id="login-password"
                          type="password"
                          placeholder="••••••••"
                          className="pl-10 bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-500"
                          aria-required="true"
                          aria-invalid={!!loginForm.formState.errors.password}
                          aria-describedby={loginForm.formState.errors.password ? "login-password-error" : undefined}
                          {...loginForm.register("password")}
                        />
                      </div>
                      {loginForm.formState.errors.password && (
                        <p id="login-password-error" className="text-xs text-red-400" role="alert">
                          {loginForm.formState.errors.password.message}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="remember-me"
                          checked={loginForm.watch("rememberMe")}
                          onCheckedChange={(checked) => loginForm.setValue("rememberMe", checked)}
                          aria-label="Remember me"
                        />
                        <Label htmlFor="remember-me" className="text-sm text-gray-300 cursor-pointer">
                          Remember me
                        </Label>
                      </div>
                      <a href="#" className="text-sm text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-900 rounded">
                        Forgot Password?
                      </a>
                    </div>

                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="login-policy"
                        checked={loginForm.watch("agreeToPolicy")}
                        onCheckedChange={(checked) => loginForm.setValue("agreeToPolicy", checked as boolean)}
                        aria-required="true"
                        aria-invalid={!!loginForm.formState.errors.agreeToPolicy}
                      />
                      <Label htmlFor="login-policy" className="text-xs text-gray-400 leading-relaxed cursor-pointer">
                        I agree to the <a href="#" className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary rounded">Privacy Policy</a> and <a href="#" className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary rounded">Terms of Service</a>
                      </Label>
                    </div>
                    {loginForm.formState.errors.agreeToPolicy && (
                      <p className="text-xs text-red-400" role="alert">
                        {loginForm.formState.errors.agreeToPolicy.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-4 mt-6">
                    <Button
                      type="submit"
                      variant="hero"
                      size="lg"
                      className="w-full"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Signing In...
                        </>
                      ) : (
                        "Sign In"
                      )}
                    </Button>

                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-700"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-gray-900 text-gray-400">Or continue with</span>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button
                        type="button"
                        variant="outline"
                        className="flex-1 bg-gray-700/50 border-gray-600 hover:bg-gray-700"
                        onClick={() => handleSocialLogin('google')}
                        disabled={isLoading}
                      >
                        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" aria-hidden="true">
                          <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                          <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                          <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                          <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                        Google
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        className="flex-1 bg-gray-700/50 border-gray-600 hover:bg-gray-700"
                        onClick={() => handleSocialLogin('apple')}
                        disabled={isLoading}
                      >
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                        </svg>
                        Apple
                      </Button>
                    </div>

                    <Button
                      type="button"
                      variant="ghost"
                      className="w-full text-primary hover:text-primary/80"
                      disabled={isLoading}
                    >
                      <MessageCircle className="w-5 h-5 mr-2" />
                      Need Help? Chat with Support
                    </Button>

                    <p className="text-center text-sm text-gray-400">
                      Don't have an account?{" "}
                      <button
                        type="button"
                        onClick={flipToSignup}
                        className="text-primary hover:underline font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-900 rounded"
                        disabled={isLoading}
                      >
                        Sign Up
                      </button>
                    </p>
                  </div>
                </form>
              </div>
            </div>

            {/* Signup Card (Back) */}
            <div
              id="signup-form"
              role="tabpanel"
              aria-hidden={!isFlipped}
              className="absolute inset-0 w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl shadow-2xl p-8 border border-gray-700 overflow-y-auto"
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
              }}
            >
              <div className="flex flex-col h-full">
                <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
                <p className="text-gray-400 mb-6">Join ThinkPlus and start learning today</p>

                <form onSubmit={signupForm.handleSubmit(handleSignup)} className="flex-1 flex flex-col justify-between">
                  <div className="space-y-4">
                    {/* Profile Image Upload */}
                    <div className="flex justify-center mb-4">
                      <div className="relative">
                        <input
                          type="file"
                          id="profile-upload"
                          accept="image/*"
                          className="sr-only"
                          onChange={handleImageUpload}
                          aria-label="Upload profile picture"
                        />
                        <label
                          htmlFor="profile-upload"
                          className="cursor-pointer block focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 focus-within:ring-offset-gray-900 rounded-full"
                        >
                          <div className="w-24 h-24 rounded-full border-4 border-primary bg-gray-700 flex items-center justify-center overflow-hidden hover:border-secondary transition-colors">
                            {profileImage ? (
                              <img src={profileImage} alt="Profile preview" className="w-full h-full object-cover" />
                            ) : (
                              <Upload className="w-8 h-8 text-gray-400" aria-hidden="true" />
                            )}
                          </div>
                        </label>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-name" className="text-gray-300">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" aria-hidden="true" />
                        <Input
                          id="signup-name"
                          type="text"
                          placeholder="John Doe"
                          className="pl-10 bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-500"
                          aria-required="true"
                          aria-invalid={!!signupForm.formState.errors.name}
                          aria-describedby={signupForm.formState.errors.name ? "signup-name-error" : undefined}
                          {...signupForm.register("name")}
                        />
                      </div>
                      {signupForm.formState.errors.name && (
                        <p id="signup-name-error" className="text-xs text-red-400" role="alert">
                          {signupForm.formState.errors.name.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-email" className="text-gray-300">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" aria-hidden="true" />
                        <Input
                          id="signup-email"
                          type="email"
                          placeholder="your@email.com"
                          className="pl-10 bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-500"
                          aria-required="true"
                          aria-invalid={!!signupForm.formState.errors.email}
                          aria-describedby={signupForm.formState.errors.email ? "signup-email-error" : undefined}
                          {...signupForm.register("email")}
                        />
                      </div>
                      {signupForm.formState.errors.email && (
                        <p id="signup-email-error" className="text-xs text-red-400" role="alert">
                          {signupForm.formState.errors.email.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-password" className="text-gray-300">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" aria-hidden="true" />
                        <Input
                          id="signup-password"
                          type="password"
                          placeholder="••••••••"
                          className="pl-10 bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-500"
                          aria-required="true"
                          aria-invalid={!!signupForm.formState.errors.password}
                          aria-describedby={signupForm.formState.errors.password ? "signup-password-error" : undefined}
                          {...signupForm.register("password")}
                        />
                      </div>
                      {signupForm.formState.errors.password && (
                        <p id="signup-password-error" className="text-xs text-red-400" role="alert">
                          {signupForm.formState.errors.password.message}
                        </p>
                      )}
                    </div>

                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="signup-policy"
                        checked={signupForm.watch("agreeToPolicy")}
                        onCheckedChange={(checked) => signupForm.setValue("agreeToPolicy", checked as boolean)}
                        aria-required="true"
                        aria-invalid={!!signupForm.formState.errors.agreeToPolicy}
                      />
                      <Label htmlFor="signup-policy" className="text-xs text-gray-400 leading-relaxed cursor-pointer">
                        I agree to the <a href="#" className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary rounded">Privacy Policy</a> and <a href="#" className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary rounded">Terms of Service</a>
                      </Label>
                    </div>
                    {signupForm.formState.errors.agreeToPolicy && (
                      <p className="text-xs text-red-400" role="alert">
                        {signupForm.formState.errors.agreeToPolicy.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-4 mt-6">
                    <Button
                      type="submit"
                      variant="hero"
                      size="lg"
                      className="w-full"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Creating Account...
                        </>
                      ) : (
                        "Create Account"
                      )}
                    </Button>

                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-700"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-gray-900 text-gray-400">Or sign up with</span>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button
                        type="button"
                        variant="outline"
                        className="flex-1 bg-gray-700/50 border-gray-600 hover:bg-gray-700"
                        onClick={() => handleSocialLogin('google')}
                        disabled={isLoading}
                      >
                        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" aria-hidden="true">
                          <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                          <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                          <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                          <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                        Google
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        className="flex-1 bg-gray-700/50 border-gray-600 hover:bg-gray-700"
                        onClick={() => handleSocialLogin('apple')}
                        disabled={isLoading}
                      >
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                        </svg>
                        Apple
                      </Button>
                    </div>

                    <p className="text-center text-sm text-gray-400">
                      Already have an account?{" "}
                      <button
                        type="button"
                        onClick={flipToLogin}
                        className="text-primary hover:underline font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-900 rounded"
                        disabled={isLoading}
                      >
                        Sign In
                      </button>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
