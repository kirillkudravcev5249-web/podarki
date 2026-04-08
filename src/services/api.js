// Реальная база подарков с ссылками на WB и Ozon
const ALL_GIFTS = [
    // ===== ДЛЯ НЕЕ =====
    {
        id: 1,
        title: "Набор по уходу за кожей La Roche-Posay",
        brand: "La Roche-Posay",
        price: "5 490 ₽",
        priceNum: 5490,
        image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=400&fit=crop",
        category: "her",
        tag: "Топ выбор",
        description: "Бренд: La Roche-Posay. Подарочный набор из термальной воды, крема Cicaplast и очищающего геля — проверенная французская аптечная косметика.",
        whyFits: "Идеально для тех, кто заботится о коже. Гипоаллергенный состав подходит для чувствительной кожи.",
        stores: [
            { name: "Wildberries", status: "В наличии", price: "5 490 ₽", url: "https://www.wildberries.ru/catalog/0/search.aspx?search=La+Roche-Posay+набор+подарочный" },
            { name: "Ozon", status: "В наличии", price: "5 700 ₽", url: "https://www.ozon.ru/search/?text=La+Roche-Posay+подарочный+набор" }
        ]
    },
    {
        id: 2,
        title: "Парфюмерная вода Chloé Eau de Parfum",
        brand: "Chloé",
        price: "7 800 ₽",
        priceNum: 7800,
        image: "https://images.unsplash.com/photo-1541643600914-78b084683702?w=600&h=400&fit=crop",
        category: "her",
        tag: "Хит",
        description: "Бренд: Chloé. Нежный женственный аромат с нотами пиона, розы и магнолии. Стойкость 6–8 часов.",
        whyFits: "Классический романтичный парфюм — отличный подарок на день рождения или годовщину.",
        stores: [
            { name: "Wildberries", status: "В наличии", price: "7 800 ₽", url: "https://www.wildberries.ru/catalog/0/search.aspx?search=Chloe+Eau+de+Parfum" },
            { name: "Ozon", status: "В наличии", price: "8 200 ₽", url: "https://www.ozon.ru/search/?text=Chloe+Eau+de+Parfum+женский" }
        ]
    },
    {
        id: 3,
        title: "Аромадиффузор Woodwick Ellipse",
        brand: "Woodwick",
        price: "3 200 ₽",
        priceNum: 3200,
        image: "https://images.unsplash.com/photo-1602607774928-c6ef0c0d2f90?w=600&h=400&fit=crop",
        category: "her",
        tag: "Уют",
        description: "Бренд: Woodwick. Соевая свеча с деревянным фитилём, потрескивающим как камин. Аромат «Дымный чай».",
        whyFits: "Создаёт дома атмосферу уюта. Горит до 50 часов — долгое удовольствие от подарка.",
        stores: [
            { name: "Wildberries", status: "В наличии", price: "3 200 ₽", url: "https://www.wildberries.ru/catalog/0/search.aspx?search=Woodwick+свеча" },
            { name: "Ozon", status: "В наличии", price: "3 400 ₽", url: "https://www.ozon.ru/search/?text=WoodWick+свеча+ароматическая" }
        ]
    },
    {
        id: 4,
        title: "Набор серебряных украшений SOKOLOV",
        brand: "SOKOLOV",
        price: "6 800 ₽",
        priceNum: 6800,
        image: "https://images.unsplash.com/photo-1535632066429-8bded45c100b?w=600&h=400&fit=crop",
        category: "her",
        tag: "Ювелирка",
        description: "Бренд: SOKOLOV. Подарочный набор: кольцо и серьги из серебра 925 пробы с бесцветными фианитами.",
        whyFits: "Серебро — вечная классика. Набор поставляется в красивой фирменной коробке, готов к вручению.",
        stores: [
            { name: "Wildberries", status: "В наличии", price: "6 800 ₽", url: "https://www.wildberries.ru/catalog/0/search.aspx?search=SOKOLOV+набор+украшений+серебро" },
            { name: "Ozon", status: "Есть", price: "7 100 ₽", url: "https://www.ozon.ru/search/?text=SOKOLOV+украшения+серебро+набор" }
        ]
    },
    {
        id: 5,
        title: "Шелковая пижама Mia Cara",
        brand: "Mia Cara",
        price: "4 500 ₽",
        priceNum: 4500,
        image: "https://images.unsplash.com/photo-1520208422220-d12a3c588574?w=600&h=400&fit=crop",
        category: "her",
        tag: "Роскошь",
        description: "Бренд: Mia Cara. Атласная пижама с нежным принтом — идеальный подарок для комфортного домашнего отдыха.",
        whyFits: "Ощущение роскоши каждый вечер. Мягкая ткань, красивая упаковка — порадует любую женщину.",
        stores: [
            { name: "Wildberries", status: "В наличии", price: "4 500 ₽", url: "https://www.wildberries.ru/catalog/0/search.aspx?search=пижама+атласная+шелковая+женская+подарок" },
            { name: "Ozon", status: "В наличии", price: "4 700 ₽", url: "https://www.ozon.ru/search/?text=пижама+шелковая+женская" }
        ]
    },
    {
        id: 6,
        title: "SPA-набор с солями и маслами для ванны",
        brand: "L'OCCITANE",
        price: "3 900 ₽",
        priceNum: 3900,
        image: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=600&h=400&fit=crop",
        category: "her",
        tag: "Релакс",
        description: "Бренд: L'OCCITANE. Подарочный набор с солью для ванны, молочком для тела и мини-парфюмом с ароматом лаванды.",
        whyFits: "Дарит полноценный SPA-опыт дома. Фирменная коробка не требует дополнительной упаковки.",
        stores: [
            { name: "Wildberries", status: "В наличии", price: "3 900 ₽", url: "https://www.wildberries.ru/catalog/0/search.aspx?search=L'OCCITANE+набор+подарочный" },
            { name: "Ozon", status: "В наличии", price: "4 200 ₽", url: "https://www.ozon.ru/search/?text=L+OCCITANE+подарочный+набор" }
        ]
    },
    {
        id: 7,
        title: "Подарочный набор чаёв Ahmad Tea",
        brand: "Ahmad Tea",
        price: "1 490 ₽",
        priceNum: 1490,
        image: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=600&h=400&fit=crop",
        category: "her",
        tag: "До 1500 ₽",
        description: "Бренд: Ahmad Tea. Изысканная жестяная коробка с 9 видами чая со всего мира. 80 пакетиков.",
        whyFits: "Отличный вариант для чаелюбов. Красивая коробка сама по себе является украшением стола.",
        stores: [
            { name: "Wildberries", status: "В наличии", price: "1 490 ₽", url: "https://www.wildberries.ru/catalog/0/search.aspx?search=Ahmad+Tea+подарочный+набор" },
            { name: "Ozon", status: "В наличии", price: "1 550 ₽", url: "https://www.ozon.ru/search/?text=Ahmad+Tea+набор+чай+подарочный" }
        ]
    },

    // ===== ДЛЯ НЕГО =====
    {
        id: 8,
        title: "Электробритва Braun Series 5",
        brand: "Braun",
        price: "8 990 ₽",
        priceNum: 8990,
        image: "https://images.unsplash.com/photo-1621607512022-6aecc4fed814?w=600&h=400&fit=crop",
        category: "him",
        tag: "Топ выбор",
        description: "Бренд: Braun. Влагостойкая электробритва с технологией AutoSensing — адаптируется к структуре щетины. 100% водонепроницаема.",
        whyFits: "Практичный подарок для ежедневного использования. Работает от сети и аккумулятора.",
        stores: [
            { name: "Wildberries", status: "В наличии", price: "8 990 ₽", url: "https://www.wildberries.ru/catalog/0/search.aspx?search=Braun+Series+5+электробритва" },
            { name: "Ozon", status: "В наличии", price: "9 200 ₽", url: "https://www.ozon.ru/search/?text=Braun+Series+5+бритва" }
        ]
    },
    {
        id: 9,
        title: "Кофемолка Hario Skerton Pro",
        brand: "Hario",
        price: "5 900 ₽",
        priceNum: 5900,
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=400&fit=crop",
        category: "him",
        tag: "Для гурманов",
        description: "Бренд: Hario. Ручная керамическая кофемолка с регулировкой помола — для настоящих ценителей кофе. 100% японское качество.",
        whyFits: "Идеальна для любителей home-brew кофе. Помол в 3 раза свежее, чем у готового порошка.",
        stores: [
            { name: "Wildberries", status: "В наличии", price: "5 900 ₽", url: "https://www.wildberries.ru/catalog/0/search.aspx?search=Hario+кофемолка" },
            { name: "Ozon", status: "В наличии", price: "6 100 ₽", url: "https://www.ozon.ru/search/?text=Hario+Skerton+кофемолка" }
        ]
    },
    {
        id: 10,
        title: "Портмоне из натуральной кожи Cuoieria",
        brand: "Cuoieria Fiorentina",
        price: "3 800 ₽",
        priceNum: 3800,
        image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&h=400&fit=crop",
        category: "him",
        tag: "Классика",
        description: "Бренд: Cuoieria Fiorentina. Тонкий кошелёк из зернистой итальянской кожи, 8 отделений для карт. Цвет: тёмно-коричневый.",
        whyFits: "Кожа с возрастом становится только красивее. Стильный и долговечный аксессуар на годы.",
        stores: [
            { name: "Wildberries", status: "В наличии", price: "3 800 ₽", url: "https://www.wildberries.ru/catalog/0/search.aspx?search=кошелёк+кожаный+мужской+натуральная+кожа" },
            { name: "Ozon", status: "В наличии", price: "3 950 ₽", url: "https://www.ozon.ru/search/?text=портмоне+мужское+натуральная+кожа" }
        ]
    },
    {
        id: 11,
        title: "Набор для виски с гравировкой",
        brand: "LSA International",
        price: "6 200 ₽",
        priceNum: 6200,
        image: "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=600&h=400&fit=crop",
        category: "him",
        tag: "Премиум",
        description: "Бренд: LSA International. Набор из 2 стаканов для виски и графина из выдувного стекла. Упаковка — деревянная коробка.",
        whyFits: "Элегантный набор для ценителей. Деревянная подарочная коробка делает его готовым презентом.",
        stores: [
            { name: "Wildberries", status: "В наличии", price: "6 200 ₽", url: "https://www.wildberries.ru/catalog/0/search.aspx?search=набор+стаканы+виски+подарочный" },
            { name: "Ozon", status: "Есть", price: "6 500 ₽", url: "https://www.ozon.ru/search/?text=набор+стаканы+виски+стекло+подарочный" }
        ]
    },
    {
        id: 12,
        title: "Набор для барбекю на 3 предмета",
        brand: "Weber",
        price: "4 200 ₽",
        priceNum: 4200,
        image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&h=400&fit=crop",
        category: "him",
        tag: "Для мастеров",
        description: "Бренд: Weber. Стальные щипцы, лопатка и вилка с прорезиненными ручками. Хранятся в фирменном чехле.",
        whyFits: "Отличный подарок для любителей готовить на огне. Инструменты прослужат много сезонов.",
        stores: [
            { name: "Wildberries", status: "В наличии", price: "4 200 ₽", url: "https://www.wildberries.ru/catalog/0/search.aspx?search=набор+барбекю+гриль+инструменты" },
            { name: "Ozon", status: "В наличии", price: "4 400 ₽", url: "https://www.ozon.ru/search/?text=набор+для+барбекю+гриль+Weber" }
        ]
    },
    {
        id: 13,
        title: "Настольные часы Seiko QHE153",
        brand: "Seiko",
        price: "2 900 ₽",
        priceNum: 2900,
        image: "https://images.unsplash.com/photo-1550534791-2677533605ab?w=600&h=400&fit=crop",
        category: "him",
        tag: "Стиль",
        description: "Бренд: Seiko. Будильник с двойным звонком, подсветкой и плавным ходом секундной стрелки.",
        whyFits: "Практичный и стильный подарок на рабочий стол. Seiko — символ японской точности.",
        stores: [
            { name: "Wildberries", status: "В наличии", price: "2 900 ₽", url: "https://www.wildberries.ru/catalog/0/search.aspx?search=Seiko+часы+настольные" },
            { name: "Ozon", status: "В наличии", price: "3 100 ₽", url: "https://www.ozon.ru/search/?text=Seiko+будильник+настольные+часы" }
        ]
    },

    // ===== ДЛЯ ДЕТЕЙ =====
    {
        id: 14,
        title: "LEGO Creator Кибер дрон 31111",
        brand: "LEGO",
        price: "2 490 ₽",
        priceNum: 2490,
        image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=600&h=400&fit=crop",
        category: "kids",
        tag: "Хит продаж",
        description: "Бренд: LEGO. Набор 3-в-1: из одних деталей можно собрать дрон, собаку-робота или рыбку-скутер. 113 деталей.",
        whyFits: "Развивает пространственное мышление. Подходит для детей от 6 лет. Качество LEGO — на века.",
        stores: [
            { name: "Wildberries", status: "В наличии", price: "2 490 ₽", url: "https://www.wildberries.ru/catalog/0/search.aspx?search=LEGO+Creator+31111" },
            { name: "Ozon", status: "В наличии", price: "2 600 ₽", url: "https://www.ozon.ru/search/?text=LEGO+Creator+3+в+1" }
        ]
    },
    {
        id: 15,
        title: "Интерактивный глобус Oregon Scientific",
        brand: "Oregon Scientific",
        price: "5 900 ₽",
        priceNum: 5900,
        image: "https://images.unsplash.com/photo-1583120730870-2b8b3f7dc27f?w=600&h=400&fit=crop",
        category: "kids",
        tag: "Познаём мир",
        description: "Бренд: Oregon Scientific. Умный глобус с дополненной реальностью — наводишь камеру и видишь животных, флаги и факты о странах.",
        whyFits: "Превращает географию в увлечение. Дети учатся играя. Для возраста от 7 лет.",
        stores: [
            { name: "Wildberries", status: "В наличии", price: "5 900 ₽", url: "https://www.wildberries.ru/catalog/0/search.aspx?search=интерактивный+глобус+детский" },
            { name: "Ozon", status: "В наличии", price: "6 100 ₽", url: "https://www.ozon.ru/search/?text=интерактивный+глобус+Oregon+Scientific" }
        ]
    },
    {
        id: 16,
        title: "Набор для рисования Faber-Castell 100 предметов",
        brand: "Faber-Castell",
        price: "1 890 ₽",
        priceNum: 1890,
        image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&h=400&fit=crop",
        category: "kids",
        tag: "Творчество",
        description: "Бренд: Faber-Castell. 100 предметов в металлической коробке: карандаши, фломастеры, акварель, кисти и ластики.",
        whyFits: "Полный набор для юного художника. Качественные пигменты Faber-Castell безопасны для детей.",
        stores: [
            { name: "Wildberries", status: "В наличии", price: "1 890 ₽", url: "https://www.wildberries.ru/catalog/0/search.aspx?search=Faber-Castell+набор+рисования" },
            { name: "Ozon", status: "В наличии", price: "2 000 ₽", url: "https://www.ozon.ru/search/?text=Faber-Castell+набор+для+рисования+детский" }
        ]
    },
    {
        id: 17,
        title: "Радиоуправляемый вертолёт Syma S107H",
        brand: "Syma",
        price: "2 800 ₽",
        priceNum: 2800,
        image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600&h=400&fit=crop",
        category: "kids",
        tag: "Приключения",
        description: "Бренд: Syma. Стабилизированный мини-вертолёт с гироскопом, подходит для полётов в помещении. Управление до 10 метров.",
        whyFits: "Дарит незабываемые эмоции с первого полёта. Для детей от 8 лет и взрослых.",
        stores: [
            { name: "Wildberries", status: "В наличии", price: "2 800 ₽", url: "https://www.wildberries.ru/catalog/0/search.aspx?search=Syma+вертолёт+радиоуправляемый" },
            { name: "Ozon", status: "В наличии", price: "2 950 ₽", url: "https://www.ozon.ru/search/?text=Syma+радиоуправляемый+вертолёт+детский" }
        ]
    },
    {
        id: 18,
        title: "Набор юного учёного «Опыты с химией»",
        brand: "4M",
        price: "2 200 ₽",
        priceNum: 2200,
        image: "https://images.unsplash.com/photo-1532094349884-543559563b41?w=600&h=400&fit=crop",
        category: "kids",
        tag: "Наука",
        description: "Бренд: 4M. 20 безопасных химических опытов: вулкан, кристаллы, лавовые лампы. Всё необходимое в комплекте.",
        whyFits: "Разжигает любопытство к науке. Проводить опыты можно вместе с родителями. От 8 лет.",
        stores: [
            { name: "Wildberries", status: "В наличии", price: "2 200 ₽", url: "https://www.wildberries.ru/catalog/0/search.aspx?search=набор+юного+химика+опыты+детский" },
            { name: "Ozon", status: "В наличии", price: "2 350 ₽", url: "https://www.ozon.ru/search/?text=набор+опыты+химия+ребёнку+4M" }
        ]
    },
    {
        id: 19,
        title: "Мягкая игрушка Steiff Медведь Teddy Classic",
        brand: "Steiff",
        price: "3 500 ₽",
        priceNum: 3500,
        image: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=600&h=400&fit=crop",
        category: "kids",
        tag: "Нежность",
        description: "Бренд: Steiff. Классический плюшевый медведь из мохера, ручная работа. Пришивная пуговка-знак качества Steiff с 1902 года.",
        whyFits: "Классика, которая остаётся с детьми навсегда. Безопасный наполнитель, от 0 лет.",
        stores: [
            { name: "Wildberries", status: "Есть", price: "3 500 ₽", url: "https://www.wildberries.ru/catalog/0/search.aspx?search=Steiff+медведь+мягкая+игрушка" },
            { name: "Ozon", status: "В наличии", price: "3 700 ₽", url: "https://www.ozon.ru/search/?text=Steiff+мягкая+игрушка+медведь" }
        ]
    },

    // ===== ГАДЖЕТЫ =====
    {
        id: 20,
        title: "Bluetooth-колонка JBL Flip 6",
        brand: "JBL",
        price: "9 990 ₽",
        priceNum: 9990,
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&h=400&fit=crop",
        category: "tech",
        tag: "Хит WB",
        description: "Бренд: JBL. Мощная водонепроницаемая колонка с 12 часами работы, режимом Partyboost для объединения 2+ колонок.",
        whyFits: "Универсальный подарок для любого возраста. Работает везде — дома, на природе, в ванной.",
        stores: [
            { name: "Wildberries", status: "В наличии", price: "9 990 ₽", url: "https://www.wildberries.ru/catalog/0/search.aspx?search=JBL+Flip+6+колонка" },
            { name: "Ozon", status: "В наличии", price: "10 200 ₽", url: "https://www.ozon.ru/search/?text=JBL+Flip+6+bluetooth+колонка" }
        ]
    },
    {
        id: 21,
        title: "Наушники Sony WH-1000XM4",
        brand: "Sony",
        price: "22 990 ₽",
        priceNum: 22990,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=400&fit=crop",
        category: "tech",
        tag: "Премиум",
        description: "Бренд: Sony. Полноразмерные наушники с лучшим шумоподавлением в классе, 30 ч работы, мультиточечное подключение.",
        whyFits: "Лучший подарок для меломанов и тех, кто много работает в наушниках. Индустриальный стандарт.",
        stores: [
            { name: "Wildberries", status: "В наличии", price: "22 990 ₽", url: "https://www.wildberries.ru/catalog/0/search.aspx?search=Sony+WH-1000XM4+наушники" },
            { name: "Ozon", status: "В наличии", price: "23 500 ₽", url: "https://www.ozon.ru/search/?text=Sony+WH-1000XM4" }
        ]
    },
    {
        id: 22,
        title: "Powerbank Xiaomi 33W 20000 мАч",
        brand: "Xiaomi",
        price: "2 490 ₽",
        priceNum: 2490,
        image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=600&h=400&fit=crop",
        category: "tech",
        tag: "Практично",
        description: "Бренд: Xiaomi. Тонкое зарядное устройство 20000 мАч, быстрая зарядка 33W, 2 выхода USB-A + 1 USB-C.",
        whyFits: "Такой подарок заряжает смартфон 4–5 раз. Будет использоваться каждый день.",
        stores: [
            { name: "Wildberries", status: "В наличии", price: "2 490 ₽", url: "https://www.wildberries.ru/catalog/0/search.aspx?search=Xiaomi+повербанк+20000+33W" },
            { name: "Ozon", status: "В наличии", price: "2 600 ₽", url: "https://www.ozon.ru/search/?text=Xiaomi+powerbank+20000+mah+33w" }
        ]
    },
    {
        id: 23,
        title: "Смарт-браслет Xiaomi Mi Band 8",
        brand: "Xiaomi",
        price: "3 490 ₽",
        priceNum: 3490,
        image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=600&h=400&fit=crop",
        category: "tech",
        tag: "Фитнес",
        description: "Бренд: Xiaomi. AMOLED-дисплей, пульсоксиметр, 4 режима тренировок, уведомления со смартфона. 14 дней без зарядки.",
        whyFits: "Идеальный подарок для тех, кто следит за здоровьем. Подходит для iOS и Android.",
        stores: [
            { name: "Wildberries", status: "В наличии", price: "3 490 ₽", url: "https://www.wildberries.ru/catalog/0/search.aspx?search=Xiaomi+Mi+Band+8" },
            { name: "Ozon", status: "В наличии", price: "3 600 ₽", url: "https://www.ozon.ru/search/?text=Xiaomi+Mi+Band+8+смарт+браслет" }
        ]
    },
    {
        id: 24,
        title: "Умная лампа Yeelight LED Bulb M2",
        brand: "Yeelight",
        price: "1 390 ₽",
        priceNum: 1390,
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
        category: "tech",
        tag: "Умный дом",
        description: "Бренд: Yeelight. Лампочка 16 млн цветов, управление голосом (Алиса, OK Google) и смартфоном. Цоколь Е27.",
        whyFits: "Прекрасный недорогой подарок для создания умного дома. Устанавливается за 5 секунд.",
        stores: [
            { name: "Wildberries", status: "В наличии", price: "1 390 ₽", url: "https://www.wildberries.ru/catalog/0/search.aspx?search=Yeelight+умная+лампа" },
            { name: "Ozon", status: "В наличии", price: "1 450 ₽", url: "https://www.ozon.ru/search/?text=Yeelight+умная+лампочка+rgb" }
        ]
    },

    // ===== ЭКО =====
    {
        id: 25,
        title: "Бамбуковый набор посуды ECO Andina",
        brand: "ECO Andina",
        price: "2 190 ₽",
        priceNum: 2190,
        image: "https://images.unsplash.com/photo-1610882648335-ced8fc8fa6b6?w=600&h=400&fit=crop",
        category: "eco",
        tag: "Zero Waste",
        description: "Бренд: ECO Andina. Набор многоразовой посуды из бамбука: тарелка, миска, стаканчик, вилка, ложка с чехлом.",
        whyFits: "Забота о природе в стильном исполнении. Удобно брать с собой на пикник или в офис.",
        stores: [
            { name: "Wildberries", status: "В наличии", price: "2 190 ₽", url: "https://www.wildberries.ru/catalog/0/search.aspx?search=бамбуковый+набор+посуды+эко" },
            { name: "Ozon", status: "В наличии", price: "2 300 ₽", url: "https://www.ozon.ru/search/?text=бамбуковая+посуда+набор+эко" }
        ]
    },
    {
        id: 26,
        title: "Набор органических масел Natura Siberica",
        brand: "Natura Siberica",
        price: "2 990 ₽",
        priceNum: 2990,
        image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&h=400&fit=crop",
        category: "eco",
        tag: "Органика",
        description: "Бренд: Natura Siberica. 3 натуральных масла для лица и тела: кедровое, облепиховое, розы. Без силиконов и парабенов.",
        whyFits: "100% натуральный состав. Российский бренд с сибирскими растительными экстрактами.",
        stores: [
            { name: "Wildberries", status: "В наличии", price: "2 990 ₽", url: "https://www.wildberries.ru/catalog/0/search.aspx?search=Natura+Siberica+набор+масел" },
            { name: "Ozon", status: "В наличии", price: "3 100 ₽", url: "https://www.ozon.ru/search/?text=Natura+Siberica+масло+набор+подарочный" }
        ]
    },
    {
        id: 27,
        title: "Набор семян для огорода «Зелень на подоконнике»",
        brand: "Гавриш",
        price: "890 ₽",
        priceNum: 890,
        image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=400&fit=crop",
        category: "eco",
        tag: "Для дома",
        description: "Бренд: Гавриш. Подарочная коробка с 10 пакетами семян: базилик, петрушка, укроп, рукола, шпинат и другие. Всё для домашней грядки.",
        whyFits: "Живой и полезный подарок — зелень вырастет прямо на кухне. Подходит для новичков.",
        stores: [
            { name: "Wildberries", status: "В наличии", price: "890 ₽", url: "https://www.wildberries.ru/catalog/0/search.aspx?search=набор+семян+зелень+подоконник+подарочный" },
            { name: "Ozon", status: "В наличии", price: "950 ₽", url: "https://www.ozon.ru/search/?text=набор+семян+зелень+подарочный+огород" }
        ]
    },
    {
        id: 28,
        title: "Многоразовый термостакан Contigo Autoseal",
        brand: "Contigo",
        price: "3 290 ₽",
        priceNum: 3290,
        image: "https://images.unsplash.com/photo-1514362453360-8f94243c9996?w=600&h=400&fit=crop",
        category: "eco",
        tag: "Эко-выбор",
        description: "Бренд: Contigo. Герметичный термостакан 470 мл — удерживает тепло 5 часов, холод 12 часов. Без BPA.",
        whyFits: "Заменяет сотни бумажных стаканчиков — экономно и экологично. Идеален для кофеманов.",
        stores: [
            { name: "Wildberries", status: "В наличии", price: "3 290 ₽", url: "https://www.wildberries.ru/catalog/0/search.aspx?search=Contigo+термостакан" },
            { name: "Ozon", status: "В наличии", price: "3 400 ₽", url: "https://www.ozon.ru/search/?text=Contigo+Autoseal+термостакан" }
        ]
    },
    {
        id: 29,
        title: "Набор твёрдого шампуня и мыла Siberina",
        brand: "Siberina",
        price: "1 590 ₽",
        priceNum: 1590,
        image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&h=400&fit=crop",
        category: "eco",
        tag: "Без пластика",
        description: "Бренд: Siberina. Набор из 3 баров: твёрдый шампунь, кондиционер и натуральное мыло с маслом ши. Полностью без пластика.",
        whyFits: "Одного бара хватает на 60+ использований. Экономно и безопасно для морей и рек.",
        stores: [
            { name: "Wildberries", status: "В наличии", price: "1 590 ₽", url: "https://www.wildberries.ru/catalog/0/search.aspx?search=Siberina+твёрдый+шампунь+набор" },
            { name: "Ozon", status: "В наличии", price: "1 650 ₽", url: "https://www.ozon.ru/search/?text=Siberina+шампунь+твёрдый+набор" }
        ]
    },
    {
        id: 30,
        title: "Подарочный набор мёда «Три вкуса» Правильный мёд",
        brand: "Правильный мёд",
        price: "2 490 ₽",
        priceNum: 2490,
        image: "https://images.unsplash.com/photo-1587049352851-8d4e89133924?w=600&h=400&fit=crop",
        category: "eco",
        tag: "Натуральное",
        description: "Бренд: Правильный мёд. Три баночки по 250г: гречишный, липовый и цветочный мёд из российских пасек. Деревянная коробка.",
        whyFits: "Вкусный и натуральный подарок для всей семьи. Проверенные российские пасеки, без добавок.",
        stores: [
            { name: "Wildberries", status: "В наличии", price: "2 490 ₽", url: "https://www.wildberries.ru/catalog/0/search.aspx?search=набор+мёда+подарочный+натуральный" },
            { name: "Ozon", status: "В наличии", price: "2 600 ₽", url: "https://www.ozon.ru/search/?text=набор+натуральный+мёд+подарочный+три+вкуса" }
        ]
    }
];

const CATEGORY_DESCRIPTIONS = {
    all: "подарок",
    her: "Для неё",
    him: "Для него",
    kids: "Детям",
    tech: "Гаджеты",
    eco: "Эко"
};

// Эта функция теперь фильтрует статические данные вместо обращения к API
export const fetchWbGifts = async (query = "подарок", limit = 30) => {
    // Находим категорию по query
    const categoryEntry = Object.entries(CATEGORY_DESCRIPTIONS).find(([, v]) => v === query);
    const category = categoryEntry ? categoryEntry[0] : "all";
    
    if (category === "all") {
        return ALL_GIFTS.slice(0, limit);
    }
    return ALL_GIFTS.filter(g => g.category === category).slice(0, limit);
};

// Экспортируем все товары для использования на главной
export const getAllGifts = (limit = 4) => ALL_GIFTS.slice(0, limit);
