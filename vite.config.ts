import react from '@vitejs/plugin-react-swc'
import path from 'path'
import stringHash from 'string-hash'
import { defineConfig, loadEnv } from 'vite'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  return {
    plugins: [
      react(),
      svgr({
        svgrOptions: {
          exportType: 'default',
          ref: true,
          svgo: true,
          titleProp: true,
          plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx'],
        },
        include: '**/*.svg',
      }),
    ],
    server: {
      port: Number(env.VITE_PORT) || 3146,
      allowedHosts: ['mauvanban.aivos.tech', 'aibieumau.com'],
      strictPort: true,
      open: true, // auto open default browser
    },
    preview: {
      port: Number(env.VITE_PORT) || 3146,
    },
    resolve: {
      alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
    },
    css: {
      modules: {
        localsConvention: 'camelCase',
        generateScopedName: (name, filename, css) => {
          if (name === 'dark') return name
          const i = css.indexOf(`.${name}`)
          const lineNumber = css.substring(0, i).split(/[\r\n]/).length
          const hash = stringHash(filename).toString(36).substring(0, 5)
          return mode === 'production' ? `aivos_${hash}_${lineNumber}` : `${name}__${hash}_${lineNumber}`
        },
      },
    },
  }
})
