"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var node_fetch_1 = __importDefault(require("node-fetch"));
var resolvers = {
    Query: {
        projects: function (_parent, args, _a) {
            var prisma = _a.prisma;
            return __awaiter(void 0, void 0, void 0, function () {
                var _b, sort, _c, sortBy, filter, queryFilter;
                var _d;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            _b = args.sort, sort = _b === void 0 ? 'asc' : _b, _c = args.sortBy, sortBy = _c === void 0 ? 'createdAt' : _c, filter = args.filter;
                            queryFilter = {};
                            if (filter)
                                Object.keys(filter).forEach(function (key) {
                                    queryFilter[key] = filter[key];
                                });
                            return [4 /*yield*/, prisma.project.findMany({
                                    where: __assign({}, queryFilter),
                                    include: {
                                        links: true,
                                        images: true,
                                    },
                                    orderBy: (_d = {},
                                        _d[sortBy] = sort,
                                        _d),
                                })];
                        case 1: return [2 /*return*/, _e.sent()];
                    }
                });
            });
        },
    },
    Mutation: {
        createProject: function (_, args, _a) {
            var prisma = _a.prisma, req = _a.req, secretKey = _a.secretKey;
            return __awaiter(void 0, void 0, void 0, function () {
                var _b, links, projectArgs, graphqlSecretKey, project;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _b = args.project, links = _b.links, projectArgs = __rest(_b, ["links"]);
                            graphqlSecretKey = req.cookies.graphqlSecretKey;
                            if (secretKey !== graphqlSecretKey)
                                throw new Error('wrong secret key');
                            return [4 /*yield*/, prisma.project.create({
                                    data: __assign(__assign({}, projectArgs), { links: {
                                            create: links,
                                        } }),
                                    include: {
                                        links: true,
                                        images: true,
                                    },
                                })];
                        case 1:
                            project = _c.sent();
                            return [2 /*return*/, project];
                    }
                });
            });
        },
        deleteProject: function (_, args, _a) {
            var prisma = _a.prisma, req = _a.req, secretKey = _a.secretKey;
            return __awaiter(void 0, void 0, void 0, function () {
                var id, graphqlSecretKey, project, res;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            id = args.id;
                            graphqlSecretKey = req.cookies.graphqlSecretKey;
                            if (secretKey !== graphqlSecretKey)
                                throw new Error('wrong secret key');
                            return [4 /*yield*/, prisma.project.findUnique({
                                    where: {
                                        id: id,
                                    },
                                    include: {
                                        images: true,
                                    },
                                })];
                        case 1:
                            project = _b.sent();
                            if (!(project.images.length > 0)) return [3 /*break*/, 3];
                            return [4 /*yield*/, node_fetch_1.default('http://filestream:4000/api/v1/upload/delete/many', {
                                    method: 'DELETE',
                                    body: JSON.stringify({
                                        urls: Array.from(project.images, function (image) { return image.url; }),
                                    }),
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                })];
                        case 2:
                            res = _b.sent();
                            if (!res.ok)
                                return [2 /*return*/, 'failed to delete project due to cannot delete images from database'];
                            _b.label = 3;
                        case 3: return [4 /*yield*/, prisma.project.update({
                                where: {
                                    id: id,
                                },
                                data: {
                                    links: {
                                        deleteMany: {},
                                    },
                                    images: {
                                        deleteMany: {},
                                    },
                                },
                            })];
                        case 4:
                            _b.sent();
                            return [4 /*yield*/, prisma.project.delete({
                                    where: {
                                        id: id,
                                    },
                                })];
                        case 5:
                            _b.sent();
                            return [2 /*return*/, 'project deleted'];
                    }
                });
            });
        },
        updateProject: function (_, args, _a) {
            var prisma = _a.prisma, req = _a.req, secretKey = _a.secretKey;
            return __awaiter(void 0, void 0, void 0, function () {
                var _b, links, data, graphqlSecretKey;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _b = args.data, links = _b.links, data = __rest(_b, ["links"]);
                            graphqlSecretKey = req.cookies.graphqlSecretKey;
                            if (secretKey !== graphqlSecretKey)
                                throw new Error('wrong secret key');
                            if (!links) return [3 /*break*/, 2];
                            return [4 /*yield*/, prisma.link.deleteMany({
                                    where: {
                                        projectID: args.id,
                                    },
                                })];
                        case 1:
                            _c.sent();
                            _c.label = 2;
                        case 2: return [4 /*yield*/, prisma.project.update({
                                where: {
                                    id: args.id,
                                },
                                data: __assign(__assign({}, data), { links: {
                                        create: links,
                                    } }),
                                include: {
                                    links: true,
                                    images: true,
                                },
                            })];
                        case 3: return [2 /*return*/, _c.sent()];
                    }
                });
            });
        },
    },
};
exports.default = resolvers;
