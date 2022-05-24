import Head from "next/head";
import Image from "next/image";

import Counter from "components/Counter";
import Layout from "components/common/Layout";
import styles from "styles/index.module.scss";
import LogoIcon from "statics/images/logo.svg";

export default function Index() {
  return (
    <Layout>
      <div className={styles.container}>
        <div className="flex flex-col items-center">
          <Counter/>
        </div>

        <Head>
          <title>Next App Starter</title>
          <link rel="icon" href="/favicon.ico"/>
        </Head>

        <main className={styles.main}>
          <h1 className={`${styles.title} mt-10`}>
            Welcome to Next.js App Starter!
          </h1>

          <p className={styles.description}>
            Get started by editing{" "}
            <code className={styles.code}>pages/index.tsx</code>
          </p>

          <div className={styles.grid}>
            <a
              href="https://nextjs.org/docs"
              className={styles.card}
            >
              <h3>NextJS &rarr;</h3>
              <p>
                Find in-depth information about Next.js features
                and API.
              </p>
            </a>

            <a
              href="https://next-auth.js.org/v3/getting-started/introduction"
              className={styles.card}
            >
              <h3>NextAuth.js</h3>
              <p>Authentication for Next.js</p>
            </a>

            <a
              href="https://mui.com/"
              className={styles.card}
            >
              <h3>Material UI</h3>
              <p>
                Move faster with intuitive React UI tools
              </p>
            </a>

            <a
              href="https://tailwindcss.com/"
              className={styles.card}
            >
              <h3>Tailwind CSS</h3>
              <p>
                Rapidly build modern websites without ever
                leaving your HTML.
              </p>
            </a>

            <a
              href="https://redux-toolkit.js.org/"
              className={styles.card}
            >
              <h3>Redux Toolkit</h3>
              <p>
                State management
              </p>
            </a>

            <a
              href="https://www.react-hook-form.com/"
              className={styles.card}
            >
              <h3>React Hook Form</h3>
              <p>
                Performance, flexible and extensible forms with
                easy-to-use validation.
              </p>
            </a>

            <a
              href="https://github.com/jquense/yup/"
              className={styles.card}
            >
              <h3>Yup</h3>
              <p>Yup is a schema builder for runtime value parsing and validation</p>
            </a>

            <a
              href="https://testing-library.com/"
              className={styles.card}
            >
              <h3>React Testing Library</h3>
              <p>
                Simple and complete testing utilities that
                encourage good testing practices .
              </p>
            </a>

            <a
              href="https://www.prisma.io/"
              className={styles.card}
            >
              <h3>Prisma</h3>
              <p>
                Next-generation ORM for Node.js and TypeScript
              </p>
            </a>
          </div>
        </main>

        <footer className={styles.footer}>
          <a
            href="https://github.com/phieudu241/next-app-starter/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by
            <Image
              src={LogoIcon}
              alt="Logo"
              width={40}
              height={40}
              className={styles.logo}
            />
          </a>
        </footer>
      </div>
    </Layout>
  );
}
