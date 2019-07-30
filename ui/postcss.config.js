const purgecss = require('@fullhuman/postcss-purgecss')({
  // Specify the paths to all of the template files in your project
  content: [
    './src/**/*.html',
    './src/**/*.vue',
    './src/**/*.jsx',
    // etc.
  ],

  // Include any special characters you're using in this regular expression
  defaultExtractor: (content) => content.match(/[A-Za-z0-9-_:/]+/g) || [],
});

const cssnano = require('cssnano')({ preset: 'default' });

module.exports = {
  plugins: [
    require('postcss-import')({
      plugins: [require('stylelint')],
    }),
    require('tailwindcss'),
    require('postcss-nested'),
    require('autoprefixer'),
    ...(process.env.NODE_ENV === 'production' ? [purgecss, cssnano] : []),
  ],
};
