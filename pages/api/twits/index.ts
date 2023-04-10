import { NextApiRequest, NextApiResponse } from "next";
import withHandler from "../../../lib/server/withHandler";
import { withApiSession } from "../../../lib/server/withSession";
import db from "../../../lib/db";

async function handler(req: NextApiRequest, res: NextApiResponse) {
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

export default withApiSession(withHandler("POST", handler));
