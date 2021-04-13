import { useQuery, gql } from '@apollo/client';
import { Button } from '@chakra-ui/button';
import { IconCodeThinking } from 'assets';
import { useState } from 'react';

const GET_PROJECTS = gql`
  query GetProjects($isFeatured: Boolean) {
    projects(sortBy: year, sort: asc, filter: { isFeatured: $isFeatured }) {
      id
      name
      year
      madeAt
      isFeatured
      isOnGoing
      images {
        id
        url
        isPrimary
        alt
      }
      links {
        type
        link
      }
    }
  }
`;

export default function Home() {
  const [isFeatured, setFeatured] = useState<boolean>(false);
  const { data } = useQuery(GET_PROJECTS, {
    variables: {
      isFeatured,
    },
  });

  return (
    <>
      <main>
        <section className="container mx-auto mt-40">
          <div className="grid grid-cols-5 items-center">
            <div className="col-span-3">
              <div className="text-blue font-semibold mb-2">Hi, my name is</div>
              <h1 className="text-h2 font-semibold mb-2">Azhar Ali.</h1>
              <h2 className="text-grey-1 font-semibold text-h3 mb-6">
                I help companies and organizations build their digital products.
              </h2>
              <Button
                className="focus:outline-none"
                borderRadius="none"
                _hover={{
                  background: 'blue',
                }}
                _active={{
                  background: 'blue',
                }}
                textColor="white"
                bg="blue"
              >
                Get in touch
              </Button>
            </div>
            <div className="col-span-2">
              <IconCodeThinking className="w-full" />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
