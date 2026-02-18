/**
 * Canvas Video Rendering Engine
 * 실제 영상 프레임을 Canvas에 그리는 핵심 엔진
 */

// ============ 텍스트 줄바꿈 (한글 지원) ============
export function wrapText(ctx, text, maxWidth) {
  const lines = [];
  const paragraphs = text.split('\n');
  for (const para of paragraphs) {
    if (!para) { lines.push(''); continue; }
    let line = '';
    for (const char of para) {
      const test = line + char;
      if (ctx.measureText(test).width > maxWidth && line) {
        lines.push(line);
        line = char;
      } else {
        line = test;
      }
    }
    if (line) lines.push(line);
  }
  return lines;
}

// ============ 애니메이션 이징 ============
function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

function easeOutBack(t) {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
}

// ============ 레이어 애니메이션 값 계산 ============
function getAnimationValues(animation, progress, animDuration, animDelay, sceneDuration) {
  const startTime = animDelay / sceneDuration;
  const endTime = startTime + animDuration / sceneDuration;
  let t = 0;
  if (progress >= endTime) t = 1;
  else if (progress > startTime) t = (progress - startTime) / (endTime - startTime);
  const e = easeOutCubic(Math.min(Math.max(t, 0), 1));

  switch (animation) {
    case 'fadeIn':
      return { opacity: e, offsetX: 0, offsetY: 0, scale: 1 };
    case 'slideUp':
      return { opacity: e, offsetX: 0, offsetY: (1 - e) * 120, scale: 1 };
    case 'slideDown':
      return { opacity: e, offsetX: 0, offsetY: -(1 - e) * 120, scale: 1 };
    case 'slideLeft':
      return { opacity: e, offsetX: (1 - e) * 200, offsetY: 0, scale: 1 };
    case 'slideRight':
      return { opacity: e, offsetX: -(1 - e) * 200, offsetY: 0, scale: 1 };
    case 'scaleIn':
      return { opacity: e, offsetX: 0, offsetY: 0, scale: 0.3 + e * 0.7 };
    case 'bounceIn':
      const eb = easeOutBack(Math.min(Math.max(t, 0), 1));
      return { opacity: Math.min(e * 2, 1), offsetX: 0, offsetY: 0, scale: eb };
    case 'typewriter':
      return { opacity: 1, offsetX: 0, offsetY: 0, scale: 1, charReveal: e };
    default:
      return { opacity: 1, offsetX: 0, offsetY: 0, scale: 1 };
  }
}

// ============ 배경 그리기 ============
export function drawBackground(ctx, bg, w, h) {
  if (!bg) { ctx.fillStyle = '#0f0f23'; ctx.fillRect(0, 0, w, h); return; }

  if (bg.type === 'color') {
    ctx.fillStyle = bg.value || '#0f0f23';
    ctx.fillRect(0, 0, w, h);
  } else if (bg.type === 'gradient') {
    const colors = bg.value || ['#0f0f23', '#1a1a3e'];
    const angle = bg.angle || 180;
    const rad = (angle * Math.PI) / 180;
    const x1 = w / 2 - Math.sin(rad) * w / 2;
    const y1 = h / 2 - Math.cos(rad) * h / 2;
    const x2 = w / 2 + Math.sin(rad) * w / 2;
    const y2 = h / 2 + Math.cos(rad) * h / 2;
    const grad = ctx.createLinearGradient(x1, y1, x2, y2);
    colors.forEach((c, i) => grad.addColorStop(i / (colors.length - 1), c));
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);
  } else if (bg.type === 'image' && bg.image) {
    ctx.drawImage(bg.image, 0, 0, w, h);
  }
}

// ============ 텍스트 레이어 그리기 ============
export function drawTextLayer(ctx, layer, progress, w, h, sceneDuration) {
  const anim = getAnimationValues(
    layer.animation || 'none', progress,
    layer.animationDuration || 0.5, layer.animationDelay || 0, sceneDuration
  );
  if (anim.opacity <= 0) return;

  ctx.save();
  ctx.globalAlpha = anim.opacity;

  const x = (layer.x / 100) * w + anim.offsetX;
  const y = (layer.y / 100) * h + anim.offsetY;
  const fontSize = (layer.fontSize || 48) * (w / 1080);
  const fontWeight = layer.fontWeight || '700';
  const fontFamily = layer.fontFamily || 'Noto Sans KR, sans-serif';

  ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
  ctx.textAlign = layer.textAlign || 'center';
  ctx.textBaseline = 'middle';

  if (anim.scale !== 1) {
    ctx.translate(x, y);
    ctx.scale(anim.scale, anim.scale);
    ctx.translate(-x, -y);
  }

  const maxWidth = (layer.maxWidth || 80) / 100 * w;
  let text = layer.content || '';
  if (anim.charReveal !== undefined && anim.charReveal < 1) {
    text = text.substring(0, Math.floor(text.length * anim.charReveal));
  }

  const lines = wrapText(ctx, text, maxWidth);
  const lineH = fontSize * (layer.lineHeight || 1.4);
  const totalH = lines.length * lineH;
  const startY = y - totalH / 2 + lineH / 2;

  // 텍스트 그림자
  if (layer.shadow !== false) {
    ctx.shadowColor = 'rgba(0,0,0,0.6)';
    ctx.shadowBlur = fontSize * 0.15;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
  }

  // 텍스트 외곽선 (stroke)
  if (layer.stroke) {
    ctx.strokeStyle = layer.strokeColor || '#000000';
    ctx.lineWidth = layer.strokeWidth || (fontSize * 0.08);
    ctx.lineJoin = 'round';
    lines.forEach((line, i) => ctx.strokeText(line, x, startY + i * lineH));
  }

  // 텍스트 채우기
  ctx.fillStyle = layer.color || '#ffffff';
  lines.forEach((line, i) => ctx.fillText(line, x, startY + i * lineH));

  ctx.restore();
}

// ============ 이미지 레이어 그리기 ============
export function drawImageLayer(ctx, layer, progress, w, h, sceneDuration) {
  if (!layer.image) return;
  const anim = getAnimationValues(
    layer.animation || 'none', progress,
    layer.animationDuration || 0.5, layer.animationDelay || 0, sceneDuration
  );
  if (anim.opacity <= 0) return;

  ctx.save();
  ctx.globalAlpha = anim.opacity * (layer.opacity ?? 1);

  const imgW = (layer.width / 100) * w;
  const imgH = (layer.height / 100) * h;
  const x = (layer.x / 100) * w - imgW / 2 + anim.offsetX;
  const y = (layer.y / 100) * h - imgH / 2 + anim.offsetY;

  if (anim.scale !== 1) {
    const cx = x + imgW / 2;
    const cy = y + imgH / 2;
    ctx.translate(cx, cy);
    ctx.scale(anim.scale, anim.scale);
    ctx.translate(-cx, -cy);
  }

  // border radius
  if (layer.borderRadius) {
    const r = layer.borderRadius * (w / 1080);
    ctx.beginPath();
    ctx.roundRect(x, y, imgW, imgH, r);
    ctx.clip();
  }

  ctx.drawImage(layer.image, x, y, imgW, imgH);
  ctx.restore();
}

// ============ 도형 레이어 그리기 ============
export function drawShapeLayer(ctx, layer, progress, w, h, sceneDuration) {
  const anim = getAnimationValues(
    layer.animation || 'none', progress,
    layer.animationDuration || 0.5, layer.animationDelay || 0, sceneDuration
  );
  if (anim.opacity <= 0) return;

  ctx.save();
  ctx.globalAlpha = anim.opacity * (layer.opacity ?? 1);

  const x = (layer.x / 100) * w + anim.offsetX;
  const y = (layer.y / 100) * h + anim.offsetY;
  const sw = (layer.width / 100) * w;
  const sh = (layer.height / 100) * h;

  ctx.fillStyle = layer.color || '#ffffff';
  if (layer.shape === 'circle') {
    ctx.beginPath();
    ctx.ellipse(x, y, sw / 2, sh / 2, 0, 0, Math.PI * 2);
    ctx.fill();
  } else if (layer.shape === 'rect') {
    const r = (layer.borderRadius || 0) * (w / 1080);
    if (r > 0) {
      ctx.beginPath();
      ctx.roundRect(x - sw / 2, y - sh / 2, sw, sh, r);
      ctx.fill();
    } else {
      ctx.fillRect(x - sw / 2, y - sh / 2, sw, sh);
    }
  }
  ctx.restore();
}

// ============ 씬 전체 렌더링 ============
export function renderScene(ctx, scene, progress, w, h) {
  ctx.clearRect(0, 0, w, h);
  drawBackground(ctx, scene.background, w, h);

  const layers = scene.layers || [];
  for (const layer of layers) {
    if (layer.type === 'text') {
      drawTextLayer(ctx, layer, progress, w, h, scene.duration);
    } else if (layer.type === 'image') {
      drawImageLayer(ctx, layer, progress, w, h, scene.duration);
    } else if (layer.type === 'shape') {
      drawShapeLayer(ctx, layer, progress, w, h, scene.duration);
    }
  }
}

// ============ 씬 전환 효과 ============
export function renderTransition(ctx, offCanvas1, offCanvas2, transType, progress, w, h) {
  const e = easeOutCubic(progress);
  ctx.clearRect(0, 0, w, h);

  switch (transType) {
    case 'fade':
      ctx.globalAlpha = 1 - e;
      ctx.drawImage(offCanvas1, 0, 0);
      ctx.globalAlpha = e;
      ctx.drawImage(offCanvas2, 0, 0);
      ctx.globalAlpha = 1;
      break;
    case 'slideLeft':
      ctx.drawImage(offCanvas1, -e * w, 0);
      ctx.drawImage(offCanvas2, (1 - e) * w, 0);
      break;
    case 'slideUp':
      ctx.drawImage(offCanvas1, 0, -e * h);
      ctx.drawImage(offCanvas2, 0, (1 - e) * h);
      break;
    case 'zoom':
      ctx.globalAlpha = 1 - e;
      const s1 = 1 + e * 0.3;
      ctx.save();
      ctx.translate(w / 2, h / 2);
      ctx.scale(s1, s1);
      ctx.translate(-w / 2, -h / 2);
      ctx.drawImage(offCanvas1, 0, 0);
      ctx.restore();
      ctx.globalAlpha = e;
      ctx.drawImage(offCanvas2, 0, 0);
      ctx.globalAlpha = 1;
      break;
    default: // cut
      if (progress < 0.5) ctx.drawImage(offCanvas1, 0, 0);
      else ctx.drawImage(offCanvas2, 0, 0);
  }
}
