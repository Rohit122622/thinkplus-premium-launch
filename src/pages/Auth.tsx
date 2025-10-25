import React, { useState, useRef, useEffect, MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useGoogleLogin } from "@react-oauth/google";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Mail, Lock, User, Upload, Eye, EyeOff } from "lucide-react";

// SVG Icons for Social Buttons
const GoogleIcon = () => (
  <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
    <path d="M1 1h22v22H1z" fill="none" />
  </svg>
);

const AppleIcon = () => (
  <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
    <path
      d="M12.01.25C10.845.25 9.11.89 7.61 2.14c-1.49 1.24-2.65 3.13-2.65 5.41 0 2.43 1.25 3.63 2.71 3.63 1.43 0 2.03-1.21 3.46-1.21s1.9.96 3.36.96c1.66 0 2.96-1.29 2.96-3.46 0-2.03-1.1-3.3-2.59-4.28C13.59.69 12.65.25 12.01.25zm.02 8.21c-.84 0-1.53-.59-1.93-1.49-.4-.91-.35-2.23.38-3.04.7-.78 1.75-1.24 2.56-1.24.78 0 1.5.55 1.9 1.45.43.91.46 2.21-.34 3.02-.77.82-1.81 1.3-2.57 1.3zM12.02 12.98c-2.23 0-4.43.99-5.86 2.44-.53.54-1.02 1.2-1.02 2.02 0 1.21.93 2.29 2.14 3.24.7.55 1.51.96 2.59.96s1.79-.38 2.47-.86c.68-.48 1.04-1.13 1.05-1.15-.03.02-2.5-1.02-2.5-3.26 0-1.89 1.7-2.88 3.54-2.88 1.1 0 2.11.45 2.81.99.28.21.56.43.87.64.1.06.2.12.3.18.02-.02.41-.24.41-.74 0-1.48-.65-2.84-1.8-3.82-1.14-.99-2.5-1.55-3.96-1.55z"
      fill="currentColor"
    />
  </svg>
);

const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
  agreeToPolicy: z.boolean().refine((val) => val === true, {
    message: "You must agree to the Privacy Policy and Terms of Service",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().default(false),
  agreeToPolicy: z.boolean().refine((val) => val === true, {
    message: "You must agree to the Privacy Policy and Terms of Service",
  }),
});

type SignupFormData = z.infer<typeof signupSchema>;
type LoginFormData = z.infer<typeof loginSchema>;

const Auth: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [cardPosition, setCardPosition] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
      agreeToPolicy: false,
    },
  });

  const signupForm = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeToPolicy: false,
    },
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const flipToSignUp = () => {
    setIsFlipping(true);
    setTimeout(() => setIsSignUp(true), 400);
    setTimeout(() => setIsFlipping(false), 800);
  };

  const flipToSignIn = () => {
    setIsFlipping(true);
    setTimeout(() => setIsSignUp(false), 400);
    setTimeout(() => setIsFlipping(false), 800);
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isFlipping) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setCardPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setCardPosition({ x: 0, y: 0 });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => setProfileImage(event.target?.result as string);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  // ✅ UPDATED LOGIN FUNCTION
  const handleLogin = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Login failed");
      }

      localStorage.setItem("token", result.token);
      localStorage.setItem("user", JSON.stringify(result.user));

      toast({
        title: "Welcome back!",
        description: `Signed in as ${result.user.name}`,
      });

      if (data.rememberMe) {
        localStorage.setItem("rememberMe", "true");
      }

      navigate("/");
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message || "Invalid email or password. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ UPDATED SIGNUP FUNCTION
  const handleSignup = async (data: SignupFormData) => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
          profileImage: profileImage || "",
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Signup failed");
      }

      toast({
        title: "Account created!",
        description: "Welcome to ThinkPlus. You can now sign in.",
      });

      setTimeout(() => {
        flipToSignIn();
      }, 1500);
    } catch (error: any) {
      toast({
        title: "Signup failed",
        description: error.message || "An error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: "google" | "apple", data: any) => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/auth/${provider}-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || `${provider} login failed`);
      }

      localStorage.setItem("token", result.token);
      localStorage.setItem("user", JSON.stringify(result.user));

      toast({
        title: "Welcome!",
        description: `Signed in as ${result.user.name}`,
      });

      navigate("/");
    } catch (error: any) {
      toast({
        title: "Login Failed",
        description: error.message || `An error occurred with your ${provider} login.`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        // Fetch user info from Google
        const userInfoResponse = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        });
        
        if (!userInfoResponse.ok) {
          throw new Error("Failed to fetch user info from Google");
        }

        const userInfo = await userInfoResponse.json();

        await handleSocialLogin("google", {
          email: userInfo.email,
          name: userInfo.name,
          profileImage: userInfo.picture,
        });
      } catch (error) {
        toast({
          title: "Google Login Failed",
          description: "Could not fetch your Google profile information. Please try again.",
          variant: "destructive",
        });
      }
    },
    onError: () => {
      toast({
        title: "Google Login Failed",
        description: "An error occurred during Google authentication.",
        variant: "destructive",
      });
    },
  });

  const cardStyle = !isFlipping
    ? {
        transform: `perspective(1000px) rotateY(${cardPosition.x * 10}deg) rotateX(${
          -cardPosition.y * 10
        }deg) translateZ(20px)`,
        transition: "transform 0.1s ease-out",
      }
    : {};

  const flipStyle = isFlipping
    ? {
        transform: isSignUp
          ? "perspective(1000px) rotateY(0deg)"
          : "perspective(1000px) rotateY(180deg)",
        transition: "transform 0.8s cubic-bezier(0.76, 0, 0.24, 1)",
      }
    : {
        transform: isSignUp
          ? "perspective(1000px) rotateY(180deg)"
          : "perspective(1000px) rotateY(0deg)",
        transition: "transform 0.8s cubic-bezier(0.76, 0, 0.24, 1)",
      };

  const combinedStyle = { ...cardStyle, ...flipStyle };
  
  // --- RENDER ---
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4 overflow-hidden relative">
      <div className="relative z-10 w-full max-w-md">
        <div className="flex gap-4 mb-8 justify-center" role="tablist" aria-label="Authentication mode">
          <Button
            variant={!isSignUp ? "hero" : "outline"}
            size="lg"
            onClick={flipToSignIn}
            className="min-w-[140px]"
            role="tab"
            aria-selected={!isSignUp}
            aria-controls="login-form"
          >
            Sign In
          </Button>
          <Button
            variant={isSignUp ? "hero" : "outline"}
            size="lg"
            onClick={flipToSignUp}
            className="min-w-[140px]"
            role="tab"
            aria-selected={isSignUp}
            aria-controls="signup-form"
          >
            Sign Up
          </Button>
        </div>

        <div
          ref={cardRef}
          className="relative w-full h-[600px]"
          style={{ perspective: "1000px" }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Card Content */}
          <div
            className="relative w-full h-full transition-all duration-700 ease-out"
            style={{
              transformStyle: "preserve-3d",
              ...combinedStyle,
            }}
          >
            {/* Sign In Side */}
            <div
              id="login-form"
              role="tabpanel"
              aria-hidden={isSignUp}
              className="absolute inset-0 w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl shadow-2xl p-8 border border-gray-700 overflow-y-auto"
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
              }}
            >
              <div className="flex flex-col h-full">
                <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
                <p className="text-gray-400 mb-6">Sign in to continue your learning journey</p>
                <form onSubmit={loginForm.handleSubmit(handleLogin)} className="flex-1 flex flex-col justify-between">
                  <div className="space-y-4">
                    {/* Email */}
                    <div className="space-y-2">
                      <Label htmlFor="login-email" className="text-gray-300">
                        Email
                      </Label>
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
                    {/* Password */}
                    <div className="space-y-2">
                      <Label htmlFor="login-password" className="text-gray-300">
                        Password
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" aria-hidden="true" />
                        <Input
                          id="login-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="pl-10 pr-10 bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-500"
                          aria-required="true"
                          aria-invalid={!!loginForm.formState.errors.password}
                          aria-describedby={loginForm.formState.errors.password ? "login-password-error" : undefined}
                          {...loginForm.register("password")}
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                          onClick={() => setShowPassword((p) => !p)}
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                      {loginForm.formState.errors.password && (
                        <p id="login-password-error" className="text-xs text-red-400" role="alert">
                          {loginForm.formState.errors.password.message}
                        </p>
                      )}
                    </div>
                    {/* Options */}
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
                    {/* Policy */}
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="login-policy"
                        checked={loginForm.watch("agreeToPolicy")}
                        onCheckedChange={(checked) => loginForm.setValue("agreeToPolicy", checked as boolean)}
                        aria-required="true"
                        aria-invalid={!!loginForm.formState.errors.agreeToPolicy}
                      />
                      <Label htmlFor="login-policy" className="text-xs text-gray-400 leading-relaxed cursor-pointer">
                        I agree to the <a href="#" className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary rounded">
                          Privacy Policy
                        </a> and <a href="#" className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary rounded">
                          Terms of Service
                        </a>
                      </Label>
                    </div>
                    {loginForm.formState.errors.agreeToPolicy && (
                      <p className="text-xs text-red-400" role="alert">
                        {loginForm.formState.errors.agreeToPolicy.message}
                      </p>
                    )}
                  </div>
                  {/* Continue and Social */}
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
                          <span className="loader w-5 h-5 mr-2" />
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
                        className="flex-1 bg-white text-gray-800 border-gray-300 hover:bg-gray-100 shadow-sm transition-all duration-200 ease-in-out transform hover:scale-105"
                        disabled={isLoading}
                        onClick={() => handleGoogleLogin()}
                      >
                        <GoogleIcon />
                        Google
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        className="flex-1 bg-black text-white border-gray-600 hover:bg-gray-800 shadow-sm transition-all duration-200 ease-in-out transform hover:scale-105"
                        disabled={isLoading}
                      >
                        <AppleIcon />
                        Apple
                      </Button>
                    </div>
                    <p className="text-center text-sm text-gray-400">
                      Don't have an account?{" "}
                      <button
                        type="button"
                        onClick={flipToSignUp}
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

            {/* Sign Up Side */}
            <div
              id="signup-form"
              role="tabpanel"
              aria-hidden={!isSignUp}
              className="absolute inset-0 w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl shadow-2xl p-8 border border-gray-700 overflow-y-auto"
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
              }}
            >
              <div className="flex flex-col h-full">
                <h2 className="text-3xl font-bold text-white mb-2">Create an Account & Start Learning</h2>
                <p className="text-gray-400 mb-6">Your learning journey begins here. Let's get you started!</p>
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
                    {/* Name */}
                    <div className="space-y-2">
                      <Label htmlFor="signup-name" className="text-gray-300">
                        Name
                      </Label>
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
                    {/* Email */}
                    <div className="space-y-2">
                      <Label htmlFor="signup-email" className="text-gray-300">
                        Email
                      </Label>
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
                    {/* Password */}
                    <div className="space-y-2">
                      <Label htmlFor="signup-password" className="text-gray-300">
                        Password
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" aria-hidden="true" />
                        <Input
                          id="signup-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="pl-10 pr-10 bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-500"
                          aria-required="true"
                          aria-invalid={!!signupForm.formState.errors.password}
                          aria-describedby={signupForm.formState.errors.password ? "signup-password-error" : undefined}
                          {...signupForm.register("password")}
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                          onClick={() => setShowPassword((p) => !p)}
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                      {signupForm.formState.errors.password && (
                        <p id="signup-password-error" className="text-xs text-red-400" role="alert">
                          {signupForm.formState.errors.password.message}
                        </p>
                      )}
                    </div>
                    {/* Confirm Password */}
                    <div className="space-y-2">
                      <Label htmlFor="signup-confirm-password" className="text-gray-300">
                        Confirm Password
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" aria-hidden="true" />
                        <Input
                          id="signup-confirm-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="pl-10 pr-10 bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-500"
                          aria-required="true"
                          aria-invalid={!!signupForm.formState.errors.confirmPassword}
                          aria-describedby={signupForm.formState.errors.confirmPassword ? "signup-confirm-password-error" : undefined}
                          {...signupForm.register("confirmPassword")}
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                          onClick={() => setShowPassword((p) => !p)}
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                      {signupForm.formState.errors.confirmPassword && (
                        <p id="signup-confirm-password-error" className="text-xs text-red-400" role="alert">
                          {signupForm.formState.errors.confirmPassword.message}
                        </p>
                      )}
                    </div>
                    {/* Policies */}
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="signup-policy"
                        checked={signupForm.watch("agreeToPolicy")}
                        onCheckedChange={(checked) => signupForm.setValue("agreeToPolicy", checked as boolean)}
                        aria-required="true"
                        aria-invalid={!!signupForm.formState.errors.agreeToPolicy}
                      />
                      <Label htmlFor="signup-policy" className="text-xs text-gray-400 leading-relaxed cursor-pointer">
                        I agree to the <a href="#" className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary rounded">
                          Privacy Policy
                        </a> and <a href="#" className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary rounded">
                          Terms of Service
                        </a>
                      </Label>
                    </div>
                    {signupForm.formState.errors.agreeToPolicy && (
                      <p className="text-xs text-red-400" role="alert">
                        {signupForm.formState.errors.agreeToPolicy.message}
                      </p>
                    )}
                  </div>
                  {/* Create Account and Social */}
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
                          <span className="loader w-5 h-5 mr-2" />
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
                        className="flex-1 bg-white text-gray-800 border-gray-300 hover:bg-gray-100 shadow-sm transition-all duration-200 ease-in-out transform hover:scale-105"
                        disabled={isLoading}
                        onClick={() => handleGoogleLogin()}
                      >
                        <GoogleIcon />
                        Google
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        className="flex-1 bg-black text-white border-gray-600 hover:bg-gray-800 shadow-sm transition-all duration-200 ease-in-out transform hover:scale-105"
                        disabled={isLoading}
                      >
                        <AppleIcon />
                        Apple
                      </Button>
                    </div>
                    <p className="text-center text-sm text-gray-400">
                      Already have an account?{" "}
                      <button
                        type="button"
                        onClick={flipToSignIn}
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