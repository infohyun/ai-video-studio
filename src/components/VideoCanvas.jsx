'use client';
import { useRef, useEffect, useCallback } from 'react';
import { useStore } from '@/lib/store';
import { renderScene, renderTransition } from '@/lib/renderer';

export default function VideoCanvas() {
  const canvasRef = useRef(null);
  const offRef1 = useRef(null);
  const offRef2 = useRef(null);
  const rafRef = useRef(null);
  const startTimeRef = useRef(null);

  const {
    project, selectedSceneIndex, isPlaying, setPlaying,
    setPlaybackTime, setPlaybackSceneIndex, imageCache,
    playbackTime, selectScene,
  } = useStore();

  const W = project.settings.width;
  const H = project.settings.height;
  const scenes = project.scenes;

  // 씬의 이미지 레이어에 캐시된 이미지 연결
  const getSceneWithImages = useCallback((scene) => {
    return {
      ...scene,
      background: scene.background?.type === 'image' && scene.background.src
        ? { ...scene.background, image: imageCache[scene.background.src] || null }
        : scene.background,
      layers: scene.layers.map(l =>
        l.type === 'image' && l.src
          ? { ...l, image: imageCache[l.src] || l.image || null }
          : l
      ),
    };
  }, [imageCache]);

  // 정적 렌더 (편집 모드)
  const renderStatic = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !scenes[selectedSceneIndex]) return;
    const ctx = canvas.getContext('2d');
    const scene = getSceneWithImages(scenes[selectedSceneIndex]);
    renderScene(ctx, scene, 0.99, W, H);
  }, [scenes, selectedSceneIndex, W, H, getSceneWithImages]);

  // 재생 루프
  const playLoop = useCallback((timestamp) => {
    if (!startTimeRef.current) startTimeRef.current = timestamp;
    const elapsed = (timestamp - startTimeRef.current) / 1000;

    let accum = 0;
    let currentSI = 0;
    let localProgress = 0;

    for (let i = 0; i < scenes.length; i++) {
      if (elapsed < accum + scenes[i].duration) {
        currentSI = i;
        localProgress = (elapsed - accum) / scenes[i].duration;
        break;
      }
      accum += scenes[i].duration;
      if (i === scenes.length - 1) {
        // 영상 끝
        setPlaying(false);
        startTimeRef.current = null;
        renderStatic();
        return;
      }
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const scene = getSceneWithImages(scenes[currentSI]);
    const transDur = scene.transition?.duration || 0.5;
    const transFrames = transDur / scene.duration;

    // 전환 처리
    if (currentSI > 0 && localProgress < transFrames) {
      const prevScene = getSceneWithImages(scenes[currentSI - 1]);
      if (!offRef1.current) {
        offRef1.current = document.createElement('canvas');
        offRef1.current.width = W; offRef1.current.height = H;
      }
      if (!offRef2.current) {
        offRef2.current = document.createElement('canvas');
        offRef2.current.width = W; offRef2.current.height = H;
      }
      renderScene(offRef1.current.getContext('2d'), prevScene, 1, W, H);
      renderScene(offRef2.current.getContext('2d'), scene, localProgress, W, H);
      renderTransition(ctx, offRef1.current, offRef2.current, scene.transition?.type || 'fade', localProgress / transFrames, W, H);
    } else {
      renderScene(ctx, scene, localProgress, W, H);
    }

    setPlaybackTime(elapsed);
    setPlaybackSceneIndex(currentSI);
    rafRef.current = requestAnimationFrame(playLoop);
  }, [scenes, W, H, setPlaying, setPlaybackTime, setPlaybackSceneIndex, getSceneWithImages, renderStatic]);

  // 재생 시작/정지
  useEffect(() => {
    if (isPlaying) {
      startTimeRef.current = null;
      rafRef.current = requestAnimationFrame(playLoop);
    } else {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    }
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [isPlaying, playLoop]);

  // 편집 모드 렌더
  useEffect(() => {
    if (!isPlaying) renderStatic();
  }, [isPlaying, renderStatic]);

  const totalDuration = scenes.reduce((s, sc) => s + sc.duration, 0);

  const togglePlay = () => {
    if (isPlaying) {
      setPlaying(false);
    } else {
      setPlaying(true);
    }
  };

  return (
    <div className="flex flex-col items-center gap-3">
      {/* 캔버스 */}
      <div className="canvas-container">
        <canvas ref={canvasRef} width={W} height={H} />
      </div>

      {/* 재생 컨트롤 */}
      <div className="flex items-center gap-3 bg-slate-800/80 backdrop-blur rounded-lg px-4 py-2">
        <button
          className="w-8 h-8 flex items-center justify-center rounded-full bg-indigo-600 hover:bg-indigo-500 text-white text-sm transition"
          onClick={togglePlay}
        >
          {isPlaying ? '⏸' : '▶'}
        </button>
        <span className="text-xs text-slate-400 font-mono w-24 text-center">
          {isPlaying ? playbackTime.toFixed(1) : '0.0'}s / {totalDuration.toFixed(1)}s
        </span>
        <button
          className="text-xs text-slate-400 hover:text-white transition"
          onClick={() => { setPlaying(false); startTimeRef.current = null; setPlaybackTime(0); renderStatic(); }}
        >
          ⏹ 정지
        </button>
      </div>
    </div>
  );
}
