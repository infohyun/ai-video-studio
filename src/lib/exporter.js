/**
 * Video Export Engine
 * Canvas를 실제 MP4/WebM 영상 파일로 내보내는 엔진
 */
import { renderScene, renderTransition } from './renderer';

export async function exportVideo(scenes, settings, onProgress, imageCache) {
  const { width = 1080, height = 1920, fps = 30 } = settings;

  // 오프스크린 캔버스 생성
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  const off1 = document.createElement('canvas');
  off1.width = width; off1.height = height;
  const offCtx1 = off1.getContext('2d');

  const off2 = document.createElement('canvas');
  off2.width = width; off2.height = height;
  const offCtx2 = off2.getContext('2d');

  // MediaRecorder 설정
  const stream = canvas.captureStream(fps);
  const mimeType = MediaRecorder.isTypeSupported('video/webm;codecs=vp9')
    ? 'video/webm;codecs=vp9'
    : 'video/webm';

  const recorder = new MediaRecorder(stream, {
    mimeType,
    videoBitsPerSecond: 8_000_000,
  });

  const chunks = [];
  recorder.ondataavailable = (e) => { if (e.data.size > 0) chunks.push(e.data); };

  // 씬에 이미지 로드
  const preparedScenes = scenes.map(s => prepareSceneImages(s, imageCache));

  // 총 프레임 수 계산
  let totalFrames = 0;
  for (const scene of preparedScenes) {
    totalFrames += Math.round(scene.duration * fps);
  }

  return new Promise((resolve, reject) => {
    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: mimeType });
      resolve(blob);
    };
    recorder.onerror = reject;
    recorder.start();

    let currentFrame = 0;

    (async () => {
      try {
        for (let si = 0; si < preparedScenes.length; si++) {
          const scene = preparedScenes[si];
          const sceneFrames = Math.round(scene.duration * fps);
          const transFrames = Math.round((scene.transition?.duration || 0.5) * fps);

          for (let f = 0; f < sceneFrames; f++) {
            const progress = f / sceneFrames;

            // 씬 전환 구간
            if (si > 0 && f < transFrames) {
              const prevScene = preparedScenes[si - 1];
              const transProgress = f / transFrames;
              renderScene(offCtx1, prevScene, 1, width, height);
              renderScene(offCtx2, scene, progress, width, height);
              renderTransition(ctx, off1, off2, scene.transition?.type || 'fade', transProgress, width, height);
            } else {
              renderScene(ctx, scene, progress, width, height);
            }

            currentFrame++;
            if (onProgress) onProgress(currentFrame / totalFrames);

            // 프레임 간격 대기 (브라우저가 프레임을 캡처할 시간)
            await new Promise(r => setTimeout(r, 1000 / fps));
          }
        }
        // 마지막 프레임 유지
        await new Promise(r => setTimeout(r, 200));
        recorder.stop();
      } catch (err) {
        reject(err);
      }
    })();
  });
}

function prepareSceneImages(scene, imageCache) {
  const prepared = { ...scene, layers: scene.layers.map(l => ({ ...l })) };

  // 배경 이미지 로드
  if (prepared.background?.type === 'image' && prepared.background.src) {
    prepared.background = {
      ...prepared.background,
      image: imageCache?.[prepared.background.src] || null,
    };
  }

  // 레이어 이미지 로드
  for (const layer of prepared.layers) {
    if (layer.type === 'image' && layer.src) {
      layer.image = imageCache?.[layer.src] || null;
    }
  }

  return prepared;
}

export function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}
