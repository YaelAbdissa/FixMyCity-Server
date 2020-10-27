const permissions = [
    'create user',
    'view any user',
    'view user',
    'update user',
    'remove user',

    'create issue',
    'view any issue',
    'view issue',
    'update issue',
    'remove issue',

    'create municipal',
    'view any municipal',
    'view municipal',
    'update municipal',
    'remove municipal',
]

const roles = {
    admin: [...permissions],
    municipal: [
        'view issue',
        'update issue',
        'view any issue'
    ],
    user: [
        'view user',
        'update user',
        'create issue',
        'view any issue',
        'view issue',
        'update issue'
    ],
    
}

const users = [
    {
        username: 'admin',
        email: 'super@admin.com',
        password: 'superuser',
        roles: ['admin']
    }
]

const municipals = [
    { 
        name : "Addis Ketema Sub-city Administration",
        username : "addis_ketema",
        password : "addis_ketema",
    },
    { 
        name : "Akaky Kaliti Sub-city Administration",
        username : "akaki_kalit",
        password : "akaki_kalit",
    },
    { 
        name : "Arada Sub-City Administration ",
        username : "arada123",
        password : "arada123",
    },
    { 
        name : "Bole Sub City Administration",
        username : "bolebole12",
        password : "bolebole12",
    },
    { 
        name : "Gullele Sub City Administration",
        username : "gullele123",
        password : "gullele123",
    },
    { 
        name : "Kirkos Sub City Administration",
        username : "kirkos123",
        password : "kirkos123",
    },
    { 
        name : "Kolfe Keranio Sub City Administration",
        username : "kolfe_keranio",
        password : "kolfe_keranio",
    },
    { 
        name : "Lideta Sub City Administration",
        username : "lidet123",
        password : "lidet123",
    },
    { 
        name : "Nifas Silk_lafto Sub City Administration",
        username : "nefas_silk",
        password : "nefas_silk",
    },
    { 
        name : "Yeka Sub City Administration",
        username : "yekayeka12",
        password : "yekayeka12",

    }
]

module.exports = { permissions, roles, users, municipals }

