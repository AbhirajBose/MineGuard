import { Button } from "../../components/ui/button";

interface LoginPageProps {
  onLogin: (user: { name: string; avatar: string }) => void;
}

export const LoginPage = ({ onLogin }: LoginPageProps): JSX.Element => {
  const handleGoogleLogin = () => {
    // Simulate a successful Google login and pass user data
    onLogin({ name: "James", avatar: "/image-8.png" });
  };

  return (
    <div className="w-full h-screen flex font-['Inter',Helvetica]">
      {/* Left side with background image and branding */}
      <div
        className="w-1/2 h-full bg-cover bg-center p-12 flex flex-col justify-between"
        style={{ backgroundImage: "url(/loginBG.png)" }}
      >
        <div>
            <div className="inline-flex items-center gap-2 relative">
                <div className="relative w-[30px] h-[30px] bg-[#ff6b00] rounded-md overflow-hidden">
                    <img
                        className="absolute w-[22px] h-[22px] top-1 left-1"
                        alt="Game icons mine"
                        src="/game-icons-mine-truck.svg"
                    />
                </div>
                <div className="flex flex-col w-[126px] items-start relative">
                    <div className="relative self-stretch mt-[-1.00px] font-bold text-xs tracking-[0] leading-[normal]">
                        <span className="text-white">Mine</span>
                        <span className="text-[#ff6b00]">Guard</span>
                    </div>
                    <div className="relative self-stretch whitespace-nowrap font-medium text-white text-[8px] tracking-[0] leading-[normal]">
                        Advance Coal Mine Management
                    </div>
                </div>
            </div>
        </div>
        <div>
          <h1 className="text-5xl font-bold text-white leading-tight">
            Sign in to <br />
            <span className="text-[#ff6b00]">MineGuard</span>
          </h1>
          <p className="text-gray-400 mt-4">
            If you don't have an account register
          </p>
          <p className="text-white">You can <a href="#" className="text-[#ff6b00] underline">Register here!</a></p>
        </div>
      </div>

      {/* Right side with the login form */}
      <div className="w-1/2 h-full bg-[#1e1e1e] text-white flex items-center justify-center">
        <div className="w-full max-w-sm">
          <h2 className="text-3xl font-bold mb-8">Sign in</h2>
          
          <div className="space-y-6">
            <Button 
              variant="google"
              size="lg"
              className="w-full h-12 font-medium text-lg rounded-lg flex items-center justify-center gap-3"
              onClick={handleGoogleLogin}
            >
              <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google" className="w-6 h-6" />
              Continue with Google
            </Button>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-400 text-sm">
              By continuing, you agree to MineGuard's Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}; 