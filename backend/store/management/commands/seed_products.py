from django.core.management.base import BaseCommand
from store.models import Product


class Command(BaseCommand):
    help = 'Seed products into the database'

    def handle(self, *args, **kwargs):
        products = [
            {
                'name': 'Pikipiki',
                'name_en': 'Motorcycle',
                'description': 'Pikipiki kwa biashara, usafiri na matumizi binafsi.',
                'description_en': 'Motorcycles for business, transport and personal use.',
                'category': 'usafiri',
                'price': 1500000,
                'emoji': '\U0001f3cd\ufe0f',
                'image': 'img-pikipiki.jpg',
                'badge': 'HOT',
            },
            {
                'name': 'Bajaji',
                'name_en': 'TukTuk',
                'description': 'Bajaji kwa usafiri na shughuli za biashara.',
                'description_en': 'TukTuks for transport and business activities.',
                'category': 'usafiri',
                'price': 3000000,
                'emoji': '\U0001f6ba',
                'image': 'img-bajaji.jpg',
                'badge': 'NEW',
            },
            {
                'name': 'Guta',
                'name_en': 'Trailer',
                'description': 'Guta kwa kubeba mizigo na shughuli mbalimbali.',
                'description_en': 'Trailers for carrying goods and various activities.',
                'category': 'usafiri',
                'price': 2000000,
                'emoji': '\U0001f69c',
                'image': 'img-guta.jpg',
                'badge': '',
            },
            {
                'name': 'Magodolo',
                'name_en': 'Wood',
                'description': 'Magodolo kwa matumizi mbalimbali kulingana na mahitaji yako.',
                'description_en': 'Wood for various uses according to your needs.',
                'category': 'ujenzi',
                'price': 50000,
                'emoji': '\U0001fab5',
                'image': 'img-magodolo.jpg',
                'badge': '',
            },
            {
                'name': 'Mabati',
                'name_en': 'Iron Sheets',
                'description': 'Mabati kwa nyumba, biashara na miradi ya ujenzi.',
                'description_en': 'Iron sheets for houses, business and construction projects.',
                'category': 'ujenzi',
                'price': 80000,
                'emoji': '\U0001f3e0',
                'image': 'img-mabati.jpg',
                'badge': 'DEAL',
            },
        ]

        for p in products:
            obj, created = Product.objects.update_or_create(
                name=p['name'],
                defaults=p
            )
            action = 'Created' if created else 'Updated'
            self.stdout.write(self.style.SUCCESS(f'{action}: {obj.name}'))

        self.stdout.write(self.style.SUCCESS('Done seeding products!'))
