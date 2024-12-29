"use client"
import { HoverBorderGradient } from "@/components/hover-border-gradient";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import fetchLinkedin from "@/utils/FetchLinkedin";
import { GenerateDevScore } from "@/utils/GenerateDevScore";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useContractInteraction } from "@/hooks/useContractInteractions";
import { uploadJSONToExaDrive } from "@/utils/UploadJSONToExadrive";
import abi from "@/lib/abi.json"
import { Address } from "viem";
import { useReadContract } from "wagmi";
import fetchGithubData from "@/utils/FetchGithub";


export default function Home() {

  const { isConnected, address, userProfile, createUser, allUsers } = useContractInteraction()

  const [modalOpen, setModalOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [linkedinData, setLinkedinData] = useState<any>(null);
  const [githubData, setGithubData] = useState<any>(null);
  const [formData, setFormData] = useState({
    linkedinUsername: "",
    githubUsername: "",
    name: "",
    email: "",
  });

  const steps = ["LinkedIn", "GitHub", "Additional Info"];
    
    useEffect(() => {
      console.log("my Profile", userProfile)
      console.log("all users", allUsers)
    }, [userProfile, allUsers])

  const LinkedinPromise = () => {
    return new Promise(async (resolve, reject) => {
      try {
          const linkedInResponse = await fetchLinkedin(formData.linkedinUsername);
          // const linkedInResponse = {fullName : "Test User"}
          if (!linkedInResponse) {
            reject(); 
            return;
          }
        setLinkedinData(linkedInResponse)
          resolve(linkedInResponse)
      } catch (error) {
        reject(error); 
      }
    });
  }

  const GithubPromise = () => {
    return new Promise(async (resolve, reject) => {
      try {

        const githubResponse = await fetchGithubData(formData.githubUsername);
        setGithubData(githubResponse)
        console.log(githubResponse)
        // const githubResponse = {fullName : "Test User"}
        if (!githubResponse) {
            reject(); 
            return;
          }
        setGithubData(githubResponse)
        resolve(githubResponse)
      } catch (error) {
        reject(error); 
      }
    });
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        return formData.linkedinUsername.trim() !== "";
      case 1:
        return formData.githubUsername.trim() !== "";
      case 2:
        return formData.name.trim() !== "" && formData.email.trim() !== "";
      default:
        return false;
    }
  };

  const handleNext = async () => {
    if (isStepValid()) {
      setLoading(true);
      try {
        if (currentStep === 0) {

          toast.promise(LinkedinPromise, {
            loading: 'Fetching LinkedIn profile...',
            success: (data:any) => {
              return `Successfully retrieved ${data.fullName}'s profile`;
            },
            error: 'Failed to fetch LinkedIn profile',
          })

        } else if (currentStep === 1) {

          toast.promise(GithubPromise, {
            loading: 'Fetching Github profile...',
            success: (data: any) => {
              return `Successfully retrieved ${data.username}'s profile`;
            },
            error: 'Failed to fetch Github profile',
          })

        }
        setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
      } catch (error) {
        console.error("Error processing profile:", error);
        toast("Some Error Occured")
      } finally {
        setLoading(false);
      }
    } else {
      toast(`Please complete the ${steps[currentStep]} step`);
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (currentStep === steps.length - 1 && isStepValid()) {
      setLoading(true);
      try {
        // Create the final profile object
        let finalProfile = {
          ...formData,
          address : address as Address,
          linkedinProfile: linkedinData,
          githubProfile: githubData,
          devScore : 0,
        };

        const _devScore = await GenerateDevScore(finalProfile);

        finalProfile = {
          ...finalProfile,
          devScore : _devScore
        };

        console.log("Final Profile is", finalProfile);

        const res = await uploadJSONToExaDrive(finalProfile, address as string)

        console.log("ExaDrive response", res)

        createUser(address as string);

        setModalOpen(false)
        
        // toast("Builder Profile Created Successfully!");
      } catch (error) {
        console.error("Profile creation failed", error);
      } finally {
        setLoading(false);
      }
    }
  };
  
  return (
    <div className="max-h-[100vh] min-h-[100vh] gap-4 flex flex-col w-full items-center justify-center ">
      <h1 className="text-4xl font-semibold text-black dark:text-white">
        Right People Right Time <br />
        <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
          Builder lattice
        </span>
      </h1>
     
      {isConnected && !userProfile && (
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
          <DialogTrigger>
            <div className="m-10 flex justify-center text-center">
              <HoverBorderGradient
                containerClassName="rounded-full"
                as="div"
                className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
              >
                <span>Create Profile</span>
              </HoverBorderGradient>
            </div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create Builder Profile</DialogTitle>
              <DialogDescription>
                Fill out your details to generate a developer score
              </DialogDescription>
            </DialogHeader>
            <Card>
              <CardHeader>
                <CardTitle>Onboarding</CardTitle>
                <CardDescription>
                  Connect your accounts and provide additional information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="flex justify-between mb-2">
                    {steps.map((step, index) => (
                      <div
                        key={step}
                        className={`text-sm font-medium ${index <= currentStep
                          ? "text-primary"
                          : "text-muted-foreground"
                          }`}
                      >
                        {step}
                      </div>
                    ))}
                  </div>
                  <div className="w-full bg-secondary h-2 rounded-full">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-300 ease-in-out"
                      style={{
                        width: `${((currentStep + 1) / steps.length) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>

                {currentStep === 0 && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="linkedinUsername">LinkedIn Username</Label>
                      <Input
                        id="linkedinUsername"
                        name="linkedinUsername"
                        placeholder="johndoe"
                        value={formData.linkedinUsername}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                )}

                {currentStep === 1 && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="githubUsername">GitHub Username</Label>
                      <Input
                        id="githubUsername"
                        name="githubUsername"
                        placeholder="johndoe"
                        value={formData.githubUsername}
                        onChange={handleInputChange}
                        disabled={false}
                      />
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                {currentStep > 0 && (
                  <Button onClick={handlePrevious} disabled={loading}>Previous</Button>
                )}
                {currentStep < steps.length - 1 ? (
                  <Button
                    onClick={handleNext}
                  // disabled={loading || !isStepValid() || processing.linkedin || processing.github}
                  >
                    {loading ? "Processing..." : "Next"}
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    disabled={loading || !isStepValid()}
                  >
                    {loading ? "Creating..." : "Create Profile"}
                  </Button>
                )}
              </CardFooter>
            </Card>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
