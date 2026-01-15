"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Leaf, MilkOff, Package, Box } from "lucide-react";

// Icon mapping for dynamic icon rendering
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
	Leaf,
	MilkOff,
	Package,
	Box,
};

interface FeatureItem {
	icon?: string;
	title?: string;
	description?: string;
}

interface FeatureBannerData {
	image?: string;
	title?: string;
	titleHighlight?: string;
	features?: FeatureItem[];
}

interface FeatureBannerProps {
	data?: FeatureBannerData;
}

export function FeatureBanner({ data }: FeatureBannerProps) {
	if (!data) return null;

	// Check if there's any content
	const hasContent = data.image || data.title || (data.features && data.features.length > 0);
	if (!hasContent) return null;

	// Parse title with highlight
	const renderTitle = () => {
		if (!data.title) return null;

		if (data.titleHighlight && data.title.includes(data.titleHighlight)) {
			const parts = data.title.split(data.titleHighlight);
			return (
				<>
					{parts[0]}
					<span className="text-primary">{data.titleHighlight}</span>
					{parts[1]}
				</>
			);
		}

		return data.title;
	};

	return (
		<section className="section-padding bg-white">
			<div className="_container">
				<div className="flex flex-col items-center">
					{/* Banner Image */}
					{data.image && (
						<motion.div
							className="relative w-full max-w-lg aspect-square mb-8"
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6 }}
						>
							<Image
								src={data.image}
								alt="Feature Banner"
								fill
								className="object-contain"
								sizes="(max-width: 768px) 100vw, 500px"
							/>
						</motion.div>
					)}

					{/* Title with Highlight */}
					{data.title && (
						<motion.h2
							className="text-2xl md:text-3xl lg:text-4xl font-serif text-center text-secondary max-w-3xl mb-12 leading-relaxed"
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6, delay: 0.1 }}
						>
							{renderTitle()}
						</motion.h2>
					)}

					{/* Feature Cards */}
					{data.features && data.features.length > 0 && (
						<motion.div
							className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 w-full"
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6, delay: 0.2 }}
						>
							{data.features.map((feature, index) => {
								const IconComponent = feature.icon ? iconMap[feature.icon] : Leaf;

								return (
									<div
										key={index}
										className="flex flex-col items-center text-center"
									>
										{/* Icon */}
										<div className="w-16 h-16 mb-4 flex items-center justify-center">
											{IconComponent && (
												<IconComponent className="w-10 h-10 text-primary stroke-[1.5]" />
											)}
										</div>

										{/* Title */}
										{feature.title && (
											<h3 className="text-lg md:text-xl font-serif font-medium text-secondary mb-2">
												{feature.title}
											</h3>
										)}

										{/* Description */}
										{feature.description && (
											<p className="text-sm text-secondary/60 leading-relaxed">
												{feature.description}
											</p>
										)}
									</div>
								);
							})}
						</motion.div>
					)}
				</div>
			</div>
		</section>
	);
}
