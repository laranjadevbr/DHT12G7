const {
    arrayUnifier,
    getSalaryRange,
    objectCreator,
} = require('../utils');
const L = [
    'a', 'b', 'c', 'd', 'e',
    'f', 'g', 'h', 'i', 'j',
    'k', 'l', 'm', 'n', 'o',
    'p', 'q', 'r', 's', 't',
    'u', 'v', 'w', 'x', 'y',
    'z',
];
let number = 10, title = 'Lorem ipsum, dolor sit amet consectetur adipisicing elit.', description = '';
for (let i = 0; i < number; i++) {
    description += 'Lorem ipsum, dolor sit amet consectetur adipisicing elit.' + ' ';
    description += 'Tempora, cumque voluptatum nemo commodi veniam iste saepe vitae odit amet quisquam totam!' + ' ';
    description += 'Est dolorum totam sequi officiis eaque consequatur optio necessitatibus!';
    description += i < number ? ' ' : '';
};
module.exports = {
    boolean : objectCreator([
        'true',
        'false',
    ]),
    emails : objectCreator([
        'bol',
        'gmail',
        'hotmail',
        'outlook',
        'uol',
        'yahoo',
    ]),
    generous : objectCreator([
        'male',
        'female',
    ]),
    lorem : {
        title : title,
        description : description,
    },
    lengths : {
        cep : '05109-200'['length'],
        cnh : '01234567890'['length'],
        cnpj : '12.345.678/1234-56'['length'],
        cpf : '224.680.508-27'['length'],
        passport : 'BR123456'['length'],
        phone : '(11) 94005-8153'['length'],
        rg : '35.705.298-3'['length'],
        uf : 'sp'['length'],
    },
    hobbies : objectCreator([
        'acampar',
        'caminhar',
        'comer',
        'desenhar',
        'escrever',
        'estudar',
        'fazer artesanato',
        'fotografar',
        'jogar xadrez',
        'meditar',
        'nadar',
        'ouvir música',
        'pintur',
        'programar',
        'ver televisão',
        'viajar',
        'voluntar',
    ]),
    inputType : [
        'button',
        'checkbox',
        'color',
        'date',
        'datetime-local',
        'email',
        'file',
        'hidden',
        'image',
        'month',
        'number',
        'password',
        'radio',
        'range',
        'reset',
        'search',
        'submit',
        'tel',
        'text',
        'time',
        'url',
        'week',
    ],
    level : objectCreator([
        'administrator',
        'financial',
        'manager',
        'operational',
    ]),
    name : {
        first : {
            female : [
                'Ana',
                'Beatriz',
                'Carolina',
                'Catarina',
                'Francisca',
                'Leonor',
                'Madalena',
                'Maria',
                'Mariana',
                'Matilde',
            ],
            male : [
                'Afonso',
                'Diogo',
                'Francisco',
                'João',
                'Martim',
                'Miguel',
                'Rodrigo',
                'Santiago',
                'Tiago',
                'Tomás',
            ],
        },
        last : [
            'Albuquerque',
            'Almeida',
            'Álvares',
            'Alves',
            'Braga',
            'Bragança',
            'Cardoso',
            'Carvalho',
            'Castro',
            'Coimbra',
            'Correia',
            'Costa',
            'da Gama',
            'da Veiga',
            'de Caminha',
            'Fernandes',
            'Ferreira',
            'Fonseca',
            'Gomes',
            'Gonçalves',
            'Guimarães',
            'Henriques',
            'Jesus',
            'Lopes',
            'Marques',
            'Martins',
            'Mendes',
            'Moreira',
            'Nunes',
            'Oliveira',
            'Pereira',
            'Pinto',
            'Ribeiro',
            'Rodrigues',
            'Sampaio',
            'Santos',
            'Silva',
            'Sousa',
            'Teixeira',
            'Vaz',
        ],
    },
    salary : getSalaryRange(1000, 10),
    status : objectCreator([
        'casado',
        'separado',
        'divorciado',
        'viúvo',
    ]),
    uf : objectCreator([
        'AC',
        'AL',
        'AP',
        'AM',
        'BA',
        'CE',
        'DF',
        'ES',
        'GO',
        'MA',
        'MT',
        'MS',
        'MG',
        'PA',
        'PB',
        'PR',
        'PE',
        'PI',
        'RJ',
        'RN',
        'RS',
        'RO',
        'RR',
        'SC',
        'SP',
        'SE',
        'TO',
    ]),
    profession : objectCreator(arrayUnifier({
        a : [
            // 'Administração, negócios e serviços',
            'Administração',
            'Administração Pública',
            'Agronegócios e Agropecuária',
            'Ciências Aeronáuticas',
            'Ciências Atuariais',
            'Ciências Contábeis',
            'Ciências Econômicas',
            'Comércio Exterior',
            'Defesa e Gestão Estratégica Internacional',
            'Gastronomia',
            'Gestão Comercial',
            'Gestão de Recursos Humanos',
            'Gestão de Segurança Privada',
            'Gestão de Seguros',
            'Gestão de Turismo',
            'Gestão Financeira',
            'Gestão Pública',
            'Hotelaria',
            'Logística',
            'Marketing',
            'Negócios Imobiliários',
            'Pilotagem profissional de aeronaves',
            'Processos Gerenciais',
            'Segurança Pública',
            'Turismo',
        ],
        b : [
            // 'Artes e Design',
            'Animação',
            'Arquitetura e Urbanismo',
            'Artes Visuais',
            'Comunicação das Artes do Corpo',
            'Conservação e Restauro',
            'Dança',
            'Design',
            'Design de Games',
            'Design de Interiores',
            'Design de Moda',
            'Fotografia',
            'História da Arte',
            'Jogos Digitais',
            'Luteria',
            'Música',
            'Produção Cênica',
            'Produção Fonográfica',
            'Teatro',
        ],
        c : [
            // 'Ciências Biológicas e da Terra',
            'Agroecologia',
            'Agronomia',
            'Alimentos',
            'Biocombustíveis',
            'Biotecnologia',
            'Biotecnologia e Bioquímica',
            'Ciência e Tecnologia de Alimentos',
            'Ciências Agrárias',
            'Ciências Biológicas',
            'Ciências Naturais e Exatas',
            'Ecologia',
            'Geofísica',
            'Geologia',
            'Gestão Ambiental',
            'Medicina Veterinária',
            'Meteorologia',
            'Oceanografia',
            'Produção de Bebidas',
            'Produção Sucroalcooleira',
            'Rochas Ornamentais',
            'Zootecnia',
            'Informática',
        ],
        d : [
            // 'Análise e Desenvolvimento de Sistemas',
            'Astronomia',
            'Banco de Dados',
            'Ciência da Computação',
            'Ciência e Tecnologia',
            'Computação',
            'Estatística',
            'Física',
            'Gestão da Tecnologia da Informação',
            'Informática Biomédica',
            'Matemática',
            'Nanotecnologia',
            'Química',
            'Redes de Computadores',
            'Segurança da Informação',
            'Sistemas de Informação',
            'Sistemas para Internet',
        ],
        e : [
            // 'Ciências Sociais e Humanas',
            'Arqueologia',
            'Ciências do Consumo',
            'Ciências Humanas',
            'Ciências Sociais',
            'Cooperativismo',
            'Direito',
            'Escrita Criativa',
            'Estudos de Gênero e Diversidade',
            'Filosofia',
            'Geografia',
            'Gestão de Cooperativas',
            'História',
            'Letras',
            'Libras',
            'Linguística',
            'Museologia',
            'Pedagogia',
            'Psicopedagogia',
            'Relações Internacionais',
            'Serviço Social',
            'Serviços Judiciários e Notariais',
            'Teologia',
            'Tradutor e Intérprete',
        ],
        f : [
            // 'Comunicação e Informação',
            'Arquivologia',
            'Biblioteconomia',
            'Cinema e Audiovisual',
            'Comunicação em Mídias Digitais',
            'Comunicação Institucional',
            'Comunicação Organizacional',
            'Educomunicação',
            'Estudos de Mídia',
            'Eventos',
            'Gestão da Informação',
            'Jornalismo',
            'Produção Audiovisual',
            'Produção Cultural',
            'Produção Editorial',
            'Produção Multimídia',
            'Produção Publicitária',
            'Publicidade e Propaganda',
            'Rádio, TV e Internet',
            'Relações Públicas',
            'Secretariado',
            'Secretariado Executivo',
        ],
        g : [
            // 'Engenharia e Produção',
            'Agrimensura',
            'Aquicultura',
            'Automação Industrial',
            'Construção Civil',
            'Construção Naval',
            'Eletrônica Industrial',
            'Eletrotécnica Industrial',
            'Energias Renováveis',
            'Engenharia Acústica',
            'Engenharia Aeronáutica',
            'Engenharia Agrícola',
            'Engenharia Ambiental e Sanitária',
            'Engenharia Biomédica',
            'Engenharia Bioquímica, de Bioprocessos e Biotecnologia',
            'Engenharia Cartográfica e de Agrimensura',
            'Engenharia Civil',
            'Engenharia da Computação',
            'Engenharia de Alimentos',
            'Engenharia de Biossistemas',
            'Engenharia de Controle e Automação',
            'Engenharia de Energia',
            'Engenharia de Inovação',
            'Engenharia de Materiais',
            'Engenharia de Minas',
            'Engenharia de Pesca',
            'Engenharia de Petróleo',
            'Engenharia de Produção',
            'Engenharia de Segurança no Trabalho',
            'Engenharia de Sistemas',
            'Engenharia de Software',
            'Engenharia de Telecomunicações',
            'Engenharia de Transporte e da Mobilidade',
            'Engenharia Elétrica',
            'Engenharia Eletrônica',
            'Engenharia Física',
            'Engenharia Florestal',
            'Engenharia Hídrica',
            'Engenharia Industrial Madeireira',
            'Engenharia Mecânica',
            'Engenharia Mecatrônica',
            'Engenharia Metalúrgica',
            'Engenharia Naval',
            'Engenharia Nuclear',
            'Engenharia Química',
            'Engenharia Têxtil',
            'Fabricação Mecânica',
            'Geoprocessamento',
            'Gestão da Produção Industrial',
            'Gestão da Qualidade',
            'Irrigação e Drenagem',
            'Manutenção de aeronaves',
            'Manutenção Industrial',
            'Materiais',
            'Mecatrônica Industrial',
            'Mineração',
            'Papel e Celulose',
            'Petróleo e Gás',
            'Processos Metalúrgicos',
            'Processos Químicos',
            'Produção Têxtil',
            'Saneamento Ambiental',
            'Segurança no Trabalho',
            'Silvicultura',
            'Sistemas Biomédicos',
            'Sistemas de Telecomunicações',
            'Sistemas Elétricos',
            'Sistemas Embarcados',
            'Transporte',
        ],
        h : [
            // 'Saúde e Bem-estar',
            'Biomedicina',
            'Educação Física',
            'Enfermagem',
            'Esporte',
            'Estética e Cosmética',
            'Farmácia',
            'Fisioterapia',
            'Fonoaudiologia',
            'Gerontologia',
            'Gestão Desportiva e de Lazer',
            'Gestão em Saúde',
            'Gestão Hospitalar',
            'Medicina',
            'Musicoterapia',
            'Naturologia',
            'Nutrição',
            'Obstetrícia',
            'Odontologia',
            'Oftálmica',
            'Optometria',
            'Psicologia',
            'Quiropraxia',
            'Radiologia',
            'Saúde Coletiva',
            'Terapia Ocupacional',
        ],
    }, L)),
    countrie : objectCreator(arrayUnifier({
        a : [
            'Abecásia',
            'Afeganistão',
            'África do Sul',
            'Albânia',
            'Alemanha',
            'Andorra',
            'Angola',
            'Antígua',
            'Arábia Saudita',
            'Argélia',
            'Argentina',
            'Armênia',
            'Austrália',
            'Áustria',
            'Azerbaijão',
        ],
        b : [
            'Bahamas',
            'Bahrein',
            'Bangladesh',
            'Barbados',
            'Bélgica',
            'Belize',
            'Benim',
            'Bielorrússia',
            'Bolívia',
            'Bósnia',
            'Botswana',
            'Brasil',
            'Brunei',
            'Bulgária',
            'Burkina Faso',
            'Burundi',
            'Butão',
        ],
        c : [
            'Cabo Verde',
            'Camarões',
            'Camboja',
            'Canadá',
            'Catar',
            'Cazaquistão',
            'Chade',
            'Chile',
            'China',
            'Chipre',
            'Cingapura',
            'Colômbia',
            'Comores',
            'Congo',
            'Coreia do Norte',
            'Coreia do Sul',
            'Costa do Marfim',
            'Costa Rica',
            'Croácia',
            'Cuba',
        ],
        d : [
            'Dinamarca',
            'Djibouti',
            'Dominica',
        ],
        e : [
            'Egito',
            'El Salvador',
            'Emirados Árabes Unidos',
            'Equador',
            'Eritreia',
            'Escócia',
            'Eslováquia',
            'Eslovênia',
            'Espanha',
            'Estados Federados da Micronésia',
            'Estados Unidos da América',
            'Estônia',
            'Eswatini',
            'Etiópia',
        ],
        f : [
            'Fiji',
            'Filipinas',
            'Finlândia',
            'França',
        ],
        g : [
            'Gabão',
            'Gâmbia',
            'Gana',
            'Geórgia',
            'Granada',
            'Grécia',
            'Guatemala',
            'Guiana',
            'Guiné',
            'Guiné-Bissau',
            'Guiné Equatorial',
        ],
        h : [
            'Haiti',
            'Holanda',
            'Honduras',
            'Hungria',
        ],
        i : [
            'Iêmen',
            'Índia',
            'Indonésia',
            'Inglaterra',
            'Irã',
            'Iraque',
            'Irlanda do Norte',
            'Irlanda',
            'Islândia',
            'Israel',
            'Itália',
        ],
        j : [
            'Jamaica',
            'Japão',
            'Jordânia',
        ],
        k : [
            'Kiribati',
            'Kosovo',
            'Kuwait',
        ],
        l : [
            'Laos',
            'Lesoto',
            'Letônia',
            'Líbano',
            'Libéria',
            'Líbia',
            'Liechtenstein',
            'Lituânia',
            'Luxemburgo',
        ],
        m : [
            'Macedônia do Norte',
            'Madagascar',
            'Malásia',
            'Malawi',
            'Maldivas',
            'Mali',
            'Malta',
            'Marrocos',
            'Marshall',
            'Maurícia',
            'Mauritânia',
            'México',
            'Mianmar',
            'Micronésia',
            'Moçambique',
            'Moldávia',
            'Mônaco',
            'Mongólia',
            'Montenegro',
        ],
        n : [
            'Namíbia',
            'Nauru',
            'Nepal',
            'Nicarágua',
            'Níger',
            'Nigéria',
            'Noruega',
            'Nova Zelândia',
        ],
        o : [
            'Omã',
            'Ossétia do Sul',
        ],
        p : [
            'País de Gales',
            'Países Baixos',
            'Palau',
            'Palestina',
            'Panamá',
            'Papua-Nova Guiné',
            'Paquistão',
            'Paraguai',
            'Peru',
            'Polônia',
            'Portugal',
        ],
        q : [
            'Qatar',
            'Quênia',
            'Quirguistão',
            'Quiribati',
        ],
        r : [
            'Reino Unido',
            'República Árabe Saaraui Democrática',
            'República Centro-Africana',
            'República Democrática do Congo',
            'República do Congo',
            'República Dominicana',
            'República Tcheca',
            'República Turca de Chipre do Norte',
            'Romênia',
            'Ruanda',
            'Rússia',
        ],
        s : [
            'Salomão',
            'Samoa',
            'San Marino',
            'Santa Lúcia',
            'São Cristóvão e Névis',
            'São Tomé e Príncipe',
            'São Vicente e Granadinas',
            'Senegal',
            'Serra Leoa',
            'Sérvia',
            'Seychelles',
            'Singapura',
            'Síria',
            'Somália',
            'Sri Lanka',
            'Suazilândia',
            'Sudão do Sul',
            'Sudão',
            'Suécia',
            'Suíça',
            'Suriname',
        ],
        t : [
            'Tailândia',
            'Taiwan',
            'Tajiquistão',
            'Tanzânia',
            'Tchéquia',
            'Timor-Leste',
            'Togo',
            'Tonga',
            'Trinidad',
            'Tunísia',
            'Turcomenistão',
            'Turquia',
            'Tuvalu',
        ],
        u : [
            'Ucrânia',
            'Uganda',
            'Uruguai',
            'Uzbequistão',
        ],
        v : [
            'Vanuatu',
            'Vaticano',
            'Venezuela',
            'Vietnã',
        ],
        z : [
            'Zâmbia',
            'Zimbábue',
        ],
    }, L)),
};