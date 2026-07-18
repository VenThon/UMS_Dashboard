import { db } from "@/db";
import { requestLeaveTable } from "@/db/schema";

import { and, eq } from "drizzle-orm";

type GetRequestLeaveByIdParams = {
  id: string;
  userId: string;
};

export async function getRequestLeaveByIdService({
  id,
  userId,
}: GetRequestLeaveByIdParams) {
  const requestLeave = await db.query.requestLeaveTable.findFirst({
    where: and(
      eq(requestLeaveTable.id, id),
      eq(requestLeaveTable.userId, userId),
    ),
  });

  if (!requestLeave) {
    throw new Error(
      "Leave request not found, or you do not have permission to view it.",
    );
  }

  return requestLeave;
}
