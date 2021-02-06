const path = require('path')

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    node: { fs: 'empty' },
  })
}
