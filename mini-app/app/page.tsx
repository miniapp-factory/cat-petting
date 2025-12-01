import { description, title } from "@/lib/metadata";
import { generateMetadata } from "@/lib/farcaster-embed";

export { generateMetadata };

import CatPet from "@/components/cat-pet";

export default function Home() {
  // NEVER write anything here, only use this page to import components
  return <CatPet />;
}
