from honey_money.apps.accounts.models import UserAccount


def get_all_users():
    return UserAccount.objects.active()
