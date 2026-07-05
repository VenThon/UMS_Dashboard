// "use client";

// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useReviewDailyReport } from "@/hooks/report/use-daily-report";
// import {
//   ReviewDailyReportFormValues,
//   reviewDailyReportSchema,
// } from "@/db/schema/daily-report-review";
// import { REVIEW_REPORT_STATUS } from "@/db/constants/daily-report-status";

// type ReviewDailyReportDialogProps = {
//   reportId: number;
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
// };

// export function ReviewDailyReportDialog({
//   reportId,
//   open,
//   onOpenChange,
// }: ReviewDailyReportDialogProps) {
//   const reviewDailyReport = useReviewDailyReport();

//   const form = useForm<ReviewDailyReportFormValues>({
//     resolver: zodResolver(reviewDailyReportSchema),
//     defaultValues: {
//       status: REVIEW_REPORT_STATUS.APPROVED,
//       comment: "",
//     },
//   });

//   function onSubmit(values: ReviewDailyReportFormValues) {
//     reviewDailyReport.mutate(
//       {
//         id: reportId,
//         values,
//       },
//       {
//         onSuccess: () => {
//           form.reset();
//           onOpenChange(false);
//         },
//       },
//     );
//   }

//   if (!open) return null;

//   return (
//     <div className="bg-background rounded-lg border p-4 shadow-sm">
//       <h2 className="text-lg font-semibold">Review Daily Report</h2>
//       <p className="text-muted-foreground text-sm">
//         Approve or reject this daily report.
//       </p>

//       <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 space-y-4">
//         <div className="space-y-2">
//           <label>Status</label>

//           <select
//             {...form.register("status")}
//             className="w-full rounded-md border px-3 py-2"
//           >
//             <option value={REVIEW_REPORT_STATUS.APPROVED}>Approved</option>
//             <option value={REVIEW_REPORT_STATUS.REJECTED}>Rejected</option>
//           </select>

//           {form.formState.errors.status && (
//             <p className="text-sm text-red-500">
//               {form.formState.errors.status.message}
//             </p>
//           )}
//         </div>

//         <div className="space-y-2">
//           <label>Comment</label>

//           <textarea
//             {...form.register("comment")}
//             className="min-h-24 w-full rounded-md border px-3 py-2"
//             placeholder="Write review comment..."
//           />

//           {form.formState.errors.comment && (
//             <p className="text-sm text-red-500">
//               {form.formState.errors.comment.message}
//             </p>
//           )}
//         </div>

//         <div className="flex justify-end gap-2">
//           <button
//             type="button"
//             onClick={() => onOpenChange(false)}
//             className="rounded-md border px-4 py-2"
//           >
//             Cancel
//           </button>

//           <button
//             type="submit"
//             disabled={reviewDailyReport.isPending}
//             className="bg-primary text-primary-foreground rounded-md px-4 py-2"
//           >
//             {reviewDailyReport.isPending ? "Reviewing..." : "Submit Review"}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }
