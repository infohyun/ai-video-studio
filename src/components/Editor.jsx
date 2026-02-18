'use client';
import { useState } from 'react';
import { useStore } from '@/lib/store';
import VideoCanvas from './VideoCanvas';
import Timeline from './Timeline';
import Sidebar from './Sidebar';
import Properties from './Properties';
import ExportDialog from './ExportDialog';
import TemplateDialog from './TemplateDialog';

export default function Editor() {
  const { project, showExport, setShowExport, setProjectName } = useStore();
  const [showTemplates, setShowTemplates] = useState(true);
  const [editingName, setEditingName] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-[#0f172a] select-none">
      {/* 상단 헤더 */}
      <header className="flex items-center justify-between h-12 px-4 bg-[#0f172a] border-b border-slate-800 shrink-0 z-50">
        <div className="flex items-center gap-3">
          <div className="text-lg font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            AI Video Studio
          </div>
          <div className="w-px h-5 bg-slate-700" />
          {editingName ? (
            <input
              autoFocus
              className="!w-48 text-sm !py-1"
              value={project.name}
              onChange={(e) => setProjectName(e.target.value)}
              onBlur={() => setEditingName(false)}
              onKeyDown={(e) => e.key === 'Enter' && setEditingName(false)}
            />
          ) : (
            <span
              className="text-sm text-slate-300 cursor-pointer hover:text-white"
              onClick={() => setEditingName(true)}
            >
              {project.name}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button className="btn btn-ghost btn-sm" onClick={() => setShowTemplates(true)}>
            템플릿
          </button>
          <button className="btn btn-primary btn-sm" onClick={() => setShowExport(true)}>
            영상 내보내기
          </button>
        </div>
      </header>

      {/* 메인 영역 */}
      <div className="flex flex-1 overflow-hidden">
        {/* 왼쪽 사이드바 - 도구 */}
        <Sidebar />

        {/* 중앙 - 캔버스 */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 flex items-center justify-center p-4 overflow-hidden">
            <VideoCanvas />
          </div>
          {/* 하단 타임라인 */}
          <Timeline />
        </div>

        {/* 오른쪽 - 속성 패널 */}
        <Properties />
      </div>

      {/* 모달 */}
      {showExport && <ExportDialog onClose={() => setShowExport(false)} />}
      {showTemplates && <TemplateDialog onClose={() => setShowTemplates(false)} />}
    </div>
  );
}
