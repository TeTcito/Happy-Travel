/**
 * Utilidad de compresión y conversión de imágenes a WebP en el navegador,
 * y procesamiento de archivos multimedia para el Panel Administrativo de Happy Travel.
 */

export interface CompressionResult {
  file: File;
  previewUrl: string;
  base64DataUrl: string;
  originalSize: number;
  compressedSize: number;
  savingsPercentage: number;
  dimensions: { width: number; height: number };
}

export async function compressAndConvertToWebP(
  file: File,
  maxWidth = 1600,
  maxHeight = 1600,
  quality = 0.85
): Promise<CompressionResult> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;

      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxHeight) {
          if (width / height > maxWidth / maxHeight) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('No se pudo inicializar el contexto 2D de renderizado.'));
          return;
        }

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Error al procesar y comprimir la imagen a WebP.'));
              return;
            }

            const cleanFileName = file.name
              .replace(/\.[^/.]+$/, '')
              .toLowerCase()
              .replace(/[^a-z0-9_-]/g, '-');

            const webpFile = new File([blob], `${cleanFileName}.webp`, {
              type: 'image/webp',
              lastModified: Date.now(),
            });

            const originalSize = file.size;
            const compressedSize = webpFile.size;
            const savingsPercentage = Math.max(
              0,
              Math.round(((originalSize - compressedSize) / originalSize) * 100)
            );

            const previewUrl = URL.createObjectURL(blob);
            const base64DataUrl = canvas.toDataURL('image/webp', quality);

            resolve({
              file: webpFile,
              previewUrl,
              base64DataUrl,
              originalSize,
              compressedSize,
              savingsPercentage,
              dimensions: { width, height },
            });
          },
          'image/webp',
          quality
        );
      };

      img.onerror = () => {
        reject(new Error('Error al cargar la imagen seleccionada para compresión.'));
      };
    };

    reader.onerror = () => {
      reject(new Error('Error al leer el archivo en memoria.'));
    };
  });
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}
