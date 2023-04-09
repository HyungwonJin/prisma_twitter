import { NextApiRequest, NextApiResponse } from "next";
import withHandler from "../../../lib/server/withHandler";
import db from "../../../lib/db";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId, password } = req.body;
  const foundUser = await db.user.findUnique({
    where: {
      userId,
    },
  });
  console.log(foundUser);
  if (!foundUser) return res.status(404).end();
  if (password === foundUser?.password) {
    return res.json({ ok: true });
  } else if (password !== foundUser?.password) {
    return res.status(404).end();
  }
}

export default withHandler("POST", handler);
