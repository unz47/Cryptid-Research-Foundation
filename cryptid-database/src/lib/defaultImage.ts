const defaults = ["/default-1.jpg", "/default-2.jpg"];

export function getDefaultImage(id: string): string {
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = hash + id.charCodeAt(i);
  return defaults[hash % defaults.length];
}

// Get first image from string or array, fallback to default
export function getImage(image: string | string[] | undefined, id: string): string {
  if (!image) return getDefaultImage(id);
  if (Array.isArray(image)) return image[0] || getDefaultImage(id);
  return image || getDefaultImage(id);
}

export function getImages(image: string | string[] | undefined, id: string): string[] {
  if (!image) return [getDefaultImage(id)];
  if (Array.isArray(image)) return image.length > 0 ? image : [getDefaultImage(id)];
  return image ? [image] : [getDefaultImage(id)];
}
