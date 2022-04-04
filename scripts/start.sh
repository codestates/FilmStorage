#!/bin/bash
cd /home/ubuntu/FilmStorage/server

export DATABASE_USER=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_USER --query Parameters[0].Value | sed 's/"//g')
export DATABASE_PASSWORD=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_PASSWORD --query Parameters[0].Value | sed 's/"//g')
export DATABASE_PORT=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_PORT --query Parameters[0].Value | sed 's/"//g')
export DATABASE_HOST=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_HOST --query Parameters[0].Value | sed 's/"//g')
export ACCESS_SECRET=$(aws ssm get-parameters --region ap-northeast-2 --names ACCESS_SECRET --query Parameters[0].Value | sed 's/"//g')
export HTTPS_PORT=$(aws ssm get-parameters --region ap-northeast-2 --names HTTPS_PORT --query Parameters[0].Value | sed 's/"//g')
export KAKAO_REDIRECT_URI=$(aws ssm get-parameters --region ap-northeast-2 --names KAKAO_REDIRECT_URI --query Parameters[0].Value | sed 's/"//g')
export KAKAO_REST_API_KEY=$(aws ssm get-parameters --region ap-northeast-2 --names KAKAO_REST_API_KEY --query Parameters[0].Value | sed 's/"//g')
export MAIL_ID=$(aws ssm get-parameters --region ap-northeast-2 --names MAIL_ID --query Parameters[0].Value | sed 's/"//g')
export MAIL_PASSWORD=$(aws ssm get-parameters --region ap-northeast-2 --names MAIL_PASSWORD --query Parameters[0].Value | sed 's/"//g')
export NODE_ENV=$(aws ssm get-parameters --region ap-northeast-2 --names NODE_ENV --query Parameters[0].Value | sed 's/"//g')
export SERVER_DOMAIN=$(aws ssm get-parameters --region ap-northeast-2 --names SERVER_DOMAIN --query Parameters[0].Value | sed 's/"//g')

npx sequelize-cli db:migrate

authbind --deep pm2 start app.js

