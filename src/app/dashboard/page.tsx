import { auth } from "@/auth";
import { WidgetItem } from "@/components/dashboard/WidgetItem";
import { redirect } from "next/navigation";

export default async function DashboardPage() {

  const session = await auth();
  console.log(session);

  if (! session){
    redirect('/api/auth/signin')
  }
  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">


      {
        <WidgetItem title="Usuario Conectado S-Side">
         <div className="flex flex-col">
          <span>{ session.user?.name }</span>
          <span>{ session.user?.image }</span>
          <span>{ session.user?.email }</span>
          <span>{ JSON.stringify(session.user)}</span>
         </div>
        </WidgetItem>
      }
      

    </div>
  );
}