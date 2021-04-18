import { gql } from 'apollo-server-express';

const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.
  scalar Upload
  scalar DateTime

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    projects(sortBy: SortProject, sort: Sort, filter: FilterProject): [Project]
  }

  type Mutation {
    createProject(project: CreateProjectInput): Project
    deleteProject(id: String): String
    updateProject(id: String, data: UpdateProjectInput): Project
    uploadImage(info: UploadImageInput, file: Upload!): ImageProject
    updateImage(id: String, info: UpdateImageInput, file: Upload): ImageProject
    deleteImage(id: String): String
    provideSecretKey(secret: String): String
  }

  input FilterProject {
    isOnGoing: Boolean
    isArchive: Boolean
    isFeatured: Boolean
    id: String
  }

  enum SortProject {
    createdAt
    year
    name
  }

  enum Sort {
    asc
    desc
  }

  type Project {
    id: String!
    createdAt: DateTime!
    name: String!
    year: String!
    madeAt: String
    builtWith: [String!]!
    links: [Link!]!
    isArchive: Boolean!
    images: [ImageProject!]!
    isFeatured: Boolean!
    description: String!
    achievements: [String!]!
    isOnGoing: Boolean!
    role: String
  }

  type ImageProject {
    id: String!
    url: String!
    alt: String
    project: Project
    projectID: String!
    isPrimary: Boolean!
  }

  type Link {
    id: String!
    type: LinkType
    link: String
    projectID: String!
    project: Project
  }

  enum LinkType {
    github
    website
  }

  input LinkInput {
    type: LinkType
    link: String
  }

  input CreateProjectInput {
    name: String!
    year: String!
    madeAt: String
    builtWith: [String]
    links: [LinkInput]
    isArchive: Boolean = false
    isFeatured: Boolean = false
    description: String!
    achievements: [String!]
    isOnGoing: Boolean = false
    role: String
  }

  input UpdateProjectInput {
    name: String
    year: String
    madeAt: String
    builtWith: [String]
    links: [LinkInput]
    isArchive: Boolean
    isFeatured: Boolean
    description: String
    achievements: [String]
    isOnGoing: Boolean
    role: String
  }

  input UploadImageInput {
    alt: String
    isPrimary: Boolean!
    projectID: String!
  }

  input UpdateImageInput {
    alt: String
    isPrimary: Boolean
  }
`;

export { typeDefs };
