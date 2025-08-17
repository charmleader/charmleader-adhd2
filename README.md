# 🧠 ADHD 보호자 Q&A 앱

자녀의 조용한 ADHD 특성을 확인하고 전문적인 정보를 제공하는 보호자용 웹 애플리케이션입니다.

## 📱 앱 주소
**🔗 [https://charmleader.github.io/charmleader-adhd2](https://charmleader.github.io/charmleader-adhd2)**

## ✨ 주요 기능

### 🔍 자가진단 체크리스트
- 조용한 ADHD 특성을 확인할 수 있는 8가지 체크리스트
- 실시간 점수 계산 및 위험도 평가
- 익명 결과 제출 (Google Sheets 연동)

### 📚 정보 제공
- 조용한 ADHD에 대한 전문적인 정보
- 증상별 대처법 안내
- 자주 묻는 질문과 답변

### 🔒 개인정보 보호
- 앱 내 데이터 저장 없음
- 익명 통계 수집만 진행
- 투명한 데이터 처리 방침

## 🛠️ 기술 스택

- **Frontend**: React 18, JavaScript ES6+
- **Styling**: CSS3, Responsive Design
- **Deploy**: GitHub Pages
- **Data Collection**: Google Apps Script + Google Sheets
- **Build**: Create React App

## 📊 데이터 수집

응답 결과는 다음 Google Sheets에 익명으로 수집됩니다:
**📋 [데이터 수집 시트](https://docs.google.com/spreadsheets/d/16DQVf2DWDjnjVs9_1MQGJwjI0mIGeOEvoPGzLaB4_r0/edit?usp=sharing)**
### 수집되는 데이터
- 제출 시간
- 참여자명 (선택사항, 기본값: "익명")
- 총 점수
- 선택된 항목들
- 위험도 수준

## 🚀 로컬 개발 환경 설정

### 사전 요구사항
- Node.js 16+ 
- npm 또는 yarn

### 설치 및 실행
```bash
# 저장소 클론
git clone https://github.com/charmleader/charmleader-adhd2.git
cd charmleader-adhd2

# 의존성 설치
npm install

# 개발 서버 실행
npm start
```

개발 서버는 [http://localhost:3000](http://localhost:3000)에서 실행됩니다.

## 📦 빌드 및 배포

### 로컬 빌드
```bash
npm run build
```

### GitHub Pages 자동 배포
이 프로젝트는 `main` 브랜치에 푸시될 때마다 GitHub Actions를 통해 자동으로 배포됩니다.

## ⚠️ 중요 사항

### 의료 면책 조항
이 앱은 **의료 진단을 대체할 수 없으며**, 참고용 정보만 제공합니다. 
전문적인 진단은 반드시 의료진과 상담하시기 바랍니다.

### 개인정보 보호
- 앱 내에서는 어떠한 개인정보도 저장하지 않습니다
- 수집된 데이터는 익명화되어 통계 목적으로만 사용됩니다
- 사용자는 언제든지 참여를 중단할 수 있습니다

## 👨‍💻 개발자

**참리더**
- 📧 이메일: [문의사항이 있으면 GitHub Issues 이용]
- 🌐 GitHub: [@charmleader](https://github.com/charmleader)

## 📈 버전 히스토리

### v1.0.0 (2024-08-17)
- ✅ 기본 자가진단 체크리스트 구현
- ✅ 조용한 ADHD 정보 페이지
- ✅ Google Sheets 결과 수집 연동
- ✅ PWA 지원
- ✅ GitHub Pages 자동 배포

---

⚠️ **주의**: 이 앱의 정보는 교육 목적으로만 제공되며, 전문적인 의료 조언을 대체할 수 없습니다. 
우려사항이 있으시면 반드시 의료 전문가와 상담하시기 바랍니다.