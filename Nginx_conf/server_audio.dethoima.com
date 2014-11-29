# Run on audio.dethoima.com
server {
  listen 80;

  server_name audio.dethoima.com;

  location / {
    #Production site run on port 3000
    proxy_pass http://localhost:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }

  location /frontend {
    alias /var/www/music-global/code/app/public/frontend;
    expires 24h;
  }

  location /share {
    alias /var/www/music-global/code/app/public/share;
    expires 24h;
  }
}