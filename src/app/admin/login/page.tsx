import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/cms/session";
import { LoginForm } from "@/components/admin/LoginForm";
import { AdminLogo } from "@/components/admin/AdminLogo";

export default async function AdminLoginPage() {
  if (!process.env.CMS_SECRET) {
    return (
      <div className="mx-auto flex min-h-screen max-w-lg flex-col justify-center px-8">
        <div className="flex justify-center">
          <AdminLogo size={12} />
        </div>
        <h1 className="mt-6 text-center font-newsreader text-2xl text-white-shadow">
          Content admin is not configured
        </h1>
        <p className="mt-3 text-center text-sm leading-relaxed text-white/55">
          Add <code className="rounded bg-white/10 px-1 text-xs">CMS_SECRET</code> to your
          environment and restart the app.
        </p>
      </div>
    );
  }
  if (await isAdminAuthenticated()) {
    redirect("/admin");
  }
  return <LoginForm />;
}
