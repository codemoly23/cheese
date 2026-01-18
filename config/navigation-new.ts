export interface NavItem {
	title: string;
	href: string;
	description?: string;
	items?: NavItem[];
	isDynamic?: boolean; // Flag for items that load from database
}

/**
 * Main Navigation Configuration
 *
 * Navigation Order: Homepage | About Us | Quality | Products | Butik i Boxholm | Become Our Reseller | Contact Us | Blog
 *
 * Note: Products links to external URL http://localhost:3000/produkter
 */
export const mainNavNew: NavItem[] = [
	// Home
	{
		title: "Home",
		href: "/",
	},

	// About Us
	{
		title: "About Us",
		href: "/about-us",
	},

	// Quality
	{
		title: "Quality",
		href: "/quality",
	},

	// Products - links to external URL
	{
		title: "Products",
		href: "http://localhost:3000/produkter",
	},

	// Butik i Boxholm
	{
		title: "Butik i Boxholm",
		href: "/butik-i-boxholm",
	},

	// Become Our Reseller
	{
		title: "Become Our Reseller",
		href: "/become-our-reseller",
	},

	// Contact Us
	{
		title: "Contact Us",
		href: "/contact-us",
	},

	// Blog
	{
		title: "Blog",
		href: "/blog",
	},
];
