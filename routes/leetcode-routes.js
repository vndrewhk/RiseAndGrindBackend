"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// obj that u can reg middleware on, and export it
const router = express_1.default.Router();
// will have to add ID to the problems eventually
let testItems = [
    {
        pTypeId: "1",
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
        pTypeId: "2",
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
router.get("/:pTypeId", (req, res, next) => {
    const problemTypeId = req.params.pTypeId;
    console.log("got req in LC");
    console.log(problemTypeId);
    // by using || {}, we force an empty object to be returned if the returned val is falsey, ie undefined or empty
    const problemList = testItems.find((problemType) => problemType.pTypeId === problemTypeId) ||
        {};
    res.json({ problemList });
    //   res.json(testItems.filter((type) => type.pTypeId === problemTypeId));
});
// export default router;
exports.default = router;
