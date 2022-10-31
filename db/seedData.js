const beers = [
    {   name: 'Yuengling',
        description: '12pk Bottles - Light lager beer', 
        price: 12.99,
        category: 'beer',
        quantity: 100,
        img: 'https://origlio-marketing-product-images.s3.amazonaws.com/BrandSub_Yuengling-Lager.png'
    },

    {   name: 'Lagunitas IPA',
        price: 21.99,
        description: '12pk IPA',
        category: 'beer',
        quantity: 100,
        img: 'https://beverages2u.com/wp-content/uploads/2021/11/lagunitas-ip.png'
    },

    {   name: 'New Belgium Fat Tire Amber Ale',
        price: 16.99,
        description: '12pk Ale',
        category: 'beer',
        quantity: 100,
        img: 'https://www.teamcone.net/wp-content/uploads/2017/06/cone__0129_Fat_TIre_22oz_Bottle.png'
    },

    {   name: 'New Belgium Voodoo Ranger Imperial IPA',
        price: 21.99,
        description: '12pk IPA',
        category: 'beer',
        quantity: 100,
        img: 'https://halftimebeverage.com/media/catalog/product/cache/406910956a4e477188a661c40dcd3999/1/8/18729.png'
    },

    {   name: 'Sierra Nevada Hazy Little Thing IPA',
        price: 17.99,
        description: '12pk IPA',
        category: 'beer',
        quantity: 100,
        img: 'https://cdn.shoplightspeed.com/shops/652868/files/44471659/650x750x2/sierra-nevada-hazy-little-thing-ipa-192oz-single.jpg'
    },

];

const wines = [
    {   name: "Menage a trois",
        price: 12,
        description: "Merlot, Red",
        category: 'wine',
        quantity: 100,
        img: "https://images.vivino.com/thumbs/qxm4X_OqSaeZJCQP20QYKg_pb_x960.png"
    },

    {   name: "Napa Valley Peju",
        price: 70,
        description: "Merlot, Red",
        category: 'wine',
        quantity: 100,
        img: "https://www.totalwine.com/dynamic/490x/media/sys_master/twmmedia/h20/hf4/8809245671454.png"
    },
    
    {   name: "Castello Poggio",
        price: 20,
        description: "Moscato, White",
        category: 'wine',
        quantity: 100,
        img: "https://www.winedeals.com/media/catalog/product/cache/400a650acef16caf799ce948294c4e36/c/a/castello_poggio_moscato_mv_750.png"
    },
    
    {   name: "Canoe Ridge “Expedition”",
        price: 28,
        description: "Merlot, Red",
        category: 'wine',
        quantity: 100,
        img: "https://images.vivino.com/thumbs/pFMmcmX4R5CndE-nLiQGXg_pb_x600.png"
    },
    
    {   name: "Duck Horn",
        price: 95,
        description: "Merlot, Red",
        category: 'wine',
        quantity: 100,
        img: "https://images.vivino.com/thumbs/st-OxfEYTZiNtIFdGHbUhA_pb_x600.png"
    },
    
    {   name: 'Grace Family “Blank Vineyards”',
        price: 215,
        description: 'Cabernet, Red',
        category: 'wine',
        quantity: 100,
        img: 'https://www.totalwine.com/dynamic/x490,sq/media/sys_master/twmmedia/hef/h48/9121269841950.png'
    },
    
    {   name: 'Alchemist',
        price: 52,
        description: 'Pinot Noir, Red',
        category: 'wine',
        quantity: 100,
        img: 'https://images.vivino.com/thumbs/bQqz1ey4R1-2J8Mfke-xOg_pb_600x600.png'   
    },
    
    {   name: 'Underwood',
        price: 30,
        description: 'Pinot Noir, Red',
        category: 'wine',
        quantity: 100,
        img: 'https://cdn.shopify.com/s/files/1/0107/5150/8544/products/underwoodpinot_1800x.png?v=1649045752'
    },
    
    {   name: 'Concha y Toro Frontera',
        price: 119.99,
        description: 'Cabernet Sauvignon, Red',
        category: 'wine',
        quantity: 100,
        img: 'https://www.winedeals.com/media/catalog/product/cache/f8d2cb12a17084a7445beefcce31e97a/f/r/frontera_cab_merlot_16mv_15.png'
    },
    
    {   name: 'Chimney Rock',
        price: 213.99,
        description: 'Cabernet Sauvignon, Red',
        category: 'wine',
        quantity: 100,
        img: 'https://www.uncorked.com/dw/image/v2/BCCB_PRD/on/demandware.static/-/Sites-masterCatalog_terlato/default/dwa624f478/Terlato_com_Product_Images/Chimney_Rock/terlato-cimney-rock-sld-cab-3000x3000.png?sw=800&sh=800&sm=fit'
    }
];

const spirits = [
	{
		name: '135 East Hyogo',
		price: 29.99,
		description: 'Japanese Dry Gin',
		category: 'spirit',
		quantity: 100,
		img: 'https://www.totalwine.com/dynamic/490x/media/sys_master/twmmedia/h5c/hde/13390802944030.png',
	},

	{
		name: 'Don Julio 1942 Anejo',
		price: 179.99,
		description: 'Tequila',
		category: 'spirit',
		quantity: 100,
		img: 'https://www.donjulio.com/static/images/product-1942.png',
	},

	{
		name: 'Casamigos Blanco',
		price: 48.99,
		description: 'Tequila',
		category: 'spirit',
		quantity: 100,
		img: 'https://www.totalwine.com/dynamic/x490,sq/media/sys_master/twmmedia/h24/h94/10940880879646.png',
	},

    {   name: 'Sagamore Spirit',
        price: 39.99,
        description: 'Whiskey',
        category: 'spirit',
        quantity: 100,
        img: 'https://cdn11.bigcommerce.com/s-u9ww3di/images/stencil/1280x1280/products/11005/16398/SAGAMORE_SPIRIT_8YR__09766.1633218713.png?c=2'
    },

	{
		name: 'George Dickel X Leopold Bros',
		price: 109.99,
		description: 'Rye Whiskey',
		category: 'spirit',
		quantity: 100,
		img: 'https://www.totalwine.com/dynamic/x490,sq/media/sys_master/twmmedia/hfc/h8c/15408416030750.png',
	},

	{
		name: 'Ardbeg An Oa',
		price: 61.99,
		description: 'Scotch Whisky',
		category: 'spirit',
		quantity: 100,
		img: 'https://cdn.flaviar.com/cache/default_large/upload/media/default/0001/03/a857935e96b8505bcfd8c8fba0b70045a595f8b2.png',
	},

	{
		name: 'The Balvenie ',
		price: 449.99,
		description: 'Tun 1509',
		category: 'spirit',
		quantity: 100,
		img: 'https://cdn.flaviar.com/cache/default_large/upload/media/default/0001/04/541c4ce215b58bd746cbbbc29eb1d5fe6ee27482.png',
	},

	{
		name: 'Hibiki Suntory Harmony',
		price: 102.99,
		description: 'Japanese Whisky',
		category: 'spirit',
		quantity: 100,
		img: 'https://cdn.flaviar.com/cache/default_large/upload/media/default/0001/08/0717545ab11ffbd1f83266beb6be91ff06be560c.png',
	},

    {   name: 'Dalmore Single Malt',
        price: 5999.99,
        description: '35year Scotch',
        category: 'spirit',
        quantity: 100,
        img: 'https://static.whiskybase.com/storage/whiskies/8/7/419/222308-normal.png'
    },
];

const initialUsers = [
	{
		username: 'JohnSnow',
		password: 'winteriscoming',
		email: 'king@inthenorth.com',
		admin: false,
	},
	{
		username: 'admin',
		password: 'admin',
		email: 'admin@admin.com',
		admin: true,
	},
	{
		username: 'ketsy',
		password: 'ketsy',
		email: 'ketsy@ketsy.com',
		admin: true,
	},
	{
		username: 'cameron',
		password: 'cameron',
		email: 'cameron@cameron.com',
		admin: true,
	},
	{
		username: 'kenny',
		password: 'kenny',
		email: 'kenny@kenny.com',
		admin: true,
	},
];

module.exports = {
	beers,
	wines,
	spirits,
	initialUsers,
};
