module.exports = function override(config) {
  config.output = {
    ...config.output,
    filename: "static/js/[name].js",
    chunkFilename: "static/js/[name].chunk.js",
  };

  const miniCssExtractPlugin = config.plugins.find(
    (plugin) => plugin.constructor.name === "MiniCssExtractPlugin"
  );

  if (miniCssExtractPlugin) {
    miniCssExtractPlugin.options.filename = "static/css/[name].css";
    miniCssExtractPlugin.options.chunkFilename = "static/css/[name].chunk.css";
  }

  config.module.rules.push({
    test: /\.(png|jpe?g|gif|svg)$/i,
    use: [
      {
        loader: "file-loader",
        options: {
          name: "static/media/[name].[ext]",
          esModule: false,
        },
      },
    ],
  });

  return config;
};
