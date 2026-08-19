const catImages = {
    pikipiki: '/img-pikipiki.jpg',
    bajaji: '/img-bajaji.jpg',
    guta: '/img-guta.jpg',
    magodolo: '/img-magodolo.jpg',
    mabati: '/img-mabati.jpg'
}

let _idCounter = 0

function addImg(catKey, brands) {
    Object.values(brands).forEach(b => {
        b.models.forEach(m => {
            if (!m.img) m.img = catImages[catKey] || ''
            m.id = ++_idCounter
        })
    })
    return brands
}

export function findProduct(id) {
    const numId = Number(id)
    for (const [catKey, cat] of Object.entries(categories)) {
        for (const [brandKey, brand] of Object.entries(cat.brands)) {
            for (const model of brand.models) {
                if (model.id === numId) {
                    return {
                        ...model,
                        brand: brand.name,
                        brandColor: brand.color,
                        category: cat.title,
                        categoryEmoji: cat.emoji,
                        categorySlug: catKey
                    }
                }
            }
        }
    }
    return null
}

export const categories = {
    pikipiki: {
        title: 'Pikipiki',
        emoji: '🏍️',
        subtitle: 'Chagua chapa ya pikipiki unayohitaji.',
        brands: addImg('pikipiki', {
            bajaj: {
                name: 'Bajaj',
                color: '#0066cc',
                models: [
                    { name: 'Boxer 100', price: 1350000, img: '/bajaj-boxer-100.png', specs: [
                        { group: 'ENGINE', items: [
                            { label: 'Displacement', value: '99.27 cc' },
                            { label: 'Engine Type', value: '4 stroke Natural air-cooled' },
                            { label: 'Max Power', value: '8.2 Ps @ 7500 rpm' },
                            { label: 'Max Torque', value: '8.05 Nm @ 4500 rpm' }
                        ]},
                        { group: 'BRAKES & TYRES', items: [
                            { label: 'Front Brakes Size', value: '110 mm (Drum)' },
                            { label: 'Rear Brakes Size', value: '130 mm (Drum)' },
                            { label: 'Front Brakes Type', value: 'Drum' },
                            { label: 'Rear Brakes Type', value: 'Drum' },
                            { label: 'Front Tyres', value: "2.75 X 17\"" },
                            { label: 'Rear Tyres', value: "3 X 17\"" }
                        ]}
                    ]},
                    { name: 'Boxer 125', price: 1650000, img: '/bajaj-boxer-125.png', specs: [
                        { group: 'ENGINE', items: [
                            { label: 'Displacement', value: '124.4 cc' },
                            { label: 'Engine Type', value: '4 stroke Single Cylinder Air Cooled' },
                            { label: 'Max Power', value: '10 Ps @ 7500 rpm' },
                            { label: 'Max Torque', value: '10.8 Nm @ 5500 rpm' }
                        ]},
                        { group: 'BRAKES & TYRES', items: [
                            { label: 'Front Brakes Size', value: '130 mm (Drum)' },
                            { label: 'Rear Brakes Size', value: '130 mm (Drum)' },
                            { label: 'Front Brakes Type', value: 'Drum' },
                            { label: 'Rear Brakes Type', value: 'Drum' },
                            { label: 'Front Tyres', value: "2.75 X 17\"" },
                            { label: 'Rear Tyres', value: "3.00 X 17\"" }
                        ]}
                    ]},
                    { name: 'Boxer 150', price: 1950000, img: '/bajaj-boxer-150.png', specs: [
                        { group: 'ENGINE', items: [
                            { label: 'Displacement', value: '148.8 cc' },
                            { label: 'Engine Type', value: '4 stroke Single Cylinder Air Cooled' },
                            { label: 'Max Power', value: '12 Ps @ 7500 rpm' },
                            { label: 'Max Torque', value: '12.3 Nm @ 5500 rpm' }
                        ]},
                        { group: 'BRAKES & TYRES', items: [
                            { label: 'Front Brakes Size', value: '130 mm (Drum)' },
                            { label: 'Rear Brakes Size', value: '130 mm (Drum)' },
                            { label: 'Front Brakes Type', value: 'Drum' },
                            { label: 'Rear Brakes Type', value: 'Drum' },
                            { label: 'Front Tyres', value: "2.75 X 17\"" },
                            { label: 'Rear Tyres', value: "3.00 X 17\"" }
                        ]}
                    ]},
                    { name: 'Platina 100', price: 1400000 },
                    { name: 'Platina 125', price: 1700000 },
                    { name: 'Pulsar 125', price: 2100000 },
                    { name: 'Pulsar 150', price: 2500000 },
                    { name: 'Pulsar NS125', price: 2800000 },
                    { name: 'Pulsar NS160', price: 3200000 },
                    { name: 'Pulsar NS200', price: 3800000 },
                    { name: 'CT 100', price: 1200000 },
                    { name: 'Discover 125', price: 1800000 }
                ]
            },
            tvs: {
                name: 'TVS',
                color: '#e31837',
                models: [
                    { name: 'HLX 125', price: 1600000 },
                    { name: 'HLX 125 5G', price: 1750000 },
                    { name: 'HLX Plus', price: 1900000 },
                    { name: 'HLX 150', price: 2200000 },
                    { name: 'Stryker 125', price: 1550000 },
                    { name: 'Apache RTR 160', price: 2800000 },
                    { name: 'Apache RTR 200', price: 3500000 },
                    { name: 'Ntorq 125', price: 2100000 }
                ]
            },
            haojue: {
                name: 'Haojue',
                color: '#009944',
                models: [
                    { name: 'HAOJUE 110', price: 1100000 },
                    { name: 'HJ 125', price: 1450000 },
                    { name: 'HJ 150', price: 1800000 },
                    { name: 'SK Rider 150', price: 2200000 },
                    { name: 'DR 160', price: 2500000 }
                ]
            },
            honda: {
                name: 'Honda',
                color: '#cc0000',
                models: [
                    { name: 'CB 125', price: 1800000 },
                    { name: 'CB 150', price: 2300000 },
                    { name: 'CB Hornet 160', price: 2800000 },
                    { name: 'CBR 150R', price: 3500000 },
                    { name: 'CBR 250RR', price: 5500000 },
                    { name: 'Dream 110', price: 1350000 },
                    { name: 'Wave 110', price: 1250000 },
                    { name: 'CRF 150L', price: 4200000 }
                ]
            },
            yamaha: {
                name: 'Yamaha',
                color: '#0033a0',
                models: [
                    { name: 'MT-15', price: 3200000 },
                    { name: 'R15 V4', price: 3800000 },
                    { name: 'FZ-S 150', price: 2500000 },
                    { name: 'FZ 25', price: 3500000 },
                    { name: 'R25', price: 6500000 },
                    { name: 'XSR 155', price: 3600000 },
                    { name: 'NMAX 155', price: 4500000 },
                    { name: 'Aerox 155', price: 4200000 }
                ]
            },
            shineray: {
                name: 'Shineray',
                color: '#ff6600',
                models: [
                    { name: 'XY 200', price: 1800000 },
                    { name: 'XY 250', price: 2200000 },
                    { name: 'SS 250', price: 2500000 },
                    { name: 'X5 200', price: 1900000 },
                    { name: 'Jiajie 150', price: 1500000 },
                    { name: 'Chopper 250', price: 3000000 }
                ]
            }
        })
    },
    bajaji: {
        title: 'Bajaji',
        emoji: '🛺',
        subtitle: 'Chagua aina ya bajaji unayohitaji.',
        brands: addImg('bajaji', {
            bajaj: {
                name: 'Bajaj',
                color: '#0066cc',
                models: [
                    { name: 'RE Maxima', price: 6500000 },
                    { name: 'RE Comfort', price: 5800000 },
                    { name: 'RE Auto', price: 5200000 },
                    { name: 'RE Discover', price: 4800000 }
                ]
            },
            tvs: {
                name: 'TVS',
                color: '#e31837',
                models: [
                    { name: 'TVS King', price: 4500000 },
                    { name: 'TVS XL 100', price: 3200000 }
                ]
            },
            piaggio: {
                name: 'Piaggio',
                color: '#1a1a1a',
                models: [
                    { name: 'Ape City', price: 5500000 },
                    { name: 'Ape Classic', price: 6000000 },
                    { name: 'Ape DX', price: 5800000 }
                ]
            },
            atul: {
                name: 'Atul',
                color: '#009944',
                models: [
                    { name: 'Atul Shakti', price: 4200000 },
                    { name: 'Atul Elite', price: 4800000 }
                ]
            }
        })
    },
    guta: {
        title: 'Guta',
        emoji: '🚜',
        subtitle: 'Chagua aina ya guta unayohitaji.',
        brands: addImg('guta', {
            standard: {
                name: 'Standard',
                color: '#047857',
                models: [
                    { name: 'Guta Kubwa', price: 2500000 },
                    { name: 'Guta Kati', price: 2000000 },
                    { name: 'Guta Ndogo', price: 1500000 }
                ]
            },
            heavy: {
                name: 'Heavy Duty',
                color: '#cc0000',
                models: [
                    { name: 'Guta Kubwa Heavy', price: 3500000 },
                    { name: 'Guta Extra Heavy', price: 4500000 }
                ]
            }
        })
    },
    magodolo: {
        title: 'Magodolo',
        emoji: '🪵',
        subtitle: 'Chagua aina ya magodolo unayohitaji.',
        brands: addImg('magodolo', {
            mbao: {
                name: 'Mbao',
                color: '#8B4513',
                models: [
                    { name: 'Mbao 2x2', price: 35000 },
                    { name: 'Mbao 2x3', price: 45000 },
                    { name: 'Mbao 2x4', price: 55000 },
                    { name: 'Mbao 3x3', price: 65000 },
                    { name: 'Mbao 4x4', price: 85000 }
                ]
            },
            mbao_special: {
                name: 'Special',
                color: '#D2691E',
                models: [
                    { name: 'Mbao 4x6', price: 120000 },
                    { name: 'Mbao 6x6', price: 180000 },
                    { name: 'Mbao 6x8', price: 250000 }
                ]
            }
        })
    },
    mabati: {
        title: 'Mabati',
        emoji: '🏠',
        subtitle: 'Chagua aina ya mabati unayohitaji.',
        brands: addImg('mabati', {
            standard: {
                name: 'Standard',
                color: '#0066cc',
                models: [
                    { name: 'Mabati 0.3mm', price: 65000 },
                    { name: 'Mabati 0.4mm', price: 80000 },
                    { name: 'Mabati 0.5mm', price: 95000 },
                    { name: 'Mabati 0.6mm', price: 110000 }
                ]
            },
            gauge: {
                name: 'Heavy Gauge',
                color: '#cc0000',
                models: [
                    { name: 'Mabati 0.7mm', price: 130000 },
                    { name: 'Mabati 0.8mm', price: 150000 },
                    { name: 'Mabati 1.0mm', price: 190000 }
                ]
            },
            color: {
                name: 'Colored',
                color: '#ff6600',
                models: [
                    { name: 'Color 0.4mm', price: 95000 },
                    { name: 'Color 0.5mm', price: 115000 },
                    { name: 'Color 0.6mm', price: 135000 }
                ]
            }
        })
    }
}

export const categoryList = [
    { slug: 'pikipiki', name: 'Pikipiki', color: 'red' },
    { slug: 'bajaji', name: 'Bajaji', color: 'green' },
    { slug: 'guta', name: 'Guta', color: 'blue' },
    { slug: 'magodolo', name: 'Magodolo', color: 'orange' },
    { slug: 'mabati', name: 'Mabati', color: 'steel' }
]
