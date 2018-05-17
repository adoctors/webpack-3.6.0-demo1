const path=require('path');
const webpack=require('webpack');
const uglify=require('uglifyjs-webpack-plugin');
const htmlPlugin=require('html-webpack-plugin');
const extractTextPlugin=require('extract-text-webpack-plugin');
module.exports={
	entry:{
		main:'./src/main.js',

	},
	output:{
		path:path.resolve(__dirname,'dist'),
		filename:'[name].js'
	},
	module:{
		rules:[
			{
				test:/\.css$/,
				// loader:['style-loader','css-loader']
				use:extractTextPlugin.extract({
					fallback:'style-loader',
					use:'css-loader'
				})
			}
		]
	},
	plugins:[
		// new uglify(),
		new htmlPlugin({
			minify:{
				removeAttributeQuotes:true
			},
			hash:true,
			template:'./src/index.html'
		}),
		new extractTextPlugin('css/index.css'),
		new webpack.BannerPlugin({banner:'adoctors版权所有,如有问题请联系qkeliang@163.com'})
	],
	devServer:{
		contentBase:path.resolve(__dirname,'dist'),
		host:'192.168.1.122',
		compress:true,
		port:7000

	},
	watchOptions:{
		poll:1000,
		aggregateTimeout:500,
		ignored:/node_modules/
	}
}