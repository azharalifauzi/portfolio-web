"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var resolvers = {
    Mutation: {
        provideSecretKey: function (_, _a, _b) {
            var secret = _a.secret;
            var secretKey = _b.secretKey, res = _b.res;
            if (secret !== secretKey)
                return 'Wrong secret key!';
            res.cookie('graphqlSecretKey', secret, { maxAge: 60 * 60 * 1000, httpOnly: true });
            return 'Cookie succesfully setted';
        },
    },
};
exports.default = resolvers;
