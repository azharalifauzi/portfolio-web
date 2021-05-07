import { gql } from '@apollo/client';
import { useMediaQuery } from '@chakra-ui/media-query';
import { client } from 'apollo-client';
import { IconGithub, IconLaunch } from 'assets';
import { Footer, Navbar, TableGrid } from 'components';
import { motion } from 'framer-motion';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';

const GET_PROJECTS = gql`
  query GetProjects {
    projects(sortBy: year, sort: desc) {
      id
      name
      year
      madeAt
      builtWith
      links {
        id
        type
        link
      }
    }
  }
`;

interface ArchivePage {
  projects: Project[];
}

export const getStaticProps: GetStaticProps<ArchivePage> = async () => {
  // ...
  try {
    const { data } = await client.query({
      query: GET_PROJECTS,
    });

    return {
      props: {
        projects: data.projects,
      },
      revalidate: 60,
    };
  } catch (e) {
    return {
      props: {
        projects: [],
      },
      revalidate: 60,
    };
  }
};

const ArchivePage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ projects }) => {
  const isMobile = useMediaQuery('(max-width: 1024px)');

  const variants = {
    initial: {
      opacity: 0,
      y: 40,
    },
    show: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <>
      <Head>
        <title>Azhar Ali Fauzi | Front End Engineer</title>
        <meta
          name="description"
          content="Azhar Ali Fauzi is a Front End Engineer based on Indonesia who specialized building robust software with beautiful UI and great UX"
        />
        <meta name="og:title" content="Azhar Ali Fauzi | Front End Engineer" />
        <meta
          name="og:description"
          content="Azhar Ali Fauzi is a Front End Engineer based on Indonesia who specialized building robust software with beautiful UI and great UX"
        />
        <meta name="og:type" content="website" />
        <meta name="og:url" content="https://azharalifauzi.dev/" />
        <meta name="twitter:creator" content="@azharalifauzi" />
        <meta name="twitter:title" content="Azhar Ali Fauzi" />
        <meta
          name="twitter:description"
          content="Azhar Ali Fauzi is a Front End Engineer based on Indonesia who specialized building robust software with beautiful UI and great UX"
        />
      </Head>
      <Navbar />
      <section id="id" className="container mx-auto md:px-10 px-6 mt-40">
        <motion.h1
          animate="show"
          variants={variants}
          initial="initial"
          transition={{ duration: 0.2 }}
          className="md:text-h1 text-h3 font-semibold text-blue"
        >
          Archive
        </motion.h1>
        <motion.h2
          animate="show"
          variants={variants}
          initial="initial"
          transition={{ duration: 0.2, delay: 0.2 }}
          className="md:text-h5 text-body text-grey-1 mb-20"
        >
          Here are things I&apos;ve built so far
        </motion.h2>
        <motion.div
          animate="show"
          variants={variants}
          initial="initial"
          transition={{ duration: 0.2, delay: 0.4 }}
          className="mb-20"
        >
          <TableGrid
            columns={
              isMobile[0]
                ? [
                    {
                      field: 'year',
                      name: 'Year',
                      width: '40px',
                    },
                    {
                      field: 'name',
                      name: 'Title',
                    },

                    {
                      field: 'links',
                      name: 'Link',
                      width: '70px',
                    },
                  ]
                : [
                    {
                      field: 'year',
                      name: 'Year',
                      width: '60px',
                    },
                    {
                      field: 'name',
                      name: 'Title',
                    },
                    {
                      field: 'madeAt',
                      name: 'madeAt',
                      width: '250px',
                    },
                    {
                      field: 'builtWith',
                      name: 'Built With',
                      width: '0.8fr',
                    },
                    {
                      field: 'links',
                      name: 'Link',
                      width: '150px',
                    },
                  ]
            }
            data={projects}
            onRenderField={(field, value, { key }) => {
              if (field === 'madeAt' && !value) return <div key={key}>-</div>;

              if (field === 'year')
                return (
                  <div key={key} className="font-semibold text-blue">
                    {value}
                  </div>
                );

              if (field === 'name')
                return (
                  <div key={key} className="font-semibold text-black">
                    {value}
                  </div>
                );

              if (field === 'links')
                return (
                  <div key={key} className="grid grid-flow-col auto-cols-max gap-x-4">
                    {value?.map(({ id, type, link }) => (
                      <a href={link} key={id} target="_blank" rel="noopener noreferrer">
                        {type === 'website' ? (
                          <IconLaunch className="ic-stroke-blue" />
                        ) : (
                          <IconGithub className="ic-stroke-blue" />
                        )}
                      </a>
                    ))}
                  </div>
                );

              if (field === 'builtWith')
                return (
                  <div key={key} className="text-[14px]">
                    {value?.join('  •  ')}
                  </div>
                );
            }}
            config={{ textColorHead: 'grey-1', animationInView: true }}
          />
        </motion.div>
      </section>
      <Footer />
    </>
  );
};

export default ArchivePage;
