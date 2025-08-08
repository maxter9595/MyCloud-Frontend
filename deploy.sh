#!/bin/bash

# Останавливаем текущий контейнер
docker-compose down

# Обновляем код
git pull origin main

# Пересобираем и запускаем контейнеры
docker-compose up -d --build

# Очищаем неиспользуемые образы
docker image prune -f
