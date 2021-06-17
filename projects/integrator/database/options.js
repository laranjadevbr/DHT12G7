const {
    currency,
    getSalaryRange,
    getUnified,  
} = require('../utils');
const letter = [
    'a', 'b', 'c', 'd', 'e',
    'f', 'g', 'h', 'i', 'j',
    'k', 'l', 'm', 'n', 'o',
    'p', 'q', 'r', 's', 't',
    'u', 'v', 'w', 'x', 'y',
    'z',
];
let salary = [];
salary.push(['', false]);
let value = 1100;
for (let i = 1; i < 10; i++) {
    let min = i * value;
    let max = (i + 1) * value - 0.01;
    salary.push(['de ' + currency(min) + ' à ' + currency(max), true]);
}
let number = 10, title = 'Lorem ipsum, dolor sit amet consectetur adipisicing elit.', description = '';
for (let i = 0; i < number; i++) {
    description += 'Lorem ipsum, dolor sit amet consectetur adipisicing elit.' + ' ';
    description += 'Tempora, cumque voluptatum nemo commodi veniam iste saepe vitae odit amet quisquam totam!' + ' ';
    description += 'Est dolorum totam sequi officiis eaque consequatur optio necessitatibus!';
    description += i < number ? ' ' : '';
}
module.exports = {
    active : [
        ['', false],
        ['true', true],
        ['false', true],
    ],
    countrie : getUnified({
        a : [
            ['', false],
            ['a', false],
            ['', false],
            ['Abecásia', true],
            ['Afeganistão', true],
            ['África do Sul', true],
            ['Albânia', true],
            ['Alemanha', true],
            ['Andorra', true],
            ['Angola', true],
            ['Antígua', true],
            ['Arábia Saudita', true],
            ['Argélia', true],
            ['Argentina', true],
            ['Armênia', true],
            ['Austrália', true],
            ['Áustria', true],
            ['Azerbaijão', true],
        ],
        b : [
            ['', false],
            ['b', false],
            ['', false],
            ['Bahamas', true],
            ['Bahrein', true],
            ['Bangladesh', true],
            ['Barbados', true],
            ['Bélgica', true],
            ['Belize', true],
            ['Benim', true],
            ['Bielorrússia', true],
            ['Bolívia', true],
            ['Bósnia', true],
            ['Botswana', true],
            ['Brasil', true],
            ['Brunei', true],
            ['Bulgária', true],
            ['Burkina Faso', true],
            ['Burundi', true],
            ['Butão', true],
        ],
        c : [
            ['', false],
            ['c', false],
            ['', false],
            ['Cabo Verde', true],
            ['Camarões', true],
            ['Camboja', true],
            ['Canadá', true],
            ['Catar', true],
            ['Cazaquistão', true],
            ['Chade', true],
            ['Chile', true],
            ['China', true],
            ['Chipre', true],
            ['Cingapura', true],
            ['Colômbia', true],
            ['Comores', true],
            ['Congo', true],
            ['Coreia do Norte', true],
            ['Coreia do Sul', true],
            ['Costa do Marfim', true],
            ['Costa Rica', true],
            ['Croácia', true],
            ['Cuba', true],
        ],
        d : [
            ['', false],
            ['d', false],
            ['', false],
            ['Dinamarca', true],
            ['Djibouti', true],
            ['Dominica', true],
        ],
        e : [
            ['', false],
            ['e', false],
            ['', false],
            ['Egito', true],
            ['El Salvador', true],
            ['Emirados Árabes Unidos', true],
            ['Equador', true],
            ['Eritreia', true],
            ['Escócia', true],
            ['Eslováquia', true],
            ['Eslovênia', true],
            ['Espanha', true],
            ['Estados Federados da Micronésia', true],
            ['Estados Unidos da América', true],
            ['Estônia', true],
            ['Eswatini', true],
            ['Etiópia', true],
        ],
        f : [
            ['', false],
            ['f', false],
            ['', false],
            ['Fiji', true],
            ['Filipinas', true],
            ['Finlândia', true],
            ['França', true],
        ],
        g : [
            ['', false],
            ['g', false],
            ['', false],
            ['Gabão', true],
            ['Gâmbia', true],
            ['Gana', true],
            ['Geórgia', true],
            ['Granada', true],
            ['Grécia', true],
            ['Guatemala', true],
            ['Guiana', true],
            ['Guiné', true],
            ['Guiné-Bissau', true],
            ['Guiné Equatorial', true],
        ],
        h : [
            ['', false],
            ['h', false],
            ['', false],
            ['Haiti', true],
            ['Holanda', true],
            ['Honduras', true],
            ['Hungria', true],
        ],
        i : [
            ['', false],
            ['i', false],
            ['', false],
            ['Iêmen', true],
            ['Índia', true],
            ['Indonésia', true],
            ['Inglaterra', true],
            ['Irã', true],
            ['Iraque', true],
            ['Irlanda do Norte', true],
            ['Irlanda', true],
            ['Islândia', true],
            ['Israel', true],
            ['Itália', true],
        ],
        j : [
            ['', false],
            ['j', false],
            ['', false],
            ['Jamaica', true],
            ['Japão', true],
            ['Jordânia', true],
        ],
        k : [
            ['', false],
            ['k', false],
            ['', false],
            ['Kiribati', true],
            ['Kosovo', true],
            ['Kuwait', true],
        ],
        l : [
            ['', false],
            ['l', false],
            ['', false],
            ['Laos', true],
            ['Lesoto', true],
            ['Letônia', true],
            ['Líbano', true],
            ['Libéria', true],
            ['Líbia', true],
            ['Liechtenstein', true],
            ['Lituânia', true],
            ['Luxemburgo', true],
        ],
        m : [
            ['', false],
            ['m', false],
            ['', false],
            ['Macedônia do Norte', true],
            ['Madagascar', true],
            ['Malásia', true],
            ['Malawi', true],
            ['Maldivas', true],
            ['Mali', true],
            ['Malta', true],
            ['Marrocos', true],
            ['Marshall', true],
            ['Maurícia', true],
            ['Mauritânia', true],
            ['México', true],
            ['Mianmar', true],
            ['Micronésia', true],
            ['Moçambique', true],
            ['Moldávia', true],
            ['Mônaco', true],
            ['Mongólia', true],
            ['Montenegro', true],
        ],
        n : [
            ['', false],
            ['n', false],
            ['', false],
            ['Namíbia', true],
            ['Nauru', true],
            ['Nepal', true],
            ['Nicarágua', true],
            ['Níger', true],
            ['Nigéria', true],
            ['Noruega', true],
            ['Nova Zelândia', true],
        ],
        o : [
            ['', false],
            ['o', false],
            ['', false],
            ['Omã', true],
            ['Ossétia do Sul', true],
        ],
        p : [
            ['', false],
            ['p', false],
            ['', false],
            ['País de Gales', true],
            ['Países Baixos', true],
            ['Palau', true],
            ['Palestina', true],
            ['Panamá', true],
            ['Papua-Nova Guiné', true],
            ['Paquistão', true],
            ['Paraguai', true],
            ['Peru', true],
            ['Polônia', true],
            ['Portugal', true],
        ],
        q : [
            ['', false],
            ['q', false],
            ['', false],
            ['Qatar', true],
            ['Quênia', true],
            ['Quirguistão', true],
            ['Quiribati', true],
        ],
        r : [
            ['', false],
            ['r', false],
            ['', false],
            ['Reino Unido', true],
            ['República Árabe Saaraui Democrática', true],
            ['República Centro-Africana', true],
            ['República Democrática do Congo', true],
            ['República do Congo', true],
            ['República Dominicana', true],
            ['República Tcheca', true],
            ['República Turca de Chipre do Norte', true],
            ['Romênia', true],
            ['Ruanda', true],
            ['Rússia', true],
        ],
        s : [
            ['', false],
            ['s', false],
            ['', false],
            ['Salomão', true],
            ['Samoa', true],
            ['San Marino', true],
            ['Santa Lúcia', true],
            ['São Cristóvão e Névis', true],
            ['São Tomé e Príncipe', true],
            ['São Vicente e Granadinas', true],
            ['Senegal', true],
            ['Serra Leoa', true],
            ['Sérvia', true],
            ['Seychelles', true],
            ['Singapura', true],
            ['Síria', true],
            ['Somália', true],
            ['Sri Lanka', true],
            ['Suazilândia', true],
            ['Sudão do Sul', true],
            ['Sudão', true],
            ['Suécia', true],
            ['Suíça', true],
            ['Suriname', true],
        ],
        t : [
            ['', false],
            ['t', false],
            ['', false],
            ['Tailândia', true],
            ['Taiwan', true],
            ['Tajiquistão', true],
            ['Tanzânia', true],
            ['Tchéquia', true],
            ['Timor-Leste', true],
            ['Togo', true],
            ['Tonga', true],
            ['Trinidad', true],
            ['Tunísia', true],
            ['Turcomenistão', true],
            ['Turquia', true],
            ['Tuvalu', true],
        ],
        u : [
            ['', false],
            ['u', false],
            ['', false],
            ['Ucrânia', true],
            ['Uganda', true],
            ['Uruguai', true],
            ['Uzbequistão', true],
        ],
        v : [
            ['', false],
            ['v', false],
            ['', false],
            ['Vanuatu', true],
            ['Vaticano', true],
            ['Venezuela', true],
            ['Vietnã', true],
        ],
        z : [
            ['', false],
            ['z', false],
            ['', false],
            ['Zâmbia', true],
            ['Zimbábue', true],
        ],
    }, letter),
    emails : [
        'bol',
        'gmail',
        'hotmail',
        'outlook',
        'uol',
        'yahoo',
    ],
    genders : [
        ['', false],
        ['male', true],
        ['female', true],
    ],
    hobbies : [
        ['Acampar', true],
        ['Caminhar', true],
        ['Comer', true],
        ['Desenhar', true],
        ['Escrever', true],
        ['Estudar', true],
        ['Fazer Artesanato', true],
        ['Fotografar', true],
        ['Jogar Xadrez', true],
        ['Meditar', true],
        ['Nadar', true],
        ['Ouvir música', true],
        ['Pintur', true],
        ['Programar', true],
        ['Ver Televisão', true],
        ['Viajar', true],
        ['Voluntar', true],
    ],
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
    level : [
        ['', false],
        ['administrator', true],
        ['financial', true],
        ['manager', true],
        ['operational', true],
    ],
    lorem : {
        title : title,
        description : description,
    },
    names : {
        firstName : {
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
        lastName : [
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
    profession : getUnified({
        a : [
            ['', false],
            ['Administração, negócios e serviços', false],
            ['', false],
            ['Administração', true],
            ['Administração Pública', true],
            ['Agronegócios e Agropecuária', true],
            ['Ciências Aeronáuticas', true],
            ['Ciências Atuariais', true],
            ['Ciências Contábeis', true],
            ['Ciências Econômicas', true],
            ['Comércio Exterior', true],
            ['Defesa e Gestão Estratégica Internacional', true],
            ['Gastronomia', true],
            ['Gestão Comercial', true],
            ['Gestão de Recursos Humanos', true],
            ['Gestão de Segurança Privada', true],
            ['Gestão de Seguros', true],
            ['Gestão de Turismo', true],
            ['Gestão Financeira', true],
            ['Gestão Pública', true],
            ['Hotelaria', true],
            ['Logística', true],
            ['Marketing', true],
            ['Negócios Imobiliários', true],
            ['Pilotagem profissional de aeronaves', true],
            ['Processos Gerenciais', true],
            ['Segurança Pública', true],
            ['Turismo', true],
        ],
        b : [
            ['', false],
            ['Artes e Design', false],
            ['', false],
            ['Animação', true],
            ['Arquitetura e Urbanismo', true],
            ['Artes Visuais', true],
            ['Comunicação das Artes do Corpo', true],
            ['Conservação e Restauro', true],
            ['Dança', true],
            ['Design', true],
            ['Design de Games', true],
            ['Design de Interiores', true],
            ['Design de Moda', true],
            ['Fotografia', true],
            ['História da Arte', true],
            ['Jogos Digitais', true],
            ['Luteria', true],
            ['Música', true],
            ['Produção Cênica', true],
            ['Produção Fonográfica', true],
            ['Teatro', true],
        ],
        c : [
            ['', false],
            ['Ciências Biológicas e da Terra', false],
            ['', false],
            ['Agroecologia', true],
            ['Agronomia', true],
            ['Alimentos', true],
            ['Biocombustíveis', true],
            ['Biotecnologia', true],
            ['Biotecnologia e Bioquímica', true],
            ['Ciência e Tecnologia de Alimentos', true],
            ['Ciências Agrárias', true],
            ['Ciências Biológicas', true],
            ['Ciências Naturais e Exatas', true],
            ['Ecologia', true],
            ['Geofísica', true],
            ['Geologia', true],
            ['Gestão Ambiental', true],
            ['Medicina Veterinária', true],
            ['Meteorologia', true],
            ['Oceanografia', true],
            ['Produção de Bebidas', true],
            ['Produção Sucroalcooleira', true],
            ['Rochas Ornamentais', true],
            ['Zootecnia', true],
            ['Informática', true],
        ],
        d : [
            ['', false],
            ['Análise e Desenvolvimento de Sistemas', false],
            ['', false],
            ['Astronomia', true],
            ['Banco de Dados', true],
            ['Ciência da Computação', true],
            ['Ciência e Tecnologia', true],
            ['Computação', true],
            ['Estatística', true],
            ['Física', true],
            ['Gestão da Tecnologia da Informação', true],
            ['Informática Biomédica', true],
            ['Matemática', true],
            ['Nanotecnologia', true],
            ['Química', true],
            ['Redes de Computadores', true],
            ['Segurança da Informação', true],
            ['Sistemas de Informação', true],
            ['Sistemas para Internet', true],
        ],
        e : [
            ['', false],
            ['Ciências Sociais e Humanas', false],
            ['', false],
            ['Arqueologia', true],
            ['Ciências do Consumo', true],
            ['Ciências Humanas', true],
            ['Ciências Sociais', true],
            ['Cooperativismo', true],
            ['Direito', true],
            ['Escrita Criativa', true],
            ['Estudos de Gênero e Diversidade', true],
            ['Filosofia', true],
            ['Geografia', true],
            ['Gestão de Cooperativas', true],
            ['História', true],
            ['Letras', true],
            ['Libras', true],
            ['Linguística', true],
            ['Museologia', true],
            ['Pedagogia', true],
            ['Psicopedagogia', true],
            ['Relações Internacionais', true],
            ['Serviço Social', true],
            ['Serviços Judiciários e Notariais', true],
            ['Teologia', true],
            ['Tradutor e Intérprete', true],
        ],
        f : [
            ['', false],
            ['Comunicação e Informação', false],
            ['', false],
            ['Arquivologia', true],
            ['Biblioteconomia', true],
            ['Cinema e Audiovisual', true],
            ['Comunicação em Mídias Digitais', true],
            ['Comunicação Institucional', true],
            ['Comunicação Organizacional', true],
            ['Educomunicação', true],
            ['Estudos de Mídia', true],
            ['Eventos', true],
            ['Gestão da Informação', true],
            ['Jornalismo', true],
            ['Produção Audiovisual', true],
            ['Produção Cultural', true],
            ['Produção Editorial', true],
            ['Produção Multimídia', true],
            ['Produção Publicitária', true],
            ['Publicidade e Propaganda', true],
            ['Rádio, TV e Internet', true],
            ['Relações Públicas', true],
            ['Secretariado', true],
            ['Secretariado Executivo', true],
        ],
        g : [
            ['', false],
            ['Engenharia e Produção', false],
            ['', false],
            ['Agrimensura', true],
            ['Aquicultura', true],
            ['Automação Industrial', true],
            ['Construção Civil', true],
            ['Construção Naval', true],
            ['Eletrônica Industrial', true],
            ['Eletrotécnica Industrial', true],
            ['Energias Renováveis', true],
            ['Engenharia Acústica', true],
            ['Engenharia Aeronáutica', true],
            ['Engenharia Agrícola', true],
            ['Engenharia Ambiental e Sanitária', true],
            ['Engenharia Biomédica', true],
            ['Engenharia Bioquímica, de Bioprocessos e Biotecnologia', true],
            ['Engenharia Cartográfica e de Agrimensura', true],
            ['Engenharia Civil', true],
            ['Engenharia da Computação', true],
            ['Engenharia de Alimentos', true],
            ['Engenharia de Biossistemas', true],
            ['Engenharia de Controle e Automação', true],
            ['Engenharia de Energia', true],
            ['Engenharia de Inovação', true],
            ['Engenharia de Materiais', true],
            ['Engenharia de Minas', true],
            ['Engenharia de Pesca', true],
            ['Engenharia de Petróleo', true],
            ['Engenharia de Produção', true],
            ['Engenharia de Segurança no Trabalho', true],
            ['Engenharia de Sistemas', true],
            ['Engenharia de Software', true],
            ['Engenharia de Telecomunicações', true],
            ['Engenharia de Transporte e da Mobilidade', true],
            ['Engenharia Elétrica', true],
            ['Engenharia Eletrônica', true],
            ['Engenharia Física', true],
            ['Engenharia Florestal', true],
            ['Engenharia Hídrica', true],
            ['Engenharia Industrial Madeireira', true],
            ['Engenharia Mecânica', true],
            ['Engenharia Mecatrônica', true],
            ['Engenharia Metalúrgica', true],
            ['Engenharia Naval', true],
            ['Engenharia Nuclear', true],
            ['Engenharia Química', true],
            ['Engenharia Têxtil', true],
            ['Fabricação Mecânica', true],
            ['Geoprocessamento', true],
            ['Gestão da Produção Industrial', true],
            ['Gestão da Qualidade', true],
            ['Irrigação e Drenagem', true],
            ['Manutenção de aeronaves', true],
            ['Manutenção Industrial', true],
            ['Materiais', true],
            ['Mecatrônica Industrial', true],
            ['Mineração', true],
            ['Papel e Celulose', true],
            ['Petróleo e Gás', true],
            ['Processos Metalúrgicos', true],
            ['Processos Químicos', true],
            ['Produção Têxtil', true],
            ['Saneamento Ambiental', true],
            ['Segurança no Trabalho', true],
            ['Silvicultura', true],
            ['Sistemas Biomédicos', true],
            ['Sistemas de Telecomunicações', true],
            ['Sistemas Elétricos', true],
            ['Sistemas Embarcados', true],
            ['Transporte', true],
        ],
        h : [
            ['', false],
            ['Saúde e Bem-estar', false],
            ['', false],
            ['Biomedicina', true],
            ['Educação Física', true],
            ['Enfermagem', true],
            ['Esporte', true],
            ['Estética e Cosmética', true],
            ['Farmácia', true],
            ['Fisioterapia', true],
            ['Fonoaudiologia', true],
            ['Gerontologia', true],
            ['Gestão Desportiva e de Lazer', true],
            ['Gestão em Saúde', true],
            ['Gestão Hospitalar', true],
            ['Medicina', true],
            ['Musicoterapia', true],
            ['Naturologia', true],
            ['Nutrição', true],
            ['Obstetrícia', true],
            ['Odontologia', true],
            ['Oftálmica', true],
            ['Optometria', true],
            ['Psicologia', true],
            ['Quiropraxia', true],
            ['Radiologia', true],
            ['Saúde Coletiva', true],
            ['Terapia Ocupacional', true],
        ]
    }, letter),
    salary : salary,
    status : [
        ['', false],
        ['Casado', true],
        ['Separado', true],
        ['Divorciado', true],
        ['Viúvo', true],
    ],
    uf : [
        ['', false],
        ['AC', true],
        ['AL', true],
        ['AP', true],
        ['AM', true],
        ['BA', true],
        ['CE', true],
        ['DF', true],
        ['ES', true],
        ['GO', true],
        ['MA', true],
        ['MT', true],
        ['MS', true],
        ['MG', true],
        ['PA', true],
        ['PB', true],
        ['PR', true],
        ['PE', true],
        ['PI', true],
        ['RJ', true],
        ['RN', true],
        ['RS', true],
        ['RO', true],
        ['RR', true],
        ['SC', true],
        ['SP', true],
        ['SE', true],
        ['TO', true],
    ],
};