import { useUser } from "@civic/auth/react";
import { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";

interface LoginPageProps {
  onLogin: (user: { name: string; avatar: string; email?: string; id?: string }) => void;
}

export const LoginPage = ({ onLogin }: LoginPageProps): JSX.Element => {
  const { user, signIn } = useUser();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Get display name with fallbacks
  const getDisplayName = (civicUser: any) => {
    if (civicUser.name) return civicUser.name;
    if (civicUser.given_name && civicUser.family_name) {
      return `${civicUser.given_name} ${civicUser.family_name}`;
    }
    if (civicUser.given_name) return civicUser.given_name;
    if (civicUser.email) return civicUser.email.split('@')[0];
    return "User";
  };

  // Check if user is already logged in and redirect to dashboard
  useEffect(() => {
    if (user) {
      const displayName = getDisplayName(user);
      onLogin({
        name: displayName,
        avatar: user.picture || "/image-8.png",
        email: user.email,
        id: user.id,
      });
    }
  }, [user, onLogin]);

  const handleCivicLogin = async () => {
    try {
      setError(null);
      setIsLoading(true);
      await signIn();
    } catch (error) {
      console.error("Login failed:", error);
      setError("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
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
            Secure blockchain-based authentication for mining operations
          </p>
          <p className="text-white mt-2">
            Powered by{" "}
            <span className="text-[#6c47ff] font-semibold">Civic Identity</span>
          </p>
        </div>
      </div>

      {/* Right side with the login form */}
      <div className="w-1/2 h-full bg-[#1e1e1e] text-white flex items-center justify-center">
        <div className="w-full max-w-sm">
          <h2 className="text-3xl font-bold mb-8">Sign in</h2>

          {error && (
            <div className="mb-6 p-3 bg-red-900/20 border border-red-500/50 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}

          <div className="space-y-6">
            <Button
              size="lg"
              className="w-full h-12 font-medium text-lg rounded-lg flex items-center justify-center gap-3 bg-[#6c47ff] hover:bg-[#5838d1] text-white transition-colors"
              onClick={handleCivicLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Connecting to Civic...
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
            <h3 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              Secure Identity Verification
            </h3>
            <ul className="text-xs text-gray-400 space-y-1">
              <li>• Blockchain-based identity verification</li>
              <li>• Enhanced security for mining operations</li>
              <li>• Decentralized authentication</li>
              <li>• Zero-knowledge proof technology</li>
            </ul>
          </div>

          {/* Civic Identity Info */}
          <div className="mt-4 p-3 bg-[#6c47ff]/10 border border-[#6c47ff]/30 rounded-lg">
            <div className="flex items-center gap-2 text-xs text-[#6c47ff]">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              Civic Identity provides secure, privacy-preserving authentication
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};