// @ts-ignore
import { Request, Response } from 'express';

export default {
  'DELETE sys/v1/roles/:id/users': (req: Request, res: Response) => {
    res.status(200).send({ result: '把音年根市这处适内第示变改四型消及。' });
  },
  'DELETE sys/v1/teams/:id/users': (req: Request, res: Response) => {
    res.status(200).send({ result: '际风作号太话大北进持干青提。' });
  },
};
