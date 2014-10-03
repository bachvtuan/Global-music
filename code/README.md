### Reference links

```
http://expressjs.com/faq.html#custom-template-engines
https://github.com/expressjs/body-parser
http://stackoverflow.com/questions/9198310/how-to-set-node-env-to-production-development-in-os-x
http://expressjs.com/4x/api.html
https://github.com/sahilsk/Dashboard-Extended/blob/master/app.js.bak
```

### Install nodejs package
Run below command to install all dependencies packages which are defined in package.json
```
npm install
```
### Install supervisor

You should install this module as global package
```
sudo npm install supervisor -g
```

### Install forever
This package keep your nodejs alway run, it will automatic restart nodejs instance if your application is crashed
```
sudo npm install forever -g
```
### Working on nginx

Create short link
```
ln -s /home/bvtuan/Desktop/Bitbucket/download-mobile-app/taiungdungmobile.vn.conf /etc/nginx/sites-enabled
```
Restart nginx
```
sudo service nginx restart
```
