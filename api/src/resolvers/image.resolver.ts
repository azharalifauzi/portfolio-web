import { IResolvers } from 'apollo-server-express';
import FormData from 'form-data';
import fetch from 'node-fetch';

const resolvers: IResolvers<any, { prisma: any }> = {
  Mutation: {
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

export default resolvers;
