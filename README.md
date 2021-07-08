#dockerイメージを作成する  
docker-compose build

#dockerコンテナを起動する  
docker-compose up -d

#dockerの中に入る  
docker-compose exec app bash

#mysqlを起動する  
mysql -h 127.0.0.1 -P 3306 -u root -p
