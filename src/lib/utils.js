import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines class names with Tailwind's class merging
 * @param {string[]} inputs - The class names to combine
 * @returns {string} - The combined class names
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a date string to a more readable format
 * @param {string} dateString - The date string to format
 * @returns {string} - The formatted date
 */
export function formatDate(dateString) {
  const date = new Date(dateString);
  
  // Format: "January 1, 2023"
  const formatted = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  return formatted;
}

/**
 * Calculates number of days between now and a target date
 * @param {string} targetDateString - The target date
 * @returns {number} - Days difference (negative if date is in the past)
 */
export function getDaysUntil(targetDateString) {
  const today = new Date();
  const targetDate = new Date(targetDateString);
  
  // Reset times to compare just dates
  today.setHours(0, 0, 0, 0);
  targetDate.setHours(0, 0, 0, 0);
  
  // Calculate difference in milliseconds
  const differenceMs = targetDate - today;
  
  // Convert to days
  return Math.ceil(differenceMs / (1000 * 60 * 60 * 24));
}

/**
 * Truncates text to a specified length
 * @param {string} text - The text to truncate
 * @param {number} length - Maximum length before truncating
 * @returns {string} - Truncated text with ellipsis if needed
 */
export function truncateText(text, length = 100) {
  if (!text) return '';
  if (text.length <= length) return text;
  
  return text.slice(0, length) + '...';
}

/**
 * Generates a random ID string
 * @returns {string} - A random ID string
 */
export function generateId() {
  return Math.random().toString(36).substring(2, 15);
} 