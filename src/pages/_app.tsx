import { Provider as AuthProvider } from "next-auth/client";
import type { AppProps } from "next/app";

import { storeWrapper } from "stores";

import "styles/globals.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider session={pageProps.session}>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default storeWrapper.withRedux(MyApp);
