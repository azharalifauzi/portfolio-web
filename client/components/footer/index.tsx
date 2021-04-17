import { IconGithub, IconGitlab, IconLinkedin } from 'assets';

const Footer = () => {
  return (
    <footer className="container mx-auto md:px-10 px-6 mb-10">
      <p className="text-grey-1 mt-16 text-center mb-4">Designed & Built by Azhar Ali</p>
      <div className="grid grid-cols-3 w-[120px] mx-auto gap-6">
        <a
          className="mr-3 last:mr-0"
          href="https://github.com/azharalifauzi"
          target="_blank"
          rel="noopener noreferrer"
        >
          <IconGithub className="ic-stroke-blue" />
        </a>
        <a
          className="mr-3 last:mr-0"
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <IconLinkedin className="ic-stroke-blue" />
        </a>
        <a
          className="mr-3 last:mr-0"
          href="https://gitlab.com/azharalifauzi"
          target="_blank"
          rel="noopener noreferrer"
        >
          <IconGitlab className="ic-stroke-blue" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
