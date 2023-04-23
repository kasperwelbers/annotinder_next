//import dynamic from "next/dynamic";
import { type NextPage } from "next";
import { useUser } from "~/lib/context/middlecat";
import Menu from "~/lib/components/Menu/Menu";

const Home: NextPage = () => {
  const { user } = useUser({ authRequired: false });

  return (
    <main>
      <Menu back />
    </main>
  );
};

export default Home;
