release: cd api/ && python manage.py migrate --noinput
web: gunicorn api.honey_money.wsgi --log-file -
