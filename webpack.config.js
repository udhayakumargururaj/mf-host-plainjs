const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  devServer: {
    port: 3000,
    contentBase: path.join(__dirname, 'dist'),
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'host', // Name of the host application
      filename: 'remoteEntry.js',
      remotes: {
        remoteApp: 'remoteApp@http://localhost:3001/remoteEntry.js', // Name and URL of the remote application
      },
      shared: {
        react: { singleton: true,requiredVersion: '^17.0.2' },
        'react-dom': { singleton: true,requiredVersion: '^17.0.2' },
      },
    }),
  ],
};
