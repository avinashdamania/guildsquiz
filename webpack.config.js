const path = require('path');
var nodeExternals = require('webpack-node-externals');

const serverConfig = {
    mode: process.env.NODE_ENV || 'development',
    entry: './src/server/index.ts',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {
                    configFile: 'tsconfig.server.json'
                }
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        filename: 'server.js',
        path: path.resolve(__dirname, 'dist')
    },
    target: 'node',
    node: {
        __dirname: false
    },
    externals: [nodeExternals()],
    
};

const clientConfig = {
    mode: process.env.NODE_ENV || 'development',
    entry: './src/client/index.tsx',
    devtool: 'inline-source-map',
    module: {
      rules: [
        {
            test: /\.tsx?$/,
            loader: 'ts-loader',
            exclude: /node_modules/,
            options: {
                configFile: 'tsconfig.client.json'
            }
        },
        {
            test: /(\.scss|\.css)/,
            use: [
                'style-loader',
                'css-loader',
                //'sass-loader',
            ]
        },
        {
            test: /\.(png|jpe?g|gif|woff|woff2|eot|ttf|svg)$/,
            use: [
              {
                loader: 'url-loader',
                options: {},
              },
            ],
        },
      ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.css', '.scss', '.png']
    },
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'public/js')
    },
    stats: {
        colors: true,
        modules: true,
        reasons: true,
        errorDetails: true
    }
};

module.exports = [serverConfig, clientConfig];