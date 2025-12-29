// src/components/BlogCard.tsx
import Link from "next/link";
import { BlogPost } from "@/types";

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <div className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Top Strip: Category & Time */}
      <div className="p-5 pb-0 flex justify-between items-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
        <span className="text-blue-600 bg-blue-50 px-2 py-1 rounded">
          {post.category || "General"}
        </span>
        <span>{post.readingTime} min read</span>
      </div>

      <div className="p-5">
        {/* Title */}
        <Link href={`/blog/${post.slug}`}>
          <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
            {post.title}
          </h2>
        </Link>
        
        {/* Subtitle / Excerpt */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
          {post.subtitle || post.content.substring(0, 100) + "..."}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.slice(0, 3).map((tag, index) => (
            <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md">
              #{tag}
            </span>
          ))}
        </div>

        {/* Read Button */}
        <Link 
          href={`/blog/${post.slug}`} 
          className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-800 transition"
        >
          Read Article →
        </Link>
      </div>
    </div>
  );
}