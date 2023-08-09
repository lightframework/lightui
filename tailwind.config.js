module.exports = {
  content: [
    './src/pages/**/*.tsx',
    './src/components/**/*.tsx',
    './src/layouts/**/*.tsx',
  ],
  theme: {
    extend: {
      colors: {
        'lightwan-blue': '#007bff',
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
};
