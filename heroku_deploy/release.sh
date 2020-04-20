#!/usr/bin/env bash
cd api/ && python manage.py migrate --noinput
cd api/ && python manage.py collectstatic --noinput
