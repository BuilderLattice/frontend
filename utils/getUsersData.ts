import axios from "axios";
import { UserProfile, UserStructContract } from "./types";

export const getUsersData = async (
  userArray: UserStructContract[]
): Promise<UserProfile[]> => {
  const usersData: UserProfile[] = await Promise.all(
    userArray.map(async (userStruct) => {
      const { data } = await axios.get(
        `https://builder-lattice.exadrivecdn.com/userData/walletAddress/${userStruct.dataHash}/data.json`
      );
      return data;
    })
  );
  return usersData;
};
