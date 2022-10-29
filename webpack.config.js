const singleSpaDefaults = require("webpack-config-single-spa-react-ts");
const {mergeWithRules} = require("webpack-merge");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "qwangy",
    projectName: "admin",
    webpackConfigEnv,
    argv,
  });

  const config = mergeWithRules({
    module: {
      rules: {
        test: "match",
        use: "replace",
        oneOf: "replace",
        type: "replace"
      },
    },
  })(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
    devServer: {
      client: {
        overlay: false,
      },
    },
    module: {
      rules: [
        {
          test: /\.(gif)$/i,
          use: [
            {
              loader: "file-loader",
              options: {
                name: '[name].[ext]',
                outputPath: 'assets/'
              }
            }
          ]
        },
        {
          test: /\.(bmp|png|svg|jpg|jpeg|gif|webp)$/i,
          exclude: /node_modules/,
          use: [],
          oneOf: [
            {
              resourceQuery: /svgr/,
              use: [
                {
                  loader: 'babel-loader',
                },
              ],
            },
            {
              type: "asset/resource",
            }
          ]
        },
        {
          test: /\.module\.s(a|c)ss$/,
          issuer: /\.[jt]sx?$/,
          use: [ "style-loader",
            {
              loader: 'css-loader',
              options: {
                modules: {
                  localIdentName: "[folder]_[local]--[hash:base64:5]",
                },
                sourceMap: true
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              }
            }
          ]
        },
        {
          test: /\.s[ac]ss$/i,
          exclude: /\.module.(s(a|c)ss)$/,
          use: [
            // Creates `style` nodes from JS strings
            "style-loader",
            // Translates CSS into CommonJS
            "css-loader",
            // Compiles Sass to CSS
            "sass-loader",
          ],
        },
        {
          test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'fonts/'
              }
            }
          ]
        }
      ],
    },
    resolve: {
      extensions: ['.js', '.jsx', '.scss']
    },
    externals: [
      "@qwangy/styles",
        //"@mui/material",
    ]
  });

  return config;
};
