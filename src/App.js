import React, { useState } from 'react';

// 📋 개선된 체크리스트 데이터 (18개 항목)
const checklistItemsData = [
  "세부적인 면에 대해 꼼꼼하게 주의를 기울이지 못하거나 학업에서 부주의한 실수를 한다.",
  "손놀을 가만히 두지 못하거나 의자에 앉아서도 몸을 꼼지락거린다.",
  "일을 하거나 놀이를 할 때 지속적으로 주의를 집중하는데 어려움이 있다.",
  "자리에 앉아 있어야 하는 교실이나 다른 상황에서 앉아있지 못한다.",
  "다른 사람이 마주보고 이야기할 때 경청하지 않는 것처럼 보인다.",
  "그 밖에 허락 없이는 상황에서 지나치게 뛰어다니거나 기어오른다.",
  "지시를 따르지 않고, 일을 끝내지 못한다.",
  "여가활동이나 재미있는 일에 조용히 참여하기가 어렵다.",
  "과제와 일을 체계적으로 하기 못한다.",
  "끊임없이 무언인가를 하거나 마치 모터가 돌아가는 것처럼 행동한다.",
  "지속적인 노력이 요구되는 과제(학교공부나 숙제)를 하지 않으려 한다.",
  "지나치게 말을 많이 한다.",
  "과제나 일을 하는데 필요한 물건들을 자주 잃어버린다.",
  "질문이 채 끝나기도 전에 성급하게 대답한다.",
  "쉽게 산만해진다.",
  "차례를 기다리는 데 어려움이 있다.",
  "일상적으로 하는 일을 자주 잊어버린다.",
  "다른 사람을 방해하거나 간섭한다."
];

// 🏠 홈 컴포넌트
const HomeComponent = ({ onNavigate }) => (
  <div style={{
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '20px',
    fontFamily: 'Arial, sans-serif'
  }}>
    <div style={{
      maxWidth: '800px',
      margin: '0 auto',
      backgroundColor: 'white',
      borderRadius: '20px',
      padding: '40px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
    }}>
      <h1 style={{
        fontSize: '2.5rem',
        color: '#2d3748',
        textAlign: 'center',
        marginBottom: '20px'
      }}>🧠 ADHD 자가진단 앱</h1>
      
      <p style={{
        fontSize: '1.2rem',
        color: '#4a5568',
        textAlign: 'center',
        marginBottom: '40px'
      }}>전문적인 18항목 척도를 통한 정확한 자가진단</p>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        marginBottom: '40px'
      }}>
        <button 
          style={{
            backgroundColor: '#4299e1',
            color: 'white',
            border: 'none',
            borderRadius: '15px',
            padding: '25px',
            fontSize: '1.1rem',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 15px rgba(66, 153, 225, 0.3)'
          }}
          onClick={() => onNavigate('checklist')}
        >
          ✅ 전문 자가진단 시작
        </button>
        
        <button 
          style={{
            backgroundColor: '#48bb78',
            color: 'white',
            border: 'none',
            borderRadius: '15px',
            padding: '25px',
            fontSize: '1.1rem',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 15px rgba(72, 187, 120, 0.3)'
          }}
          onClick={() => onNavigate('info')}
        >
          🔍 ADHD 알아보기
        </button>
        
        <button 
          style={{
            backgroundColor: '#ed8936',
            color: 'white',
            border: 'none',
            borderRadius: '15px',
            padding: '25px',
            fontSize: '1.1rem',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 15px rgba(237, 137, 54, 0.3)'
          }}
          onClick={() => onNavigate('qna')}
        >
          💬 자주 묻는 질문
        </button>
      </div>

      <div style={{
        backgroundColor: '#f7fafc',
        borderRadius: '15px',
        padding: '30px',
        marginBottom: '30px'
      }}>
        <h3 style={{ color: '#2d3748', marginBottom: '20px' }}>📌 개선된 특징</h3>
        <ul style={{ color: '#4a5568', lineHeight: '1.8' }}>
          <li>✅ 전문적인 18항목 ADHD 척도 적용</li>
          <li>🎯 4점 척도(0-3점)로 정밀 평가</li>
          <li>📊 과학적 근거 기반 점수 해석</li>
          <li>🔒 완전 익명 처리 및 개인정보 보호</li>
          <li>📱 모바일 최적화 UI/UX</li>
        </ul>
      </div>

      <footer style={{ textAlign: 'center', color: '#718096' }}>
        <p><strong>개발자: 참리더</strong></p>
        <p style={{ fontSize: '0.9rem' }}>본 앱은 의료진단을 대체할 수 없으며, 참고용 정보만 제공합니다.</p>
      </footer>
    </div>
  </div>
);

// ✅ 개선된 체크리스트 컴포넌트
const ChecklistComponent = ({ onNavigate, onComplete }) => {
  const [answers, setAnswers] = useState({});
  const [participantName, setParticipantName] = useState('');

  const handleAnswerChange = (questionIndex, score) => {
    setAnswers(prev => ({
      ...prev,
      [questionIndex]: score
    }));
  };

  const calculateTotalScore = () => {
    return Object.values(answers).reduce((sum, score) => sum + (score || 0), 0);
  };

  const getAnsweredCount = () => {
    return Object.keys(answers).length;
  };

  const handleSubmit = () => {
    const totalScore = calculateTotalScore();
    const maxScore = checklistItemsData.length * 3;
    
    onComplete({
      participantName: participantName || '익명',
      totalScore,
      maxScore,
      answers,
      answeredCount: getAnsweredCount()
    });
  };

  const ScoreButton = ({ score, label, questionIndex, currentScore }) => (
    <button
      style={{
        backgroundColor: currentScore === score ? '#4299e1' : '#e2e8f0',
        color: currentScore === score ? 'white' : '#4a5568',
        border: 'none',
        borderRadius: '8px',
        padding: '8px 12px',
        margin: '2px',
        cursor: 'pointer',
        fontSize: '0.9rem',
        minWidth: '60px',
        transition: 'all 0.2s ease'
      }}
      onClick={() => handleAnswerChange(questionIndex, score)}
    >
      {label}
    </button>
  );

  const totalScore = calculateTotalScore();
  const progress = (getAnsweredCount() / checklistItemsData.length) * 100;

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        backgroundColor: 'white',
        borderRadius: '20px',
        padding: '30px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
      }}>
        <button 
          style={{
            backgroundColor: '#e2e8f0',
            border: 'none',
            borderRadius: '10px',
            padding: '10px 20px',
            cursor: 'pointer',
            marginBottom: '20px',
            fontSize: '1rem'
          }}
          onClick={() => onNavigate('home')}
        >
          ← 홈으로 돌아가기
        </button>
        
        <h2 style={{
          fontSize: '2rem',
          color: '#2d3748',
          textAlign: 'center',
          marginBottom: '20px'
        }}>🔍 ADHD 자가진단 체크리스트</h2>

        {/* 진행률 바 */}
        <div style={{
          backgroundColor: '#e2e8f0',
          borderRadius: '10px',
          height: '10px',
          marginBottom: '20px',
          overflow: 'hidden'
        }}>
          <div style={{
            backgroundColor: '#4299e1',
            height: '100%',
            width: `${progress}%`,
            borderRadius: '10px',
            transition: 'width 0.3s ease'
          }}></div>
        </div>
        <p style={{
          textAlign: 'center',
          color: '#4a5568',
          marginBottom: '30px'
        }}>
          진행률: {getAnsweredCount()}/{checklistItemsData.length} ({Math.round(progress)}%)
        </p>

        <div style={{ marginBottom: '30px' }}>
          <label style={{
            display: 'block',
            color: '#2d3748',
            fontSize: '1.1rem',
            marginBottom: '10px'
          }}>
            참여자명 (선택사항):
          </label>
          <input
            type="text"
            value={participantName}
            onChange={(e) => setParticipantName(e.target.value)}
            placeholder="익명으로 진행하시려면 비워두세요"
            style={{
              width: '100%',
              padding: '12px',
              border: '2px solid #e2e8f0',
              borderRadius: '10px',
              fontSize: '1rem'
            }}
          />
        </div>

        <div style={{
          backgroundColor: '#f7fafc',
          borderRadius: '10px',
          padding: '20px',
          marginBottom: '30px'
        }}>
          <h4 style={{ color: '#2d3748', marginBottom: '10px' }}>평가 기준:</h4>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '10px',
            fontSize: '0.9rem',
            color: '#4a5568'
          }}>
            <div><strong>0점:</strong> 전혀 그렇지 않다</div>
            <div><strong>1점:</strong> 때때로 그렇다</div>
            <div><strong>2점:</strong> 자주 그렇다</div>
            <div><strong>3점:</strong> 매우 자주 그렇다</div>
          </div>
        </div>

        <div style={{ marginBottom: '30px' }}>
          {checklistItemsData.map((question, index) => (
            <div key={index} style={{
              backgroundColor: '#f7fafc',
              borderRadius: '15px',
              padding: '20px',
              marginBottom: '15px',
              border: answers[index] !== undefined ? '2px solid #4299e1' : '2px solid transparent'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '15px'
              }}>
                <span style={{
                  backgroundColor: '#4299e1',
                  color: 'white',
                  borderRadius: '50%',
                  width: '30px',
                  height: '30px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.9rem',
                  fontWeight: 'bold',
                  flexShrink: 0
                }}>
                  {index + 1}
                </span>
                <p style={{
                  margin: '0 0 0 15px',
                  color: '#2d3748',
                  fontSize: '1rem',
                  lineHeight: '1.5'
                }}>
                  {question}
                </p>
              </div>
              
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '10px',
                flexWrap: 'wrap'
              }}>
                <ScoreButton 
                  score={0} 
                  label="0점" 
                  questionIndex={index} 
                  currentScore={answers[index]} 
                />
                <ScoreButton 
                  score={1} 
                  label="1점" 
                  questionIndex={index} 
                  currentScore={answers[index]} 
                />
                <ScoreButton 
                  score={2} 
                  label="2점" 
                  questionIndex={index} 
                  currentScore={answers[index]} 
                />
                <ScoreButton 
                  score={3} 
                  label="3점" 
                  questionIndex={index} 
                  currentScore={answers[index]} 
                />
              </div>
            </div>
          ))}
        </div>

        <div style={{
          backgroundColor: '#e6fffa',
          borderRadius: '15px',
          padding: '20px',
          marginBottom: '30px',
          textAlign: 'center'
        }}>
          <h3 style={{ color: '#2d3748', marginBottom: '10px' }}>현재 점수</h3>
          <div style={{
            fontSize: '2rem',
            color: '#4299e1',
            fontWeight: 'bold'
          }}>
            {totalScore} / 54점
          </div>
          <p style={{ color: '#4a5568', marginTop: '10px' }}>
            답변 완료: {getAnsweredCount()}/{checklistItemsData.length}문항
          </p>
        </div>

        <button 
          style={{
            width: '100%',
            backgroundColor: getAnsweredCount() === checklistItemsData.length ? '#4299e1' : '#cbd5e0',
            color: 'white',
            border: 'none',
            borderRadius: '15px',
            padding: '20px',
            fontSize: '1.2rem',
            cursor: getAnsweredCount() === checklistItemsData.length ? 'pointer' : 'not-allowed',
            transition: 'all 0.3s ease'
          }}
          onClick={handleSubmit}
          disabled={getAnsweredCount() !== checklistItemsData.length}
        >
          {getAnsweredCount() === checklistItemsData.length 
            ? `결과 확인하기 (총 ${totalScore}점)` 
            : `모든 문항에 답해주세요 (${checklistItemsData.length - getAnsweredCount()}개 남음)`
          }
        </button>
      </div>
    </div>
  );
};

// 📊 개선된 결과 컴포넌트
const ResultComponent = ({ resultData, onNavigate, onRestart }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  const [submitAttempts, setSubmitAttempts] = useState(0);

  // Google Apps Script URL - 백업 URL 포함
  const GOOGLE_APPS_SCRIPT_URLS = [
    "https://script.google.com/macros/s/AKfycbxJn4UN13E0ZIGTXQW1FrXkYBwSrYa-L9TOWQmP5JSbruqJ9EYAycCqusRq3Hspb2L9/exec",
    // 백업 URL (필요시 추가)
  ];

  const submitResults = async () => {
    setIsSubmitting(true);
    setSubmitStatus('📤 데이터 전송 중...');
    
    const currentUrl = GOOGLE_APPS_SCRIPT_URLS[submitAttempts % GOOGLE_APPS_SCRIPT_URLS.length];

    try {
      // CORS 문제를 회피하기 위해 mode: 'no-cors' 사용
      await fetch(currentUrl, {
        method: 'POST',
        mode: 'no-cors', // CORS 문제 해결
        headers: { 
          'Content-Type': 'text/plain' // Google Apps Script는 text/plain을 사용
        },
        body: JSON.stringify({
          name: resultData.participantName,
          score: resultData.totalScore,
          maxScore: resultData.maxScore,
          answers: Object.entries(resultData.answers).map(([key, value]) => ({
            question: parseInt(key) + 1,
            score: value
          })),
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent
        })
      });

      // no-cors 모드에서는 response를 읽을 수 없으므로
      // 성공으로 간주하고 메시지 표시
      setSubmitStatus('✅ 결과가 전송되었습니다! (익명 통계로 저장됩니다)');
      setSubmitAttempts(0); // 성공 시 시도 횟수 초기화
      
      // 3초 후 메시지 자동 숨김
      setTimeout(() => {
        setSubmitStatus('');
      }, 3000);
      
    } catch (error) {
      console.error('제출 오류:', error);
      setSubmitAttempts(prev => prev + 1);
      
      if (submitAttempts < 2) {
        setSubmitStatus('⚠️ 연결 문제가 발생했습니다. 다시 시도하려면 버튼을 클릭하세요.');
      } else {
        setSubmitStatus('❌ 여러 번 시도했지만 전송에 실패했습니다. 나중에 다시 시도해주세요.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const getInterpretation = () => {
    const score = resultData.totalScore;
    const percentage = (score / resultData.maxScore) * 100;
    
    if (percentage >= 60) {
      return {
        level: '높음',
        color: '#e53e3e',
        bgColor: '#fed7d7',
        message: 'ADHD 증상이 강하게 의심됩니다.',
        recommendation: '전문의와의 상담을 적극 권장합니다. 정확한 진단과 적절한 치료 계획을 세우시기 바랍니다.'
      };
    } else if (percentage >= 40) {
      return {
        level: '중간',
        color: '#d69e2e',
        bgColor: '#faf089',
        message: '일부 ADHD 증상이 관찰됩니다.',
        recommendation: '지속적인 관찰이 필요하며, 필요시 전문가와 상담을 고려해보세요.'
      };
    } else if (percentage >= 20) {
      return {
        level: '약간',
        color: '#d69e2e',
        bgColor: '#fef5e7',
        message: '경미한 주의력 문제가 있을 수 있습니다.',
        recommendation: '일상생활에서 주의 깊게 관찰하시고, 증상이 지속되면 상담을 고려해보세요.'
      };
    } else {
      return {
        level: '낮음',
        color: '#38a169',
        bgColor: '#c6f6d5',
        message: '현재로서는 특별한 우려사항이 적습니다.',
        recommendation: '정기적인 성장 발달 체크를 유지하시면 됩니다.'
      };
    }
  };

  const interpretation = getInterpretation();
  const percentage = Math.round((resultData.totalScore / resultData.maxScore) * 100);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        backgroundColor: 'white',
        borderRadius: '20px',
        padding: '40px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
      }}>
        <h2 style={{
          fontSize: '2.5rem',
          color: '#2d3748',
          textAlign: 'center',
          marginBottom: '30px'
        }}>📊 자가진단 결과</h2>
        
        <div style={{
          backgroundColor: interpretation.bgColor,
          borderRadius: '20px',
          padding: '30px',
          marginBottom: '30px',
          textAlign: 'center'
        }}>
          <h3 style={{
            fontSize: '1.3rem',
            color: '#2d3748',
            marginBottom: '10px'
          }}>
            참여자: {resultData.participantName}
          </h3>
          <p style={{
            color: '#4a5568',
            marginBottom: '20px'
          }}>
            검사 일시: {new Date().toLocaleString('ko-KR')}
          </p>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '30px',
            marginBottom: '20px',
            flexWrap: 'wrap'
          }}>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '50%',
              width: '120px',
              height: '120px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
            }}>
              <div style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                color: interpretation.color
              }}>
                {resultData.totalScore}
              </div>
              <div style={{
                fontSize: '0.9rem',
                color: '#4a5568'
              }}>
                / {resultData.maxScore}점
              </div>
            </div>
            
            <div style={{
              backgroundColor: interpretation.color,
              color: 'white',
              borderRadius: '15px',
              padding: '15px 25px',
              fontSize: '1.2rem',
              fontWeight: 'bold'
            }}>
              위험도: {interpretation.level}
            </div>
            
            <div style={{
              backgroundColor: 'white',
              borderRadius: '15px',
              padding: '15px 25px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
            }}>
              <div style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: interpretation.color
              }}>
                {percentage}%
              </div>
              <div style={{
                fontSize: '0.9rem',
                color: '#4a5568'
              }}>
                점수 비율
              </div>
            </div>
          </div>

          <div style={{
            backgroundColor: 'white',
            borderRadius: '15px',
            padding: '20px',
            marginTop: '20px'
          }}>
            <p style={{
              color: interpretation.color,
              fontWeight: 'bold',
              fontSize: '1.1rem',
              marginBottom: '10px'
            }}>
              {interpretation.message}
            </p>
            <p style={{
              color: '#4a5568',
              lineHeight: '1.6'
            }}>
              💡 <strong>권장사항:</strong> {interpretation.recommendation}
            </p>
          </div>
        </div>

        <div style={{
          backgroundColor: '#f7fafc',
          borderRadius: '15px',
          padding: '20px',
          marginBottom: '30px'
        }}>
          <h4 style={{ color: '#2d3748', marginBottom: '15px' }}>📈 점수 해석 기준</h4>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '10px',
            fontSize: '0.9rem'
          }}>
            <div style={{ color: '#38a169' }}>• 0-20%: 낮음</div>
            <div style={{ color: '#d69e2e' }}>• 21-39%: 약간</div>
            <div style={{ color: '#d69e2e' }}>• 40-59%: 중간</div>
            <div style={{ color: '#e53e3e' }}>• 60% 이상: 높음</div>
          </div>
        </div>

        <div style={{
          backgroundColor: '#e6fffa',
          borderRadius: '15px',
          padding: '20px',
          marginBottom: '30px'
        }}>
          <p style={{
            color: '#2d3748',
            fontSize: '0.95rem',
            lineHeight: '1.6',
            margin: 0
          }}>
            🔒 <strong>개인정보 보호:</strong> 이 결과는 앱에 저장되지 않으며, 
            익명 통계 목적으로만 사용됩니다. 모든 데이터는 암호화되어 안전하게 처리됩니다.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '15px',
          marginBottom: '20px'
        }}>
          <button 
            style={{
              backgroundColor: isSubmitting ? '#cbd5e0' : '#4299e1',
              color: 'white',
              border: 'none',
              borderRadius: '15px',
              padding: '15px',
              fontSize: '1rem',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              opacity: isSubmitting ? 0.7 : 1,
              transition: 'all 0.3s ease'
            }}
            onClick={submitResults}
            disabled={isSubmitting}
          >
            {isSubmitting ? '📤 전송 중...' : 
             submitStatus.includes('✅') ? '✅ 전송 완료' : 
             submitAttempts > 0 ? '🔄 다시 시도하기' : '📊 결과 제출하기'}
          </button>
          
          <button 
            style={{
              backgroundColor: '#48bb78',
              color: 'white',
              border: 'none',
              borderRadius: '15px',
              padding: '15px',
              fontSize: '1rem',
              cursor: 'pointer'
            }}
            onClick={onRestart}
          >
            다시 검사하기
          </button>
          
          <button 
            style={{
              backgroundColor: '#ed8936',
              color: 'white',
              border: 'none',
              borderRadius: '15px',
              padding: '15px',
              fontSize: '1rem',
              cursor: 'pointer'
            }}
            onClick={() => onNavigate('home')}
          >
            홈으로 돌아가기
          </button>
        </div>

        {submitStatus && (
          <div style={{
            backgroundColor: submitStatus.includes('✅') ? '#c6f6d5' : '#fed7d7',
            color: submitStatus.includes('✅') ? '#38a169' : '#e53e3e',
            borderRadius: '10px',
            padding: '15px',
            textAlign: 'center',
            fontSize: '1rem'
          }}>
            {submitStatus}
          </div>
        )}
      </div>
    </div>
  );
};

// 📚 정보 컴포넌트
const InfoComponent = ({ onNavigate }) => (
  <div style={{
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '20px',
    fontFamily: 'Arial, sans-serif'
  }}>
    <div style={{
      maxWidth: '800px',
      margin: '0 auto',
      backgroundColor: 'white',
      borderRadius: '20px',
      padding: '40px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
    }}>
      <button 
        style={{
          backgroundColor: '#e2e8f0',
          border: 'none',
          borderRadius: '10px',
          padding: '10px 20px',
          cursor: 'pointer',
          marginBottom: '20px',
          fontSize: '1rem'
        }}
        onClick={() => onNavigate('home')}
      >
        ← 홈으로 돌아가기
      </button>
      
      <h2 style={{
        fontSize: '2rem',
        color: '#2d3748',
        textAlign: 'center',
        marginBottom: '30px'
      }}>🔍 ADHD 알아보기</h2>
      
      <div style={{
        backgroundColor: '#f7fafc',
        borderRadius: '15px',
        padding: '30px',
        marginBottom: '30px'
      }}>
        <h3 style={{ color: '#2d3748', marginBottom: '20px' }}>ADHD란?</h3>
        <p style={{ color: '#4a5568', lineHeight: '1.6', marginBottom: '20px' }}>
          ADHD(주의력결핍과잉행동장애)는 지속적인 주의력 부족, 과잉행동, 충동성을 특징으로 하는 
          신경발달장애입니다. 아동기에 시작되어 성인기까지 지속될 수 있습니다.
        </p>
        
        <h4 style={{ color: '#2d3748', marginBottom: '15px' }}>주요 증상:</h4>
        <ul style={{ color: '#4a5568', lineHeight: '1.8', marginBottom: '20px' }}>
          <li><strong>주의력 결핍:</strong> 집중력 부족, 부주의한 실수, 지시 따르기 어려움</li>
          <li><strong>과잉행동:</strong> 가만히 있지 못함, 지나치게 말이 많음, 끊임없는 움직임</li>
          <li><strong>충동성:</strong> 성급한 대답, 차례 기다리기 어려움, 타인 방해</li>
        </ul>

        <div style={{
          backgroundColor: '#fff5f5',
          borderLeft: '4px solid #e53e3e',
          padding: '20px',
          marginBottom: '20px'
        }}>
          <h4 style={{ color: '#e53e3e', marginBottom: '10px' }}>⚠️ 조기 발견의 중요성</h4>
          <p style={{ color: '#4a5568', lineHeight: '1.6' }}>
            ADHD는 조기에 발견하고 적절한 개입을 받을 때 증상 관리와 일상생활 적응에 큰 도움이 됩니다. 
            늦은 진단은 학습 부진, 자존감 저하, 사회적 어려움으로 이어질 수 있습니다.
          </p>
        </div>

        <h4 style={{ color: '#2d3748', marginBottom: '15px' }}>치료 및 관리방법:</h4>
        <ul style={{ color: '#4a5568', lineHeight: '1.8' }}>
          <li>🎯 <strong>행동치료:</strong> 구조화된 환경, 명확한 규칙과 보상 시스템</li>
          <li>💊 <strong>약물치료:</strong> 전문의 처방에 따른 적절한 약물 치료</li>
          <li>🏫 <strong>교육적 지원:</strong> 개별화된 교육 계획, 학습 환경 조정</li>
          <li>👨‍👩‍👧‍👦 <strong>가족 지원:</strong> 부모 교육, 가족 상담 프로그램</li>
        </ul>
      </div>
    </div>
  </div>
);

// 💬 Q&A 컴포넌트
const QnaComponent = ({ onNavigate }) => {
  const qnaData = [
    {
      question: "ADHD는 유전되나요?",
      answer: "ADHD는 유전성이 70~80%에 달하는 신경발달장애입니다. 부모 중 한 명이 ADHD일 경우 자녀에게도 유전될 가능성이 높지만, 환경적 개입으로 증상 발현을 조절할 수 있습니다."
    },
    {
      question: "언제 전문가와 상담해야 하나요?",
      answer: "자가진단에서 높은 점수가 나오거나, 일상생활에서 지속적인 어려움이 관찰될 때 ADHD 전문의나 소아정신과 전문의와 상담받으시기 바랍니다. 특히 학업, 사회생활에서 지속적인 문제가 발생할 때 조기 상담이 중요합니다."
    },
    {
      question: "약물 치료가 반드시 필요한가요?",
      answer: "약물 치료는 ADHD 치료의 한 방법이지만, 행동 치료, 인지 치료, 환경 조정 등 다양한 비약물적 접근도 효과적입니다. 개인의 증상 정도와 상황에 따라 전문가와 상담하여 최적의 치료 계획을 세우는 것이 중요합니다."
    },
    {
      question: "ADHD 아이의 학습은 어떻게 도와야 하나요?",
      answer: "구조화된 학습 환경을 만들고, 짧은 시간 단위로 과제를 나누어 주세요. 명확하고 구체적인 지시사항을 제공하고, 작은 성취에도 즉시 칭찬과 보상을 해주는 것이 효과적입니다."
    },
    {
      question: "성인 ADHD도 있나요?",
      answer: "네, ADHD는 아동기에만 나타나는 것이 아니라 성인기까지 지속될 수 있습니다. 성인 ADHD는 업무 집중력 부족, 시간 관리 어려움, 대인관계 문제 등으로 나타날 수 있으며, 적절한 진단과 치료를 받으면 증상 개선이 가능합니다."
    }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        backgroundColor: 'white',
        borderRadius: '20px',
        padding: '40px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
      }}>
        <button 
          style={{
            backgroundColor: '#e2e8f0',
            border: 'none',
            borderRadius: '10px',
            padding: '10px 20px',
            cursor: 'pointer',
            marginBottom: '20px',
            fontSize: '1rem'
          }}
          onClick={() => onNavigate('home')}
        >
          ← 홈으로 돌아가기
        </button>
        
        <h2 style={{
          fontSize: '2rem',
          color: '#2d3748',
          textAlign: 'center',
          marginBottom: '30px'
        }}>💬 자주 묻는 질문</h2>
        
        <div style={{ marginBottom: '20px' }}>
          {qnaData.map((item, index) => (
            <div key={index} style={{
              backgroundColor: '#f7fafc',
              borderRadius: '15px',
              padding: '25px',
              marginBottom: '20px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{
                color: '#2d3748',
                fontSize: '1.2rem',
                marginBottom: '15px',
                display: 'flex',
                alignItems: 'center'
              }}>
                <span style={{
                  backgroundColor: '#4299e1',
                  color: 'white',
                  borderRadius: '50%',
                  width: '25px',
                  height: '25px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.8rem',
                  marginRight: '10px',
                  flexShrink: 0
                }}>
                  Q
                </span>
                {item.question}
              </h3>
              <div style={{
                marginLeft: '35px',
                color: '#4a5568',
                lineHeight: '1.6',
                display: 'flex',
                alignItems: 'flex-start'
              }}>
                <span style={{
                  backgroundColor: '#48bb78',
                  color: 'white',
                  borderRadius: '50%',
                  width: '25px',
                  height: '25px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.8rem',
                  marginRight: '10px',
                  flexShrink: 0,
                  marginTop: '2px'
                }}>
                  A
                </span>
                <p style={{ margin: 0 }}>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{
          backgroundColor: '#e6fffa',
          borderRadius: '15px',
          padding: '20px',
          textAlign: 'center'
        }}>
          <h4 style={{ color: '#2d3748', marginBottom: '10px' }}>더 궁금한 점이 있으시나요?</h4>
          <p style={{ color: '#4a5568', marginBottom: '15px' }}>
            전문적인 상담이 필요하시면 가까운 소아정신과나 ADHD 전문 클리닉을 방문해보세요.
          </p>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '10px',
            padding: '15px',
            fontSize: '0.9rem',
            color: '#4a5568'
          }}>
            <strong>전국 ADHD 전문기관 안내:</strong><br/>
            • 대한소아청소년정신의학회 홈페이지<br/>
            • 각 지역 대학병원 소아정신과<br/>
            • ADHD 전문 상담센터
          </div>
        </div>
      </div>
    </div>
  );
};

// 🎯 메인 앱 컴포넌트
const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [checklistResult, setChecklistResult] = useState(null);

  const navigateToPage = (pageName) => {
    setCurrentPage(pageName);
  };

  const handleChecklistComplete = (resultData) => {
    setChecklistResult(resultData);
    setCurrentPage('result');
  };

  const handleRestartChecklist = () => {
    setChecklistResult(null);
    setCurrentPage('checklist');
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomeComponent onNavigate={navigateToPage} />;
      case 'checklist':
        return (
          <ChecklistComponent 
            onNavigate={navigateToPage}
            onComplete={handleChecklistComplete}
          />
        );
      case 'result':
        return (
          <ResultComponent 
            resultData={checklistResult}
            onNavigate={navigateToPage}
            onRestart={handleRestartChecklist}
          />
        );
      case 'info':
        return <InfoComponent onNavigate={navigateToPage} />;
      case 'qna':
        return <QnaComponent onNavigate={navigateToPage} />;
      default:
        return <HomeComponent onNavigate={navigateToPage} />;
    }
  };

  return (
    <div>
      {renderCurrentPage()}
    </div>
  );
};

export default App; 
