const webpack = require('webpack');
const dotenv = require('dotenv');

dotenv.config(); // Load .env variables

module.exports = {
  module: {
    rules: [
      {
        test: /\.m?jsx?$/, // Match both .js and .jsx files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-react',
                {
                  runtime: 'automatic', // Enable automatic JSX runtime
                },
              ],
              '@babel/preset-env',
            ],
          },
        },
      },
      {
        test: /\.css$/, // Add this rule
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.svg$/, // Handle SVG files
        use: ['@svgr/webpack'], // Use the SVG loader
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i, // Match image file extensions
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]', // Output path and filename
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env), // Injects the environment variables
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    hot: true, // Enable HMR in the development server
  },
};
