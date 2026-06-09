import { eq } from "drizzle-orm";

import { db } from "@/db";
import { usersTable } from "@/db/schema";

export async function getUserById(id: string) {
  return db.query.usersTable.findFirst({
    where: eq(usersTable.id, id),
  });
}
