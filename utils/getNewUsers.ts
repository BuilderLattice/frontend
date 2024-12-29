import { Address } from "viem";
import { Match, UserStructContract } from "./types";

export const getNewUsers = (
  userAddress : Address,
  allUsers: UserStructContract[],
  myMatches: Match[],
  maxUsers: number
): UserStructContract[] => {
  
  // Create a Set of user addresses from myMatches for quick lookup
  const myMatchesAddresses = new Set(
    myMatches.map((match) => match.userAddress)
  );

  myMatchesAddresses.add(userAddress);

  // Filter out users from allUsers who are not in myMatches
  const newUsers = allUsers.filter(
    (user) => !myMatchesAddresses.has(user.userAddress)
  );

  // Return only the first x users from the filtered list
  return newUsers.slice(0, Math.min(maxUsers, newUsers.length));
};
