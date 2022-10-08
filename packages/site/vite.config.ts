import { sveltekit } from '@sveltejs/kit/vite';
import autoImport from 'sveltekit-autoimport';
import type { UserConfig } from 'vite';

const config: UserConfig = {
	plugins: [
    autoImport({
      components: [
        { name: './src/lib/components/ui', prefix: 'ui' },
        { name: './src/lib/components/util', prefix: 'util' },
      ],
    }),
    sveltekit()],
  server: {
    fs: {
      allow: ['..']
    }
  }
};

export default config;
