import { IResolvers } from 'apollo-server-express';
import { Request, Response } from 'express';

const resolvers: IResolvers<
  any,
  { prisma: any; req: Request; res: Response; secretKey: string }
> = {
  Mutation: {
    provideSecretKey: (_, { secret }, { secretKey, res }) => {
      if (secret !== secretKey) return 'Wrong secret key!';

      res.cookie('graphqlSecretKey', secret, { maxAge: 60 * 60 * 1000, httpOnly: true });
      return 'Cookie succesfully setted';
    },
  },
};

export default resolvers;
