declare namespace NodeJS {
  interface ProcessEnv {
    /**
     * The application environment.
     * Can be 'development', 'production', or 'test'.
     */
    NODE_ENV: 'development' | 'production' | 'test';

    /**
     * The port the server listens on.
     * Optional. Defaults to 3000 if not set.
     */
    PORT?: string;

    /**
     * The host the server listens on.
     * Optional. Defaults to '0.0.0.0' if not set.
     */
    HOST?: string;

    /**
     * The database host.
     */
    DB_HOST: string;

    /**
     * The database name.
     */
    DB_NAME: string;

    /**
     * The database user.
     */
    DB_USER: string;

    /**
     * The database password.
     */
    DB_PASSWORD: string;
  }
}
