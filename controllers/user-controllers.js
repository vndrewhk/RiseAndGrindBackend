"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = void 0;
let testUsers = [
    {
        userId: "1",
        problemType: "Arrays & Hashing",
        problems: [
            {
                solved: false,
                name: "Contains Duplicate",
                difficulty: "Easy",
                solution: "https://www.google.ca/",
                url: "https://www.bing.ca/",
            },
            {
                solved: false,
                name: "Contains Duplicate 2",
                difficulty: "Easy",
                solution: "https://www.google.ca/",
                url: "https://www.bing.ca/",
            },
        ],
    },
    {
        userId: "2",
        problemType: "Stacks",
        problems: [
            {
                solved: false,
                name: "Contains Duplicate",
                difficulty: "Easy",
                solution: "https://www.google.ca/",
                url: "https://www.bing.ca/",
            },
            {
                solved: false,
                name: "Contains Duplicate 2",
                difficulty: "Easy",
                solution: "https://www.google.ca/",
                url: "https://www.bing.ca/",
            },
        ],
    },
];
let getUserById = (req, res, next) => {
    const userId = req.params.userpId;
    console.log("got req in LC");
    console.log(userId);
    // by using || {}, we force an empty object to be returned if the returned val is falsey, ie undefined or empty
    //  alternatively, ! at end means ignore this, we assume that it will ALWAYS be an object since it's coming from another source
    // that will be verified
    const userList = testUsers.find((user) => user.userId === userId);
    if (!userList) {
        const error = new Error("Could not find a user with specified ID");
        error.statusCode = 404;
        return next(error);
    }
    res.json({ userList });
    //   res.json(testItems.filter((type) => type.pTypeId === problemTypeId));
};
exports.getUserById = getUserById;
