import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n/config';

export default createMiddleware({
	// A list of all locales that are supported
	locales,

	// Used when no locale matches
	defaultLocale,

	// Don't prefix the default locale in the URL
	localePrefix: 'as-needed'
});

export const config = {
	// Match only internationalized pathnames
	// Skip API routes, static files, and Next.js internals
	matcher: [
		// Match all pathnames except for
		// - API routes (/api/*)
		// - Static files (/_next/*, /favicon.ico, etc.)
		// - Public files (/storage/*, /images/*, etc.)
		'/((?!api|_next|_vercel|storage|images|.*\\..*).*)',
	]
};
