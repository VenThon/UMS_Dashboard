import { getRequestLeaveSummaryRepository } from "../repositories/leave-request-repository";

export async function getRequestLeaveSummary() {
  return getRequestLeaveSummaryRepository();
}
