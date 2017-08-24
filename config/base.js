var path = require('path')

var dataMap = {
  copyList: [
    {'from': path.join(path.resolve(__dirname), '../node_modules', 'jquery/dist/jquery.min.js'), to: 'static/js/'},
    {'from': path.join(path.resolve(__dirname), '../node_modules', 'jquery/dist/jquery.min.map'), to: 'static/js/'},
    {'from': path.join(path.resolve(__dirname), '../public', 'v2.min.css'), to: 'static/css/'},
    {'from': path.join(path.resolve(__dirname), '../public', 'v2.min.css.map'), to: 'static/css/'},
    {'from': path.join(path.resolve(__dirname), '../public', 'font/dhmsicon.eot'), to: 'static/font/'},
    {'from': path.join(path.resolve(__dirname), '../public', 'font/dhmsicon.svg'), to: 'static/font/'},
    {'from': path.join(path.resolve(__dirname), '../public', 'font/dhmsicon.ttf'), to: 'static/font/'},
    {'from': path.join(path.resolve(__dirname), '../public', 'font/dhmsicon.woff'), to: 'static/font/'}
  ],
  dev: {
    apiUrl: ''
  },
  prod: {
    apiUrl: ''
  }
}

module.exports = dataMap
