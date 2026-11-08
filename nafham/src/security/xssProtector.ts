import DOMPurify from 'dompurify';

/**
 * A configured instance of DOMPurify to sanitize HTML content received from the server
 * or user input, preventing XSS attacks.
 */

export const sanitizeHtml = (html: string | undefined | null): string => {
  if (!html) return '';
  
  // We can only use DOMPurify in the browser environment. 
  // If this runs on the server (SSR in Next.js), we return the string as is 
  // or use JSDOM (though that adds weight, usually server doesn't execute the script anyway).
  if (typeof window === 'undefined') {
    return html;
  }

  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      'b', 'i', 'em', 'strong', 'a', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 
      'ul', 'ol', 'li', 'br', 'span', 'div', 'img', 'blockquote', 'code', 'pre'
    ],
    ALLOWED_ATTR: ['href', 'target', 'class', 'style', 'src', 'alt', 'title'],
  });
};
