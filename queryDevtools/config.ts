import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd() + '/..', '');
  return {
    // vite config
    define: {
      SOCKET_URL: JSON.stringify(env.EXPO_PUBLIC_REACT_DEVTOOLS_SOCKET_URL),
    },
  };
});
