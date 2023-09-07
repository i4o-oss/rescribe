import { Link, useLoaderData } from '@remix-run/react'

import { format } from 'date-fns'

export default function Posts({ collection }: { collection: string }) {
	const { items: posts } = useLoaderData()

	return (
		<>
			{posts.length > 0 ? (
				<div className='rs-grid rs-gap-y-8 sm:rs-grid-cols-1'>
					{posts.map(
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
								<Link to={`/${collection}/${post.slug}`}>
									<h2 className='rs-text-foreground rs-text-2xl rs-font-bold'>
										{post.title}
									</h2>
								</Link>
								{post.excerpt && (
									<p className='rs-text-foreground-subtle'>
										{post.excerpt}
									</p>
								)}
								<div className='rs-flex rs-items-center rs-justify-between rs-py-2'>
									{post.createdAt && (
										<p className='rs-text-foreground-subtle rs-m-0 rs-text-sm'>
											{format(
												new Date(post.createdAt),
												'PPP'
											)}
										</p>
									)}
									{/* {post.tag && ( */}
									{/* 	<span className='rounded-lg bg-slate-300 px-2 py-1 text-xs text-slate-900 dark:bg-slate-700 dark:text-slate-50'> */}
									{/* 		{post.tag} */}
									{/* 	</span> */}
									{/* )} */}
								</div>
							</article>
						)
					)}
				</div>
			) : (
				<p className='rs-text-foreground-subtle'>No posts published.</p>
			)}
		</>
	)
}
