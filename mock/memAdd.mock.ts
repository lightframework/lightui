// @ts-ignore
import { Request, Response } from 'express';

export default {
  'POST sys/v1/roles/:id/users': (req: Request, res: Response) => {
    res.status(200).send({ result: '农至只且同示进带动通六向义计些业共。' });
  },
  'POST sys/v1/teams/:id/users': (req: Request, res: Response) => {
    res.status(200).send({ result: '期派身话区然着平百更院龙志明明。' });
  },
};
