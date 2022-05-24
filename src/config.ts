export const serverConfig = {
  auth: {
    url: process.env.NEXTAUTH_URL,
    secret: process.env.NEXTAUTH_SECRET
  },
  database: {
    url: process.env.DATABASE_URL
  },
  email: {
    from_email: process.env.EMAIL_FROM,
    server: {
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
      pool: true,
      maxConnections: 100,
    },
  },
  external: {
    url: process.env.EXTERNAL_URL
  },
  logger: {
    folder_path: process.env.LOG_FOLDER_PATH,
    level: process.env.LOG_LEVEL
  }
};
