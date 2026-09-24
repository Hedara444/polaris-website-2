import { describe, expect, it } from "vitest";

import {
  clampCropBox,
  cropBoxToPixels,
  fitCropBox,
  moveCropBox,
  scaleCropBox,
} from "@/lib/cover-crop";

describe("fitCropBox", () => {
  it("fills the frame on exact 16/9 photos", () => {
    expect(fitCropBox(1600, 900)).toEqual({ x: 0, y: 0, w: 1 });
  });

  it("crops the sides on wider photos", () => {
    const box = fitCropBox(2000, 900);
    expect(box.y).toBe(0);
    expect(box.w).toBeCloseTo((16 * 900) / (9 * 2000), 5);
    expect(box.x).toBeCloseTo((1 - box.w) / 2, 5);
  });

  it("fills width on vertical photos", () => {
    const box = fitCropBox(900, 1600);
    expect(box.w).toBe(1);
    expect(box.y).toBeCloseTo((1 - (9 * 900) / (16 * 1600)) / 2, 5);
  });

  it("keeps a 16/9 ratio in source pixels", () => {
    for (const [w, h] of [[1600, 900], [900, 1600], [800, 600], [500, 500], [2000, 900]]) {
      const box = fitCropBox(w, h);
      const px = cropBoxToPixels(box, w, h);
      expect(px.sw / px.sh).toBeCloseTo(16 / 9, 1);
    }
  });
});

describe("clampCropBox", () => {
  it("keeps the box inside the image", () => {
    expect(clampCropBox({ x: -0.5, y: 2, w: 5 }, 1600, 900)).toEqual({
      x: 0,
      y: 0,
      w: 1,
    });
  });
});

describe("moveCropBox", () => {
  it("moves and clamps at the edges", () => {
    const box = moveCropBox({ x: 0, y: 0, w: 0.5 }, 10, 10, 1600, 900);
    expect(box.x).toBeLessThanOrEqual(0.5);
    expect(box.y).toBeLessThanOrEqual(1 - (0.5 * 1600 * 9) / (16 * 900));
  });
});

describe("scaleCropBox", () => {
  it("scales around the center without leaving the image", () => {
    const box = scaleCropBox({ x: 0, y: 0, w: 1 }, 0.5, 1600, 900);
    expect(box.w).toBeCloseTo(0.5, 5);
    expect(box.x).toBeCloseTo(0.25, 5);
    expect(box.x).toBeGreaterThanOrEqual(0);
    expect(box.y).toBeGreaterThanOrEqual(0);
  });
});

describe("cropBoxToPixels", () => {
  it("resolves the full frame for a fitted exact-ratio photo", () => {
    expect(cropBoxToPixels({ x: 0, y: 0, w: 1 }, 1600, 900)).toEqual({
      sx: 0,
      sy: 0,
      sw: 1600,
      sh: 900,
    });
  });
});
