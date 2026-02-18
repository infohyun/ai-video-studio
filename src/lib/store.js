import { create } from 'zustand';
import { v4 as uuid } from 'uuid';

const DEFAULT_SCENE = () => ({
  id: uuid(),
  duration: 5,
  background: { type: 'gradient', value: ['#0f0f23', '#1a1a3e'], angle: 180 },
  layers: [],
  transition: { type: 'fade', duration: 0.5 },
});

const DEFAULT_TEXT_LAYER = (content = '텍스트를 입력하세요') => ({
  id: uuid(),
  type: 'text',
  content,
  x: 50, y: 50,
  fontSize: 48,
  fontWeight: '700',
  fontFamily: 'Noto Sans KR, sans-serif',
  color: '#ffffff',
  textAlign: 'center',
  lineHeight: 1.4,
  maxWidth: 80,
  shadow: true,
  stroke: false,
  strokeColor: '#000000',
  strokeWidth: 3,
  animation: 'fadeIn',
  animationDuration: 0.5,
  animationDelay: 0,
});

const DEFAULT_SHAPE_LAYER = () => ({
  id: uuid(),
  type: 'shape',
  shape: 'rect',
  x: 50, y: 50,
  width: 80, height: 8,
  color: 'rgba(0,0,0,0.5)',
  borderRadius: 0,
  opacity: 1,
  animation: 'fadeIn',
  animationDuration: 0.3,
  animationDelay: 0,
});

const DEFAULT_IMAGE_LAYER = (src = '') => ({
  id: uuid(),
  type: 'image',
  src,
  image: null,
  x: 50, y: 40,
  width: 60, height: 30,
  opacity: 1,
  borderRadius: 0,
  animation: 'fadeIn',
  animationDuration: 0.5,
  animationDelay: 0,
});

export const useStore = create((set, get) => ({
  // ===== State =====
  project: {
    name: '새 마케팅 영상',
    scenes: [DEFAULT_SCENE()],
    settings: { width: 1080, height: 1920, fps: 30 },
  },
  selectedSceneIndex: 0,
  selectedLayerId: null,
  isPlaying: false,
  playbackTime: 0,
  playbackSceneIndex: 0,
  showExport: false,
  exportProgress: 0,
  imageCache: {},

  // ===== Scene Actions =====
  addScene: (sceneData) => set((s) => {
    const scene = sceneData ? { ...DEFAULT_SCENE(), ...sceneData, id: uuid() } : DEFAULT_SCENE();
    const scenes = [...s.project.scenes, scene];
    return { project: { ...s.project, scenes }, selectedSceneIndex: scenes.length - 1, selectedLayerId: null };
  }),

  duplicateScene: (index) => set((s) => {
    const src = s.project.scenes[index];
    if (!src) return s;
    const dup = { ...JSON.parse(JSON.stringify(src)), id: uuid() };
    dup.layers = dup.layers.map(l => ({ ...l, id: uuid() }));
    const scenes = [...s.project.scenes];
    scenes.splice(index + 1, 0, dup);
    return { project: { ...s.project, scenes }, selectedSceneIndex: index + 1 };
  }),

  removeScene: (index) => set((s) => {
    if (s.project.scenes.length <= 1) return s;
    const scenes = s.project.scenes.filter((_, i) => i !== index);
    const sel = Math.min(s.selectedSceneIndex, scenes.length - 1);
    return { project: { ...s.project, scenes }, selectedSceneIndex: sel, selectedLayerId: null };
  }),

  moveScene: (from, to) => set((s) => {
    const scenes = [...s.project.scenes];
    const [moved] = scenes.splice(from, 1);
    scenes.splice(to, 0, moved);
    return { project: { ...s.project, scenes }, selectedSceneIndex: to };
  }),

  updateScene: (index, updates) => set((s) => {
    const scenes = s.project.scenes.map((sc, i) => i === index ? { ...sc, ...updates } : sc);
    return { project: { ...s.project, scenes } };
  }),

  selectScene: (index) => set({ selectedSceneIndex: index, selectedLayerId: null }),

  // ===== Layer Actions =====
  addTextLayer: (content) => set((s) => {
    const idx = s.selectedSceneIndex;
    const layer = DEFAULT_TEXT_LAYER(content);
    const scenes = s.project.scenes.map((sc, i) => {
      if (i !== idx) return sc;
      return { ...sc, layers: [...sc.layers, layer] };
    });
    return { project: { ...s.project, scenes }, selectedLayerId: layer.id };
  }),

  addShapeLayer: () => set((s) => {
    const idx = s.selectedSceneIndex;
    const layer = DEFAULT_SHAPE_LAYER();
    const scenes = s.project.scenes.map((sc, i) => {
      if (i !== idx) return sc;
      return { ...sc, layers: [...sc.layers, layer] };
    });
    return { project: { ...s.project, scenes }, selectedLayerId: layer.id };
  }),

  addImageLayer: (src, img) => set((s) => {
    const idx = s.selectedSceneIndex;
    const layer = DEFAULT_IMAGE_LAYER(src);
    layer.image = img;
    const scenes = s.project.scenes.map((sc, i) => {
      if (i !== idx) return sc;
      return { ...sc, layers: [...sc.layers, layer] };
    });
    const cache = { ...s.imageCache, [src]: img };
    return { project: { ...s.project, scenes }, selectedLayerId: layer.id, imageCache: cache };
  }),

  updateLayer: (layerId, updates) => set((s) => {
    const scenes = s.project.scenes.map((sc, si) => {
      if (si !== s.selectedSceneIndex) return sc;
      return {
        ...sc,
        layers: sc.layers.map(l => l.id === layerId ? { ...l, ...updates } : l),
      };
    });
    return { project: { ...s.project, scenes } };
  }),

  removeLayer: (layerId) => set((s) => {
    const scenes = s.project.scenes.map((sc, si) => {
      if (si !== s.selectedSceneIndex) return sc;
      return { ...sc, layers: sc.layers.filter(l => l.id !== layerId) };
    });
    return { project: { ...s.project, scenes }, selectedLayerId: null };
  }),

  moveLayer: (layerId, direction) => set((s) => {
    const sc = s.project.scenes[s.selectedSceneIndex];
    if (!sc) return s;
    const layers = [...sc.layers];
    const idx = layers.findIndex(l => l.id === layerId);
    if (idx < 0) return s;
    const newIdx = idx + direction;
    if (newIdx < 0 || newIdx >= layers.length) return s;
    [layers[idx], layers[newIdx]] = [layers[newIdx], layers[idx]];
    const scenes = s.project.scenes.map((ss, si) => si === s.selectedSceneIndex ? { ...ss, layers } : ss);
    return { project: { ...s.project, scenes } };
  }),

  selectLayer: (layerId) => set({ selectedLayerId: layerId }),

  // ===== Playback =====
  setPlaying: (v) => set({ isPlaying: v }),
  setPlaybackTime: (t) => set({ playbackTime: t }),
  setPlaybackSceneIndex: (i) => set({ playbackSceneIndex: i }),

  // ===== Project =====
  setProjectName: (name) => set((s) => ({ project: { ...s.project, name } })),
  setShowExport: (v) => set({ showExport: v }),
  setExportProgress: (v) => set({ exportProgress: v }),

  loadProject: (project) => set({ project, selectedSceneIndex: 0, selectedLayerId: null }),

  loadTemplate: (scenes) => set((s) => ({
    project: { ...s.project, scenes: scenes.map(sc => ({ ...sc, id: uuid(), layers: sc.layers.map(l => ({ ...l, id: uuid() })) })) },
    selectedSceneIndex: 0,
    selectedLayerId: null,
  })),

  addImageToCache: (src, img) => set((s) => ({ imageCache: { ...s.imageCache, [src]: img } })),

  // ===== Getters =====
  getCurrentScene: () => {
    const s = get();
    return s.project.scenes[s.selectedSceneIndex] || null;
  },
  getSelectedLayer: () => {
    const s = get();
    const scene = s.project.scenes[s.selectedSceneIndex];
    if (!scene || !s.selectedLayerId) return null;
    return scene.layers.find(l => l.id === s.selectedLayerId) || null;
  },
  getTotalDuration: () => {
    return get().project.scenes.reduce((sum, sc) => sum + sc.duration, 0);
  },
}));
