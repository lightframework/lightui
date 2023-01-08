// @ts-ignore
import { Request, Response } from 'express';

export default {
  'GET sys/v1/users/current': (req: Request, res: Response) => {
    res.status(200).send({
      username: 'Johnson',
      nickname: '叶娜',
      avatar: 'https://avatars1.githubusercontent.com/u/8186664?s=40&v=4',
      mobile: '物千由整体属整影往较离第提记质。',
      email: 'u.qbnbk@flxjyq.中国互联.公司',
      info: '或往六眼心增开条界转油较前收了做。',
    });
  },
};
