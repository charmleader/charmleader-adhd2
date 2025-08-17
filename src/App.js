// App.js - 메인 앱 컴포넌트 (개선된 UI)
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
  <div className="home-container">
    <h1 className="main-title">🧠 ADHD 보호자 Q&A 앱</h1>
    <p className="subtitle">자녀의 ADHD에 대해 궁금한 점을 질문하고, 체크하고, 배우세요.</p>
    
    <div className="menu-grid">
      <button 
        className="menu-button" 
        onClick={() => onNavigate('checklist')}
      >
        ✅ 자가진단 체크리스트
      </button>
      
      <button 
        className="menu-button"
        onClick={() => onNavigate('info')}
      >
        🔍 조용한 ADHD 알아보기
      </button>
      
      <button 
        className="menu-button"
        onClick={() => onNavigate('qna')}
      >
        💬 자주 묻는 질문
      </button>
    </div>

    <div className="info-box">
      <h3>📌 이 앱의 특징</h3>
      <ul className="feature-list">
        <li>✅ 개인정보를 저장하지 않습니다</li>
        <li>🔒 익명으로 통계 수집만 진행</li>
        <li>🎯 조용한 ADHD 특화 정보 제공</li>
        <li>📱 모바일 최적화 UI</li>
      </ul>
    </div>

    <footer className="footer">
      <p>개발자: <strong>참리더</strong></p>
      <p className="disclaimer">본 앱은 의료진단을 대체할 수 없으며, 참고용 정보만 제공합니다.</p>
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
    <div className="container">
      <button className="back-button" onClick={() => onNavigate('home')}>
        ← 홈으로 돌아가기
      </button>
      
      <div className="card">
        <h2 className="card-title">🔍 조용한 ADHD 자가진단 체크리스트</h2>
        
        <div className="input-group">
          <label className="input-label">참여자명 (선택사항):</label>
          <input
            type="text"
            value={participantName}
            onChange={(e) => setParticipantName(e.target.value)}
            placeholder="익명으로 진행하시려면 비워두세요"
            className="text-input"
          />
        </div>

        <div className="checklist-container">
          <p className="instruction">다음 항목 중 자녀에게 해당하는 것들을 체크해주세요:</p>
          
          {checklistItemsData.map((checklistItem, itemIndex) => (
            <label key={itemIndex} className="checkbox-label">
              <input
                type="checkbox"
                checked={checkedAnswers[itemIndex] || false}
                onChange={(e) => handleCheckboxChange(itemIndex, e.target.checked)}
                className="checkbox"
              />
              <span className="checkbox-text">{checklistItem}</span>
            </label>
          ))}
        </div>

        <div className="score-display">
          <p className="current-score">현재 체크된 항목: <strong>{totalScore}개</strong></p>
          
          {totalScore >= 5 ? (
            <p className="high-risk">
              ⚠️ 조용한 ADHD 특성이 강하게 의심됩니다. 전문가 상담을 권장합니다.
            </p>
          ) : totalScore >= 3 ? (
            <p className="medium-risk">
              🔔 일부 특성이 관찰됩니다. 지속적인 관찰이 필요할 수 있습니다.
            </p>
          ) : (
            <p className="low-risk">
              ✅ 현재까지는 특별한 우려사항이 적어 보입니다.
            </p>
          )}
        </div>

        <button 
          className="submit-button"
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
        color: '#e53e3e',
        message: '전문가 상담을 적극 권장합니다.',
        recommendation: 'ADHD 전문의 또는 소아정신과 전문의와 상담을 받아보시기 바랍니다.'
      };
    } else if (score >= 3) {
      return {
        level: '중간',
        color: '#d69e2e',
        message: '지속적인 관찰이 필요합니다.',
        recommendation: '향후 3-6개월간 증상을 관찰하시고, 필요시 전문가와 상담하세요.'
      };
    } else {
      return {
        level: '낮음',
        color: '#38a169',
        message: '현재로서는 특별한 우려가 적습니다.',
        recommendation: '정기적인 성장 발달 체크를 유지하시면 됩니다.'
      };
    }
  };

  const riskInfo = getRiskLevelInfo();

  return (
    <div className="container">
      <div className="card">
        <h2 className="card-title">📊 자가진단 결과</h2>
        
        <div className="result-summary">
          <div className="participant-info">
            <h3>참여자: {resultData.participantName}</h3>
            <p>검사 일시: {new Date().toLocaleString('ko-KR')}</p>
          </div>

          <div className="score-section">
            <div className="score-circle">
              <span className="score-number">{resultData.totalScore}</span>
              <span className="score-label">/ {checklistItemsData.length}</span>
            </div>
            
            <div className="risk-badge" style={{backgroundColor: riskInfo.color}}>
              위험도: {riskInfo.level}
            </div>
          </div>

          <div className="result-message">
            <p style={{color: riskInfo.color, fontWeight: 'bold'}}>
              {riskInfo.message}
            </p>
            <p className="recommendation">
              💡 <strong>권장사항:</strong> {riskInfo.recommendation}
            </p>
          </div>
        </div>

        {resultData.selectedItems.length > 0 && (
          <div className="selected-items-section">
            <h4>✅ 선택된 항목들:</h4>
            <ul className="selected-items-list">
              {resultData.selectedItems.map((item, index) => (
                <li key={index} className="selected-item">{item}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="privacy-notice">
          <p className="privacy-text">
            🔒 <strong>개인정보 보호:</strong> 이 결과는 앱에 저장되지 않으며, 
            익명 통계 목적으로만 Google Sheets에 전송됩니다.
          </p>
        </div>

        <div className="action-buttons">
          <button 
            className="submit-button"
            onClick={submitResultsToGoogleSheets}
            disabled={isSubmitting}
          >
            {isSubmitting ? '전송 중...' : '결과 제출하기'}
          </button>
          
          <button 
            className="secondary-button"
            onClick={onRestart}
          >
            다시 검사하기
          </button>
          
          <button 
            className="secondary-button"
            onClick={() => onNavigate('home')}
          >
            홈으로 돌아가기
          </button>
        </div>

        {submitStatus && (
          <div className="status-message">
            <p>{submitStatus}</p>
          </div>
        )}
      </div>
    </div>
  );
};

// 📚 정보 컴포넌트
const InfoComponent = ({ onNavigate }) => (
  <div className="container">
    <button className="back-button" onClick={() => onNavigate('home')}>
      ← 홈으로 돌아가기
    </button>
    
    <div className="card">
      <h2 className="card-title">🔍 조용한 ADHD란?</h2>
      
      <div className="info-section">
        <p className="info-text">
          조용한 ADHD는 겉으로는 얌전하고 착한 아이처럼 보이지만, 
          실제로는 주의력 부족과 자기조절의 어려움을 겪는 ADHD의 한 유형입니다.
        </p>
        
        <h3 className="section-title">주요 특징:</h3>
        <ul className="feature-list">
          <li>멍한 시간이 많고 집중력이 부족함</li>
          <li>과제 시작이나 완료에 어려움</li>
          <li>감정 표현이 적고 반응이 느림</li>
          <li>자기 주도적 행동이 부족함</li>
          <li>새로운 환경 적응의 어려움</li>
        </ul>

        <div className="warning-box">
          <h3 className="warning-title">⚠️ 조기 발견의 중요성</h3>
          <p>조용한 ADHD는 외적으로 문제가 드러나지 않아 발견이 늦어지는 경우가 많습니다. 
          하지만 적절한 시기에 개입하지 않으면 학습 부진, 자존감 저하, 사회적 어려움으로 이어질 수 있습니다.</p>
        </div>

        <h3 className="section-title">대처 방법:</h3>
        <ul className="feature-list">
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
    },
    {
      question: "언제 전문가와 상담해야 하나요?",
      answer: "자가진단에서 5개 이상 해당되거나, 일상생활에서 지속적인 어려움이 관찰될 때 ADHD 전문의나 소아정신과 전문의와 상담받으시기 바랍니다."
    },
    {
      question: "약물 치료가 반드시 필요한가요?",
      answer: "약물 치료는 ADHD 치료의 한 방법이지만, 행동 치료, 인지 치료, 환경 조정 등 다양한 비약물적 접근도 효과적입니다. 전문가와 상담하여 최적의 치료 계획을 세우는 것이 중요합니다."
    }
  ];

  return (
    <div className="container">
      <button className="back-button" onClick={() => onNavigate('home')}>
        ← 홈으로 돌아가기
      </button>
      
      <div className="card">
        <h2 className="card-title">💬 자주 묻는 질문</h2>
        
        {qnaData.map((item, index) => (
          <div key={index} className="qna-item">
            <h3 className="question">Q. {item.question}</h3>
            <p className="answer">A. {item.answer}</p>
          </div>
        ))}
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