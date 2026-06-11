import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UnderTeam, UnderTeamLabel } from "@/db/types/team.type";
import { UserRole, UserRoleLabels } from "@/db/types/user.type";
import { GetUserByIdService } from "@/service/user/user.service";
import { useQuery } from "@tanstack/react-query";

import {
  BookUser,
  CircleUser,
  Eye,
  Loader2,
  Mail,
  Phone,
  UsersRound,
} from "lucide-react";
import { getCountryCode } from "./get-country-code";
import ReactCountryFlag from "react-country-flag";
type ViewDetailProps = {
  id: string;
};

export function ViewDetailUserDialog({ id }: ViewDetailProps) {
  const {
    data: apiResponse,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["user", id],
    queryFn: () => GetUserByIdService(id),
  });

  if (isLoading || isFetching) {
    return (
      <section className="flex h-[50vh] flex-col items-center justify-center space-y-2">
        <Loader2 className="text-muted-foreground h-8 w-8 animate-spin" />
        <span className="text-muted-foreground text-sm">loading...</span>
      </section>
    );
  }
  const user = apiResponse;

  const displayPhoneNumber = () => {
    const phoneNumber = user?.phoneNumber;
    if (!phoneNumber) {
      return "-";
    }
    const phone = getCountryCode(phoneNumber);
    return (
      <div>
        <div className="flex items-center gap-2">
          {phone?.country && (
            <ReactCountryFlag
              countryCode={phone?.country}
              svg
              style={{
                width: "1.25rem",
                height: "1.25rem",
              }}
            />
          )}
          <span>{phone?.formatInternational()}</span>
        </div>
      </div>
    );
  };

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <div>
            <Eye className="h-4 w-4" />
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle className="font-medium text-xl">
              User Details
            </DialogTitle>
            <DialogDescription>
              View detailed information about this user.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <div className="flex gap-3">
                <CircleUser className="mt-0.5" size={14} />
                <p className="text-muted-foreground text-md">Username</p>
              </div>
              <span className="font-medium">{user?.username}</span>
            </div>
            <div>
              <div className="flex gap-3">
                <Mail className="mt-0.5" size={14} />
                <p className="text-muted-foreground text-md">Email</p>
              </div>
              <span className="font-medium">{user?.email}</span>
            </div>

            <div>
              <div className="flex gap-3">
                <UsersRound className="mt-0.5" size={14} />
                <p className="text-muted-foreground text-md">Role</p>
              </div>
              <span className="font-medium">
                {UserRoleLabels[user?.role as UserRole]}
              </span>
            </div>

            <div>
              <div className="flex gap-3">
                <BookUser className="mt-0.5" size={14} />
                <p className="text-muted-foreground text-md">Team</p>
              </div>
              <span className="font-medium">
                {UnderTeamLabel[user?.team as UnderTeam]}
              </span>
            </div>

            <div>
              <div className="flex gap-3">
                <Phone className="mt-0.5" size={14} />
                <p className="text-muted-foreground text-md">Phone Number</p>
              </div>
              <span className="font-medium">{displayPhoneNumber()}</span>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
