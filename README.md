開発環境の立ち上げ

#dockerイメージを作成する  
docker-compose build

#dockerコンテナを起動する  
docker-compose up -d

#dockerの中に入る  
docker-compose exec web bash

開発環境のマイグレーション

#開発環境が立ち上がっている必要があります。
docker-compose run app npx sequelize-cli db:migrate
