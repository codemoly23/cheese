import type { Document } from "mongoose";
import { connectMongoose } from "@/lib/db/db-connect";
import {
	getAboutPageModelSync,
	type IAboutPage,
	type IHistorySection,
	type ICustomersSection,
	type ITeamSection,
	type IContactSection,
	type IAboutSectionVisibility,
	type IAboutPageSeo,
} from "@/models/about-page.model";

/**
 * Helper to convert Mongoose documents to plain serializable objects
 */
function toPlainObject<T>(data: T): T {
	return JSON.parse(JSON.stringify(data));
}

/**
 * Type for updating about page
 */
export interface UpdateAboutPageInput {
	sectionVisibility?: IAboutSectionVisibility;
	history?: Partial<IHistorySection>;
	customers?: Partial<ICustomersSection>;
	team?: Partial<ITeamSection>;
	contact?: Partial<IContactSection>;
	seo?: Partial<IAboutPageSeo>;
}

/**
 * Plain object type for AboutPage
 */
export type AboutPageData = Omit<IAboutPage, keyof Document>;

/**
 * AboutPage Repository
 */
class AboutPageRepository {
	/**
	 * Get about page content
	 */
	async get(): Promise<AboutPageData> {
		await connectMongoose();
		const AboutPage = getAboutPageModelSync();

		let aboutPage = await AboutPage.findOne().lean<AboutPageData>();

		if (!aboutPage) {
			const created = await AboutPage.create({});
			aboutPage = created.toObject() as AboutPageData;
		}

		return toPlainObject(aboutPage);
	}

	/**
	 * Update about page content
	 */
	async update(data: UpdateAboutPageInput): Promise<AboutPageData> {
		await connectMongoose();
		const AboutPage = getAboutPageModelSync();

		const updateData: Record<string, unknown> = {};

		if (data.sectionVisibility) {
			updateData.sectionVisibility = data.sectionVisibility;
		}

		if (data.history) {
			updateData.history = data.history;
		}

		if (data.customers) {
			updateData.customers = data.customers;
		}

		if (data.team) {
			updateData.team = data.team;
		}

		if (data.contact) {
			updateData.contact = data.contact;
		}

		if (data.seo) {
			Object.entries(data.seo).forEach(([key, value]) => {
				if (value !== undefined) {
					updateData[`seo.${key}`] = value;
				}
			});
		}

		const aboutPage = await AboutPage.findOneAndUpdate(
			{},
			{ $set: updateData },
			{ new: true, upsert: true, runValidators: true }
		).lean<AboutPageData>();

		if (!aboutPage) {
			throw new Error("Failed to update about page");
		}

		return toPlainObject(aboutPage);
	}

	/**
	 * Get SEO settings only
	 */
	async getSeo(): Promise<IAboutPageSeo> {
		const aboutPage = await this.get();
		return aboutPage.seo;
	}
}

// Export singleton instance
export const aboutPageRepository = new AboutPageRepository();
