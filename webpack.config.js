const HtmlPlugiin = require('html-webpack-plugin')
/**
 * @type {import('webpack').Configuration}
 */
module.exports = {
  mode: 'development',
  module: {
    rules: [
      {
        test: /.png$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlPlugiin({
      template: './index.html'
    }),
  ]
}