"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Check } from "lucide-react";
import { ImageComponent } from "@/components/common/image-component";
import type { ProductVariant } from "@/types";
import { cn } from "@/lib/utils/cn";

interface ProductVariantsSelectorProps {
	variants: ProductVariant[];
	currentSlug: string;
}

/**
 * Product Variants Selector
 * Horizontal row of clickable product variants with icons
 * Tillamook-inspired design (Baby Loaf, Block, Sliced, etc.)
 */
export function ProductVariantsSelector({
	variants,
	currentSlug,
}: ProductVariantsSelectorProps) {
	if (!variants || variants.length === 0) {
		return null;
	}

	return (
		<section className="w-full py-8 md:py-12 bg-cream-50" style={{ backgroundColor: "#FFF8E7" }}>
			<div className="_container">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="flex flex-wrap justify-center gap-4 md:gap-8"
				>
					{variants.map((variant, index) => {
						// Check if this variant is the current product
						const isActive = variant.url.includes(currentSlug);

						return (
							<motion.div
								key={variant._id || index}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.4, delay: index * 0.1 }}
							>
								<Link
									href={variant.url}
									className={cn(
										"group relative flex flex-col items-center gap-2 p-4 rounded-2xl transition-all duration-300",
										isActive
											? "bg-white shadow-lg"
											: "hover:bg-white/50"
									)}
								>
									{/* Active indicator */}
									{isActive && (
										<div className="absolute -top-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center shadow-md">
											<Check className="w-4 h-4 text-white" />
										</div>
									)}

									{/* Variant Icon */}
									<div
										className={cn(
											"w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden transition-transform duration-300",
											!isActive && "group-hover:scale-110"
										)}
									>
										{variant.icon ? (
											<ImageComponent
												src={variant.icon}
												alt={variant.name}
												className="w-full h-full object-cover"
												width={80}
												height={80}
											/>
										) : (
											<div className="w-full h-full bg-amber-100 flex items-center justify-center">
												<svg
													className="w-8 h-8 text-amber-500"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={1.5}
														d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
													/>
												</svg>
											</div>
										)}
									</div>

									{/* Variant Name */}
									<span
										className={cn(
											"text-xs md:text-sm font-bold uppercase tracking-wider text-center",
											isActive ? "text-primary" : "text-gray-700"
										)}
									>
										{variant.name}
									</span>
								</Link>
							</motion.div>
						);
					})}
				</motion.div>
			</div>
		</section>
	);
}
