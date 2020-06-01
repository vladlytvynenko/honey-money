# Honey money - money keeper for you and your family

## Описание проекта

Идея нашего проекта заключается в создании приложения, которое будет контролировать расходы пользователя. В приложении будет возможность вводить доход и вписывать ежедневные траты по разным категориям. Так же будет возможность ставить лимит трат по категориям, и как только он будет привышен (или приближаться к нему), пользователь будет уведомлен.
Приложении можно использовать в режиме семьи и иметь “общий” бюджет для всех членов семьи. При новой покупке или приходе средств, все члены семьи будут уведомлены.

Приложение можно использовать через телеграм бот, к которому оно будет подключено. Можно добавлять приход/траты через него.

## Технологии

* Django
* Python
* React Native
* Postgresql

## Целевая аудитория

Люди, которые хотят контролировать свой расход и доход, или расход и доход своей семьи.
Любой проффесии и пола. Минимальный возраст пользователя 12 лет.


[![Code style: black](https://img.shields.io/badge/code%20style-black-000000.svg)](https://github.com/psf/black)

### Documentation: ###

* [UI overview](docs/ui.md)
* [Architecture overview](docs/architecture_overview.md)
* [Backend: Routine tasks](docs/commands.md)
* [Backend: Pre-commit hook](docs/pre_commit_hook.md)

### API documentation: ###

* ReDoc web UI: [https://honey-money.vatform/docs/v1/redoc/](https://honey-money.herokuapp.com/_platform/docs/v1/redoc/)
* Swagger web UI: [https://honey-money.herokuapp.com/_platform/docs/v1/swagger/](https://honey-money.herokuapp.com/_platform/docs/v1/swagger/)
* Swagger JSON: [https://honey-money.herokuapp.com/_platform/docs/v1/swagger.json](https://honey-money.herokuapp.com/_platform/docs/v1/swagger.json)
* Swagger YAML: [https://honey-money.herokuapp.com/_platform/docs/v1/swagger.yaml](https://honey-money.herokuapp.com/_platform/docs/v1/swagger.yaml)

### First run: ###

Install Python 3.7.5 & setup virtual environment. We recommend to use [pyenv](https://github.com/pyenv/pyenv) & [pyenv-virtualenv](https://github.com/pyenv/pyenv-virtualenv):

```bash
pyenv install 3.7.5
pyenv virtualenv 3.7.5 honey_money
pyenv activate honey_money
```

Update `pip` & `setuptools`, install `fabric`, `invoke` & `pip-tools`:

```bash
pip install -U fabric invoke pip pip-tools setuptools
```

Install Python requirements:

```bash
fab pip.sync
```

Copy initial settings for Django project:

```bash
cp ./api/.env.example ./api/.env
```

Generate `SECRET_KEY`:

```bash
./api/manage.py generate_secret_key
```

and write it to `./api/.env`:

```
HONEY_MONEY_SECRET_KEY=<your-generated-key>
```

Run backing services (require Docker):

```bash
fab compose.up -d
```

Run migrations:

```bash
./api/manage.py migrate
```

Run Django server:

```bash
fab run
```
