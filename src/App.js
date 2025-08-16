// App.js - 메인 앱 컴포넌트
import React, { useState } from 'react';
import './App.css';

// 📋 체크리스트 데이터
const checklistItemsData = [
  "멍한 상태로 있는 시간이 많다",
  "과제를 시작하거나 끝내는 데 어려움이 있다", 
  "자주 물건을 잃어버리거나 정리를 못한다",
  "지시를 들은 듯하면서도 수행을 잘 못한다",
  "말수가 적고 자기 표현이 부족하다",
  "감정 표현이 적고 반응이 느리다",
  "혼자 놀거나 멍하게 있는 시간이 길다",
  "새로운 환경이나 변화에 적응하기 어려워한다"
];

// 🏠 홈 컴포넌트
const HomeComponent = ({ onNavigate }) => (
  <div style={styles.homeContainer}>
    <h1 style={styles.mainTitle}>🧠 ADHD 보호자 Q&A 앱</h1>
    <p style={styles.subtitle}>자녀의 ADHD에 대해 궁금한 점을 질문하고, 체크하고, 배우세요.</p>
    
    <div style={styles.menuGrid}>
      <button 
        style={styles.menuButton} 
        onClick={() => onNavigate('checklist')}
      >
        ✅ 자가진단 체크리스트
      </button>
      
      <button 
        style={styles.menuButton}
        onClick={() => onNavigate('info')}
      >
        🔍 조용한 ADHD 알아보기
      </button>      
      <button 
        style={styles.menuButton}
        onClick={() => onNavigate('qna')}
      >
        💬 자주 묻는 질문
      </button>
    </div>

    <div style={styles.infoBox}>
      <h3>📌 이 앱의 특징</h3>
      <ul style={styles.featureList}>
        <li>✅ 개인정보를 저장하지 않습니다</li>
        <li>🔒 익명으로 통계 수집만 진행</li>
        <li>🎯 조용한 ADHD 특화 정보 제공</li>
        <li>📱 모바일 최적화 UI</li>
      </ul>
    </div>

    <footer style={styles.footer}>
      <p>개발자: <strong>참리더</strong></p>
      <p style={styles.disclaimer}>본 앱은 의료진단을 대체할 수 없으며, 참고용 정보만 제공합니다.</p>
    </footer>
  </div>
);

// ✅ 체크리스트 컴포넌트
const ChecklistComponent = ({ onNavigate, onComplete }) => {
  const [checkedAnswers, setCheckedAnswers] = useState({});
  const [participantName, setParticipantName] = useState('');

  const handleCheckboxChange = (itemIndex, isChecked) => {
    setCheckedAnswers(prevAnswers => ({
      ...prevAnswers,
      [itemIndex]: isChecked
    }));
  };

  const calculateTotalScore = () => {
    return Object.values(checkedAnswers).filter(Boolean).length;
  };

  const getSelectedItems = () => {
    return checklistItemsData.filter((item, index) => checkedAnswers[index]);
  };
  const handleSubmitChecklist = () => {
    const totalScore = calculateTotalScore();
    const selectedItems = getSelectedItems();
    
    onComplete({
      participantName: participantName || '익명',
      totalScore,
      selectedItems,
      checkedAnswers
    });
  };

  const totalScore = calculateTotalScore();

  return (
    <div style={styles.container}>
      <button style={styles.backButton} onClick={() => onNavigate('home')}>
        ← 홈으로 돌아가기
      </button>
      
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>🔍 조용한 ADHD 자가진단 체크리스트</h2>
        
        <div style={styles.inputGroup}>
          <label style={styles.inputLabel}>참여자명 (선택사항):</label>
          <input
            type="text"
            value={participantName}
            onChange={(e) => setParticipantName(e.target.value)}
            placeholder="익명으로 진행하시려면 비워두세요"
            style={styles.textInput}
          />
        </div>

        <div style={styles.checklistContainer}>
          <p style={styles.instruction}>다음 항목 중 자녀에게 해당하는 것들을 체크해주세요:</p>
          
          {checklistItemsData.map((checklistItem, itemIndex) => (
            <label key={itemIndex} style={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={checkedAnswers[itemIndex] || false}
                onChange={(e) => handleCheckboxChange(itemIndex, e.target.checked)}
                style={styles.checkbox}
              />
              <span style={styles.checkboxText}>{checklistItem}</span>
            </label>
          ))}
        </div>
        <div style={styles.scoreDisplay}>
          <p style={styles.currentScore}>현재 체크된 항목: <strong>{totalScore}개</strong></p>
          
          {totalScore >= 5 ? (
            <p style={styles.highRisk}>
              ⚠️ 조용한 ADHD 특성이 강하게 의심됩니다. 전문가 상담을 권장합니다.
            </p>
          ) : totalScore >= 3 ? (
            <p style={styles.mediumRisk}>
              🔔 일부 특성이 관찰됩니다. 지속적인 관찰이 필요할 수 있습니다.
            </p>
          ) : (
            <p style={styles.lowRisk}>
              ✅ 현재까지는 특별한 우려사항이 적어 보입니다.
            </p>
          )}
        </div>

        <button 
          style={styles.submitButton}
          onClick={handleSubmitChecklist}
          disabled={totalScore === 0}
        >
          결과 확인하기 {totalScore > 0 && `(${totalScore}개 선택됨)`}
        </button>
      </div>
    </div>
  );
};

// 📊 결과 컴포넌트
const ResultComponent = ({ resultData, onNavigate, onRestart }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  // 🎯 실제 Google Apps Script URL 사용
  const GOOGLE_APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxJn4UN13E0ZIGTXQW1FrXkYBwSrYa-L9TOWQmP5JSbruqJ9EYAycCqusRq3Hspb2L9/exec";

  const submitResultsToGoogleSheets = async () => {
    setIsSubmitting(true);
    setSubmitStatus('데이터 전송 중...');

    try {
      const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: resultData.participantName,
          score: resultData.totalScore,
          answers: resultData.selectedItems,
          userIP: 'Web App User'
        })
      });

      const responseData = await response.json();
      
      if (responseData.result === 'success') {
        setSubmitStatus('✅ 결과가 성공적으로 전송되었습니다!');
      } else {
        setSubmitStatus('❌ 전송 중 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error('제출 오류:', error);
      setSubmitStatus('❌ 네트워크 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };
  const getRiskLevelInfo = () => {
    const score = resultData.totalScore;
    if (score >= 5) {
      return {
        level: '높음',
        color: '#e74c3c',
        message: '전문가 상담을 적극 권장합니다.',
        recommendation: 'ADHD 전문의 또는 소아정신과 전문의와 상담을 받아보시기 바랍니다.'
      };
    } else if (score >= 3) {
      return {
        level: '중간',
        color: '#f39c12',
        message: '지속적인 관찰이 필요합니다.',
        recommendation: '향후 3-6개월간 증상을 관찰하시고, 필요시 전문가와 상담하세요.'
      };
    } else {
      return {
        level: '낮음',
        color: '#27ae60',
        message: '현재로서는 특별한 우려가 적습니다.',
        recommendation: '정기적인 성장 발달 체크를 유지하시면 됩니다.'
      };
    }
  };

  const riskInfo = getRiskLevelInfo();

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>📊 자가진단 결과</h2>
        
        <div style={styles.resultSummary}>
          <div style={styles.participantInfo}>
            <h3>참여자: {resultData.participantName}</h3>
            <p>검사 일시: {new Date().toLocaleString('ko-KR')}</p>
          </div>

          <div style={styles.scoreSection}>
            <div style={styles.scoreCircle}>
              <span style={styles.scoreNumber}>{resultData.totalScore}</span>
              <span style={styles.scoreLabel}>/ {checklistItemsData.length}</span>
            </div>            
            <div style={{...styles.riskBadge, backgroundColor: riskInfo.color}}>
              위험도: {riskInfo.level}
            </div>
          </div>

          <div style={styles.resultMessage}>
            <p style={{color: riskInfo.color, fontWeight: 'bold'}}>
              {riskInfo.message}
            </p>
            <p style={styles.recommendation}>
              💡 <strong>권장사항:</strong> {riskInfo.recommendation}
            </p>
          </div>
        </div>

        <div style={styles.selectedItemsSection}>
          <h4>✅ 선택된 항목들:</h4>
          <ul style={styles.selectedItemsList}>
            {resultData.selectedItems.map((item, index) => (
              <li key={index} style={styles.selectedItem}>{item}</li>
            ))}
          </ul>
        </div>

        <div style={styles.privacyNotice}>
          <p style={styles.privacyText}>
            🔒 <strong>개인정보 보호:</strong> 이 결과는 앱에 저장되지 않으며, 
            익명 통계 목적으로만 Google Sheets에 전송됩니다.
          </p>
        </div>

        <div style={styles.actionButtons}>
          <button 
            style={styles.submitButton}
            onClick={submitResultsToGoogleSheets}
            disabled={isSubmitting}
          >
            {isSubmitting ? '전송 중...' : '결과 제출하기'}
          </button>          
          <button 
            style={styles.secondaryButton}
            onClick={onRestart}
          >
            다시 검사하기
          </button>
          
          <button 
            style={styles.secondaryButton}
            onClick={() => onNavigate('home')}
          >
            홈으로 돌아가기
          </button>
        </div>

        {submitStatus && (
          <div style={styles.statusMessage}>
            <p>{submitStatus}</p>
          </div>
        )}
      </div>
    </div>
  );
};

// 📚 정보 컴포넌트 (조용한 ADHD 안내)
const InfoComponent = ({ onNavigate }) => (
  <div style={styles.container}>
    <button style={styles.backButton} onClick={() => onNavigate('home')}>
      ← 홈으로 돌아가기
    </button>
    
    <div style={styles.card}>
      <h2 style={styles.cardTitle}>🔍 조용한 ADHD란?</h2>
      
      <div style={styles.infoSection}>
        <p style={styles.infoText}>
          조용한 ADHD는 겉으로는 얌전하고 착한 아이처럼 보이지만, 
          실제로는 주의력 부족과 자기조절의 어려움을 겪는 ADHD의 한 유형입니다.
        </p>        
        <h3 style={styles.sectionTitle}>주요 특징:</h3>
        <ul style={styles.featureList}>
          <li>멍한 시간이 많고 집중력이 부족함</li>
          <li>과제 시작이나 완료에 어려움</li>
          <li>감정 표현이 적고 반응이 느림</li>
          <li>자기 주도적 행동이 부족함</li>
          <li>새로운 환경 적응의 어려움</li>
        </ul>

        <div style={styles.warningBox}>
          <h3 style={styles.warningTitle}>⚠️ 조기 발견의 중요성</h3>
          <p>조용한 ADHD는 외적으로 문제가 드러나지 않아 발견이 늦어지는 경우가 많습니다. 
          하지만 적절한 시기에 개입하지 않으면 학습 부진, 자존감 저하, 사회적 어려움으로 이어질 수 있습니다.</p>
        </div>

        <h3 style={styles.sectionTitle}>대처 방법:</h3>
        <ul style={styles.featureList}>
          <li>🎯 명확하고 구체적인 지시사항 제공</li>
          <li>⏰ 일정한 루틴과 구조화된 환경 조성</li>
          <li>💪 작은 성취에도 격려와 칭찬</li>
          <li>🤝 전문가와의 정기적 상담</li>
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
    },    {
      question: "언제 전문가와 상담해야 하나요?",
      answer: "자가진단에서 5개 이상 해당되거나, 일상생활에서 지속적인 어려움이 관찰될 때 ADHD 전문의나 소아정신과 전문의와 상담받으시기 바랍니다."
    },
    {
      question: "약물 치료가 반드시 필요한가요?",
      answer: "약물 치료는 ADHD 치료의 한 방법이지만, 행동 치료, 인지 치료, 환경 조정 등 다양한 비약물적 접근도 효과적입니다. 전문가와 상담하여 최적의 치료 계획을 세우는 것이 중요합니다."
    }
  ];

  return (
    <div style={styles.container}>
      <button style={styles.backButton} onClick={() => onNavigate('home')}>
        ← 홈으로 돌아가기
      </button>
      
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>💬 자주 묻는 질문</h2>
        
        {qnaData.map((item, index) => (
          <div key={index} style={styles.qnaItem}>
            <h3 style={styles.question}>Q. {item.question}</h3>
            <p style={styles.answer}>A. {item.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// 🎨 스타일 정의
const styles = {
  // 컨테이너 스타일
  container: {
    maxWidth: '640px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: "'Noto Sans KR', sans-serif",
    backgroundColor: '#f8f9fa',
    minHeight: '100vh'
  },  homeContainer: {
    maxWidth: '640px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: "'Noto Sans KR', sans-serif",
    backgroundColor: '#f8f9fa',
    minHeight: '100vh',
    textAlign: 'center'
  },
  
  // 카드 스타일
  card: {
    backgroundColor: '#ffffff',
    padding: '24px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    marginBottom: '20px'
  },
  
  // 제목 스타일
  mainTitle: {
    fontSize: '28px',
    color: '#2c3e50',
    marginBottom: '10px',
    fontWeight: 'bold'
  },
  cardTitle: {
    fontSize: '24px',
    color: '#2c3e50',
    marginBottom: '20px',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  subtitle: {
    fontSize: '16px',
    color: '#7f8c8d',
    marginBottom: '30px'
  },
  
  // 버튼 스타일
  menuButton: {
    width: '100%',
    padding: '16px',
    fontSize: '16px',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    marginBottom: '12px',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease'
  },  submitButton: {
    width: '100%',
    padding: '14px',
    fontSize: '16px',
    backgroundColor: '#27ae60',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
    marginBottom: '10px'
  },
  secondaryButton: {
    width: '100%',
    padding: '12px',
    fontSize: '14px',
    backgroundColor: '#95a5a6',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    marginBottom: '8px'
  },
  backButton: {
    padding: '8px 16px',
    fontSize: '14px',
    backgroundColor: '#ecf0f1',
    color: '#2c3e50',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    marginBottom: '16px'
  },
  
  // 입력 필드 스타일
  inputGroup: {
    marginBottom: '24px'
  },
  inputLabel: {
    display: 'block',
    fontSize: '14px',
    fontWeight: 'bold',
    marginBottom: '8px',
    color: '#2c3e50'
  },
  textInput: {
    width: '100%',
    padding: '10px',
    fontSize: '14px',
    border: '1px solid #bdc3c7',
    borderRadius: '6px',
    boxSizing: 'border-box'
  },    marginBottom: '8px',
    color: '#2c3e50'
  },
  highRisk: {
    color: '#e74c3c',
    fontWeight: 'bold',
    fontSize: '15px'
  },
  mediumRisk: {
    color: '#f39c12',
    fontWeight: 'bold',
    fontSize: '15px'
  },
  lowRisk: {
    color: '#27ae60',
    fontWeight: 'bold',
    fontSize: '15px'
  },
  
  // 결과 페이지 스타일
  resultSummary: {
    marginBottom: '24px'
  },
  participantInfo: {
    textAlign: 'center',
    marginBottom: '20px'
  },
  scoreSection: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '20px',
    marginBottom: '20px'
  },
  scoreCircle: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    backgroundColor: '#3498db',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white'
  },  scoreNumber: {
    fontSize: '24px',
    fontWeight: 'bold'
  },
  scoreLabel: {
    fontSize: '12px'
  },
  riskBadge: {
    padding: '8px 16px',
    borderRadius: '20px',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '14px'
  },
  resultMessage: {
    textAlign: 'center',
    padding: '16px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px'
  },
  recommendation: {
    fontSize: '14px',
    color: '#2c3e50',
    marginTop: '8px'
  },
  
  // 선택된 항목 스타일
  selectedItemsSection: {
    marginBottom: '24px'
  },
  selectedItemsList: {
    listStyle: 'none',
    padding: 0
  },
  selectedItem: {
    padding: '8px 12px',
    backgroundColor: '#e8f5e8',
    marginBottom: '6px',
    borderRadius: '6px',
    fontSize: '14px',
    borderLeft: '4px solid #27ae60'
  },  
  // 개인정보 보호 안내
  privacyNotice: {
    padding: '16px',
    backgroundColor: '#fff3cd',
    border: '1px solid #ffeaa7',
    borderRadius: '8px',
    marginBottom: '20px'
  },
  privacyText: {
    fontSize: '14px',
    color: '#856404',
    margin: 0
  },
  
  // 액션 버튼 그룹
  actionButtons: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  
  // 상태 메시지
  statusMessage: {
    marginTop: '16px',
    padding: '12px',
    backgroundColor: '#d4edda',
    border: '1px solid #c3e6cb',
    borderRadius: '6px',
    textAlign: 'center'
  },
  
  // 정보 페이지 스타일
  infoSection: {
    lineHeight: '1.6'
  },
  infoText: {
    fontSize: '16px',
    color: '#2c3e50',
    marginBottom: '20px'
  },  sectionTitle: {
    fontSize: '18px',
    color: '#2c3e50',
    marginTop: '24px',
    marginBottom: '12px',
    fontWeight: 'bold'
  },
  warningBox: {
    padding: '16px',
    backgroundColor: '#fff5f5',
    border: '1px solid #fed7d7',
    borderRadius: '8px',
    marginTop: '20px',
    marginBottom: '20px'
  },
  warningTitle: {
    fontSize: '16px',
    color: '#e53e3e',
    marginBottom: '8px',
    fontWeight: 'bold'
  },
  
  // Q&A 스타일
  qnaItem: {
    marginBottom: '24px',
    padding: '16px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px'
  },
  question: {
    fontSize: '16px',
    color: '#2c3e50',
    marginBottom: '8px',
    fontWeight: 'bold'
  },
  answer: {
    fontSize: '14px',
    color: '#5a6c7d',
    lineHeight: '1.5'
  },
  
  // 홈페이지 스타일
  menuGrid: {
    marginBottom: '30px'
  },  infoBox: {
    backgroundColor: '#e8f4fd',
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '30px',
    textAlign: 'left'
  },
  featureList: {
    listStyle: 'none',
    padding: 0
  },
  footer: {
    textAlign: 'center',
    fontSize: '14px',
    color: '#7f8c8d',
    marginTop: '40px'
  },
  disclaimer: {
    fontSize: '12px',
    color: '#95a5a6',
    marginTop: '8px'
  }
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