
## Demo link

You can click [here](http://audio.dethoima.com/album/merry-christmas) to listen my  public album 

## Introduce

This's a website to manage users's albums, song, links which implemented by Nodejs, Mongodb, Angularjs

### Features
- Manage album ( custom background, tags, public or private, cover )
- Manage songs ( download, display emotion, add song to current playlist, sortable )
- Mail functionalities such as send mail for active account, forgot password.
- User can change avatar, theme, background, personal information

## Requirement

Make sure you installed nodejs and mongdb. Next, you should intall below addiontional modules

### System


Install imagemagic to process image

```
apt-get install imagemagick
```

### Nodejs package

Run below command to install all dependencies packages which are defined in package.json

```
npm install
```

### Install supervisor ( optional if you need debug code )

You should install this module as global package

```
sudo npm install supervisor -g
```

### Install forever

This package keep your nodejs alway run, it will automatic restart nodejs instance if your application is crashed, so it's good for production site.

```
sudo npm install forever -g
```

## Example data
I dumped to to dump folder, so if you need dump data, let restore it by cd to dump folder and run below command

```
mongorestore music_app
```

You can try login with below account:

**username :** bvtuan

**password :** foo_bar

## Working on nginx

*Create short link*

```
ln -s /home/geek/Desktop/GITHUB/Global-music/Nginx_conf/server_audio.dethoima.com /etc/nginx/sites-enabled
```

*Restart nginx*

```
sudo service nginx restart
```

### Reference links

```
http://expressjs.com/faq.html#custom-template-engines
https://github.com/expressjs/body-parser
http://stackoverflow.com/questions/9198310/how-to-set-node-env-to-production-development-in-os-x
http://expressjs.com/4x/api.html
https://github.com/sahilsk/Dashboard-Extended/blob/master/app.js.bak
https://github.com/expressjs/csurf
https://www.npmjs.org/package/tmp
https://github.com/chriso/validator.js
http://runnable.com/U0tEnHwraXYyp-JG/simple-usage-of-express-session-and-cookie-parser-with-express-for-node-js
```