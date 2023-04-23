import { useState } from "react";
import { type AppType } from "next/dist/shared/lib/utils";
import { MiddlecatWrapper, useUser } from "~/lib/context/middlecat";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import GlobalStyle from "~/lib/styled/GlobalStyle";

import { useRouter } from "next/router";
import { ResponsiveContainer } from "~/lib";

const MyApp: AppType = ({ Component, pageProps }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <>
      <GlobalStyle />
      <QueryClientProvider client={queryClient}>
        <MiddlecatWrapper bff="/api/middlecatBff">
          <ResponsiveContainer>
            <Component {...pageProps} />
          </ResponsiveContainer>
        </MiddlecatWrapper>
      </QueryClientProvider>
    </>
  );
};

export default MyApp;
