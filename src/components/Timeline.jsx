'use client';
import { useStore } from '@/lib/store';

const SCENE_COLORS = {
  0: 'bg-indigo-600', 1: 'bg-purple-600', 2: 'bg-emerald-600',
  3: 'bg-amber-600', 4: 'bg-rose-600', 5: 'bg-cyan-600',
  6: 'bg-pink-600', 7: 'bg-teal-600',
};

export default function Timeline() {
  const {
    project, selectedSceneIndex, selectScene, addScene, removeScene,
    duplicateScene, moveScene, isPlaying, playbackSceneIndex,
  } = useStore();
  const scenes = project.scenes;
  const totalDur = scenes.reduce((s, sc) => s + sc.duration, 0) || 1;
  const activeIndex = isPlaying ? playbackSceneIndex : selectedSceneIndex;

  return (
    <div className="h-28 bg-[#0d1117] border-t border-slate-800 shrink-0 flex flex-col">
      {/* 타임라인 헤더 */}
      <div className="flex items-center justify-between px-4 py-1.5 border-b border-slate-800">
        <span className="text-xs font-semibold text-slate-400">타임라인</span>
        <div className="flex gap-1">
          <button className="btn btn-ghost btn-sm text-xs" onClick={() => addScene()}>+ 씬 추가</button>
        </div>
      </div>

      {/* 씬 블록 */}
      <div className="flex-1 flex items-stretch gap-1 px-4 py-2 overflow-x-auto">
        {scenes.map((scene, i) => {
          const widthPct = (scene.duration / totalDur) * 100;
          const isActive = i === activeIndex;
          const colorClass = SCENE_COLORS[i % 8];
          return (
            <div
              key={scene.id}
              className={`
                relative flex flex-col items-center justify-center rounded-lg cursor-pointer
                transition-all border-2 min-w-[70px]
                ${isActive ? 'border-white shadow-lg shadow-indigo-500/30 scale-[1.02]' : 'border-transparent hover:border-slate-600'}
                ${colorClass}
              `}
              style={{ width: `${Math.max(widthPct, 8)}%` }}
              onClick={() => selectScene(i)}
            >
              <span className="text-xs font-bold text-white/90">씬 {i + 1}</span>
              <span className="text-[10px] text-white/60">{scene.duration}초</span>
              {/* 컨텍스트 버튼 */}
              {isActive && !isPlaying && (
                <div className="absolute -top-1 -right-1 flex gap-0.5">
                  {i > 0 && (
                    <button
                      className="w-4 h-4 rounded-full bg-slate-900 text-[8px] text-white flex items-center justify-center hover:bg-slate-700"
                      onClick={(e) => { e.stopPropagation(); moveScene(i, i - 1); }}
                      title="왼쪽으로"
                    >←</button>
                  )}
                  {i < scenes.length - 1 && (
                    <button
                      className="w-4 h-4 rounded-full bg-slate-900 text-[8px] text-white flex items-center justify-center hover:bg-slate-700"
                      onClick={(e) => { e.stopPropagation(); moveScene(i, i + 1); }}
                      title="오른쪽으로"
                    >→</button>
                  )}
                  <button
                    className="w-4 h-4 rounded-full bg-slate-900 text-[8px] text-white flex items-center justify-center hover:bg-indigo-600"
                    onClick={(e) => { e.stopPropagation(); duplicateScene(i); }}
                    title="복제"
                  >⊕</button>
                  {scenes.length > 1 && (
                    <button
                      className="w-4 h-4 rounded-full bg-slate-900 text-[8px] text-white flex items-center justify-center hover:bg-red-600"
                      onClick={(e) => { e.stopPropagation(); removeScene(i); }}
                      title="삭제"
                    >×</button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
