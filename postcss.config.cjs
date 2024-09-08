module.exports = {
  syntax: 'postcss-scss',
  plugins: [
    require("postcss-import"),
    require('postcss-preset-env'),
    require('autoprefixer')({
      overrideBrowserslist: [
        'last 10 Chrome versions',
        'last 10 Firefox versions',
        'last 10 Safari versions',
        'ie >= 11', // Add support for IE 11 and above
      ],
      grid: true, // Enable grid prefixes for IE
    }),
    require('cssnano')({
      preset: 'default',
    }),
  ],
}
