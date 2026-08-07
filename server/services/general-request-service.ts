import { getGeneralRequestSummaryRepository } from "@/server/repositories/general-request-repository";

export async function getGeneralRequestSummary() {
  return getGeneralRequestSummaryRepository();
}
