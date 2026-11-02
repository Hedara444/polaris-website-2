import { describe, it, expect } from "vitest";
import { retrieveKnowledge } from "./retriever";

describe("POLARISS RAG Retriever", () => {
  it("retrieves pricing chunks for price-related queries", () => {
    const results = retrieveKnowledge("初期費用と月額料金はいくらですか？", 3);
    expect(results.length).toBeGreaterThan(0);
    const hasPriceChunk = results.some((r) => r.chunk.id === "POL-WEB-20261015-03");
    expect(hasPriceChunk).toBe(true);
  });

  it("retrieves installation chunks for mounting queries", () => {
    const results = retrieveKnowledge("バイクへの取り付け・配線方法は？", 3);
    expect(results.length).toBeGreaterThan(0);
    const hasInstallChunk = results.some((r) => r.chunk.id === "POL-WEB-20261015-05");
    expect(hasInstallChunk).toBe(true);
  });

  it("retrieves LINE and app information for LINE queries", () => {
    const results = retrieveKnowledge("専用アプリは必要ですか？LINEで使えますか？", 3);
    expect(results.length).toBeGreaterThan(0);
    const hasLineChunk = results.some(
      (r) => r.chunk.id === "POL-INT-20261015-02" || r.chunk.id === "POL-WEB-20261015-08"
    );
    expect(hasLineChunk).toBe(true);
  });

  it("retrieves cancellation terms for contract queries", () => {
    const results = retrieveKnowledge("解約時に違約金や契約期間の縛りはありますか？", 3);
    expect(results.length).toBeGreaterThan(0);
    const hasCancelChunk = results.some((r) => r.chunk.id === "POL-WEB-20261015-04");
    expect(hasCancelChunk).toBe(true);
  });

  it("retrieves battery specs for battery duration queries", () => {
    const results = retrieveKnowledge("内蔵バッテリーは何週間くらい持ちますか？", 3);
    expect(results.length).toBeGreaterThan(0);
    const hasBatteryChunk = results.some((r) => r.chunk.id === "POL-WEB-20261015-06");
    expect(hasBatteryChunk).toBe(true);
  });

  it("retrieves Bluetooth/AirTag comparison when asked about differences", () => {
    const results = retrieveKnowledge("AirTagやBluetoothタグとの違いは何ですか？", 3);
    expect(results.length).toBeGreaterThan(0);
    const hasTagDiff = results.some(
      (r) => r.chunk.id === "POL-INT-20261015-04" || r.chunk.id === "POL-WEB-20261015-14"
    );
    expect(hasTagDiff).toBe(true);
  });

  it("returns fallback chunks gracefully for empty or unknown query", () => {
    const results = retrieveKnowledge("xyzabc1234567890", 2);
    expect(results.length).toBeGreaterThan(0);
  });
});
