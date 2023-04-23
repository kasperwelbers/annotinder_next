//import dynamic from "next/dynamic";
import { type NextPage } from "next";
import Head from "next/head";
import { useUser } from "~/lib/context/middlecat";
import Menu, { MenuLink } from "~/lib/components/Menu/Menu";
import ManageJobs from "~/lib/components/AnnotatorClient/components/ManageJobs";

// const AnnotatorPythonClient = dynamic(
//   () => import("~/lib/components/AnnotatorClient/AnnotatorPythonClient"),
//   { ssr: false }
// );

const Home: NextPage = () => {
  const { user } = useUser({ authRequired: false });

  return (
    <>
      <Head>
        <title>AnnoTinder</title>
        <meta name="description" content="AnnoTinder" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Menu>
          <MenuLink label="Code" route="/" />
          <MenuLink label="Manage jobs" route="/job" active />
          <MenuLink label="Demos" route="/demo" />
        </Menu>

        <ManageJobs user={user} />
      </main>
    </>
  );
};

export default Home;
