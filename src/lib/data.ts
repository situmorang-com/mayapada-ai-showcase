export interface Company {
	name: string;
	ticker?: string;
	description: string;
}

export interface AIOpportunity {
	title: string;
	description: string;
	impact: 'High' | 'Transformative' | 'Revolutionary';
	icon: string;
}

export interface Stat {
	value: number;
	suffix: string;
	label: string;
}

export interface Sector {
	id: string;
	act: string;
	title: string;
	subtitle: string;
	icon: string;
	color: string;
	colorRgb: string;
	description: string;
	companies: Company[];
	aiOpportunities: AIOpportunity[];
	stats: Stat[];
}

export const sectors: Sector[] = [
	{
		id: 'financial',
		act: 'Act I',
		title: 'Financial Services',
		subtitle: 'The Foundation of Empire',
		icon: '🏦',
		color: '#3b82f6',
		colorRgb: '59, 130, 246',
		description:
			'At the heart of Mayapada Group lies its banking powerhouse — Bank Mayapada Internasional, serving millions across 200+ branches in 25+ provinces. Complemented by fintech venture Pohon Dana and strategic insurance partnerships with Zurich and Sompo.',
		companies: [
			{
				name: 'Bank Mayapada Internasional',
				ticker: 'IDX: MAYA',
				description:
					'Flagship private bank with 200+ branches across 25+ Indonesian provinces, primarily serving the SME market since 1989.'
			},
			{
				name: 'PT Pohon Dana Indonesia',
				description:
					'Fintech subsidiary specializing in peer-to-peer lending and digital payment solutions, established 2018.'
			},
			{
				name: 'Sompo Insurance Partnership',
				description:
					'20% stake in PT Sompo Insurance Indonesia via Mayapada Pratama Kasih, plus bancassurance with Zurich Life.'
			}
		],
		aiOpportunities: [
			{
				title: 'AI Credit Scoring Engine',
				description:
					'Deploy machine learning models that analyze alternative data — mobile usage, transaction patterns, social signals — to extend credit to Indonesia\'s vast unbanked population.',
				impact: 'Transformative',
				icon: '🧠'
			},
			{
				title: 'Real-Time Fraud Detection',
				description:
					'Neural networks monitoring transactions in real-time, detecting anomalous patterns across Bank Mayapada\'s 200+ branch network before losses occur.',
				impact: 'High',
				icon: '🛡️'
			},
			{
				title: 'Conversational Banking AI',
				description:
					'Multilingual AI assistants (Bahasa, English, Mandarin) providing 24/7 banking services, reducing branch load while improving customer satisfaction.',
				impact: 'High',
				icon: '💬'
			},
			{
				title: 'Predictive Risk Analytics',
				description:
					'AI-powered portfolio risk modeling integrating macroeconomic data, market signals, and Pohon Dana\'s P2P lending insights for smarter capital allocation.',
				impact: 'Revolutionary',
				icon: '📊'
			}
		],
		stats: [
			{ value: 200, suffix: '+', label: 'Branches Nationwide' },
			{ value: 25, suffix: '+', label: 'Provinces Covered' },
			{ value: 37, suffix: 'yr', label: 'Years of Banking' }
		]
	},
	{
		id: 'healthcare',
		act: 'Act II',
		title: 'Healthcare',
		subtitle: 'Healing with Intelligence',
		icon: '🏥',
		color: '#10b981',
		colorRgb: '16, 185, 129',
		description:
			'Mayapada Hospital — one of Indonesia\'s premier private hospital chains — spans major cities from Jakarta to Surabaya, with an ambitious expansion into the new capital IKN Nusantara. Supported by Biomedilab\'s diagnostic services.',
		companies: [
			{
				name: 'Mayapada Hospital',
				ticker: 'IDX: SRAJ',
				description:
					'Premium private hospital chain with locations in Tangerang, Jakarta Selatan, Bogor, Kuningan, Surabaya, and Bandung.'
			},
			{
				name: 'Mayapada Healthcare Group',
				description:
					'Overarching healthcare holding entity managing the group\'s medical portfolio and expansion strategy.'
			},
			{
				name: 'Biomedilab (Agave Biomedi Investama)',
				description:
					'Advanced medical laboratory services providing diagnostic testing and clinical pathology across the network.'
			},
			{
				name: 'Mayapada Clinic Pratama',
				description:
					'Network of outpatient clinics providing primary care and specialist consultations closer to communities.'
			}
		],
		aiOpportunities: [
			{
				title: 'AI-Powered Diagnostics',
				description:
					'Computer vision analyzing medical imaging — X-rays, CT scans, MRIs — at Biomedilab, providing rapid preliminary diagnoses and reducing radiologist workload by 40%.',
				impact: 'Revolutionary',
				icon: '🔬'
			},
			{
				title: 'Predictive Patient Analytics',
				description:
					'Machine learning models predicting patient deterioration, readmission risks, and optimal treatment pathways across all Mayapada Hospital locations.',
				impact: 'Transformative',
				icon: '📈'
			},
			{
				title: 'Smart Hospital Operations',
				description:
					'AI optimizing bed allocation, staff scheduling, supply chain, and operating room utilization — reducing wait times and operational costs significantly.',
				impact: 'High',
				icon: '⚙️'
			},
			{
				title: 'Telemedicine AI Triage',
				description:
					'Intelligent triage systems for Mayapada Clinic Pratama, using NLP to assess symptoms and route patients to appropriate specialists across the network.',
				impact: 'Transformative',
				icon: '🩺'
			}
		],
		stats: [
			{ value: 7, suffix: '+', label: 'Hospital Locations' },
			{ value: 500, suffix: 'B', label: 'Rp IKN Investment' },
			{ value: 10, suffix: '+', label: 'Subsidiaries' }
		]
	},
	{
		id: 'property',
		act: 'Act III',
		title: 'Property & Real Estate',
		subtitle: 'Building Tomorrow\'s Landscape',
		icon: '🏙️',
		color: '#f59e0b',
		colorRgb: '245, 158, 11',
		description:
			'From the iconic Mayapada Towers dominating Jakarta\'s Sudirman-Thamrin corridor to Singapore\'s MYP Centre, the group\'s property portfolio spans premium commercial, residential, and mixed-use developments.',
		companies: [
			{
				name: 'Maha Properti Indonesia',
				ticker: 'IDX: MPRO',
				description:
					'Publicly listed developer of malls, apartments, hotels, shophouses, and townships including The Heavens and Tanjung Layar Beachfront City.'
			},
			{
				name: 'Precise Pacific Realty',
				description:
					'Manager of Mayapada Tower 1 & 2, Menara Topas, Permata Tower, and Sona Topas Tower in Jakarta\'s premium CBD.'
			},
			{
				name: 'MYP Ltd',
				ticker: 'SGX: F86',
				description:
					'Singapore-listed investment holding company with MYP Centre in the financial district and luxury residential assets.'
			}
		],
		aiOpportunities: [
			{
				title: 'Smart Building AI',
				description:
					'IoT-connected AI managing energy consumption, HVAC, lighting, and security across Mayapada Towers — reducing energy costs by 30% while improving tenant comfort.',
				impact: 'High',
				icon: '🏢'
			},
			{
				title: 'Predictive Maintenance',
				description:
					'Sensor-driven AI predicting equipment failures in elevators, HVAC, and electrical systems before breakdowns occur, minimizing costly emergency repairs.',
				impact: 'High',
				icon: '🔧'
			},
			{
				title: 'AI Market Intelligence',
				description:
					'Deep learning models analyzing property market trends, demographic shifts, and urban development patterns to inform acquisition and development decisions.',
				impact: 'Transformative',
				icon: '🗺️'
			},
			{
				title: 'Virtual AI Property Tours',
				description:
					'Generative AI creating immersive virtual tours and AI-powered property matching for Maha Properti\'s developments, engaging buyers globally.',
				impact: 'High',
				icon: '🥽'
			}
		],
		stats: [
			{ value: 5, suffix: '+', label: 'Premium Towers' },
			{ value: 2, suffix: '', label: 'Stock Exchanges Listed' },
			{ value: 3, suffix: '', label: 'Countries Present' }
		]
	},
	{
		id: 'hospitality',
		act: 'Act IV',
		title: 'Hospitality',
		subtitle: 'The Art of Welcome',
		icon: '🌴',
		color: '#f43f5e',
		colorRgb: '244, 63, 94',
		description:
			'Through a strategic partnership with IHG Hotels & Resorts, Mayapada Hospitality Holding operates 9 hotels across Indonesia — from the InterContinental Bali Sanur to Indonesia\'s first voco hotel in Seminyak.',
		companies: [
			{
				name: 'Mayapada Hospitality Holding',
				description:
					'Led by Victoria Tahir, managing 9 hotels across Indonesia with strategic IHG partnership for international brand standards.'
			},
			{
				name: 'InterContinental Bali Sanur Resort',
				description:
					'Flagship luxury resort in Bali\'s Sanur beach area, operating under IHG\'s premier brand.'
			},
			{
				name: 'voco Bali Seminyak',
				description:
					'Indonesia\'s first voco hotel, opened December 2024 in Bali\'s vibrant Seminyak district under IHG\'s upscale brand.'
			},
			{
				name: 'Holiday Inn Properties',
				description:
					'Holiday Inn Bali Sanur and Holiday Inn Express Bali Sunset Road, serving mid-scale travelers.'
			}
		],
		aiOpportunities: [
			{
				title: 'Hyper-Personalized Guest AI',
				description:
					'AI learning guest preferences across all 9 properties — room temperature, pillow type, dining preferences — creating seamless personalized experiences before arrival.',
				impact: 'Transformative',
				icon: '🎯'
			},
			{
				title: 'Dynamic Revenue Management',
				description:
					'AI-powered pricing engines analyzing demand patterns, competitor rates, events, and weather to optimize room rates in real-time across the portfolio.',
				impact: 'High',
				icon: '💰'
			},
			{
				title: 'Smart Room Technology',
				description:
					'Voice-controlled AI concierge in rooms, managing ambiance, ordering services, providing local recommendations in guests\' native languages.',
				impact: 'High',
				icon: '🏨'
			},
			{
				title: 'Predictive Service Excellence',
				description:
					'AI analyzing guest feedback, social media sentiment, and operational data to predict and prevent service failures before they impact guest satisfaction.',
				impact: 'Revolutionary',
				icon: '⭐'
			}
		],
		stats: [
			{ value: 9, suffix: '', label: 'Hotels in Portfolio' },
			{ value: 4, suffix: '', label: 'IHG Brands Operated' },
			{ value: 1, suffix: 'st', label: 'voco in Indonesia' }
		]
	},
	{
		id: 'retail',
		act: 'Act V',
		title: 'Retail & Tourism',
		subtitle: 'Gateways of Discovery',
		icon: '🛍️',
		color: '#8b5cf6',
		colorRgb: '139, 92, 246',
		description:
			'Sona Topas Tourism Industry — a legacy brand since 1978 — operates duty-free retail through its partnership with DFS (LVMH). Strategically positioned in Bali, Jakarta, and Medan to capture Indonesia\'s booming tourism industry.',
		companies: [
			{
				name: 'Sona Topas Tourism Industry',
				ticker: 'IDX: SONA',
				description:
					'Publicly listed since 1992, operating duty-free shops in partnership with DFS (LVMH subsidiary) across key tourist destinations.'
			},
			{
				name: 'Inti Dufree Promosindo',
				description:
					'Subsidiary handling duty-free retail operations in partnership with the world\'s leading travel retailer.'
			},
			{
				name: 'Arthamulia Indah',
				description:
					'Retail operations subsidiary supporting the duty-free shop network across Indonesian tourist corridors.'
			}
		],
		aiOpportunities: [
			{
				title: 'Personalized Shopping AI',
				description:
					'AI recommending products based on traveler profiles, purchase history, nationality, and real-time browsing behavior — increasing average transaction value.',
				impact: 'High',
				icon: '🎁'
			},
			{
				title: 'Demand Forecasting Engine',
				description:
					'ML models predicting product demand by analyzing flight schedules, tourist arrivals, seasonal trends, and global luxury market signals for optimal inventory.',
				impact: 'Transformative',
				icon: '📦'
			},
			{
				title: 'Computer Vision Retail Analytics',
				description:
					'AI-powered cameras analyzing foot traffic, dwell times, and product interaction patterns to optimize store layouts and product placement.',
				impact: 'High',
				icon: '👁️'
			},
			{
				title: 'Cross-Selling with Hospitality AI',
				description:
					'Unified AI platform connecting hotel guest data with retail preferences — offering personalized duty-free promotions to Mayapada hotel guests.',
				impact: 'Revolutionary',
				icon: '🔗'
			}
		],
		stats: [
			{ value: 48, suffix: 'yr', label: 'Years in Tourism' },
			{ value: 3, suffix: '', label: 'Key City Locations' },
			{ value: 1, suffix: '', label: 'LVMH Partnership' }
		]
	},
	{
		id: 'media',
		act: 'Act VI',
		title: 'Media & Publishing',
		subtitle: 'Voices of Influence',
		icon: '📡',
		color: '#06b6d4',
		colorRgb: '6, 182, 212',
		description:
			'From Forbes Indonesia and Elle Indonesia to television networks MyTV, INTV, and RTV — Mayapada\'s media arm shapes narratives across print, digital, and broadcast. Now strengthened by a recent Bloomberg partnership and complemented by Guo Ji Ri Bao, a Mandarin-language daily.',
		companies: [
			{
				name: 'Forbes Indonesia',
				description:
					'Local partner since 2000, chaired by Jonathan Tahir — the definitive voice of Indonesian business and wealth.'
			},
			{
				name: 'Bloomberg Partnership',
				description:
					'Recent media collaboration with Bloomberg to deepen Mayapada\'s business journalism footprint and expand high-quality financial news access for Indonesian audiences.'
			},
			{
				name: 'Elle Indonesia',
				description:
					'Iconic French fashion magazine\'s Indonesian edition, under Mayapada\'s control since 2008.'
			},
			{
				name: 'MyTV / INTV / RTV',
				description:
					'Television portfolio including Indonesia\'s first women-focused channel (MyTV), regional INTV, and 20% stake in RTV (Rajawali Televisi).'
			},
			{
				name: 'Guo Ji Ri Bao',
				description:
					'Mandarin-language daily newspaper since 2001, serving the Chinese-Indonesian community across Jakarta and Medan.'
			}
		],
		aiOpportunities: [
			{
				title: 'AI Content Generation',
				description:
					'Generative AI assisting Forbes Indonesia and Elle Indonesia editorial teams with research, drafts, translations, and multimedia content production at scale.',
				impact: 'Transformative',
				icon: '✍️'
			},
			{
				title: 'Personalized Media Feeds',
				description:
					'AI-curated news and content recommendations across all Mayapada media properties, increasing engagement and time-on-platform through deep personalization.',
				impact: 'High',
				icon: '📱'
			},
			{
				title: 'Audience Intelligence Platform',
				description:
					'Unified AI analytics across TV, print, and digital — understanding audience demographics, sentiment, and behavior to attract premium advertisers.',
				impact: 'High',
				icon: '📊'
			},
			{
				title: 'Multilingual AI Translation',
				description:
					'Real-time AI translation between Bahasa Indonesia, English, and Mandarin — enabling Guo Ji Ri Bao content to reach broader audiences and vice versa.',
				impact: 'Transformative',
				icon: '🌐'
			}
		],
		stats: [
			{ value: 26, suffix: 'yr', label: 'Forbes Indonesia' },
			{ value: 3, suffix: '+', label: 'TV Networks' },
			{ value: 3, suffix: '', label: 'Languages Published' }
		]
	}
];

export const groupInfo = {
	founder: 'Dato\' Sri Prof. Dr. Tahir',
	founded: 1986,
	netWorth: '$5.1B',
	headquarters: 'Jakarta, Indonesia',
	publicEntities: 5,
	totalCompanies: 40,
	exchanges: ['IDX (Indonesia)', 'SGX (Singapore)'],
	familyLeaders: [
		{ name: 'Dato\' Sri Tahir', role: 'Founder & Chairman' },
		{ name: 'Jonathan Tahir', role: 'Deputy Chairman & Group CEO Healthcare' },
		{ name: 'Grace Tahir', role: 'Healthcare & Digital Innovation' },
		{ name: 'Jane Tahir', role: 'Financial Services' },
		{ name: 'Victoria Tahir', role: 'President Director, Hospitality' }
	]
};
