import { AspectRatio } from '@chakra-ui/layout';
import { IconFolder, IconGithub, IconLaunch } from 'assets';

interface CardProps {
  name?: string;
  description?: string;
  builtWith?: string[];
  links?: {
    type: 'github' | 'link';
    url: string;
  }[];
  className?: string;
}

const Card: React.FC<CardProps> = () => {
  return (
    <AspectRatio background="grey.2" ratio={1}>
      <div className="flex flex-col justify-start items-strech px-6 py-4">
        <div className="flex items-center justify-between  w-full">
          <IconFolder />
          <div className="flex items-center">
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
        </div>
        <h5 className="text-h5 font-semibold text-black mt-6 mb-3">
          Realtime Chat App for health consultation
        </h5>
        <p className="text-black">Healthcare mobile app, built using React Native and Firebase.</p>
        <div className="mt-auto grid gap-2.5 auto-cols-max w-full grid-flow-col">
          <span className="text-body-sm text-grey-1">React Native</span>
          <span className="text-body-sm text-grey-1">Firebase</span>
        </div>
      </div>
    </AspectRatio>
  );
};

export default Card;
