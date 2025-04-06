import React from 'react';
import { Target, Award, Check } from 'lucide-react';

/**
 * A component to display skill information in an attractive card format
 * within the chatbot interface.
 */
const SkillCard = ({ skill }) => {
  const getImportanceColor = (importance) => {
    switch (importance.toLowerCase()) {
      case 'high':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'medium':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'low':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  return (
    <div className="bg-background/40 rounded-lg border shadow-sm p-3 mt-2 mb-3 max-w-full overflow-hidden">
      <div className="flex items-start gap-3">
        <div className="bg-primary/10 p-2 rounded-full">
          <Target className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-sm">{skill.name}</h4>
            <span className={`text-xs px-2 py-0.5 rounded-full ${getImportanceColor(skill.importance)}`}>
              {skill.importance}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">{skill.description}</p>
          
          {skill.relevantScholarships && skill.relevantScholarships.length > 0 && (
            <div className="mt-2">
              <div className="flex items-center gap-1 mb-1">
                <Award className="w-3 h-3 text-primary" />
                <span className="text-xs font-medium">Relevant Scholarships:</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {skill.relevantScholarships.map((scholarship, idx) => (
                  <span 
                    key={idx}
                    className="text-xs bg-accent/10 text-accent px-2 py-0.5 rounded-full"
                  >
                    {scholarship}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {skill.improvementTips && (
            <div className="mt-2">
              <div className="flex items-center gap-1 mb-1">
                <Check className="w-3 h-3 text-green-500" />
                <span className="text-xs font-medium">Improvement Tips:</span>
              </div>
              <p className="text-xs text-muted-foreground">{skill.improvementTips}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SkillCard; 