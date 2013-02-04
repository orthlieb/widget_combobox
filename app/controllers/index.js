function doClick(e) {  
    alert($.label.text);
}

var countries = {
	afg: { title: 'Afghanistan' }, ala: { title: 'Aland Islands' }, alb: { title: 'Albania' }, dza: { title: 'Algeria' }, asm: { title: 'American Samoa' }, 
	and: { title: 'Andorra' }, ago: { title: 'Angola' }, aia: { title: 'Anguilla' }, ata: { title: 'Antarctica' }, atg: { title: 'Antigua and Barbuda' }, 
	arg: { title: 'Argentina' }, arm: { title: 'Armenia' }, abw: { title: 'Aruba' }, aus: { title: 'Australia' }, aut: { title: 'Austria' }, 
	aze: { title: 'Azerbaijan' }, bhs: { title: 'Bahamas' }, bhr: { title: 'Bahrain' }, bgd: { title: 'Bangladesh' }, brb: { title: 'Barbados' }, 
	blr: { title: 'Belarus' }, bel: { title: 'Belgium' }, blz: { title: 'Belize' }, ben: { title: 'Benin' }, bmu: { title: 'Bermuda' }, 
	btn: { title: 'Bhutan' }, bol: { title: 'Bolivia' }, bih: { title: 'Bosnia and Herzegovina' }, bwa: { title: 'Botswana' }, bvt: { title: 'Bouvet Island' }, 
	bra: { title: 'Brazil' }, vgb: { title: 'British Virgin Islands' }, iot: { title: 'British Indian Ocean Territory' }, brn: { title: 'Brunei Darussalam' }, 
	bgr: { title: 'Bulgaria' }, bfa: { title: 'Burkina Faso' }, bdi: { title: 'Burundi' }, khm: { title: 'Cambodia' }, cmr: { title: 'Cameroon' }, 
	can: { title: 'Canada' }, cpv: { title: 'Cape Verde' }, cym: { title: 'Cayman Islands' }, caf: { title: 'Central African Republic' }, tcd: { title: 'Chad' }, 
	chl: { title: 'Chile' }, chn: { title: 'China' }, hkg: { title: 'Hong Kong, Special Administrative Region of China' }, 
	mac: { title: 'Macao, Special Administrative Region of China' }, cxr: { title: 'Christmas Island' }, cck: { title: 'Cocos (Keeling) Islands' }, 
	col: { title: 'Colombia' }, com: { title: 'Comoros' }, cog: { title: 'Congo (Brazzaville)' }, cod: { title: 'Congo, Democratic Republic of the' }, 
	cok: { title: 'Cook Islands' }, cri: { title: 'Costa Rica' }, civ: { title: 'Côte d\'Ivoire' }, hrv: { title: 'Croatia' }, cub: { title: 'Cuba' }, cyp: { title: 'Cyprus' }, 
	cze: { title: 'Czech Republic' }, dnk: { title: 'Denmark' }, dji: { title: 'Djibouti' }, dma: { title: 'Dominica' }, dom: { title: 'Dominican Republic' }, 
	ecu: { title: 'Ecuador' }, egy: { title: 'Egypt' }, slv: { title: 'El Salvador' }, gnq: { title: 'Equatorial Guinea' }, eri: { title: 'Eritrea' }, 
	est: { title: 'Estonia' }, eth: { title: 'Ethiopia' }, flk: { title: 'Falkland Islands (Malvinas)' }, fro: { title: 'Faroe Islands' }, fji: { title: 'Fiji' }, 
	fin: { title: 'Finland' }, fra: { title: 'France' }, guf: { title: 'French Guiana' }, pyf: { title: 'French Polynesia' }, atf: { title: 'French Southern Territories' }, 
	gab: { title: 'Gabon' }, gmb: { title: 'Gambia' }, geo: { title: 'Georgia' }, deu: { title: 'Germany' }, gha: { title: 'Ghana' }, gib: { title: 'Gibraltar' }, 
	grc: { title: 'Greece' }, grl: { title: 'Greenland' }, grd: { title: 'Grenada' }, glp: { title: 'Guadeloupe' }, gum: { title: 'Guam' }, gtm: { title: 'Guatemala' }, 
	ggy: { title: 'Guernsey' }, gin: { title: 'Guinea' }, gnb: { title: 'Guinea-Bissau' }, guy: { title: 'Guyana' }, hti: { title: 'Haiti' }, 
	hmd: { title: 'Heard Island and Mcdonald Islands' }, vat: { title: 'Holy See (Vatican City State)' }, hnd: { title: 'Honduras' }, hun: { title: 'Hungary' }, 
	isl: { title: 'Iceland' }, ind: { title: 'India' }, idn: { title: 'Indonesia' }, irn: { title: 'Iran, Islamic Republic of' }, irq: { title: 'Iraq' }, 
	irl: { title: 'Ireland' }, imn: { title: 'Isle of Man' }, isr: { title: 'Israel' }, ita: { title: 'Italy' }, jam: { title: 'Jamaica' }, jpn: { title: 'Japan' }, 
	jey: { title: 'Jersey' }, jor: { title: 'Jordan' }, kaz: { title: 'Kazakhstan' }, ken: { title: 'Kenya' }, kir: { title: 'Kiribati' }, 
	prk: { title: 'Korea, Democratic People\'s Republic of' }, kor: { title: 'Korea, Republic of' }, kwt: { title: 'Kuwait' }, kgz: { title: 'Kyrgyzstan' }, 
	lao: { title: 'Lao PDR' }, lva: { title: 'Latvia' }, lbn: { title: 'Lebanon' }, lso: { title: 'Lesotho' }, lbr: { title: 'Liberia' }, lby: { title: 'Libya' }, 
	lie: { title: 'Liechtenstein' }, ltu: { title: 'Lithuania' }, lux: { title: 'Luxembourg' }, mkd: { title: 'Macedonia, Republic of' }, mdg: { title: 'Madagascar' }, 
	mwi: { title: 'Malawi' }, mys: { title: 'Malaysia' }, mdv: { title: 'Maldives' }, mli: { title: 'Mali' }, mlt: { title: 'Malta' }, mhl: { title: 'Marshall Islands' }, 
	mtq: { title: 'Martinique' }, mrt: { title: 'Mauritania' }, mus: { title: 'Mauritius' }, myt: { title: 'Mayotte' }, mex: { title: 'Mexico' }, 
	fsm: { title: 'Micronesia, Federated States of' }, mda: { title: 'Moldova' }, mco: { title: 'Monaco' }, mng: { title: 'Mongolia' }, mne: { title: 'Montenegro' }, 
	msr: { title: 'Montserrat' }, mar: { title: 'Morocco' }, moz: { title: 'Mozambique' }, mmr: { title: 'Myanmar' }, nam: { title: 'Namibia' }, nru: { title: 'Nauru' }, 
	npl: { title: 'Nepal' }, nld: { title: 'Netherlands' }, ant: { title: 'Netherlands Antilles' }, ncl: { title: 'New Caledonia' }, nzl: { title: 'New Zealand' }, 
	nic: { title: 'Nicaragua' }, ner: { title: 'Niger' }, nga: { title: 'Nigeria' }, niu: { title: 'Niue' }, nfk: { title: 'Norfolk Island' }, mnp: { title: 'Northern Mariana Islands' }, 
	nor: { title: 'Norway' }, omn: { title: 'Oman' }, pak: { title: 'Pakistan' }, plw: { title: 'Palau' }, pse: { title: 'Palestinian Territory, Occupied' }, 
	pan: { title: 'Panama' }, png: { title: 'Papua New Guinea' }, pry: { title: 'Paraguay' }, per: { title: 'Peru' }, phl: { title: 'Philippines' }, 
	pcn: { title: 'Pitcairn' }, pol: { title: 'Poland' }, prt: { title: 'Portugal' }, pri: { title: 'Puerto Rico' }, qat: { title: 'Qatar' }, reu: { title: 'Réunion' }, 
	rou: { title: 'Romania' }, rus: { title: 'Russian Federation' }, rwa: { title: 'Rwanda' }, blm: { title: 'Saint-Barthélemy' }, shn: { title: 'Saint Helena' }, 
	kna: { title: 'Saint Kitts and Nevis' }, lca: { title: 'Saint Lucia' }, maf: { title: 'Saint-Martin (French part)' }, spm: { title: 'Saint Pierre and Miquelon' }, 
	vct: { title: 'Saint Vincent and Grenadines' }, wsm: { title: 'Samoa' }, smr: { title: 'San Marino' }, stp: { title: 'Sao Tome and Principe' }, sau: { title: 'Saudi Arabia' }, 
	sen: { title: 'Senegal' }, srb: { title: 'Serbia' }, syc: { title: 'Seychelles' }, sle: { title: 'Sierra Leone' }, sgp: { title: 'Singapore' }, svk: { title: 'Slovakia' }, 
	svn: { title: 'Slovenia' }, slb: { title: 'Solomon Islands' }, som: { title: 'Somalia' }, zaf: { title: 'South Africa' }, 
	sgs: { title: 'South Georgia and the South Sandwich Islands' }, ssd: { title: 'South Sudan' }, esp: { title: 'Spain' }, lka: { title: 'Sri Lanka' }, sdn: { title: 'Sudan' }, 
	sur: { title: 'Suriname' }, sjm: { title: 'Svalbard and Jan Mayen Islands' }, swz: { title: 'Swaziland' }, swe: { title: 'Sweden' }, che: { title: 'Switzerland' }, 
	syr: { title: 'Syrian Arab Republic (Syria)' }, twn: { title: 'Taiwan, Republic of China' }, tjk: { title: 'Tajikistan' }, tza: { title: 'Tanzania *, United Republic of' }, 
	tha: { title: 'Thailand' }, tls: { title: 'Timor-Leste' }, tgo: { title: 'Togo' }, tkl: { title: 'Tokelau' }, ton: { title: 'Tonga' }, tto: { title: 'Trinidad and Tobago' }, 
	tun: { title: 'Tunisia' }, tur: { title: 'Turkey' }, tkm: { title: 'Turkmenistan' }, tca: { title: 'Turks and Caicos Islands' }, tuv: { title: 'Tuvalu' }, uga: { title: 'Uganda' }, 
	ukr: { title: 'Ukraine' }, are: { title: 'United Arab Emirates' }, gbr: { title: 'United Kingdom' }, usa: { title: 'United States of America' }, 
	umi: { title: 'United States Minor Outlying Islands' }, ury: { title: 'Uruguay' }, uzb: { title: 'Uzbekistan' }, vut: { title: 'Vanuatu' }, 
	ven: { title: 'Venezuela (Bolivarian Republic of)' }, vnm: { title: 'Viet Nam' }, vir: { title: 'Virgin Islands, US' }, wlf: { title: 'Wallis and Futuna Islands' }, 
	esh: { title: 'Western Sahara' }, yem: { title: 'Yemen' }, zmb: { title: 'Zambia' }, zwe: { title: 'Zimbabwe' } 
}

$.country.init({ choices: countries, id: $.country.id, parentView: $.getView() });

$.country.on('change', function (event) {
	alert('Country changed: ' + event.id + " => " + event.value);
});

var colors = { 
    white: { title: "White", rgb: "#FFFFFF" }, 
    pink: { title: "Pink", rgb: "#FF007F" },
    red: { title: "Red", rgb: "#FF0000" },
    orange: { title: "Orange", rgb: "#FF7F00" },
    brown: { title: "Brown", rgb: "#964B00" },
    yellow: { title: "Yellow", rgb: "#FFFF00" },
    gray: { title: "Gray", rgb: "#848484" },
    green: { title: "Green", rgb: "#00FF00" },
    cyan: { title: "Cyan", rgb: "#00FFFF" },
    blue: { title: "Blue", rgb: "#0000FF" }, 
    violet: { title: "Violet", rgb: "#9400D3" }
};

$.color.init({ choices: colors, id: $.color.id, parentView: $.getView() });

$.color.on('change', function (event) {
    $.swatch.backgroundColor = colors[event.id].rgb;
});

$.index.open();
