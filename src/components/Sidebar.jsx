'use client';
import { useState, useRef } from 'react';
import { useStore } from '@/lib/store';
import { loadImage } from '@/lib/exporter';

const BG_PRESETS = [
  { type: 'gradient', value: ['#0f0f23', '#1a1a3e'], angle: 180, label: '딥 네이비' },
  { type: 'gradient', value: ['#0a1628', '#162a4a'], angle: 180, label: '메디컬 블루' },
  { type: 'gradient', value: ['#1a0a30', '#2a1050'], angle: 180, label: '퍼플' },
  { type: 'gradient', value: ['#0a1a0a', '#1a2a1a'], angle: 180, label: '내추럴 그린' },
  { type: 'gradient', value: ['#1a0a0a', '#2a1a1a'], angle: 180, label: '다크 레드' },
  { type: 'gradient', value: ['#000000', '#1a1a1a'], angle: 180, label: '블랙' },
  { type: 'gradient', value: ['#f8fafc', '#e2e8f0'], angle: 180, label: '화이트' },
  { type: 'gradient', value: ['#fef3c7', '#fde68a'], angle: 180, label: '골드' },
  { type: 'color', value: '#0f172a', label: '슬레이트' },
  { type: 'color', value: '#ffffff', label: '순백' },
  { type: 'color', value: '#000000', label: '순검정' },
  { type: 'color', value: '#1e3a5f', label: '오션블루' },
];

const TEXT_PRESETS = [
  { content: '텍스트를 입력하세요', fontSize: 48, fontWeight: '700', color: '#ffffff' },
  { content: '제목 텍스트', fontSize: 64, fontWeight: '800', color: '#ffffff' },
  { content: '작은 설명 텍스트', fontSize: 28, fontWeight: '400', color: '#cccccc' },
  { content: '강조 텍스트', fontSize: 52, fontWeight: '800', color: '#FFD700' },
  { content: 'CTA 버튼 텍스트', fontSize: 32, fontWeight: '700', color: '#ffffff' },
];

export default function Sidebar() {
  const [tab, setTab] = useState('text');
  const { addTextLayer, addShapeLayer, addImageLayer, updateScene, selectedSceneIndex } = useStore();
  const fileRef = useRef(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (ev) => {
      const src = ev.target.result;
      try {
        const img = await loadImage(src);
        addImageLayer(src, img);
      } catch (err) {
        console.error('Image load error:', err);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleBgImage = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (ev) => {
      const src = ev.target.result;
      try {
        const img = await loadImage(src);
        updateScene(selectedSceneIndex, {
          background: { type: 'image', src, image: img },
        });
      } catch (err) {
        console.error('BG image error:', err);
      }
    };
    reader.readAsDataURL(file);
  };

  const tabs = [
    { id: 'text', icon: 'T', label: '텍스트' },
    { id: 'image', icon: '🖼', label: '이미지' },
    { id: 'shape', icon: '◼', label: '도형' },
    { id: 'bg', icon: '🎨', label: '배경' },
  ];

  return (
    <div className="w-56 bg-[#0d1117] border-r border-slate-800 flex flex-col shrink-0">
      {/* 탭 버튼 */}
      <div className="flex border-b border-slate-800">
        {tabs.map(t => (
          <button
            key={t.id}
            className={`flex-1 py-2.5 text-xs font-medium transition-colors ${tab === t.id ? 'text-indigo-400 border-b-2 border-indigo-400 bg-indigo-950/30' : 'text-slate-500 hover:text-slate-300'}`}
            onClick={() => setTab(t.id)}
          >
            <div>{t.icon}</div>
            <div className="mt-0.5">{t.label}</div>
          </button>
        ))}
      </div>

      {/* 탭 내용 */}
      <div className="flex-1 overflow-y-auto p-3">
        {/* 텍스트 */}
        {tab === 'text' && (
          <div className="space-y-2">
            <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mb-2">텍스트 추가</p>
            {TEXT_PRESETS.map((preset, i) => (
              <button
                key={i}
                className="w-full text-left px-3 py-2.5 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 transition group"
                onClick={() => addTextLayer(preset.content)}
              >
                <span
                  className="block truncate group-hover:text-white transition"
                  style={{ fontSize: Math.min(preset.fontSize * 0.3, 16), fontWeight: preset.fontWeight, color: preset.color === '#ffffff' ? '#cbd5e1' : preset.color }}
                >
                  {preset.content}
                </span>
              </button>
            ))}
            <div className="pt-2">
              <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mb-2">마케팅 문구</p>
              {[
                '분당서울대병원\n임상시험 결과',
                '100명 중 50% 이상\n4주 만에 호전',
                'AI 진단 → 맞춤 제조',
                '무료 진단 시작하기',
                '지금 바로 시작하세요',
                '한정 수량 · 오늘만 특별 혜택',
              ].map((text, i) => (
                <button
                  key={i}
                  className="w-full text-left px-3 py-2 rounded-lg bg-indigo-950/30 hover:bg-indigo-900/40 border border-indigo-800/30 transition text-xs text-indigo-300 mb-1.5"
                  onClick={() => addTextLayer(text)}
                >
                  {text.replace('\n', ' ')}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 이미지 */}
        {tab === 'image' && (
          <div className="space-y-3">
            <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">이미지 추가</p>
            <button
              className="w-full py-8 rounded-lg border-2 border-dashed border-slate-700 hover:border-indigo-500 transition text-center"
              onClick={() => fileRef.current?.click()}
            >
              <div className="text-2xl mb-1">📁</div>
              <p className="text-xs text-slate-400">클릭하여 이미지 업로드</p>
              <p className="text-[10px] text-slate-600 mt-1">PNG, JPG, GIF, WebP</p>
            </button>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
          </div>
        )}

        {/* 도형 */}
        {tab === 'shape' && (
          <div className="space-y-3">
            <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">도형 추가</p>
            <div className="grid grid-cols-2 gap-2">
              <button
                className="py-6 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 transition text-center"
                onClick={() => addShapeLayer()}
              >
                <div className="w-10 h-6 bg-white/20 rounded mx-auto mb-1" />
                <span className="text-[10px] text-slate-400">사각형</span>
              </button>
              <button
                className="py-6 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 transition text-center"
                onClick={() => {
                  addShapeLayer();
                  // 원형으로 변경 - 최신 레이어를 원으로 업데이트
                  const store = useStore.getState();
                  const lid = store.selectedLayerId;
                  if (lid) store.updateLayer(lid, { shape: 'circle', width: 20, height: 12, borderRadius: 0 });
                }}
              >
                <div className="w-10 h-6 bg-white/20 rounded-full mx-auto mb-1" />
                <span className="text-[10px] text-slate-400">원형</span>
              </button>
            </div>
            <p className="text-[10px] text-slate-500 mt-2">버튼 배경, 자막 배경 등에 활용</p>
          </div>
        )}

        {/* 배경 */}
        {tab === 'bg' && (
          <div className="space-y-3">
            <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">배경 프리셋</p>
            <div className="grid grid-cols-2 gap-2">
              {BG_PRESETS.map((bg, i) => (
                <button
                  key={i}
                  className="h-16 rounded-lg border border-slate-700/50 hover:border-indigo-500 transition relative overflow-hidden group"
                  onClick={() => updateScene(selectedSceneIndex, { background: bg })}
                  style={{
                    background: bg.type === 'gradient'
                      ? `linear-gradient(${bg.angle || 180}deg, ${bg.value.join(', ')})`
                      : bg.value,
                  }}
                >
                  <span className="absolute bottom-1 left-1 right-1 text-[9px] text-white/80 bg-black/40 rounded px-1 py-0.5 text-center opacity-0 group-hover:opacity-100 transition">
                    {bg.label}
                  </span>
                </button>
              ))}
            </div>
            <div className="pt-2">
              <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mb-2">이미지 배경</p>
              <label className="block w-full py-4 rounded-lg border-2 border-dashed border-slate-700 hover:border-indigo-500 transition text-center cursor-pointer">
                <span className="text-xs text-slate-400">배경 이미지 업로드</span>
                <input type="file" accept="image/*" className="hidden" onChange={handleBgImage} />
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
