'use client';
import { useStore } from '@/lib/store';
import TEMPLATES from '@/lib/templates';

const GRADIENT_MAP = {
  'gradient-blue': 'from-blue-900 to-blue-700',
  'gradient-green': 'from-emerald-900 to-emerald-700',
  'gradient-purple': 'from-purple-900 to-purple-700',
};

export default function TemplateDialog({ onClose }) {
  const { loadTemplate, setProjectName } = useStore();

  const handleSelect = (template) => {
    loadTemplate(template.scenes);
    setProjectName(template.name);
    onClose();
  };

  const handleBlank = () => {
    loadTemplate([{
      duration: 5,
      background: { type: 'gradient', value: ['#0f0f23', '#1a1a3e'], angle: 180 },
      layers: [],
      transition: { type: 'fade', duration: 0.5 },
    }]);
    setProjectName('새 영상');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100]" onClick={onClose}>
      <div
        className="bg-[#1e293b] rounded-2xl w-[780px] max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 헤더 */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <div>
            <h2 className="text-xl font-bold text-white">영상 템플릿 선택</h2>
            <p className="text-sm text-slate-400 mt-1">맞춤형 화장품 마케팅에 최적화된 템플릿으로 바로 시작하세요</p>
          </div>
          <button className="text-slate-400 hover:text-white text-2xl" onClick={onClose}>×</button>
        </div>

        <div className="p-6">
          {/* 회사 정보 배너 */}
          <div className="bg-gradient-to-r from-indigo-900/50 to-purple-900/50 rounded-xl p-4 mb-6 border border-indigo-800/30">
            <div className="flex items-start gap-3">
              <div className="text-2xl">🧬</div>
              <div>
                <p className="text-sm font-semibold text-indigo-300">내장된 마케팅 데이터</p>
                <p className="text-xs text-slate-400 mt-1">
                  모든 템플릿에 분당서울대병원 임상시험 결과(100명 대상, 4주 만에 50%+ 호전)와
                  AI 진단 → 맞춤 제조 프로세스가 반영되어 있습니다.
                </p>
              </div>
            </div>
          </div>

          {/* 템플릿 그리드 */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {TEMPLATES.map((t) => {
              const firstBg = t.scenes[0]?.background;
              const bgStyle = firstBg?.type === 'gradient'
                ? { background: `linear-gradient(180deg, ${firstBg.value[0]}, ${firstBg.value[1]})` }
                : { background: firstBg?.value || '#1a1a2e' };

              return (
                <button
                  key={t.id}
                  className="text-left rounded-xl border border-slate-700/50 hover:border-indigo-500 transition overflow-hidden group"
                  onClick={() => handleSelect(t)}
                >
                  <div className="h-36 relative" style={bgStyle}>
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <div className="text-xs text-white/60 mb-0.5">{t.category}</div>
                      <div className="text-sm font-bold text-white">{t.name}</div>
                    </div>
                    <div className="absolute top-3 right-3 bg-black/30 rounded-full px-2 py-0.5 text-[10px] text-white/80">
                      {t.scenes.length}씬 · {t.scenes.reduce((s, sc) => s + sc.duration, 0)}초
                    </div>
                  </div>
                  <div className="p-3 bg-[#0d1117]">
                    <p className="text-xs text-slate-400 leading-relaxed">{t.description}</p>
                  </div>
                </button>
              );
            })}

            {/* 빈 캔버스 */}
            <button
              className="text-left rounded-xl border-2 border-dashed border-slate-700 hover:border-indigo-500 transition p-6 flex flex-col items-center justify-center min-h-[200px]"
              onClick={handleBlank}
            >
              <div className="text-3xl mb-2 opacity-50">✨</div>
              <div className="text-sm font-semibold text-slate-300">빈 캔버스</div>
              <p className="text-xs text-slate-500 mt-1 text-center">
                처음부터 자유롭게 만들기
              </p>
            </button>
          </div>

          {/* 안내 */}
          <div className="text-center">
            <p className="text-xs text-slate-500">
              템플릿 선택 후 모든 요소(텍스트, 색상, 배경, 애니메이션)를 자유롭게 수정할 수 있습니다
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
