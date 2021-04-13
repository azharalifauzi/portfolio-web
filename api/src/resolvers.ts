import { IResolvers } from 'apollo-server-express';
import FormData from 'form-data';
import fetch from 'node-fetch';

const resolvers: IResolvers<any, { prisma: any }> = {
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
    createProject: async (_, args, { prisma }) => {
      const { links, ...projectArgs } = args.project;

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
    deleteProject: async (_, args, { prisma }) => {
      const { id } = args;

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
    updateProject: async (_, args, { prisma }) => {
      const { links, ...data } = args.data;

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
    uploadImage: async (_, args, { prisma }) => {
      const { info, file } = args;

      const { filename, createReadStream } = await file.file;
      const stream = createReadStream();

      const project = await prisma.project.findUnique({
        where: {
          id: info.projectID,
        },
      });

      if (info.isPrimary) {
        await prisma.imageProject.updateMany({
          where: {
            projectID: info.projectID,
          },
          data: {
            isPrimary: false,
          },
        });
      }

      const slug = project.name
        .toLowerCase()
        .split(' ')
        .map((val: string) => val.trim())
        .join('-');

      const formData = new FormData();
      formData.append('file', stream, { filename });
      formData.append('fileName', slug);

      const res = await fetch('http://filestream:4000/api/v1/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      return await prisma.imageProject.create({
        data: {
          url: data.path,
          ...info,
        },
        include: {
          project: true,
        },
      });
    },
    updateImage: async (_, args, { prisma }) => {
      const { info, file, id } = args;

      const imageProject = await prisma.imageProject.findUnique({
        where: {
          id,
        },
        include: {
          project: true,
        },
      });

      let url = '';
      if (file?.file) {
        const { filename, createReadStream } = await file.file;
        const stream = createReadStream();
        const slug = imageProject.project.name
          .toLowerCase()
          .split(' ')
          .map((val: string) => val.trim())
          .join('-');

        const formData = new FormData();
        formData.append('file', stream, { filename });
        formData.append('fileName', slug);
        formData.append('url', imageProject.url);

        const res = await fetch('http://filestream:4000/api/v1/upload/update', {
          method: 'PUT',
          body: formData,
        });

        const data = await res.json();
        url = data.path;
      }

      if (info.isPrimary) {
        await prisma.imageProject.updateMany({
          where: {
            projectID: imageProject.projectID,
          },
          data: {
            isPrimary: false,
          },
        });
      }

      return await prisma.imageProject.update({
        where: {
          id,
        },
        data: {
          url: url ? url : undefined,
          ...info,
        },
        include: {
          project: true,
        },
      });
    },
    deleteImage: async (_, args, { prisma }) => {
      const { id } = args;

      const imageProject = await prisma.imageProject.findUnique({
        where: {
          id,
        },
      });

      const res = await fetch('http://filestream:4000/api/v1/upload/delete', {
        method: 'DELETE',
        body: JSON.stringify({
          url: imageProject.url,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (res.ok) {
        await prisma.imageProject.delete({
          where: {
            id,
          },
        });

        return 'image deleted';
      }

      return 'failed to delete image';
    },
  },
};

export { resolvers };
