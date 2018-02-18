/* eslint-disable no-console */
import webpack from 'webpack';
import webpackConfig from '../webpack.config.prod';
import chalk from 'chalk';

process.env.NODE_ENV='production';

console.log(chalk.blue('Generating minified bundle for production. This can take a moment'));


webpack(webpackConfig).run((err, stats)=>{
  if(err){
    console.log(chalk.red(err));
    return 1;
  }

  const statsJson = stats.toJson();

  if(statsJson.hasErrors){
    return statsJson.errors.map(error => console.log(chalk.red(error)));
  }

  if(statsJson.hasWarnings){
    console.log(chalk.yellow('Webpack generated the following warnings:'));
    return statsJson.warnings.map(warning => (console.log(chalk.yellow(warning))));
  }
  console.log(chalk.green('Your apptcation is build for production and saved in /dist'));

  return 0;
});
