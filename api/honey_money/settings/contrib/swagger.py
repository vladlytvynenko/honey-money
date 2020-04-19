from ..environment import env


SWAGGER_SETTINGS = {
    "DEFAULT_API_URL": env.str("HONEY_MONEY_BASE_API_URL", default="https://honey_money.com"),
    "SECURITY_DEFINITIONS": {"JWT": {"type": "apiKey", "name": "JWT", "in": "header"}},
}
