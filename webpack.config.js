const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";

  return {
    mode: isProduction ? "production" : "development",
    entry: path.resolve(__dirname, "src", "index.tsx"), // 어디서부터 번들링을 시작할지 정해줌(즉, 프로젝트가 시작되는 파일을 지정)
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
    },
    module: {
      // 모듈 번들링을 할 때 어떤 규칙을 써서 할건지 정의(다양한 파일 형식을 처리하기 위해 규칙을 정함)
      rules: [
        {
          test: /\.css$/i, // .css로 끝나는 파일은 모두 다 아래의 로더로 번들링 해줘라
          use: ["style-loader", "css-loader"], // css 파일 처리
        },
        {
          test: /\.svg$/,
          use: [
            {
              loader: "@svgr/webpack",
              options: {
                icon: true,
              },
            },
            {
              loader: "file-loader",
              options: {
                name: "[name].[ext]?ver=[hash]",
                outputPath: "images",
              },
            },
          ],
        },
        {
          test: /\.(png|jpg|gif|jpeg)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[name].[ext]?ver=[hash]",
                outputPath: "images",
              },
            },
          ],
        },
        {
          test: /\.(ts|js)x?$/, // .tsx 또는 .jsx 파일을 babel-loader를 통해 변환
          exclude: /node_modules/,
          use: [
            {
              loader: "babel-loader", // 자바스크립트와 타입스크립트 변환
            },
          ],
        },
      ],
    },
    output: {
      // 번들링된 파일이 저장될 위치와 이름을 지정
      path: path.resolve(__dirname, "dist"),
      chunkFilename: "[name].js?ver=[hash]",
      filename: "[name].js?ver=[hash]",
      publicPath: "/",
    },
    devtool: isProduction ? "source-map" : "inline-source-map",
    devServer: {
      port: 3001, // 포트 설정
      open: true,
      hot: true,
      historyApiFallback: true,
    },
    optimization: {
      minimize: isProduction, // 프로덕션 모드에서만 코드 압축
    },
    plugins: [
      // 빌드 프로세스를 도와주는 플러그인
      new CleanWebpackPlugin(), // 이전 빌드 파일 삭제
      new HtmlWebpackPlugin({
        // HTML 파일 생성하고, 번들링된 자바스크립트를 자동으로 포함시킵니다.
        template: path.resolve(__dirname, "src", "index.html"), // src 밑의 index.html부터 번들링을 시작하겠다인데, src에는 index.html이 없음 -> 그래서 만들어줘야함.
      }),
      new Dotenv({
        // 환경 변수 파일 로드
        allowEmptyValues: true,
        systemvars: true,
      }),
      new CopyWebpackPlugin({
        patterns: [
          { from: "public/manifest.json", to: "manifest.json" },
          { from: "public/favicon.ico", to: "favicon.ico" },
          { from: "public/_redirects", to: "" },
        ],
      }),
    ],
  };
};
