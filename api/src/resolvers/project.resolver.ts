import { IResolvers } from 'apollo-server-express';
import { Request } from 'express';
import fetch from 'node-fetch';

const resolvers: IResolvers<any, { prisma: any; req: Request; secretKey: string }> = {
  Query: {
    projects: async (_parent, args, { prisma }) => {
      const { sort = 'asc', sortBy = 'createdAt', filter } = args;

      const queryFilter: Record<string, any> = {};
      if (filter)
        Object.keys(filter).forEach((key) => {
          queryFilter[key] = filter[key];
        });

      return await prisma.project.findMany({
        where: {
          ...queryFilter,
        },
        include: {
          links: true,
          images: true,
        },
        orderBy: {
          [sortBy]: sort,
        },
      });
    },
  },
  Mutation: {
    createProject: async (_, args, { prisma, req, secretKey }) => {
      const { links, ...projectArgs } = args.project;
      const { graphqlSecretKey } = req.cookies;

      if (secretKey !== graphqlSecretKey) throw new Error('wrong secret key');

      const project = await prisma.project.create({
        data: {
          ...projectArgs,
          links: {
            create: links,
          },
        },
        include: {
          links: true,
          images: true,
        },
      });

      return project;
    },
    deleteProject: async (_, args, { prisma, req, secretKey }) => {
      const { id } = args;
      const { graphqlSecretKey } = req.cookies;

      if (secretKey !== graphqlSecretKey) throw new Error('wrong secret key');

      const project = await prisma.project.findUnique({
        where: {
          id,
        },
        include: {
          images: true,
        },
      });

      if (project.images.length > 0) {
        const res = await fetch('http://filestream:4000/api/v1/upload/delete/many', {
          method: 'DELETE',
          body: JSON.stringify({
            urls: Array.from(project.images, (image: any) => image.url),
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!res.ok) return 'failed to delete project due to cannot delete images from database';
      }

      await prisma.project.update({
        where: {
          id,
        },
        data: {
          links: {
            deleteMany: {},
          },
          images: {
            deleteMany: {},
          },
        },
      });

      await prisma.project.delete({
        where: {
          id,
        },
      });

      return 'project deleted';
    },
    updateProject: async (_, args, { prisma, req, secretKey }) => {
      const { links, ...data } = args.data;
      const { graphqlSecretKey } = req.cookies;

      if (secretKey !== graphqlSecretKey) throw new Error('wrong secret key');

      if (links)
        await prisma.link.deleteMany({
          where: {
            projectID: args.id,
          },
        });

      return await prisma.project.update({
        where: {
          id: args.id,
        },
        data: {
          ...data,
          links: {
            create: links,
          },
        },
        include: {
          links: true,
          images: true,
        },
      });
    },
  },
};

export default resolvers;
