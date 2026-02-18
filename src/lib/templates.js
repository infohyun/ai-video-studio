/**
 * 마케팅 영상 템플릿 (실제 씬 + 레이어 데이터)
 * 템플릿 선택 즉시 편집 가능한 완성된 영상 구조
 */

const TEMPLATES = [
  {
    id: 'scalp_clinical',
    name: '두피 케어 - 임상 데이터 강조',
    description: '분당서울대병원 임상시험 결과를 중심으로 한 신뢰 기반 영상',
    thumbnail: 'gradient-blue',
    category: '두피/모발',
    scenes: [
      {
        duration: 3,
        background: { type: 'gradient', value: ['#0a0a1a', '#1a1a3e'], angle: 180 },
        transition: { type: 'fade', duration: 0.3 },
        layers: [
          { type: 'shape', shape: 'rect', x: 50, y: 50, width: 100, height: 100, color: 'rgba(0,0,0,0.3)', opacity: 1, animation: 'none', animationDuration: 0, animationDelay: 0 },
          { type: 'text', content: '두피가 보내는\nSOS 신호,', x: 50, y: 38, fontSize: 64, fontWeight: '800', color: '#ffffff', textAlign: 'center', maxWidth: 85, animation: 'slideUp', animationDuration: 0.6, animationDelay: 0, shadow: true, lineHeight: 1.3 },
          { type: 'text', content: '무시하고 계신가요?', x: 50, y: 58, fontSize: 56, fontWeight: '800', color: '#FFD700', textAlign: 'center', maxWidth: 85, animation: 'slideUp', animationDuration: 0.6, animationDelay: 0.3, shadow: true, lineHeight: 1.3 },
        ],
      },
      {
        duration: 5,
        background: { type: 'gradient', value: ['#1a0a0a', '#2a1a1a'], angle: 180 },
        transition: { type: 'fade', duration: 0.5 },
        layers: [
          { type: 'text', content: '가려움 · 비듬 · 탈모', x: 50, y: 30, fontSize: 52, fontWeight: '700', color: '#FF6B6B', textAlign: 'center', maxWidth: 85, animation: 'fadeIn', animationDuration: 0.5, animationDelay: 0, shadow: true, lineHeight: 1.3 },
          { type: 'shape', shape: 'rect', x: 50, y: 50, width: 75, height: 0.3, color: '#FF6B6B', animation: 'slideLeft', animationDuration: 0.8, animationDelay: 0.3, opacity: 0.5 },
          { type: 'text', content: '수만 가지 두피 유형,\n같은 샴푸로는\n절대 해결할 수 없습니다', x: 50, y: 62, fontSize: 40, fontWeight: '500', color: '#cccccc', textAlign: 'center', maxWidth: 80, animation: 'fadeIn', animationDuration: 0.6, animationDelay: 0.5, shadow: true, lineHeight: 1.5 },
        ],
      },
      {
        duration: 5,
        background: { type: 'gradient', value: ['#0a1a2a', '#102040'], angle: 180 },
        transition: { type: 'slideLeft', duration: 0.5 },
        layers: [
          { type: 'text', content: 'AI가 당신의 두피를\n정밀 분석합니다', x: 50, y: 25, fontSize: 48, fontWeight: '700', color: '#60A5FA', textAlign: 'center', maxWidth: 85, animation: 'slideUp', animationDuration: 0.5, animationDelay: 0, shadow: true, lineHeight: 1.3 },
          { type: 'shape', shape: 'rect', x: 50, y: 50, width: 70, height: 25, color: 'rgba(96,165,250,0.1)', borderRadius: 20, animation: 'scaleIn', animationDuration: 0.5, animationDelay: 0.3 },
          { type: 'text', content: 'AI 진단', x: 30, y: 45, fontSize: 28, fontWeight: '600', color: '#93C5FD', textAlign: 'center', maxWidth: 30, animation: 'fadeIn', animationDuration: 0.4, animationDelay: 0.5, shadow: true },
          { type: 'text', content: '→', x: 50, y: 45, fontSize: 36, fontWeight: '400', color: '#60A5FA', textAlign: 'center', maxWidth: 10, animation: 'slideLeft', animationDuration: 0.3, animationDelay: 0.7, shadow: false },
          { type: 'text', content: '맞춤 제조', x: 70, y: 45, fontSize: 28, fontWeight: '600', color: '#93C5FD', textAlign: 'center', maxWidth: 30, animation: 'fadeIn', animationDuration: 0.4, animationDelay: 0.9, shadow: true },
          { type: 'text', content: '서버 자동 전달 → 공장 자동 생산\n세상에 단 하나뿐인 나만의 샴푸', x: 50, y: 72, fontSize: 32, fontWeight: '400', color: '#e0e0e0', textAlign: 'center', maxWidth: 80, animation: 'fadeIn', animationDuration: 0.5, animationDelay: 1.2, shadow: true, lineHeight: 1.5 },
        ],
      },
      {
        duration: 7,
        background: { type: 'gradient', value: ['#0a1628', '#162a4a'], angle: 180 },
        transition: { type: 'fade', duration: 0.5 },
        layers: [
          { type: 'shape', shape: 'rect', x: 50, y: 18, width: 70, height: 6, color: 'rgba(255,255,255,0.1)', borderRadius: 30, animation: 'fadeIn', animationDuration: 0.3, animationDelay: 0 },
          { type: 'text', content: '분당서울대병원', x: 50, y: 18, fontSize: 30, fontWeight: '700', color: '#60A5FA', textAlign: 'center', maxWidth: 70, animation: 'fadeIn', animationDuration: 0.5, animationDelay: 0, shadow: true },
          { type: 'text', content: '임상시험 결과', x: 50, y: 28, fontSize: 52, fontWeight: '800', color: '#ffffff', textAlign: 'center', maxWidth: 85, animation: 'slideUp', animationDuration: 0.6, animationDelay: 0.3, shadow: true, lineHeight: 1.2 },
          { type: 'shape', shape: 'rect', x: 50, y: 48, width: 65, height: 22, color: 'rgba(16, 185, 129, 0.15)', borderRadius: 16, animation: 'scaleIn', animationDuration: 0.5, animationDelay: 0.6 },
          { type: 'text', content: '100명', x: 30, y: 44, fontSize: 56, fontWeight: '800', color: '#10B981', textAlign: 'center', maxWidth: 35, animation: 'bounceIn', animationDuration: 0.6, animationDelay: 0.8, shadow: true },
          { type: 'text', content: '환자 대상', x: 30, y: 52, fontSize: 22, fontWeight: '500', color: '#6EE7B7', textAlign: 'center', maxWidth: 35, animation: 'fadeIn', animationDuration: 0.4, animationDelay: 1.0, shadow: true },
          { type: 'text', content: '50%+', x: 70, y: 44, fontSize: 56, fontWeight: '800', color: '#FBBF24', textAlign: 'center', maxWidth: 35, animation: 'bounceIn', animationDuration: 0.6, animationDelay: 1.2, shadow: true },
          { type: 'text', content: '증상 호전', x: 70, y: 52, fontSize: 22, fontWeight: '500', color: '#FDE68A', textAlign: 'center', maxWidth: 35, animation: 'fadeIn', animationDuration: 0.4, animationDelay: 1.4, shadow: true },
          { type: 'text', content: '단 4주 만에\n두피·모발 증상 50% 이상 호전', x: 50, y: 72, fontSize: 36, fontWeight: '700', color: '#ffffff', textAlign: 'center', maxWidth: 85, animation: 'slideUp', animationDuration: 0.6, animationDelay: 1.8, shadow: true, lineHeight: 1.4 },
        ],
      },
      {
        duration: 5,
        background: { type: 'gradient', value: ['#1a0a30', '#2a1050'], angle: 180 },
        transition: { type: 'zoom', duration: 0.5 },
        layers: [
          { type: 'text', content: '지금 무료 AI 진단 받고', x: 50, y: 30, fontSize: 44, fontWeight: '700', color: '#ffffff', textAlign: 'center', maxWidth: 85, animation: 'slideUp', animationDuration: 0.5, animationDelay: 0, shadow: true, lineHeight: 1.3 },
          { type: 'text', content: '나만의 맞춤 샴푸\n만나보세요', x: 50, y: 48, fontSize: 52, fontWeight: '800', color: '#A78BFA', textAlign: 'center', maxWidth: 85, animation: 'scaleIn', animationDuration: 0.6, animationDelay: 0.3, shadow: true, lineHeight: 1.3 },
          { type: 'shape', shape: 'rect', x: 50, y: 72, width: 60, height: 8, color: '#7C3AED', borderRadius: 40, animation: 'bounceIn', animationDuration: 0.5, animationDelay: 0.8 },
          { type: 'text', content: '무료 진단 시작하기', x: 50, y: 72, fontSize: 32, fontWeight: '700', color: '#ffffff', textAlign: 'center', maxWidth: 55, animation: 'fadeIn', animationDuration: 0.3, animationDelay: 1.0, shadow: false },
          { type: 'text', content: '선착순 100명 무료 · 오늘만 특별 혜택', x: 50, y: 82, fontSize: 22, fontWeight: '500', color: '#C4B5FD', textAlign: 'center', maxWidth: 80, animation: 'fadeIn', animationDuration: 0.4, animationDelay: 1.3, shadow: true },
        ],
      },
    ],
  },
  {
    id: 'hair_before_after',
    name: '모발 변화 - 비포/애프터',
    description: '4주 사용 전후 극적인 변화를 보여주는 영상',
    thumbnail: 'gradient-green',
    category: '두피/모발',
    scenes: [
      {
        duration: 3,
        background: { type: 'gradient', value: ['#000000', '#1a1a1a'], angle: 180 },
        transition: { type: 'fade', duration: 0.3 },
        layers: [
          { type: 'text', content: '탈모 환자\n1,000만 시대', x: 50, y: 35, fontSize: 64, fontWeight: '800', color: '#EF4444', textAlign: 'center', maxWidth: 85, animation: 'scaleIn', animationDuration: 0.5, animationDelay: 0, shadow: true, lineHeight: 1.2 },
          { type: 'text', content: '당신은 안전한가요?', x: 50, y: 60, fontSize: 44, fontWeight: '600', color: '#ffffff', textAlign: 'center', maxWidth: 85, animation: 'fadeIn', animationDuration: 0.5, animationDelay: 0.5, shadow: true },
        ],
      },
      {
        duration: 5,
        background: { type: 'gradient', value: ['#1a0000', '#2a0a0a'], angle: 180 },
        transition: { type: 'slideLeft', duration: 0.5 },
        layers: [
          { type: 'text', content: 'BEFORE', x: 50, y: 15, fontSize: 36, fontWeight: '700', color: '#EF4444', textAlign: 'center', maxWidth: 50, animation: 'fadeIn', animationDuration: 0.3, animationDelay: 0 },
          { type: 'shape', shape: 'rect', x: 50, y: 42, width: 70, height: 30, color: 'rgba(239,68,68,0.1)', borderRadius: 16, animation: 'fadeIn', animationDuration: 0.5, animationDelay: 0.2 },
          { type: 'text', content: '끝없는 시행착오\n맞지 않는 샴푸\n점점 심해지는 탈모', x: 50, y: 42, fontSize: 36, fontWeight: '600', color: '#FCA5A5', textAlign: 'center', maxWidth: 65, animation: 'slideUp', animationDuration: 0.5, animationDelay: 0.4, shadow: true, lineHeight: 1.5 },
          { type: 'text', content: '수십 가지 제품을 바꿔봐도\n해결되지 않는 두피 고민', x: 50, y: 75, fontSize: 28, fontWeight: '400', color: '#999999', textAlign: 'center', maxWidth: 80, animation: 'fadeIn', animationDuration: 0.5, animationDelay: 1.0, shadow: true, lineHeight: 1.5 },
        ],
      },
      {
        duration: 5,
        background: { type: 'gradient', value: ['#001a0a', '#0a2a1a'], angle: 180 },
        transition: { type: 'slideLeft', duration: 0.5 },
        layers: [
          { type: 'text', content: 'AFTER 4주', x: 50, y: 15, fontSize: 36, fontWeight: '700', color: '#10B981', textAlign: 'center', maxWidth: 50, animation: 'fadeIn', animationDuration: 0.3, animationDelay: 0 },
          { type: 'shape', shape: 'rect', x: 50, y: 42, width: 70, height: 30, color: 'rgba(16,185,129,0.1)', borderRadius: 16, animation: 'fadeIn', animationDuration: 0.5, animationDelay: 0.2 },
          { type: 'text', content: 'AI 맞춤 진단\n나만의 샴푸+세럼\n50% 이상 증상 호전', x: 50, y: 42, fontSize: 36, fontWeight: '600', color: '#6EE7B7', textAlign: 'center', maxWidth: 65, animation: 'slideUp', animationDuration: 0.5, animationDelay: 0.4, shadow: true, lineHeight: 1.5 },
          { type: 'text', content: '분당서울대병원 임상시험\n100명 검증 완료', x: 50, y: 75, fontSize: 28, fontWeight: '600', color: '#34D399', textAlign: 'center', maxWidth: 80, animation: 'fadeIn', animationDuration: 0.5, animationDelay: 1.0, shadow: true, lineHeight: 1.5 },
        ],
      },
      {
        duration: 5,
        background: { type: 'gradient', value: ['#0a0020', '#1a0040'], angle: 180 },
        transition: { type: 'fade', duration: 0.5 },
        layers: [
          { type: 'text', content: 'AI가 처방하는\n나만의 맞춤 솔루션', x: 50, y: 28, fontSize: 48, fontWeight: '800', color: '#ffffff', textAlign: 'center', maxWidth: 85, animation: 'slideUp', animationDuration: 0.5, animationDelay: 0, shadow: true, lineHeight: 1.3 },
          { type: 'shape', shape: 'rect', x: 50, y: 65, width: 55, height: 7, color: '#8B5CF6', borderRadius: 40, animation: 'bounceIn', animationDuration: 0.5, animationDelay: 0.6 },
          { type: 'text', content: '지금 시작하기', x: 50, y: 65, fontSize: 30, fontWeight: '700', color: '#ffffff', textAlign: 'center', maxWidth: 50, animation: 'fadeIn', animationDuration: 0.3, animationDelay: 0.8, shadow: false },
          { type: 'text', content: '무료 AI 두피 진단', x: 50, y: 78, fontSize: 24, fontWeight: '500', color: '#C4B5FD', textAlign: 'center', maxWidth: 60, animation: 'fadeIn', animationDuration: 0.4, animationDelay: 1.0, shadow: true },
        ],
      },
    ],
  },
  {
    id: 'skin_ai',
    name: '피부 맞춤 - AI 기술력',
    description: 'AI 진단 → 맞춤 제조 프로세스를 강조한 테크 스타일 영상',
    thumbnail: 'gradient-purple',
    category: '피부',
    scenes: [
      {
        duration: 3,
        background: { type: 'gradient', value: ['#0f0023', '#1a003a'], angle: 180 },
        transition: { type: 'fade', duration: 0.3 },
        layers: [
          { type: 'text', content: '화장품이\n맞지 않아서', x: 50, y: 35, fontSize: 56, fontWeight: '700', color: '#E879F9', textAlign: 'center', maxWidth: 85, animation: 'fadeIn', animationDuration: 0.5, animationDelay: 0, shadow: true, lineHeight: 1.3 },
          { type: 'text', content: '피부가 더 나빠진 적\n있으신가요?', x: 50, y: 60, fontSize: 48, fontWeight: '800', color: '#ffffff', textAlign: 'center', maxWidth: 85, animation: 'slideUp', animationDuration: 0.5, animationDelay: 0.4, shadow: true, lineHeight: 1.3 },
        ],
      },
      {
        duration: 5,
        background: { type: 'gradient', value: ['#0a0028', '#150040'], angle: 180 },
        transition: { type: 'zoom', duration: 0.5 },
        layers: [
          { type: 'text', content: 'AI 피부 진단 시스템', x: 50, y: 18, fontSize: 40, fontWeight: '700', color: '#C084FC', textAlign: 'center', maxWidth: 85, animation: 'fadeIn', animationDuration: 0.4, animationDelay: 0, shadow: true },
          { type: 'shape', shape: 'circle', x: 25, y: 42, width: 18, height: 10, color: 'rgba(168,85,247,0.2)', animation: 'scaleIn', animationDuration: 0.4, animationDelay: 0.3 },
          { type: 'text', content: '진단', x: 25, y: 42, fontSize: 24, fontWeight: '600', color: '#D8B4FE', textAlign: 'center', maxWidth: 20, animation: 'fadeIn', animationDuration: 0.3, animationDelay: 0.5, shadow: true },
          { type: 'text', content: '→', x: 42, y: 42, fontSize: 30, fontWeight: '400', color: '#A855F7', textAlign: 'center', maxWidth: 10, animation: 'slideLeft', animationDuration: 0.3, animationDelay: 0.7, shadow: false },
          { type: 'shape', shape: 'circle', x: 55, y: 42, width: 18, height: 10, color: 'rgba(168,85,247,0.2)', animation: 'scaleIn', animationDuration: 0.4, animationDelay: 0.8 },
          { type: 'text', content: 'AI 분석', x: 55, y: 42, fontSize: 24, fontWeight: '600', color: '#D8B4FE', textAlign: 'center', maxWidth: 20, animation: 'fadeIn', animationDuration: 0.3, animationDelay: 1.0, shadow: true },
          { type: 'text', content: '→', x: 72, y: 42, fontSize: 30, fontWeight: '400', color: '#A855F7', textAlign: 'center', maxWidth: 10, animation: 'slideLeft', animationDuration: 0.3, animationDelay: 1.1, shadow: false },
          { type: 'shape', shape: 'circle', x: 85, y: 42, width: 18, height: 10, color: 'rgba(168,85,247,0.2)', animation: 'scaleIn', animationDuration: 0.4, animationDelay: 1.2 },
          { type: 'text', content: '자동생산', x: 85, y: 42, fontSize: 24, fontWeight: '600', color: '#D8B4FE', textAlign: 'center', maxWidth: 20, animation: 'fadeIn', animationDuration: 0.3, animationDelay: 1.4, shadow: true },
          { type: 'text', content: '진단 결과가 AI 서버를 통해\n공장으로 자동 전달되어\n나만의 제품이 만들어집니다', x: 50, y: 72, fontSize: 30, fontWeight: '500', color: '#e0e0e0', textAlign: 'center', maxWidth: 80, animation: 'fadeIn', animationDuration: 0.5, animationDelay: 1.8, shadow: true, lineHeight: 1.5 },
        ],
      },
      {
        duration: 5,
        background: { type: 'gradient', value: ['#0a1628', '#162a4a'], angle: 180 },
        transition: { type: 'fade', duration: 0.5 },
        layers: [
          { type: 'text', content: '분당서울대병원\n공동 임상시험', x: 50, y: 20, fontSize: 44, fontWeight: '700', color: '#93C5FD', textAlign: 'center', maxWidth: 85, animation: 'slideUp', animationDuration: 0.5, animationDelay: 0, shadow: true, lineHeight: 1.3 },
          { type: 'text', content: '100명', x: 30, y: 48, fontSize: 64, fontWeight: '800', color: '#10B981', textAlign: 'center', maxWidth: 40, animation: 'bounceIn', animationDuration: 0.6, animationDelay: 0.5, shadow: true },
          { type: 'text', content: '대상', x: 30, y: 56, fontSize: 24, fontWeight: '500', color: '#6EE7B7', textAlign: 'center', maxWidth: 30, animation: 'fadeIn', animationDuration: 0.3, animationDelay: 0.8, shadow: true },
          { type: 'text', content: '4주', x: 70, y: 48, fontSize: 64, fontWeight: '800', color: '#FBBF24', textAlign: 'center', maxWidth: 40, animation: 'bounceIn', animationDuration: 0.6, animationDelay: 0.8, shadow: true },
          { type: 'text', content: '만에', x: 70, y: 56, fontSize: 24, fontWeight: '500', color: '#FDE68A', textAlign: 'center', maxWidth: 30, animation: 'fadeIn', animationDuration: 0.3, animationDelay: 1.1, shadow: true },
          { type: 'text', content: '50% 이상 호전', x: 50, y: 75, fontSize: 56, fontWeight: '800', color: '#ffffff', textAlign: 'center', maxWidth: 85, animation: 'scaleIn', animationDuration: 0.6, animationDelay: 1.4, shadow: true },
        ],
      },
      {
        duration: 5,
        background: { type: 'gradient', value: ['#1a0030', '#300050'], angle: 180 },
        transition: { type: 'zoom', duration: 0.5 },
        layers: [
          { type: 'text', content: '1분 AI 진단으로\n나만의 화장품을\n만나보세요', x: 50, y: 32, fontSize: 48, fontWeight: '800', color: '#ffffff', textAlign: 'center', maxWidth: 85, animation: 'slideUp', animationDuration: 0.5, animationDelay: 0, shadow: true, lineHeight: 1.4 },
          { type: 'shape', shape: 'rect', x: 50, y: 68, width: 55, height: 7.5, color: '#A855F7', borderRadius: 40, animation: 'bounceIn', animationDuration: 0.5, animationDelay: 0.5 },
          { type: 'text', content: '무료 진단 받기', x: 50, y: 68, fontSize: 30, fontWeight: '700', color: '#ffffff', textAlign: 'center', maxWidth: 50, animation: 'fadeIn', animationDuration: 0.3, animationDelay: 0.7, shadow: false },
          { type: 'text', content: '첫 구매 30% 할인 · 한정 수량', x: 50, y: 80, fontSize: 22, fontWeight: '500', color: '#D8B4FE', textAlign: 'center', maxWidth: 80, animation: 'fadeIn', animationDuration: 0.4, animationDelay: 1.0, shadow: true },
        ],
      },
    ],
  },
];

export default TEMPLATES;
