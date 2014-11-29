
## Demo link

You can click [here](http://audio.dethoima.com/album/merry-christmas) to listen to my  public album

## Introduce

This's a website to manage yours albums, songs, bookmark which implemented by Nodejs, Mongodb, Angularjs

### Features

- Manage album ( custom background, tags, public or private, cover )
- Manage songs ( download, display emotion, add song to current playlist, sortable )
- Mail functionalities such as send mail for active account, forgot password.
- User can change avatar, theme, background, personal information
- Flexible music player, You can pause, adjust volume, change to next or previous song, display song list.
- It also offer to you save your favorite external albums.

## Requirement

Make sure you installed nodejs and mongdb. Next, you intall below additional modules

### System


Install imagemagic to process image

```
apt-get install imagemagick
```

### Nodejs packages

Run below command to install all dependency packages which are defined in package.json

```
npm install
```

### Install supervisor ( optional if you need debug code )

You should install this module as global package

```
sudo npm install supervisor -g
```

### Install forever

This package keep nodejs instance alway run, it will automatic restart nodejs instance if your application is crashed, so it's good for production site.

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

## Config file

There are 2 config files on configs folder. 
if you want to try on localhost, try *config_local.json* by cd to folder "configs" and run below command

```
ln -s config_local.json config.json
```

if you want to run on the real domain, try *config_production.json* by cd to folder "configs" and run below command
```
ln -s config_production.json config.json
```

**Note** 

You can edit config file to appropriate with your case such as change "smtp_host" , "smtp_port", "admin_email", etc.

### Run
if you define port in config.json( which created from above section ) is 3000. Just run below command

```
nodejs run.js
```

and visit [http://localhost:3000](http://localhost:3000)

## Working on nginx

*Create short link* to /etc/nginx/sites-enabled

```
ln -s /your/nginx/configuration/file /etc/nginx/sites-enabled
```

Example 

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