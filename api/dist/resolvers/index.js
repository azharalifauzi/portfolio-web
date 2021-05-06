"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
var load_files_1 = require("@graphql-tools/load-files");
var merge_1 = require("@graphql-tools/merge");
var path_1 = __importDefault(require("path"));
var resolversArray = load_files_1.loadFilesSync(path_1.default.join(__dirname, './**/*.resolver.*'));
var resolvers = merge_1.mergeResolvers(resolversArray);
exports.resolvers = resolvers;
