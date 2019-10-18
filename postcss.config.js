const IN_PRODUCTION = process.env.NODE_ENV === 'production'
const whitelister = require('purgecss-whitelister')

module.exports = {
  plugins: [
    require('tailwindcss')('tailwind.js'),
    IN_PRODUCTION &&
      require('@fullhuman/postcss-purgecss')({
        content: [`./public/**/*.html`, `./src/**/*.vue`],
        defaultExtractor(content) {
          const contentWithoutStyleBlocks = content.replace(
            /<style[^]+?<\/style>/gi,
            ''
          )
          return (
            contentWithoutStyleBlocks.match(
              /[A-Za-z0-9-_/:]*[A-Za-z0-9-_/]+/g
            ) || []
          )
        },
        whitelist: [
          ...whitelister('node_modules/tailwindcss/dist/base.min.css'),
        ],
        whitelistPatterns: [
          /-(leave|enter|appear)(|-(to|from|active))$/,
          /^(?!(|.*?:)cursor-move).+-move$/,
          /^router-link(|-exact)-active$/,
          /^navigation--tab$/,
        ],
      }),
    require('autoprefixer')(),
  ],
}
