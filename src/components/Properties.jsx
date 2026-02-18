'use client';
import { useStore } from '@/lib/store';

const ANIMATIONS = [
  { value: 'none', label: '없음' },
  { value: 'fadeIn', label: '페이드인' },
  { value: 'slideUp', label: '아래→위' },
  { value: 'slideDown', label: '위→아래' },
  { value: 'slideLeft', label: '오른쪽→왼쪽' },
  { value: 'slideRight', label: '왼쪽→오른쪽' },
  { value: 'scaleIn', label: '확대 등장' },
  { value: 'bounceIn', label: '바운스' },
  { value: 'typewriter', label: '타이핑' },
];

const TRANSITIONS = [
  { value: 'fade', label: '페이드' },
  { value: 'slideLeft', label: '슬라이드 좌' },
  { value: 'slideUp', label: '슬라이드 상' },
  { value: 'zoom', label: '줌' },
  { value: 'cut', label: '컷 (즉시)' },
];

const FONTS = [
  'Noto Sans KR, sans-serif',
  'serif',
  'monospace',
  'cursive',
];

function Section({ title, children }) {
  return (
    <div className="mb-4">
      <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mb-2">{title}</div>
      {children}
    </div>
  );
}

function Row({ label, children }) {
  return (
    <div className="flex items-center gap-2 mb-2">
      <label className="text-xs text-slate-400 w-16 shrink-0">{label}</label>
      <div className="flex-1">{children}</div>
    </div>
  );
}

export default function Properties() {
  const {
    project, selectedSceneIndex, selectedLayerId,
    updateScene, updateLayer, removeLayer, moveLayer,
    getCurrentScene, getSelectedLayer,
  } = useStore();

  const scene = project.scenes[selectedSceneIndex];
  const layer = scene?.layers.find(l => l.id === selectedLayerId);
  const layerIndex = scene ? scene.layers.findIndex(l => l.id === selectedLayerId) : -1;

  if (!scene) return <div className="w-64 bg-[#0d1117] border-l border-slate-800" />;

  return (
    <div className="w-64 bg-[#0d1117] border-l border-slate-800 overflow-y-auto shrink-0">
      <div className="p-3">
        {/* 씬 속성 */}
        <Section title={`씬 ${selectedSceneIndex + 1} 속성`}>
          <Row label="길이(초)">
            <input
              type="number" min="1" max="30" step="0.5"
              value={scene.duration}
              onChange={(e) => updateScene(selectedSceneIndex, { duration: parseFloat(e.target.value) || 3 })}
            />
          </Row>
          <Row label="전환">
            <select
              value={scene.transition?.type || 'fade'}
              onChange={(e) => updateScene(selectedSceneIndex, { transition: { ...scene.transition, type: e.target.value } })}
            >
              {TRANSITIONS.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
            </select>
          </Row>
          <Row label="전환시간">
            <input
              type="number" min="0.1" max="2" step="0.1"
              value={scene.transition?.duration || 0.5}
              onChange={(e) => updateScene(selectedSceneIndex, { transition: { ...scene.transition, duration: parseFloat(e.target.value) || 0.5 } })}
            />
          </Row>
        </Section>

        {/* 레이어 목록 */}
        <Section title="레이어">
          {scene.layers.length === 0 ? (
            <p className="text-xs text-slate-600 py-2">레이어 없음. 왼쪽에서 추가하세요.</p>
          ) : (
            <div className="space-y-1">
              {scene.layers.map((l, i) => (
                <div
                  key={l.id}
                  className={`flex items-center gap-2 px-2 py-1.5 rounded cursor-pointer text-xs transition ${l.id === selectedLayerId ? 'bg-indigo-600/30 text-indigo-300' : 'hover:bg-slate-800 text-slate-400'}`}
                  onClick={() => useStore.getState().selectLayer(l.id)}
                >
                  <span className="w-4 text-center">
                    {l.type === 'text' ? 'T' : l.type === 'image' ? '🖼' : '◼'}
                  </span>
                  <span className="flex-1 truncate">
                    {l.type === 'text' ? (l.content || '').substring(0, 15) : l.type === 'image' ? '이미지' : '도형'}
                  </span>
                  <span className="text-[10px] text-slate-600">{i + 1}</span>
                </div>
              ))}
            </div>
          )}
        </Section>

        {/* 선택된 레이어 속성 */}
        {layer && (
          <>
            {/* 공통 속성 */}
            <Section title={layer.type === 'text' ? '텍스트 속성' : layer.type === 'image' ? '이미지 속성' : '도형 속성'}>
              <Row label="X (%)">
                <input type="range" min="0" max="100" value={layer.x} className="w-full"
                  onChange={(e) => updateLayer(layer.id, { x: parseFloat(e.target.value) })} />
              </Row>
              <Row label="Y (%)">
                <input type="range" min="0" max="100" value={layer.y} className="w-full"
                  onChange={(e) => updateLayer(layer.id, { y: parseFloat(e.target.value) })} />
              </Row>

              {/* 텍스트 전용 */}
              {layer.type === 'text' && (
                <>
                  <Row label="내용">
                    <textarea
                      rows={3}
                      value={layer.content}
                      onChange={(e) => updateLayer(layer.id, { content: e.target.value })}
                      className="text-xs"
                    />
                  </Row>
                  <Row label="크기">
                    <input type="range" min="16" max="120" value={layer.fontSize} className="w-full"
                      onChange={(e) => updateLayer(layer.id, { fontSize: parseInt(e.target.value) })} />
                  </Row>
                  <Row label="굵기">
                    <select value={layer.fontWeight}
                      onChange={(e) => updateLayer(layer.id, { fontWeight: e.target.value })}>
                      <option value="300">얇게</option>
                      <option value="400">보통</option>
                      <option value="500">중간</option>
                      <option value="600">약간 굵게</option>
                      <option value="700">굵게</option>
                      <option value="800">매우 굵게</option>
                      <option value="900">최대</option>
                    </select>
                  </Row>
                  <Row label="색상">
                    <div className="flex gap-1 items-center">
                      <input type="color" value={layer.color}
                        onChange={(e) => updateLayer(layer.id, { color: e.target.value })} />
                      <div className="flex gap-0.5">
                        {['#ffffff', '#FFD700', '#FF6B6B', '#60A5FA', '#10B981', '#A78BFA'].map(c => (
                          <button key={c} className="w-5 h-5 rounded border border-slate-600"
                            style={{ background: c }}
                            onClick={() => updateLayer(layer.id, { color: c })} />
                        ))}
                      </div>
                    </div>
                  </Row>
                  <Row label="정렬">
                    <div className="flex gap-1">
                      {['left', 'center', 'right'].map(a => (
                        <button key={a}
                          className={`flex-1 py-1 text-xs rounded ${layer.textAlign === a ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'}`}
                          onClick={() => updateLayer(layer.id, { textAlign: a })}
                        >
                          {a === 'left' ? '좌' : a === 'center' ? '중' : '우'}
                        </button>
                      ))}
                    </div>
                  </Row>
                  <Row label="너비(%)">
                    <input type="range" min="20" max="100" value={layer.maxWidth} className="w-full"
                      onChange={(e) => updateLayer(layer.id, { maxWidth: parseInt(e.target.value) })} />
                  </Row>
                  <Row label="줄간격">
                    <input type="range" min="1" max="2.5" step="0.1" value={layer.lineHeight} className="w-full"
                      onChange={(e) => updateLayer(layer.id, { lineHeight: parseFloat(e.target.value) })} />
                  </Row>
                  <Row label="그림자">
                    <input type="checkbox" checked={layer.shadow !== false}
                      onChange={(e) => updateLayer(layer.id, { shadow: e.target.checked })} />
                  </Row>
                  <Row label="외곽선">
                    <input type="checkbox" checked={!!layer.stroke}
                      onChange={(e) => updateLayer(layer.id, { stroke: e.target.checked })} />
                  </Row>
                </>
              )}

              {/* 이미지 전용 */}
              {layer.type === 'image' && (
                <>
                  <Row label="너비(%)">
                    <input type="range" min="5" max="100" value={layer.width} className="w-full"
                      onChange={(e) => updateLayer(layer.id, { width: parseInt(e.target.value) })} />
                  </Row>
                  <Row label="높이(%)">
                    <input type="range" min="5" max="100" value={layer.height} className="w-full"
                      onChange={(e) => updateLayer(layer.id, { height: parseInt(e.target.value) })} />
                  </Row>
                  <Row label="투명도">
                    <input type="range" min="0" max="1" step="0.05" value={layer.opacity ?? 1} className="w-full"
                      onChange={(e) => updateLayer(layer.id, { opacity: parseFloat(e.target.value) })} />
                  </Row>
                  <Row label="둥글기">
                    <input type="range" min="0" max="50" value={layer.borderRadius || 0} className="w-full"
                      onChange={(e) => updateLayer(layer.id, { borderRadius: parseInt(e.target.value) })} />
                  </Row>
                </>
              )}

              {/* 도형 전용 */}
              {layer.type === 'shape' && (
                <>
                  <Row label="너비(%)">
                    <input type="range" min="1" max="100" value={layer.width} className="w-full"
                      onChange={(e) => updateLayer(layer.id, { width: parseInt(e.target.value) })} />
                  </Row>
                  <Row label="높이(%)">
                    <input type="range" min="1" max="100" value={layer.height} className="w-full"
                      onChange={(e) => updateLayer(layer.id, { height: parseInt(e.target.value) })} />
                  </Row>
                  <Row label="색상">
                    <input type="color" value={layer.color?.startsWith('rgba') ? '#000000' : layer.color}
                      onChange={(e) => updateLayer(layer.id, { color: e.target.value })} />
                  </Row>
                  <Row label="투명도">
                    <input type="range" min="0" max="1" step="0.05" value={layer.opacity ?? 1} className="w-full"
                      onChange={(e) => updateLayer(layer.id, { opacity: parseFloat(e.target.value) })} />
                  </Row>
                  <Row label="둥글기">
                    <input type="range" min="0" max="100" value={layer.borderRadius || 0} className="w-full"
                      onChange={(e) => updateLayer(layer.id, { borderRadius: parseInt(e.target.value) })} />
                  </Row>
                </>
              )}
            </Section>

            {/* 애니메이션 */}
            <Section title="애니메이션">
              <Row label="효과">
                <select value={layer.animation || 'none'}
                  onChange={(e) => updateLayer(layer.id, { animation: e.target.value })}>
                  {ANIMATIONS.map(a => <option key={a.value} value={a.value}>{a.label}</option>)}
                </select>
              </Row>
              <Row label="길이(초)">
                <input type="number" min="0.1" max="3" step="0.1" value={layer.animationDuration || 0.5}
                  onChange={(e) => updateLayer(layer.id, { animationDuration: parseFloat(e.target.value) || 0.5 })} />
              </Row>
              <Row label="딜레이(초)">
                <input type="number" min="0" max="10" step="0.1" value={layer.animationDelay || 0}
                  onChange={(e) => updateLayer(layer.id, { animationDelay: parseFloat(e.target.value) || 0 })} />
              </Row>
            </Section>

            {/* 레이어 컨트롤 */}
            <Section title="레이어 관리">
              <div className="flex gap-1 flex-wrap">
                <button className="btn btn-ghost btn-sm text-[11px]" onClick={() => moveLayer(layer.id, 1)}>위로</button>
                <button className="btn btn-ghost btn-sm text-[11px]" onClick={() => moveLayer(layer.id, -1)}>아래로</button>
                <button className="btn btn-danger btn-sm text-[11px]" onClick={() => removeLayer(layer.id)}>삭제</button>
              </div>
            </Section>
          </>
        )}
      </div>
    </div>
  );
}
