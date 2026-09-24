/**
 * Cover-crop geometry for the universal 16/9 article billboard.
 * Boxes are fractions (0..1) of the source image so the UI can work at
 * any display scale and only resolve pixels once, on export.
 *
 * A box always satisfies (w * W) / (h * H) = 16/9 in source pixels,
 * where w/h are fractions of the image width/height.
 */

export const COVER_ASPECT = 16 / 9;
export const COVER_EXPORT_WIDTH = 1280;
export const COVER_EXPORT_HEIGHT = 720;
export const COVER_MIN_SCALE = 0.2;

export interface CropBox {
  /** Left edge as a fraction of image width. */
  x: number;
  /** Top edge as a fraction of image height. */
  y: number;
  /** Width as a fraction of image width. */
  w: number;
}

/** Height as a fraction of image height, derived from 16/9. */
export function cropBoxHeight(box: CropBox, naturalW: number, naturalH: number) {
  if (!naturalW || !naturalH) {
    return 0;
  }
  return (box.w * naturalW * 9) / (16 * naturalH);
}

/** Largest centered 16/9 box inside a naturalW x naturalH image. */
export function fitCropBox(naturalW: number, naturalH: number): CropBox {
  if (!naturalW || !naturalH) {
    return { x: 0, y: 0, w: 1 };
  }
  if (naturalW / naturalH >= COVER_ASPECT) {
    // Wide: full height, crop the sides.
    const w = (16 * naturalH) / (9 * naturalW);
    return { x: (1 - w) / 2, y: 0, w };
  }
  // Tall/square: full width, crop top and bottom.
  const h = (9 * naturalW) / (16 * naturalH);
  return { x: 0, y: (1 - h) / 2, w: 1 };
}

/** Keep a box inside 0..1 and at/above the minimum size. */
export function clampCropBox(box: CropBox, naturalW: number, naturalH: number): CropBox {
  const maxW = fitCropBox(naturalW, naturalH).w;
  const w = Math.min(Math.max(box.w, COVER_MIN_SCALE), maxW);
  const h = (w * naturalW * 9) / (16 * (naturalH || 1));
  return {
    w,
    x: Math.min(Math.max(box.x, 0), Math.max(0, 1 - w)),
    y: Math.min(Math.max(box.y, 0), Math.max(0, 1 - h)),
  };
}

export function moveCropBox(
  box: CropBox,
  dx: number,
  dy: number,
  naturalW: number,
  naturalH: number,
): CropBox {
  return clampCropBox({ ...box, x: box.x + dx, y: box.y + dy }, naturalW, naturalH);
}

export function scaleCropBox(
  box: CropBox,
  scale: number,
  naturalW: number,
  naturalH: number,
): CropBox {
  const maxW = fitCropBox(naturalW, naturalH).w;
  const centerX = box.x + box.w / 2;
  const centerY = box.y + cropBoxHeight(box, naturalW, naturalH) / 2;
  const w = maxW * scale;
  const h = (w * naturalW * 9) / (16 * (naturalH || 1));
  return clampCropBox({ w, x: centerX - w / 2, y: centerY - h / 2 }, naturalW, naturalH);
}

/** Source pixel rect for a fractional box. */
export function cropBoxToPixels(
  box: CropBox,
  naturalW: number,
  naturalH: number,
) {
  return {
    sx: Math.round(box.x * naturalW),
    sy: Math.round(box.y * naturalH),
    sw: Math.round(box.w * naturalW),
    sh: Math.round(cropBoxHeight(box, naturalW, naturalH) * naturalH),
  };
}
