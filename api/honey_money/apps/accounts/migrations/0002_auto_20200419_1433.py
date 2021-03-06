# Generated by Django 3.0.5 on 2020-04-19 14:33

import uuid

import django.db.models.deletion

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [("accounts", "0001_initial")]

    operations = [
        migrations.CreateModel(
            name="Family",
            fields=[
                ("uuid", models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ("created", models.DateTimeField(auto_now_add=True, db_index=True, verbose_name="created")),
                ("updated", models.DateTimeField(auto_now=True, verbose_name="updated")),
                ("is_active", models.BooleanField(db_index=True, default=True)),
                ("name", models.CharField(max_length=256)),
                (
                    "creator",
                    models.OneToOneField(
                        on_delete=django.db.models.deletion.PROTECT,
                        related_name="created_family",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
            options={"abstract": False},
        ),
        migrations.AddField(
            model_name="useraccount",
            name="family",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.PROTECT,
                related_name="members",
                to="accounts.Family",
            ),
        ),
    ]
