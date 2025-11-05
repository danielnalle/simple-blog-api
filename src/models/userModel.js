import * as db from "../config/db.js";

export const findUser = async (email) => {
  const result = await db.query("SELECT id FROM users WHERE email = $1", [
    email,
  ]);

  return result.rowCount;
};
