'use strict'

/*var services = {
   bmCinema: 'https://api.douban.com/v2/movie/us_box',
   hotCinema: 'https://api.douban.com/v2/movie/in_theaters',
   topCinema: 'https://api.douban.com/v2/movie/top250',
   soonCinema: 'https://api.douban.com/v2/movie/coming_soon',
}*/
var services = {
   bmCinema: 'http://192.168.2.246:8080/angularTest/www/json/bmCinema.json',
   hotCinema: 'http://192.168.2.246:8080/angularTest/www/json/hotCinema.json',
   topCinema: 'http://192.168.2.246:8080/angularTest/www/json/topCinema.json',
   soonCinema: 'http://192.168.2.246:8080/angularTest/www/json/soonCinema.json',
   detailCinema: 'http://192.168.2.246:8080/angularTest/www/json/',
}

module.exports = services;
