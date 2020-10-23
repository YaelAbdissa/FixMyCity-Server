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
    user: [
        'view user',
        'update user',

        'create issue',
        'view any issue',
        'view issue',
        'update issue',
    ],
    municipal: [
        'view issue',
        'update issue',
        'view any issue',
    ]
}

const users = [
    {
        username: 'admin',
        email: 'super@admin.com',
        password: 'superuser',
        roles: ['admin']
    },
    ,
    {
        username : 'user', 
        email : 'user@rmail.com',
        password : 'password',
        roles : ['user']
    }
]

const municipals = [
    { 
        name : "Addis Ketema Sub-city Administration",
        username : "addis_ketema",
        password : "addis_ketema",
        roles : ['municipal']

    },
    { 
        name : "Akaky Kaliti Sub-city Administration",
        username : "akaki_kalit",
        password : "akaki_kalit",
        roles : ['municipal']
        
    },
    { 
        name : "Arada Sub-City Administration ",
        username : "arada123",
        password : "arada123",
        roles : ['municipal']
        
    },
    { 
        name : "Bole Sub City Administration",
        username : "bolebole12",
        password : "bolebole12",
        roles : ['municipal']
        
    },
    { 
        name : "Gullele Sub City Administration",
        username : "gullele123",
        password : "gullele123",
        roles : ['municipal']
        
    },
    { 
        name : "Kirkos Sub City Administration",
        username : "kirkos123",
        password : "kirkos123",
        roles : ['municipal']
        
    },
    { 
        name : "Kolfe Keranio Sub City Administration",
        username : "kolfe_keranio",
        password : "kolfe_keranio",
        roles : ['municipal']
        
    },
    { 
        name : "Lideta Sub City Administration",
        username : "lidet123",
        password : "lidet123",
        roles : ['municipal']
        
    },
    { 
        name : "Nifas Silk_lafto Sub City Administration",
        username : "nefas_silk",
        password : "nefas_silk",
        roles : ['municipal']
        
    },
    { 
        name : "Yeka Sub City Administration",
        username : "yekayeka12",
        password : "yekayeka12",
        roles : ['municipal']
         
    }
]

module.exports = { permissions, roles, users, municipals }

