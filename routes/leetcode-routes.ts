import express, { Express, Request, Response } from "express";

// obj that u can reg middleware on, and export it
const router = express.Router();

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

router.get("/:pTypeId", (req: Request, res: Response, next) => {
  const problemTypeId: String = req.params.pTypeId;
  console.log("got req in LC");
  console.log(problemTypeId);


  // by using || {}, we force an empty object to be returned if the returned val is falsey, ie undefined or empty
  const problemList: Object =
    testItems.find((problemType) => problemType.pTypeId === problemTypeId) ||
    {};
  res.json( {problemList} );
  //   res.json(testItems.filter((type) => type.pTypeId === problemTypeId));
});

// export default router;

export default router;
