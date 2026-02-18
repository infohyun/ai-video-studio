'use client';
import { useState } from 'react';
import { useStore } from '@/lib/store';
import { exportVideo } from '@/lib/exporter';

export default function ExportDialog({ onClose }) {
  const { project, imageCache } = useStore();
  const [exporting, setExporting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [blobUrl, setBlobUrl] = useState(null);
  const [settings, setSettings] = useState({
    width: 1080, height: 1920, fps: 30,
  });

  const totalDuration = project.scenes.reduce((s, sc) => s + sc.duration, 0);

  const handleExport = async () => {
    setExporting(true);
    setProgress(0);
    try {
      const blob = await exportVideo(
        project.scenes,
        settings,
        (p) => setProgress(p),
        imageCache,
      );
      const url = URL.createObjectURL(blob);
      setBlobUrl(url);
      setDone(true);
    } catch (err) {
      console.error('Export error:', err);
      alert('내보내기 중 오류가 발생했습니다: ' + err.message);
    } finally {
      setExporting(false);
    }
  };

  const handleDownload = () => {
    if (!blobUrl) return;
    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = `${project.name || 'video'}_${Date.now()}.webm`;
    a.click();
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[100]" onClick={onClose}>
      <div className="bg-[#1e293b] rounded-2xl w-[480px] max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        {/* 헤더 */}
        <div className="flex items-center justify-between p-5 border-b border-slate-700">
          <h2 className="text-lg font-bold text-white">영상 내보내기</h2>
          <button className="text-slate-400 hover:text-white text-xl" onClick={onClose}>×</button>
        </div>

        <div className="p-5">
          {!done ? (
            <>
              {/* 영상 정보 */}
              <div className="bg-slate-800/50 rounded-xl p-4 mb-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-xs text-slate-500">해상도</div>
                    <div className="text-sm font-semibold text-white">{settings.width}×{settings.height}</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500">총 길이</div>
                    <div className="text-sm font-semibold text-white">{totalDuration.toFixed(1)}초</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500">씬 수</div>
                    <div className="text-sm font-semibold text-white">{project.scenes.length}개</div>
                  </div>
                </div>
              </div>

              {/* 설정 */}
              <div className="space-y-3 mb-5">
                <div>
                  <label className="text-xs text-slate-400 block mb-1">해상도</label>
                  <select
                    value={`${settings.width}x${settings.height}`}
                    onChange={(e) => {
                      const [w, h] = e.target.value.split('x').map(Number);
                      setSettings({ ...settings, width: w, height: h });
                    }}
                  >
                    <option value="1080x1920">1080 × 1920 (Full HD 세로)</option>
                    <option value="720x1280">720 × 1280 (HD 세로)</option>
                    <option value="1920x1080">1920 × 1080 (Full HD 가로)</option>
                    <option value="540x960">540 × 960 (경량)</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-slate-400 block mb-1">프레임레이트</label>
                  <select value={settings.fps} onChange={(e) => setSettings({ ...settings, fps: parseInt(e.target.value) })}>
                    <option value="24">24 FPS</option>
                    <option value="30">30 FPS</option>
                  </select>
                </div>
              </div>

              {/* 진행 상태 */}
              {exporting && (
                <div className="mb-5">
                  <div className="flex justify-between text-xs text-slate-400 mb-1">
                    <span>렌더링 중...</span>
                    <span>{Math.round(progress * 100)}%</span>
                  </div>
                  <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-200"
                      style={{ width: `${progress * 100}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-slate-500 mt-2">
                    영상을 프레임 단위로 렌더링합니다. 약 {Math.ceil(totalDuration)}초 정도 소요됩니다.
                  </p>
                </div>
              )}

              {/* 내보내기 버튼 */}
              <button
                className="btn btn-primary btn-lg w-full justify-center"
                onClick={handleExport}
                disabled={exporting}
              >
                {exporting ? '렌더링 중...' : '영상 내보내기 (WebM)'}
              </button>
            </>
          ) : (
            /* 완료 상태 */
            <div className="text-center py-4">
              <div className="text-5xl mb-4">🎬</div>
              <h3 className="text-xl font-bold text-white mb-2">영상이 완성되었습니다!</h3>
              <p className="text-sm text-slate-400 mb-6">{project.name}.webm</p>

              {blobUrl && (
                <video
                  src={blobUrl}
                  controls
                  className="w-48 mx-auto rounded-lg mb-6 shadow-xl"
                  style={{ aspectRatio: '9/16' }}
                />
              )}

              <button className="btn btn-primary btn-lg w-full justify-center mb-3" onClick={handleDownload}>
                다운로드
              </button>
              <button className="btn btn-ghost w-full justify-center" onClick={() => { setDone(false); setBlobUrl(null); }}>
                설정 변경 후 다시 내보내기
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
