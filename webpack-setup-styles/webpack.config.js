const mode =
  process.env.NODE_ENV === 'production' ? 'production' : 'development';

module.exports = {
  mode: mode,
  module: {
    rules: [
      {
        test: /\.scss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
};
