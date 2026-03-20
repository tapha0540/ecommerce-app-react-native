INSERT INTO
    categories (name, description, parent_id, icon_url)
VALUES
    (
        'Électronique',
        'Appareils technologiques incluant smartphones, ordinateurs, accessoires informatiques et gadgets électroniques modernes adaptés à un usage quotidien ou professionnel.',
        NULL,
        'icon_electronique.png'
    ),
    (
        'Mode',
        'Vêtements et accessoires pour hommes, femmes et enfants, incluant chaussures, tenues sportives et styles adaptés à toutes les saisons.',
        NULL,
        'icon_mode.png'
    ),
    (
        'Maison & Cuisine',
        'Produits pour l’équipement de la maison, cuisine, décoration intérieure et mobilier pour améliorer le confort et le quotidien.',
        NULL,
        'icon_maison.png'
    ),
    (
        'Sport & Loisirs',
        'Équipements sportifs et accessoires pour fitness, football, cyclisme et autres activités physiques.',
        NULL,
        'icon_sport.png'
    ),
    (
        'Livres & Éducation',
        'Livres éducatifs, romans, guides pratiques et supports d’apprentissage pour tous les niveaux.',
        NULL,
        'icon_livres.png'
    );

INSERT INTO
    products (
        name,
        description,
        price,
        stock,
        category_id,
        image_url
    )
VALUES
    -- Electronique
    (
        'Samsung Galaxy A23',
        'Smartphone moderne offrant un excellent équilibre entre performance et autonomie. Il dispose d’un écran large et lumineux idéal pour le multimédia, d’un appareil photo performant pour capturer des images nettes et d’une batterie longue durée permettant une utilisation intensive tout au long de la journée. Parfait pour les utilisateurs recherchant un téléphone fiable à prix abordable.',
        185000,
        25,
        1,
        'galaxy_a23.jpg'
    ),
    (
        'Dell Inspiron 15',
        'Ordinateur portable conçu pour les tâches quotidiennes et professionnelles. Il offre une bonne puissance de traitement, un écran confortable pour le travail prolongé et une autonomie adaptée aux étudiants et professionnels. Sa conception robuste et élégante en fait un choix idéal pour une utilisation polyvalente.',
        450000,
        10,
        1,
        'dell_inspiron15.jpg'
    ),
    (
        'Casque Sony',
        'Casque audio de haute qualité offrant un son clair et immersif. Idéal pour écouter de la musique, regarder des films ou passer des appels avec un confort optimal grâce à ses coussinets ergonomiques. Compatible avec plusieurs appareils, il assure une expérience audio exceptionnelle.',
        35000,
        40,
        1,
        'sony_headset.jpg'
    ),
    -- Mode
    (
        'Nike Air Max 270',
        'Chaussures de sport modernes combinant confort et style. Conçues avec une semelle amortissante avancée, elles offrent un excellent soutien pour les activités quotidiennes ou sportives. Leur design élégant les rend adaptées aussi bien pour le sport que pour un usage casual.',
        65000,
        30,
        2,
        'nike_airmax270.jpg'
    ),
    (
        'Robe été légère',
        'Robe élégante et confortable idéale pour les journées chaudes. Fabriquée avec des matériaux légers et respirants, elle assure un confort optimal tout en mettant en valeur le style féminin. Parfaite pour les sorties, événements ou usage quotidien.',
        20000,
        50,
        2,
        'robe_ete.jpg'
    ),
    -- Maison & Cuisine
    (
        'Blender multifonction',
        'Appareil de cuisine performant permettant de mixer, broyer et préparer divers aliments en toute simplicité. Il est idéal pour les jus, smoothies et sauces. Sa puissance et sa facilité d’utilisation en font un outil indispensable pour une cuisine moderne.',
        25000,
        20,
        3,
        'blender.jpg'
    ),
    (
        'Cafetière électrique',
        'Cafetière pratique conçue pour préparer rapidement du café de qualité. Elle dispose d’un système simple d’utilisation et d’un design compact adapté à toutes les cuisines. Idéale pour les amateurs de café souhaitant une solution rapide et efficace.',
        18000,
        15,
        3,
        'cafetière.jpg'
    ),
    -- Sport
    (
        'Ballon de football',
        'Ballon robuste conçu pour les entraînements et les matchs. Fabriqué avec des matériaux résistants, il offre une bonne durabilité et un excellent contrôle. Adapté aux joueurs amateurs comme professionnels.',
        12000,
        60,
        4,
        'ballon_football.jpg'
    ),
    (
        'Vélo VTT',
        'Vélo tout terrain conçu pour les routes difficiles et les balades sportives. Il offre une excellente stabilité, un système de freinage fiable et une structure solide adaptée aux terrains variés. Idéal pour les amateurs de cyclisme.',
        150000,
        8,
        4,
        'velo_vtt.jpg'
    ),
    -- Livres
    (
        'Apprendre Python',
        'Livre complet destiné aux débutants souhaitant apprendre la programmation Python. Il couvre les bases essentielles ainsi que des exercices pratiques permettant de progresser rapidement vers un niveau intermédiaire.',
        15000,
        35,
        5,
        'python_debutants.jpg'
    ),
    (
        'Les Misérables',
        'Roman classique incontournable racontant une histoire profonde mêlant justice, amour et société. Une œuvre riche qui permet au lecteur de découvrir des thèmes universels à travers une narration captivante.',
        10000,
        20,
        5,
        'les_miserables.jpg'
    );