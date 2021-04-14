type Project = {
  name?: string;
  id?: string;
  year?: string;
  links?: Link[];
  description?: string;
  builtWith?: string[];
  madeAt?: string;
  role?: string;
  achievements?: string[];
  images?: Image[];
  isFeatured?: boolean;
  isOnGoing?: boolean;
  isArchive?: boolean;
};

type Link = {
  id?: string;
  type?: 'github' | 'website';
  link?: string;
};

type Image = {
  id?: string;
  url?: string;
  alt?: string;
  isPrimary?: string;
};
