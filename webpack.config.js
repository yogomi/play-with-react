module.exports = {
  entry: "./src/main.jsx",
  output: {
    filename: "build/bundle.js"
  },
  module: {
   rules: [
     {
       test: /\.js[x]?$/,
       loader: "babel-loader",
       exclude: /node_modules/,
       options: {
         presets: [
           ["env", {"modules": false}],
           "react",
         ]
       }
     },
    ],
  },
  resolve: {
    modules: [__dirname, "node_modules"],
    extensions: [".js", ".jsx"],
  },
}
