#!/bin/sh
cd api/ && python manage.py migrate --noinput && cd ..
cd api/ && python manage.py collectstatic --noinput && cd ..
