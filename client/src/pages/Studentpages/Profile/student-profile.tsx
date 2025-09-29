import { ProfileHeader } from "@/pages/Studentpages/Profile/profile-header"
import { PersonalInformation } from "@/pages/Studentpages/Profile/personal-information"
import { AcademicDetails } from "@/pages/Studentpages/Profile/academic-details"
// import { AccountSettings } from "../../components/profile/account-settings"
// import { NotificationPreferences } from "../../components/profile/notification-preferences"

export default function Profile() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Profile</h1>
        <p className="text-muted-foreground">
          Manage your personal information, academic details, and account settings.
        </p>
      </div>

      <ProfileHeader />

      <div className="grid gap-6 lg:grid-cols-2">
        <PersonalInformation />
        <AcademicDetails />
      </div>

      {/* <div className="grid gap-6 lg:grid-cols-2">
        <AccountSettings />
        <NotificationPreferences />
      </div> */}
    </div>
  )
}
