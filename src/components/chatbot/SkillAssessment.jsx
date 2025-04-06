import React, { useState } from 'react';
import { Target, Check, X, ChevronRight } from 'lucide-react';

const ASSESSMENT_QUESTIONS = [
  {
    id: 1,
    skill: 'Leadership',
    question: 'Have you held any leadership positions in clubs, organizations, or teams?',
    options: [
      { id: 'a', text: 'Yes, multiple leadership roles', score: 5 },
      { id: 'b', text: 'Yes, one significant leadership role', score: 4 },
      { id: 'c', text: 'Some informal leadership experience', score: 3 },
      { id: 'd', text: 'Rarely taken leadership roles', score: 2 },
      { id: 'e', text: 'No leadership experience yet', score: 1 }
    ]
  },
  {
    id: 2,
    skill: 'Public Speaking',
    question: 'How comfortable are you with public speaking and presentations?',
    options: [
      { id: 'a', text: 'Very comfortable, regularly give presentations', score: 5 },
      { id: 'b', text: 'Comfortable with preparation', score: 4 },
      { id: 'c', text: 'Somewhat comfortable, occasional nerves', score: 3 },
      { id: 'd', text: 'Uncomfortable but can manage if needed', score: 2 },
      { id: 'e', text: 'Very uncomfortable with public speaking', score: 1 }
    ]
  },
  {
    id: 3,
    skill: 'Problem Solving',
    question: 'How do you approach complex problems?',
    options: [
      { id: 'a', text: 'Systematically analyze and solve with creative approaches', score: 5 },
      { id: 'b', text: 'Break down into manageable parts and solve step by step', score: 4 },
      { id: 'c', text: 'Research solutions and apply methodically', score: 3 },
      { id: 'd', text: 'Seek help and guidance to work through problems', score: 2 },
      { id: 'e', text: 'Often feel overwhelmed by complex problems', score: 1 }
    ]
  },
  {
    id: 4,
    skill: 'Time Management',
    question: 'How well do you manage deadlines and priorities?',
    options: [
      { id: 'a', text: 'Excellent planning, rarely miss deadlines', score: 5 },
      { id: 'b', text: 'Good planning, occasionally rushed but meet deadlines', score: 4 },
      { id: 'c', text: 'Adequate planning, sometimes struggle with priorities', score: 3 },
      { id: 'd', text: 'Often behind schedule, difficulty prioritizing', score: 2 },
      { id: 'e', text: 'Frequently miss deadlines, poor time management', score: 1 }
    ]
  },
  {
    id: 5,
    skill: 'Teamwork',
    question: 'How effectively do you work in team settings?',
    options: [
      { id: 'a', text: 'Excellent collaborator, enhance team performance', score: 5 },
      { id: 'b', text: 'Good team player, contribute positively', score: 4 },
      { id: 'c', text: 'Work well in teams with occasional challenges', score: 3 },
      { id: 'd', text: 'Prefer individual work but can function in teams', score: 2 },
      { id: 'e', text: 'Struggle with teamwork and collaboration', score: 1 }
    ]
  }
];

const SkillAssessment = ({ onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [isComplete, setIsComplete] = useState(false);

  const handleAnswer = (option) => {
    const newAnswers = [...answers, { 
      questionId: ASSESSMENT_QUESTIONS[currentQuestion].id,
      skill: ASSESSMENT_QUESTIONS[currentQuestion].skill, 
      option, 
      score: option.score 
    }];
    
    setAnswers(newAnswers);
    
    if (currentQuestion < ASSESSMENT_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsComplete(true);
      
      // Calculate results
      const results = {};
      newAnswers.forEach(answer => {
        results[answer.skill] = answer.score;
      });
      
      // Pass results to parent component
      if (onComplete) {
        onComplete(results);
      }
    }
  };

  if (isComplete) {
    return (
      <div className="p-4 bg-background/50 rounded-lg border">
        <div className="flex items-center gap-2 mb-3">
          <div className="bg-green-100 p-1.5 rounded-full">
            <Check className="w-4 h-4 text-green-700" />
          </div>
          <h3 className="text-sm font-medium">Assessment Complete!</h3>
        </div>
        <p className="text-xs text-muted-foreground mb-3">
          Thank you for completing the skill assessment. Your results are being analyzed to provide personalized recommendations.
        </p>
        <div className="grid grid-cols-2 gap-2">
          {answers.map((answer, idx) => (
            <div key={idx} className="bg-secondary/20 p-2 rounded-lg">
              <p className="text-xs font-medium">{answer.skill}</p>
              <div className="flex items-center gap-1 mt-1">
                <div className="flex-1 h-1.5 bg-background rounded-full overflow-hidden">
                  <div 
                    className="bg-primary h-full" 
                    style={{ width: `${(answer.score / 5) * 100}%` }}
                  ></div>
                </div>
                <span className="text-xs text-muted-foreground">{answer.score}/5</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const question = ASSESSMENT_QUESTIONS[currentQuestion];

  return (
    <div className="p-4 bg-background/50 rounded-lg border">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="bg-primary/10 p-1.5 rounded-full">
            <Target className="w-4 h-4 text-primary" />
          </div>
          <h3 className="text-sm font-medium">Skill Assessment</h3>
        </div>
        <span className="text-xs text-muted-foreground">
          Question {currentQuestion + 1}/{ASSESSMENT_QUESTIONS.length}
        </span>
      </div>
      
      <h4 className="text-sm font-medium mb-1">{question.skill}</h4>
      <p className="text-xs text-muted-foreground mb-3">{question.question}</p>
      
      <div className="space-y-2">
        {question.options.map((option) => (
          <button
            key={option.id}
            className="w-full text-left flex items-center justify-between p-2 text-xs rounded-md hover:bg-secondary/30 transition-colors border border-border"
            onClick={() => handleAnswer(option)}
          >
            <span>{option.text}</span>
            <ChevronRight className="w-3 h-3 text-muted-foreground" />
          </button>
        ))}
      </div>
      
      <div className="mt-3 flex justify-between">
        <div className="flex gap-1">
          {ASSESSMENT_QUESTIONS.map((_, idx) => (
            <div 
              key={idx} 
              className={`w-2 h-2 rounded-full ${idx === currentQuestion ? 'bg-primary' : 'bg-secondary'}`}
            ></div>
          ))}
        </div>
        <button 
          className="text-xs text-muted-foreground hover:text-foreground"
          onClick={() => onComplete(null)} // Skip assessment
        >
          Skip
        </button>
      </div>
    </div>
  );
};

export default SkillAssessment; 