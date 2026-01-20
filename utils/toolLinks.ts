import React from 'react';

// Map of tool names to their external URLs
export const toolLinksMap: Record<string, string> = {
  // Content Creation & Writing
  'ChatGPT': 'https://chat.openai.com',
  'OpenAI': 'https://openai.com',
  'Claude': 'https://claude.ai',
  'Grammarly': 'https://grammarly.com',
  'Buffer': 'https://buffer.com',
  'Canva': 'https://www.canva.com',
  'Canva Pro': 'https://www.canva.com/pro',

  // Project Management & Collaboration
  'Trello': 'https://trello.com',
  'Notion': 'https://www.notion.so',
  'Slack': 'https://slack.com',
  'Asana': 'https://asana.com',
  'Google Workspace': 'https://workspace.google.com',

  // Research & Learning
  'Perplexity': 'https://perplexity.ai',
  'Google': 'https://google.com',
  'Google Scholar': 'https://scholar.google.com',
  'Khan Academy': 'https://www.khanacademy.org',
  'Wolfram Alpha': 'https://www.wolframalpha.com',
  'Duolingo': 'https://www.duolingo.com',
  'Evernote': 'https://evernote.com',
  'Quizlet': 'https://quizlet.com',

  // Design & Media
  'Adobe Creative Suite': 'https://www.adobe.com/creativecloud.html',
  'Adobe': 'https://www.adobe.com',
  'Midjourney': 'https://www.midjourney.com',
  'YouTube Studio': 'https://studio.youtube.com',
  'Audacity': 'https://www.audacityteam.org',
  'Unsplash': 'https://unsplash.com',
  'Hootsuite': 'https://www.hootsuite.com',

  // Business & Finance
  'Stripe': 'https://stripe.com',
  'Shopify': 'https://www.shopify.com',
  'Mailchimp': 'https://mailchimp.com',
  'QuickBooks': 'https://quickbooks.intuit.com',
  'Zoom': 'https://zoom.us',
  'Fiverr': 'https://www.fiverr.com',
  'LinkedIn': 'https://www.linkedin.com',
  'Google Analytics': 'https://analytics.google.com',

  // Development & Tools
  'GitHub': 'https://github.com',
  'VS Code': 'https://code.visualstudio.com',
  'Docker': 'https://www.docker.com',
  'Firebase': 'https://firebase.google.com',
  'Vercel': 'https://vercel.com',
  'Zapier': 'https://zapier.com',
  'Postman': 'https://www.postman.com',
  'Stack Overflow': 'https://stackoverflow.com',

  // Other AI Tools
  'Google Bard': 'https://bard.google.com',
};

/**
 * Converts text content with tool names into JSX with external links.
 * Matches whole words (case-insensitive) and converts them to links.
 * Preserves original formatting, spacing, and punctuation.
 * 
 * @param text - The text content that may contain tool names
 * @returns Array of text and link elements for JSX rendering
 */
export function convertToolNamesToLinks(text: string): (string | React.ReactNode)[] {
  if (!text) return [text];

  // Sort tool names by length (longest first) to match longer names first
  // This prevents shorter names from matching first and breaking longer names
  const sortedToolNames = Object.keys(toolLinksMap).sort(
    (a, b) => b.length - a.length
  );

  // Create a regex pattern that matches any tool name as whole words
  // Using word boundaries to match complete words only
  const pattern = new RegExp(
    `\\b(${sortedToolNames.map(name => name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})\\b`,
    'gi'
  );

  const parts: (string | React.ReactNode)[] = [];
  let lastIndex = 0;
  let matchIndex = 0;

  let match: RegExpExecArray | null;
  while ((match = pattern.exec(text)) !== null) {
    // Add text before the match
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    // Find the actual tool name (case-insensitive)
    const matchedText = match[0];
    const toolKey = Object.keys(toolLinksMap).find(
      key => key.toLowerCase() === matchedText.toLowerCase()
    );

    if (toolKey) {
      const url = toolLinksMap[toolKey];
      parts.push(
        React.createElement(
          'a',
          {
            key: `link-${matchIndex}`,
            href: url,
            target: '_blank',
            rel: 'noopener noreferrer',
            className: 'text-blue-600 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-300 transition-colors'
          },
          matchedText
        )
      );
      matchIndex++;
    }

    lastIndex = match.index + match[0].length;
  }

  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  // If no matches found, return the original text
  if (parts.length === 0) {
    return [text];
  }

  return parts;
}
