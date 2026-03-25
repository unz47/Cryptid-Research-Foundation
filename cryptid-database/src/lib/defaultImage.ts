const defaults = ["/default-1.jpg", "/default-2.jpg"];

export function getDefaultImage(id: string): string {
  // id文字列からハッシュ的に決定（ランダムだがidごとに固定）
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = hash + id.charCodeAt(i);
  return defaults[hash % defaults.length];
}
