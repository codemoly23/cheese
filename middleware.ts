import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n/config';

export default createMiddleware({
	// A list of all locales that are supported
	locales,

	// Used when no locale matches
	defaultLocale,

	// Don't prefix the default locale in the URL
	// 'as-needed' means: en -> / (no prefix), sv -> /sv
	localePrefix: 'as-needed',

	// Don't use locale detection from headers/cookies for redirects
	// This prevents automatic redirects based on browser language
	localeDetection: false
});

export const config = {
	// Match only internationalized pathnames
	// Skip API routes, static files, Next.js internals, auth routes, and dashboard
	matcher: [
		// Match all pathnames except for
		// - API routes (/api/*)
		// - Static files (/_next/*, /favicon.ico, etc.)
		// - Public files (/storage/*, /images/*, etc.)
		// - Auth routes (/login, /register)
		// - Dashboard routes (/dashboard/*)
		// - Admin routes (/admin/*)
		'/((?!api|_next|_vercel|storage|images|login|register|dashboard|admin|.*\\..*).*)',
	]
};
