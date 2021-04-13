import { Badge } from '@chakra-ui/layout';
import { IconGithub, IconLaunch, ImgDummy } from 'assets';
import clsx from 'clsx';
import { List } from 'components';
import Image from 'next/image';

interface FeaturedProjectProps {
  className?: string;
  builtWith?: string[];
  achievements?: string[];
  description?: string;
  year?: string;
  name?: string;
  image?: string;
}

const FeaturedProject: React.FC<FeaturedProjectProps> = ({ className }) => {
  return (
    <div
      style={{ gridTemplateColumns: 'minmax(auto, 485px) 1fr' }}
      className={clsx('grid gap-x-20', className)}
    >
      <div className="max-w-[485px] relative">
        <Image src={ImgDummy} layout="responsive" width={16} height={9} />
      </div>
      <div>
        <div className="flex items-center">
          <h4 className="text-h4 text-black font-semibold mr-3">Starpower PLN</h4>
          <Badge
            marginRight="4"
            paddingX="2"
            fontWeight="normal"
            rounded="xl"
            textColor="white"
            bgColor="blue"
          >
            2020
          </Badge>
          <a
            className="mr-3 last:mr-0"
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconGithub />
          </a>
          <a
            className="mr-3 last:mr-0"
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconLaunch />
          </a>
        </div>
        <h6 className="text-body text-grey-1 mb-4">Front End Engineer</h6>
        <div className="flex items-center mb-4">
          <Badge
            variant="outline"
            paddingX="3"
            fontWeight="normal"
            rounded="xl"
            textColor="grey.1"
            borderColor="grey.1"
          >
            Ionic
          </Badge>
        </div>
        <p className="text-black">
          Starpower is an Enterprise Resource Planning Software which built for PT. PLN Indonesia,
          this software help the company calculate their engineering design into technical drawing
          until budgeting. The projects deliverable contains Desktop App, Web App and Mobile App.
          And my responsibilities in this project are:
        </p>
        <div className="mt-3">
          <List size="sm">Create re-usable component for all platforms</List>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProject;
