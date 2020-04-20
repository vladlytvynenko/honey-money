release: cd api/ && python manage.py migrate --noinput
web: env PYTHONPATH=$PYTHONPATH:$PWD/api gunicorn honey_money.wsgi --log-file -
