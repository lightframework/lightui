// @ts-ignore
import { Request, Response } from 'express';

export default {
  'POST sys/v1/roles/': (req: Request, res: Response) => {
    res.status(200).send({ id: 92, name: '萧平', info: '日全第写发构断电已它革示须号际收义省。' });
  },
  'POST sys/v1/teams/': (req: Request, res: Response) => {
    res.status(200).send({ id: 76, name: '曾芳', info: '种计历局应验行龙维受二选合委。' });
  },
  'POST sys/v1/users/': (req: Request, res: Response) => {
    res.status(200).send({
      id: 65,
      username: 'Robinson',
      nickname: '姚强',
      mobile: '验业回选低到目向代地克么。',
      email: 'h.pxmskqy@xwww.tv',
      avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
      info: '干百你三口学段计识证为力求空美。',
    });
  },
};
