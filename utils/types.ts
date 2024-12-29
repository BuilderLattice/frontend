import { Address } from "viem";

export type UserStructContract = {
  userAddress: string;
  dataHash: string;
};

export type UserProfile = {
  address : Address
  linkedinUsername: string;
  githubUsername: string;
  name: string;
  email: string;
  linkedinProfile: {} | null;
  githubProfile: {
    username: string;
    topLanguages: {
      [language: string]: number; // Key-value pair for language and percentage
    };
    activity: {
      totalCommits: number;
      totalPRs: number;
      contributedTo: number;
    };
  };
  devScore: number;
};


export type Match = {
  name : String
  userAddress: string;
  bio: string;
  devScore: string;
  compatibilityScore: string;
  remark: string;
};
