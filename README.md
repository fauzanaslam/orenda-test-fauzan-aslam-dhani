create database orendatest
open project
cd api on terminal
run npx sequelize db:migrate
run npx sequelize-cli db:seed:all

frontend .env
VITE_API_BASE_URL=http://localhost:7899
FRONTEND_URL=http://127.0.0.1:5173
