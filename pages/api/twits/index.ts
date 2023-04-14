import { NextApiRequest, NextApiResponse } from "next";
import withHandler from "../../../lib/server/withHandler";
import { withApiSession } from "../../../lib/server/withSession";
import db from "../../../lib/db";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const twit = await db.twit.findMany({
      include: {
        user: {
          select: {
            userId: true
          }
        },
        Fav: true,
      },
    });
    res.json({
      ok: true,
      twit,
    });
  }
  if (req.method === "POST") {
    const {
      body: { title, description },
      session: { user },
    } = req;
    console.log(title, description, user);
    const twit = await db.twit.create({
      data: {
        title,
        description,
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });
    console.log(twit);
    res.json({
      ok: true,
      twit,
    });
  }
}

export default withApiSession(
  withHandler({ methods: ["POST", "GET"], handler })
);
