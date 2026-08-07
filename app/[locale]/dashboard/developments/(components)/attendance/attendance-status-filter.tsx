import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ATTENDANCE_STATUSES,
  ATTENDANCE_STATUS_LABELS,
  type AttendanceStatus,
} from "@/db/constants/attendance";

type AttendanceStatusFilterProps = {
  value?: AttendanceStatus;
  onValueChange: (value: AttendanceStatus | undefined) => void;
};

export function AttendanceStatusFilter({
  value,
  onValueChange,
}: AttendanceStatusFilterProps) {
  return (
    <Select
      value={value ?? "ALL"}
      onValueChange={(selectedValue) => {
        onValueChange(
          selectedValue === "ALL"
            ? undefined
            : (selectedValue as AttendanceStatus),
        );
      }}
    >
      <SelectTrigger className="w-full sm:w-50">
        <SelectValue placeholder="Filter by status" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="ALL">All statuses</SelectItem>

        {Object.values(ATTENDANCE_STATUSES).map((status) => (
          <SelectItem key={status} value={status}>
            {ATTENDANCE_STATUS_LABELS[status]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
