開発環境の立ち上げ

#1.設定ファイル(.env)を生成する  
cp app/.env.example app/.env

#2.dockerイメージを作成する  
docker-compose build

#3.dockerコンテナを起動する  
docker-compose up -d

#4.logを確認する  
docker-compose logs -f

開発環境のマイグレーション

#開発環境が立ち上がっている必要があります。  
docker-compose run app npx sequelize-cli db:migrate
