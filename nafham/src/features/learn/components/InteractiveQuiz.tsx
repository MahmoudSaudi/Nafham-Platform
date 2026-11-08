import { useState } from 'react';
import { QuizLearnItem } from '../data/learningData';
import { CheckCircle2, ArrowRight, ArrowLeft, RefreshCw, AlertCircle, Award } from 'lucide-react';

interface InteractiveQuizProps {
  item: QuizLearnItem;
  onComplete: (quizId: string, score: number) => void;
  previousScore?: number;
}

export default function InteractiveQuiz({ item, onComplete, previousScore }: InteractiveQuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const question = item.questions[currentQuestionIndex];
  const totalQuestions = item.questionsCount;
  
  const handleSelectOption = (optionIndex: number) => {
    if (isSubmitted) return;
    setSelectedAnswers(prev => ({ ...prev, [currentQuestionIndex]: optionIndex }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    // Calculate score
    let correctCount = 0;
    item.questions.forEach((q, index) => {
      if (selectedAnswers[index] === q.correctAnswerIndex) {
        correctCount++;
      }
    });
    const finalScore = Math.round((correctCount / totalQuestions) * 100);
    onComplete(item.id, finalScore);
  };

  const resetQuiz = () => {
    setSelectedAnswers({});
    setCurrentQuestionIndex(0);
    setIsSubmitted(false);
  };

  // If there's a previous score and not currently attempting, show results summary
  const hasCompletedBefore = previousScore !== undefined;

  if (hasCompletedBefore && !isSubmitted) {
    const passed = previousScore >= item.passingScore;
    return (
      <div className="w-full bg-white rounded-2xl shadow-sm border border-slate-200 p-10 flex flex-col items-center justify-center min-h-[500px]">
        <div className={`w-28 h-28 rounded-full flex items-center justify-center mb-6 ${passed ? 'bg-emerald-100 text-[#118B50]' : 'bg-rose-100 text-rose-500'}`}>
          <Award className="w-16 h-16" />
        </div>
        <h2 className="text-3xl font-extrabold text-slate-800 mb-4">
          {passed ? 'أحسنت! لقد اجتزت الاختبار' : 'عذراً، لم تجتز الاختبار'}
        </h2>
        <div className="bg-slate-50 border border-slate-100 rounded-xl p-6 text-center mb-8 w-full max-w-md">
          <p className="text-slate-500 text-sm mb-2">نتيجتك السابقة</p>
          <div className="text-5xl font-black text-slate-800 mb-2">{previousScore}%</div>
          <p className="text-slate-500 text-sm">درجة النجاح المطلوبة: {item.passingScore}%</p>
        </div>
        <button 
          onClick={resetQuiz}
          className="flex items-center gap-2 bg-[#118B50] hover:bg-[#0e7443] text-white font-bold py-3.5 px-8 rounded-xl transition-all shadow-md hover:shadow-lg"
        >
          <RefreshCw className="w-5 h-5" />
          إعادة الاختبار
        </button>
      </div>
    );
  }

  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;
  const currentAnswer = selectedAnswers[currentQuestionIndex];
  const hasAnsweredCurrent = currentAnswer !== undefined;

  // Render Result View if just submitted
  if (isSubmitted) {
    let correctCount = 0;
    item.questions.forEach((q, index) => {
      if (selectedAnswers[index] === q.correctAnswerIndex) correctCount++;
    });
    const finalScore = Math.round((correctCount / totalQuestions) * 100);
    const passed = finalScore >= item.passingScore;

    return (
      <div className="w-full bg-white rounded-2xl shadow-sm border border-slate-200 p-10 flex flex-col items-center justify-center min-h-[500px] animate-in zoom-in-95 duration-500">
        <div className={`w-28 h-28 rounded-full flex items-center justify-center mb-6 ${passed ? 'bg-emerald-100 text-[#118B50]' : 'bg-rose-100 text-rose-500'}`}>
          <Award className="w-16 h-16" />
        </div>
        <h2 className="text-3xl font-extrabold text-slate-800 mb-2">النتيجة النهائية</h2>
        <div className="text-6xl font-black text-slate-800 mb-6">{finalScore}%</div>
        
        <div className={`flex items-center gap-2 text-lg font-bold mb-10 px-6 py-3 rounded-xl border ${passed ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-rose-50 text-rose-700 border-rose-200'}`}>
          {passed ? (
            <><CheckCircle2 className="w-6 h-6" /> مبارك لك، لقد نجحت!</>
          ) : (
            <><AlertCircle className="w-6 h-6" /> تحتاج إلى {item.passingScore}% للنجاح</>
          )}
        </div>
        
        <div className="flex gap-4 w-full max-w-md">
          <button 
            onClick={resetQuiz}
            className="flex-1 flex items-center justify-center gap-2 border-2 border-slate-200 hover:border-slate-300 text-slate-700 font-bold py-3.5 px-6 rounded-xl transition-colors bg-white hover:bg-slate-50"
          >
            <RefreshCw className="w-5 h-5" />
            إعادة
          </button>
          <button 
            className="flex-1 bg-[#118B50] hover:bg-[#0e7443] text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-md hover:shadow-lg"
          >
            متابعة الدورة
          </button>
        </div>
      </div>
    );
  }

  // Active Quiz View
  return (
    <div className="w-full bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-12 min-h-[500px] flex flex-col">
      {/* Header & Progress */}
      <div className="mb-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl md:text-2xl font-extrabold text-slate-800">{item.title}</h2>
          <span className="bg-slate-100 text-slate-600 font-bold text-sm py-1.5 px-4 rounded-full border border-slate-200">
            سؤال {currentQuestionIndex + 1} من {totalQuestions}
          </span>
        </div>
        
        <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
          <div 
            className="bg-[#118B50] h-full rounded-full transition-all duration-500 ease-out" 
            style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Question */}
      <div className="flex-1 animate-in slide-in-from-right-4 fade-in duration-300" key={currentQuestionIndex}>
        <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-8 leading-relaxed">
          {question.text}
        </h3>

        <div className="space-y-4">
          {question.options.map((option, index) => {
            const isSelected = currentAnswer === index;
            return (
              <button
                key={index}
                onClick={() => handleSelectOption(index)}
                className={`w-full text-right p-5 rounded-xl border-2 transition-all flex items-center justify-between group ${
                  isSelected 
                    ? 'border-[#118B50] bg-[#118B50]/5 shadow-[0_0_0_4px_rgba(17,139,80,0.1)]' 
                    : 'border-slate-200 hover:border-[#118B50]/30 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold text-sm shrink-0 transition-colors ${
                    isSelected ? 'border-[#118B50] bg-[#118B50] text-white' : 'border-slate-300 text-slate-400 group-hover:border-[#118B50]/50'
                  }`}>
                    {String.fromCharCode(1601 + index)} {/* Displays أ, ب, ج, د... roughly for Arabic logic, or we can just use numbers */}
                  </div>
                  <span className={`font-semibold text-lg ${isSelected ? 'text-[#118B50]' : 'text-slate-700'}`}>
                    {option}
                  </span>
                </div>
                
                {/* Custom Radio Button Indicator */}
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                  isSelected ? 'border-[#118B50]' : 'border-slate-300'
                }`}>
                  {isSelected && <div className="w-2.5 h-2.5 bg-[#118B50] rounded-full"></div>}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Controls */}
      <div className="mt-12 flex items-center justify-between pt-6 border-t border-slate-100">
        <button 
          onClick={handlePrev}
          disabled={currentQuestionIndex === 0}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-800 font-bold py-2 px-4 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ArrowRight className="w-5 h-5" />
          السابق
        </button>

        {isLastQuestion ? (
          <button 
            onClick={handleSubmit}
            disabled={!hasAnsweredCurrent}
            className="flex items-center gap-2 bg-[#118B50] hover:bg-[#0e7443] text-white font-bold py-3.5 px-8 rounded-xl transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            إنهاء وتسليم الإجابات
            <CheckCircle2 className="w-5 h-5" />
          </button>
        ) : (
          <button 
            onClick={handleNext}
            disabled={!hasAnsweredCurrent}
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-900 text-white font-bold py-3.5 px-8 rounded-xl transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            التالي
            <ArrowLeft className="w-5 h-5" />
          </button>
        )}
      </div>

    </div>
  );
}
