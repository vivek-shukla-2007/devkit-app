import React, { useEffect } from 'react';

/**
 * SEO Helmet Component
 * Dynamically updates meta tags and structured data for each page
 * Improves SEO and social media sharing
 */
export default function SEOHelmet({ 
    title, 
    description, 
    keywords,
    canonical,
    ogImage = 'https://devgearhub.com/og-image.png',
    ogType = 'website',
    twitterCard = 'summary_large_image'
}) {
    useEffect(() => {
        // Update title
        if (title) {
            document.title = `${title} | DevGear Hub`;
        }

        // Update meta description
        let metaDescription = document.querySelector('meta[name="description"]');
        if (!metaDescription) {
            metaDescription = document.createElement('meta');
            metaDescription.name = 'description';
            document.head.appendChild(metaDescription);
        }
        if (description) {
            metaDescription.content = description;
        }

        // Update meta keywords
        let metaKeywords = document.querySelector('meta[name="keywords"]');
        if (!metaKeywords) {
            metaKeywords = document.createElement('meta');
            metaKeywords.name = 'keywords';
            document.head.appendChild(metaKeywords);
        }
        if (keywords) {
            metaKeywords.content = keywords;
        }

        // Update canonical URL
        let canonicalLink = document.querySelector('link[rel="canonical"]');
        if (!canonicalLink) {
            canonicalLink = document.createElement('link');
            canonicalLink.rel = 'canonical';
            document.head.appendChild(canonicalLink);
        }
        if (canonical) {
            canonicalLink.href = canonical;
        }

        // Update Open Graph tags
        updateMetaTag('og:title', title ? `${title} | DevGear Hub` : 'DevGear Hub');
        updateMetaTag('og:description', description || 'Your essential online dev gear hub');
        updateMetaTag('og:image', ogImage);
        updateMetaTag('og:type', ogType);
        updateMetaTag('og:url', canonical || 'https://devgearhub.com/');

        // Update Twitter Card tags
        updateMetaTag('twitter:title', title ? `${title} | DevGear Hub` : 'DevGear Hub');
        updateMetaTag('twitter:description', description || 'Your essential online dev gear hub');
        updateMetaTag('twitter:image', ogImage);
        updateMetaTag('twitter:card', twitterCard);

        // Scroll to top
        window.scrollTo(0, 0);
    }, [title, description, keywords, canonical, ogImage, ogType, twitterCard]);

    return null;
}

/**
 * Helper function to update or create meta tags
 */
function updateMetaTag(property, content) {
    let tag = document.querySelector(`meta[property="${property}"]`);
    if (!tag) {
        tag = document.querySelector(`meta[name="${property}"]`);
    }
    if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
    }
    tag.content = content;
}
