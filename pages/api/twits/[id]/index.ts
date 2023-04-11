import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "../../../../lib/server/withSession";
import withHandler from "../../../../lib/server/withHandler";
import db from "../../../../lib/db";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
    session: { user },
  } = req;
  console.log(id, user);
  const twit = await db.twit.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      user: {
        select: {
          id: true,
          userId: true,
        },
      },
    },
  });
  const isLiked = Boolean(
    await db.fav.findFirst({
      where: {
        twitId: twit?.id,
        userId: user?.id,
      },
      select: {
        id: true,
      },
    })
  );
  console.log(twit, isLiked);
  res.json({ ok: true, twit, isLiked });
}

export default withApiSession(withHandler({ methods: ["GET"], handler }));
