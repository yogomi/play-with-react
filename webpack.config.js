module.exports = {
  entry: "./src/main.jsx",
  mode: "development",
  output: {
    filename: "bundle.js"
  },
  module: {
   rules: [
     {
       test: /\.js[x]?$/,
       loader: "babel-loader",
       exclude: /node_modules/,
       options: {
         presets: [
           ["@babel/preset-env", {"modules": false}],
           "@babel/preset-react",
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
