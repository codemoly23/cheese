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
 * Navigation Order: Home | About Us | Quality | Products | Our Store | Become Our Reseller | Contact Us | Blog
 */
export const mainNavNew: NavItem[] = [
	{
		title: "Home",
		href: "/",
	},
	{
		title: "About Us",
		href: "/about-us",
	},
	{
		title: "Quality",
		href: "/quality",
	},
	{
		title: "Products",
		href: "/products",
	},
	{
		title: "Our Store",
		href: "/our-store",
	},
	{
		title: "Become Our Reseller",
		href: "/become-our-reseller",
	},
	{
		title: "Contact Us",
		href: "/contact-us",
	},
	{
		title: "Blog",
		href: "/blog",
	},
];
