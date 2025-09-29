import React from 'react';
import { BaseDialog, BaseDialogContent, BaseDialogHeader, BaseDialogTitle, BaseDialogDescription } from '../base/dialog/BaseDialog';

interface AIAnalysisModalProps {
  open: boolean;
  onClose: () => void;
}

export function AIAnalysisModal({ open, onClose }: AIAnalysisModalProps) {
  const analysis = `Based on this literary collection, Isabelle appears to be a deeply thoughtful individual who operates at the intersection of technical excellence and humanistic understanding. Her reading patterns reveal someone who:

**INTELLECTUAL CURIOSITY & SYSTEMS THINKING**
Isabelle's fascination with systems engineering, software architecture, and complex organizational dynamics suggests she is drawn to understanding how intricate systems work and can be optimized. Books like "Thinking In Systems" and "Software Engineering at Google" indicate she appreciates both theoretical frameworks and practical applications.

**LEADERSHIP & GROWTH MINDSET**
The prominence of management and leadership titles ("The Manager's Path", "Scaling People", "Resilient Management") reveals someone who takes responsibility for others' growth and success. Isabelle likely sees leadership as a craft to be studied and refined, not just a role to be filled.

**PHILOSOPHICAL DEPTH**
Isabelle's selection of profound literary works—from Kundera's existential questioning to Paul Kalanithi's meditation on mortality—shows she grapples with life's deeper questions. She is comfortable with complexity and ambiguity, particularly around themes of meaning, mortality, and human connection.

**AESTHETIC & ANALYTICAL BALANCE**
The inclusion of "Ways of Seeing" and design principles alongside technical texts suggests Isabelle understands that good solutions must be both functional and elegant. She likely appreciates craft in all its forms.

**COMPASSIONATE PRAGMATISM**
Isabelle's interest in death positivity ("Smoke Gets in Your Eyes") and medical memoirs, combined with management philosophy, suggests someone who faces difficult realities head-on while maintaining empathy for human experience.

**TEMPORAL PERSPECTIVE**
Her reading spans from classical mythology to cutting-edge technology, indicating Isabelle understands that wisdom is timeless while methods evolve. She likely draws connections across disciplines and eras.

**CONCLUSION**
Isabelle is probably someone others turn to for both technical guidance and life perspective—a rare combination of analytical rigor and emotional intelligence. Her library suggests a leader who builds systems that serve people, not the other way around.`;

  return (
    <BaseDialog open={open} onOpenChange={onClose}>
      <BaseDialogContent 
        className="max-w-6xl max-h-[85vh] overflow-y-auto border-amber-700/30 bg-stone-50 p-0"
        style={{
          background: 'linear-gradient(145deg, #fafaf9 0%, #f5f5f4 100%)',
          border: '2px solid rgba(180, 83, 9, 0.3)',
        }}
      >
        <BaseDialogHeader className="p-6 pb-0">
          <BaseDialogTitle 
            className="text-center"
            style={{
              color: '#78350f',
              fontFamily: 'Beth Ellen',
              fontSize: '32px',
              fontWeight: '400',
              letterSpacing: '2px',
              marginBottom: '8px'
            }}
          >
            Literary Psychology Analysis
          </BaseDialogTitle>
          
          <BaseDialogDescription 
            className="text-center text-stone-600"
            style={{
              fontFamily: "'Cousine', monospace",
              fontSize: '14px',
              letterSpacing: '1px'
            }}
          >
            AI-powered personality insights based on your literary collection
          </BaseDialogDescription>
        </BaseDialogHeader>

        <div className="px-6 pb-6">
          {/* Vintage card styling */}
          <div 
            className="bg-stone-100 border-2 border-stone-300 p-6 shadow-lg"
            style={{
              background: 'linear-gradient(145deg, #f5f5f4 0%, #e7e5e4 100%)',
              boxShadow: 'inset 2px 2px 4px rgba(0,0,0,0.1), 4px 4px 12px rgba(0,0,0,0.15)'
            }}
          >
            {/* Header */}
            <div className="border-b-2 border-stone-400 pb-3 mb-6">
              <div className="flex justify-between items-center">
                <span 
                  className="text-sm text-stone-600"
                  style={{ fontFamily: "'Courier New', Courier, monospace" }}
                >
                  Analysis Report #2025-001
                </span>
                <span 
                  className="text-sm text-stone-600"
                  style={{ fontFamily: "'Courier New', Courier, monospace" }}
                >
                  AI Literary Profiler v3.0
                </span>
              </div>
              <div 
                className="text-center mt-2 text-stone-700"
                style={{ 
                  fontFamily: "'American Typewriter', 'Courier New', monospace",
                  fontSize: '18px',
                  letterSpacing: '1px'
                }}
              >
                PSYCHOLOGICAL PROFILE: ISABELLE
              </div>
            </div>

            {/* Analysis content */}
            <div 
              className="text-stone-800 leading-relaxed space-y-4"
              style={{ 
                fontFamily: "'Monaco', 'Courier New', monospace",
                fontSize: '15px',
                lineHeight: '1.7'
              }}
            >
              {analysis.split('\n\n').map((paragraph, index) => {
                // Handle section headers (text in **bold**)
                if (paragraph.includes('**')) {
                  const parts = paragraph.split('**');
                  return (
                    <div key={index} className="mb-4">
                      {parts.map((part, partIndex) => {
                        if (partIndex % 2 === 1) {
                          // This is a header
                          return (
                            <h3 
                              key={partIndex}
                              className="text-amber-900 mb-2"
                              style={{ 
                                fontFamily: "'Consolas', 'Courier New', monospace",
                                fontSize: '16px',
                                fontWeight: '700',
                                letterSpacing: '1px'
                              }}
                            >
                              {part}
                            </h3>
                          );
                        } else if (part.trim()) {
                          // This is regular text
                          return <p key={partIndex} className="mb-2">{part.trim()}</p>;
                        }
                        return null;
                      })}
                    </div>
                  );
                } else if (paragraph.trim()) {
                  return (
                    <p key={index} className="mb-3">
                      {paragraph}
                    </p>
                  );
                }
                return null;
              })}
            </div>

            {/* Footer */}
            <div className="border-t border-stone-400 pt-4 mt-6">
              <div 
                className="text-xs text-stone-600 text-center"
                style={{ fontFamily: "'Consolas', 'Courier New', monospace" }}
              >
                Generated by Advanced Literary Analysis Engine • Based on {'{'}analysis of 28 books across 6 categories{'}'}
              </div>
              <div 
                className="text-xs text-stone-500 text-center mt-2"
                style={{ fontFamily: "'Monaco', 'Courier New', monospace" }}
              >
                "Every library is a portrait of the mind that assembled it."
              </div>
            </div>
          </div>
        </div>
      </BaseDialogContent>
    </BaseDialog>
  );
}