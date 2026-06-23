import { db } from "@/db";
import { usersTable } from "@/db/schema";

import { eq } from "drizzle-orm";

export async function getUserById(id: string) {
  return db.query.usersTable.findFirst({
    where: eq(usersTable.id, id),
  });
}
