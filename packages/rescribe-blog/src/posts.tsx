import { Link, useLoaderData } from '@remix-run/react'

import { format } from 'date-fns'

export default function Posts({ collection }: { collection: string }) {
	const data = useLoaderData()
	const { items: posts } = data

	return (
		<div className='rs-container rs-max-w-4xl rs-px-8 rs-py-16 lg:rs-pr-0 lg:rs-pl-0 xl:rs-px-16 rs-gap-y-4'>
			<div className='rs-flex rs-h-48 rs-flex-col rs-items-start rs-gap-4 md:rs-flex-row md:rs-items-center md:rs-justify-between md:rs-gap-8 rs-px-6'>
				<div className='rs-flex rs-flex-1 rs-flex-col rs-items-start rs-justify-start rs-space-y-4'>
					<h1 className='rs-text-foreground rs-inline-block rs-text-4xl rs-font-extrabold rs-tracking-tight lg:rs-text-5xl'>
						Blog
					</h1>
					<p className='rs-text-foreground-subtle rs-text-xl'>
						Crafts, product updates, and technical details
					</p>
				</div>
			</div>
			<div className='rs-flex rs-flex-col rs-items-start rs-justify-start rs-px-6'>
				{
					// @ts-ignore
					posts.length > 0 ? (
						<div className='rs-grid rs-gap-y-8 sm:rs-grid-cols-1'>
							{
								// @ts-ignore
								posts.map(
									// @ts-ignore
									(post: any, index: number) => (
										<article
											key={`post-${index}`}
											className='rs-group rs-relative rs-flex rs-flex-col rs-gap-y-4'
										>
											{/* {post.og_image && ( */}
											{/* 	<img */}
											{/* 		src={post.og_image} */}
											{/* 		alt={post.title} */}
											{/* 		className='rounded-lg border border-slate-800 bg-slate-800 transition-colors group-hover:border-slate-900' */}
											{/* 	/> */}
											{/* )} */}
											<Link
												to={`/${collection}/${post.frontmatter.slug}`}
											>
												<h2 className='rs-text-foreground rs-text-2xl rs-font-bold'>
													{post.frontmatter.title}
												</h2>
											</Link>
											{post.frontmatter.excerpt && (
												<p className='rs-text-foreground-subtle'>
													{post.frontmatter.excerpt}
												</p>
											)}
											<div className='rs-flex rs-items-center rs-justify-between rs-py-2'>
												{post.frontmatter.createdAt && (
													<p className='rs-text-foreground-subtle rs-m-0 rs-text-sm'>
														{format(
															new Date(
																post.frontmatter.createdAt
															),
															'PPP'
														)}
													</p>
												)}
												{post.frontmatter.tag && (
													<span className='rs-rounded-lg rs-bg-slate-300 rs-px-2 rs-py-1 rs-text-xs rs-text-slate-900 dark:rs-bg-slate-700 dark:rs-text-slate-50'>
														{post.frontmatter.tag}
													</span>
												)}
											</div>
										</article>
									)
								)
							}
						</div>
					) : (
						<p className='rs-text-foreground-subtle'>
							No posts published.
						</p>
					)
				}
			</div>
		</div>
	)
}
