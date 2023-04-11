import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../lib/db";
import withHandler from "../../../lib/server/withHandler";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId, password } = req.body;
  console.log("userId:", userId, "password:", password);
  const foundUser = await db.user.findUnique({
    where: {
      userId,
    },
  });
  console.log(foundUser);
  if (foundUser) return res.status(405).json({ ok: false });
  const user = await db.user.create({
    data: {
      userId,
      password,
    },
  });
  console.log(user);
  return res.json({
    ok: true,
  });
}

export default withHandler({ methods: ["POST"], handler, isPrivate: false });
