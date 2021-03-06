# Generated by Django 3.0.5 on 2020-05-10 11:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [("budget", "0002_category_spending_limit")]

    operations = [
        migrations.AlterField(
            model_name="budget",
            name="spending_limit_type",
            field=models.PositiveSmallIntegerField(
                blank=True,
                choices=[(1, "Day"), (2, "Week"), (3, "Month"), (4, "Year")],
                null=True,
                verbose_name="Spending Limit Type",
            ),
        ),
        migrations.AlterField(
            model_name="category",
            name="spending_limit_type",
            field=models.PositiveSmallIntegerField(
                blank=True,
                choices=[(1, "Day"), (2, "Week"), (3, "Month"), (4, "Year")],
                null=True,
                verbose_name="Spending Limit Type",
            ),
        ),
    ]
