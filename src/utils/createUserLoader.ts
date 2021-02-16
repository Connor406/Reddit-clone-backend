import DataLoader from "dataloader";
import { User } from "../entities/User";

// Added to index.ts => ApolloServer context
// Added to types.ts => MyContext

export const createUserLoader = () =>
  new DataLoader<number, User>(async (userIds) => {
    const users = await User.findByIds(userIds as number[]);
    const userIdToUser: Record<number, User> = {};
    users.forEach((u) => {
      userIdToUser[u.id] = u;
    });

    const returnValues = userIds.map((userId) => userIdToUser[userId]);
    return returnValues;
  });
