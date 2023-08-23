import express, { Express, Request, Response } from "express";


const router = express.Router();

router.get("/:pTypeId", (req: Request, res: Response, next) => {

    //   res.json(testItems.filter((type) => type.pTypeId === problemTypeId));
  });
  
  // export default router;
  
  export default router;
  