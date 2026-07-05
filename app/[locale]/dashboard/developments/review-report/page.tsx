// import { useState } from "react";

// import { DAILY_REPORT_STATUS } from "@/db/constants/daily-report-status";
// import { ReviewDailyReportDialog } from "../(components)/review-daily-report-dailog";

// type DailyReportActionsProps = {
//   item: {
//     id: number;
//     status: string;
//   };
//   canReview: boolean;
// };

// export default function DailyReportActions({
//   item,
//   canReview,
// }: DailyReportActionsProps) {
//   const [openReview, setOpenReview] = useState(false);

//   const isPending = item.status === DAILY_REPORT_STATUS.PENDING;

//   return (
//     <>
//       <div className="flex gap-2">
//         <button className="rounded-md border px-3 py-2">View</button>

//         {canReview && isPending && (
//           <button
//             className="bg-primary text-primary-foreground rounded-md px-3 py-2"
//             onClick={() => setOpenReview(true)}
//           >
//             Review
//           </button>
//         )}
//       </div>

//       <ReviewDailyReportDialog
//         reportId={item.id}
//         open={openReview}
//         onOpenChange={setOpenReview}
//       />
//     </>
//   );
// }
