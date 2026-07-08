import { KeyRound, UserRound } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { getAuthUser } from "@/lib/auth"
import { redirect } from "next/navigation"
import NameForm from "./_components/NameForm"
import PasswordForm from "./_components/PasswordForm"
import { getInitials } from "@/utils/get-initials"

export default async function SettingsPage() {
  const authUser = await getAuthUser()

  if (!authUser) {
    redirect("/signin?unauthenticated=true")
  }

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">Account settings</h1>
        <p className="text-muted-foreground text-sm">
          Manage your profile and security preferences.
        </p>
      </div>

      <Card>
        <CardContent className="flex items-center gap-4">
          <div className="bg-primary/10 text-primary flex size-14 shrink-0 items-center justify-center rounded-full text-xl font-semibold">
            {getInitials(authUser.name)}
          </div>
          <div className="min-w-0">
            <p className="truncate text-lg font-semibold">{authUser.name}</p>
            <p className="text-muted-foreground truncate text-sm">
              {authUser.email}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserRound className="text-primary size-4" />
            Profile
          </CardTitle>
          <CardDescription>
            This is the name shown across the app.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Separator className="mb-6" />
          <NameForm defaultName={authUser.name} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <KeyRound className="text-primary size-4" />
            Password
          </CardTitle>
          <CardDescription>
            Update the password used to sign in.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Separator className="mb-6" />
          <PasswordForm />
        </CardContent>
      </Card>
    </div>
  )
}
