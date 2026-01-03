import { Link } from "react-router";
import { ProfileOverview } from "../../components/ProfileOverview";
import { DeleteAccountSection } from "../../components/DeleteAccountSection";
import { LogoutSection } from "../../components/LogoutSection";
import { RotateCcwKey } from "lucide-react";
export function SettingsPage() {
  return (
    <main className="w-full px-4 sm:px-12 py-4 my-6 max-w-190 mx-auto text-gray-200 transition-all duration-300 ">
      <h1 className="text-2xl tracking-tight mb-10">Settings</h1>
      <ProfileOverview />
      <section className="my-6">
        <h2 className="text-lg mb-4 tracking-tight border-b-2 border-pink-600/50">
          Account
        </h2>
        <div className="group flex items-center px-4 py-2 bg-gray-500/10 rounded hover:bg-gray-500/20">
          <Link
            className="group-hover:underline flex items-center gap-x-2"
            to="/me/settings/change-password"
          >
            <RotateCcwKey size={18} />
            <span className="text-sm">Change password</span>
          </Link>
        </div>
        <aside className="mt-6 rounded">
          <h3 className="text-lg tracking-tight mb-4 border-b-2 border-red-600/50 text-red-700">
            Danger zone
          </h3>
          <DeleteAccountSection />
          <LogoutSection />
        </aside>
      </section>
    </main>
  );
}
