import { auth } from "@/lib/auth";
import { TopBar } from "@/components/TopBar";
import { SearchContent } from "./SearchContent";

export default async function SearchPage() {
  const session = await auth();

  return (
    <>
      <TopBar
        title="Search Stocks"
        userName={session?.user?.name}
        userEmail={session?.user?.email}
      />
      <SearchContent />
    </>
  );
}
