import React from 'react';
import { Award, Clock, Check, FileText } from 'lucide-react';

/**
 * A component to display scholarship information in an attractive card format
 * within the chatbot interface.
 */
const ScholarshipCard = ({ scholarship }) => {
  // Calculate match color based on match score
  const getMatchColor = (score) => {
    if (score >= 90) return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
    if (score >= 80) return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
    if (score >= 70) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
    return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
  };

  return (
    <div className="bg-background/40 rounded-lg border shadow-sm p-3 mt-2 mb-3 max-w-full overflow-hidden">
      <div className="flex items-start gap-3">
        <div className="bg-primary/10 p-2 rounded-full">
          <Award className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-sm">{scholarship.name}</h4>
            <span className={`text-xs px-2 py-0.5 rounded-full ${getMatchColor(scholarship.matchScore)}`}>
              {scholarship.matchScore}% Match
            </span>
          </div>
          
          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
              <FileText className="w-3 h-3" />
              {scholarship.amount}
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="w-3 h-3" />
              Due {scholarship.deadline}
            </span>
          </div>
          
          <div className="mt-2">
            <div className="flex items-center gap-1 mb-1">
              <Check className="w-3 h-3 text-primary" />
              <span className="text-xs font-medium">Requirements:</span>
            </div>
            <p className="text-xs text-muted-foreground">{scholarship.requirements}</p>
          </div>
          
          {scholarship.details && (
            <div className="mt-2 border-t pt-2">
              <p className="text-xs text-muted-foreground">{scholarship.details}</p>
            </div>
          )}
          
          <button className="mt-3 w-full text-xs text-primary bg-primary/5 hover:bg-primary/10 transition-colors py-1.5 rounded-md font-medium">
            View Application Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipCard; 