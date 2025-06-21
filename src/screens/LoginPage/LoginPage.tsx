import { useLogin, useUser } from "@civic/auth/react";
import { useEffect } from "react";
import { Button } from "../../components/ui/button";

interface LoginPageProps {
  onLogin: (user: { name: string; avatar: string; email?: string; id?: string }) => void;
}

export const LoginPage = ({ onLogin }: LoginPageProps): JSX.Element => {
  const { login, isLoading } = useLogin();
  const { user } = useUser();

  // Check if user is already logged in and redirect to dashboard
  useEffect(() => {
    if (user) {
      onLogin({
        name: user.name || user.email || "User",
        avatar: user.avatar || "/image-8.png",
        email: user.email,
        id: user.id,
      });
    }
  }, [user, onLogin]);

  const handleCivicLogin = async () => {
    try {
      await login();
    } catch (error) {
      console.error("Login failed:", error);
    }
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
          <p className="text-white">
            You can{" "}
            <a href="#" className="text-[#ff6b00] underline">
              Register here!
            </a>
          </p>
        </div>
      </div>

      {/* Right side with the login form */}
      <div className="w-1/2 h-full bg-[#1e1e1e] text-white flex items-center justify-center">
        <div className="w-full max-w-sm">
          <h2 className="text-3xl font-bold mb-8">Sign in</h2>

          <div className="space-y-6">
            <Button
              size="lg"
              className="w-full h-12 font-medium text-lg rounded-lg flex items-center justify-center gap-3 bg-[#6c47ff] hover:bg-[#5838d1] text-white"
              onClick={handleCivicLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Connecting...
                </>
              ) : (
                <>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                  >
                    <path
                      d="M12 2L2 7L12 12L22 7L12 2Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M2 17L12 22L22 17"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M2 12L12 17L22 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Continue with Civic
                </>
              )}
            </Button>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-400 text-sm">
              By continuing, you agree to MineGuard's Terms of Service and Privacy Policy
            </p>
          </div>

          {/* Civic Auth Benefits */}
          <div className="mt-8 p-4 bg-[#2c2c2c] rounded-lg border border-gray-700">
            <h3 className="text-sm font-semibold text-white mb-2">Secure Identity Verification</h3>
            <ul className="text-xs text-gray-400 space-y-1">
              <li>• Blockchain-based identity verification</li>
              <li>• Enhanced security for mining operations</li>
              <li>• Decentralized authentication</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};