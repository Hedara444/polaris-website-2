import Link from "next/link";
import { Fragment } from "react";

import { defaultKeywords } from "@/lib/site-config";
import { buildMetadata } from "@/lib/seo";

import { TABLE_ROWS } from "./compare-data";
import { MobileCompare, RevealObserver, ScenarioInteractive } from "./CompareInteractive";
import "./compare.css";

export const metadata = buildMetadata({
  title: "POLARISS | 比較する",
  description: "GPSならどれでも同じ？ 目的が違えば得意なことも違います。POLARISSと見守りGPS、紛失防止タグ、警備会社GPSを目的・仕組み・通知で比較。",
  path: "/compare",
  keywords: defaultKeywords.compare,
});

export default function ComparePage() {
  return (
    <>
      <RevealObserver />
      {/* 01 HERO */}
      <section className="chero">
        <div className="wrap">
          <div className="crumb">
            <Link href="/">ホーム</Link>／<span>比較する</span>
          </div>
        </div>
        <div className="chero-in wrap">
          <p className="kicker">COMPARE</p>
          <h1>
            GPSなら、
            <br />
            どれでも同じ？
          </h1>
          <p className="sub">似て見えても、目的も仕組みも違います。どれが優れているかではなく、何のために使うかで選べるように整理しました。</p>
        </div>
      </section>

      <nav className="catrow">
        <div className="catrow-in wrap">
          <div className="me">
            <span className="k">VEHICLE</span>
            <b>POLARISS</b>
            <small>クルマ・バイクの異変検知と位置確認</small>
          </div>
          <div>
            <span className="k">PEOPLE</span>
            <b>見守りGPS</b>
            <small>子ども・シニアの見守り</small>
          </div>
          <div>
            <span className="k">BELONGINGS</span>
            <b>紛失防止タグ</b>
            <small>身の回りの持ち物さがし</small>
          </div>
          <div>
            <span className="k">SERVICE</span>
            <b>警備会社のGPS</b>
            <small>位置情報＋通報・かけつけ</small>
          </div>
        </div>
      </nav>

      {/* 02 FIRST QUESTION */}
      <section className="sec q1" id="q1">
        <div className="wrap">
          <p className="kicker rv in">FIRST QUESTION</p>
          <h2 className="rv in">
            大切なのは、
            <br />
            「何のために使うか」。
          </h2>
          <p className="rv in">想定している対象も、位置を取る仕組みも、知らせ方も違います。目的を決めれば、選ぶものは自然に絞られます。</p>
        </div>
      </section>

      {/* 03 PURPOSE MAP */}
      <section className="sec pmapsec" id="pmap">
        <div className="wrap">
          <div className="sec-hd rv in">
            <p className="kicker">PURPOSE MAP</p>
            <h2 className="h2" style={{ marginTop: 16 }}>
              まず、目的が違う。
            </h2>
            <p className="lead">四つのカテゴリは、守ろうとしている対象がそもそも違います。</p>
          </div>
          <div className="pmap rv in">
            <div className="pzone">
              <span className="k">PEOPLE</span>
              <b>人を見守る</b>
              <p>カバンに入れて持ち歩き、人の移動を日常的に見守る領域。</p>
              <span className="who">見守りGPS</span>
            </div>
            <div className="pzone">
              <span className="k">BELONGINGS</span>
              <b>持ち物を探す</b>
              <p>財布や鍵など、身の回りの物を近くでさがす領域。</p>
              <span className="who">紛失防止タグ</span>
            </div>
            <div className="pzone">
              <span className="k">SECURITY SERVICE</span>
              <b>警備のサービスを利用する</b>
              <p>通報やかけつけまで、対応を含むサービスとして利用する領域。</p>
              <span className="who">警備会社のGPS</span>
            </div>
            <div className="pzone me">
              <span className="k">VEHICLE / AFTER-THEFT</span>
              <b>クルマ・バイクの異変に気づき、その後の位置を確認する</b>
              <p>停めていた車両が動かされたことを知り、いまどこにあるかを確かめる領域。</p>
              <span className="who">POLARISS</span>
            </div>
          </div>
          <p className="pmap-note">目的が重なる部分はありますが、得意なことは同じではありません。</p>
        </div>
      </section>

      {/* 04 COMPARISON TABLE */}
      <section className="sec tbl" id="table">
        <div className="wrap">
          <div className="sec-hd rv in">
            <p className="kicker">COMPARISON</p>
            <h2 className="h2" style={{ marginTop: 16 }}>
              機能と仕組みで見ると。
            </h2>
            <p className="lead">実際の作りを並べます。断定できない項目は、そのように記載しています。</p>
          </div>

          <p className="thint">← 横にスクロールできます →</p>
          <div className="tscroll rv in">
            <div className="ctable">
              <div className="ch" />
              <div className="ch cp top">
                <span className="k">VEHICLE</span>
                <b>POLARISS</b>
              </div>
              <div className="ch">
                <span className="k">PEOPLE</span>
                <b>見守りGPS</b>
              </div>
              <div className="ch">
                <span className="k">BELONGINGS</span>
                <b>紛失防止タグ</b>
              </div>
              <div className="ch">
                <span className="k">SERVICE</span>
                <b>警備会社のGPS</b>
              </div>

              {TABLE_ROWS.map((row) => (
                <Fragment key={row.axis}>
                  <div className="cl">{row.axis}</div>
                  <div className={`cv cp${row.isLast ? " bot" : ""}${row.dims[0] ? " dim" : ""}`}>{row.vals[0]}</div>
                  <div className={`cv${row.dims[1] ? " dim" : ""}`}>{row.vals[1]}</div>
                  <div className={`cv${row.dims[2] ? " dim" : ""}`}>{row.vals[2]}</div>
                  <div className={`cv${row.dims[3] ? " dim" : ""}`}>{row.vals[3]}</div>
                </Fragment>
              ))}
            </div>
          </div>

          <MobileCompare />

          <p className="tnote">※参照：見守りGPS＝ソフトバンク「みまもりGPS」／警備会社のGPS＝セコム「ココセコム」／紛失防止タグ＝一般的な製品の傾向。各社の公開情報をもとに整理しています。同じカテゴリでも仕様は異なります。</p>
        </div>
      </section>

      {/* 05 SCENARIO */}
      <section className="sec scn" id="scenario">
        <div className="wrap">
          <div className="sec-hd rv in">
            <p className="kicker">SCENARIO</p>
            <h2 className="h2" style={{ marginTop: 16 }}>
              目的から選ぶなら。
            </h2>
            <p className="lead">守りたいものを選ぶと、向いているカテゴリが変わります。</p>
          </div>

          <ScenarioInteractive />
        </div>
      </section>

      {/* 06 WHY POLARISS */}
      <section className="sec why" id="why">
        <div className="wrap">
          <div className="sec-hd rv in">
            <p className="kicker">WHY POLARISS</p>
            <h2>
              POLARISSは、クルマ・バイクの
              <br />
              「もしも」のために。
            </h2>
            <p className="lead">やっていることは、五つの区切りだけです。</p>
          </div>
          <div className="seq rv in">
            <div className="snode">
              <span className="k">01 VEHICLE</span>
              <b>車両に取り付ける</b>
              <small>クルマ・バイクを前提とした設計。</small>
            </div>
            <div className="snode">
              <span className="k">02 DETECT</span>
              <b>動きを検知する</b>
              <small>停めた車両の移動をとらえます。</small>
            </div>
            <div className="snode">
              <span className="k">03 LINE</span>
              <b>LINEへ知らせる</b>
              <small>新しいアプリは使いません。</small>
            </div>
            <div className="snode">
              <span className="k">04 LOCATION</span>
              <b>位置を確認する</b>
              <small>地図で現在地と移動をたどれます。</small>
            </div>
            <div className="snode">
              <span className="k">05 TOGETHER</span>
              <b>相互監視につなげる</b>
              <small>必要なときだけ、任意で。</small>
            </div>
          </div>
          <p className="why-note">通信はLTE Cat.M1。電源は内蔵バッテリーと車両給電に対応。相互監視の受付・開始はON / OFFを選択できます。</p>
        </div>
      </section>

      {/* 09 NEXT ACTION */}
      <section className="next" id="next">
        <div className="wrap">
          <p className="kicker rv in">NEXT</p>
          <h2 className="rv in">
            比べたあとに、
            <br />
            知りたくなること。
          </h2>
          <div className="nlist rv in">
            <Link href="/howto">
              <span className="no">01</span>
              <span>
                <b>実際どう使うのかを見る</b>
                <small>購入から設置、通知が届くまでの流れ。</small>
              </span>
              <span className="go">使い方 →</span>
            </Link>
            <Link href="/price">
              <span className="no">02</span>
              <span>
                <b>費用を確認する</b>
                <small>初回費用と月額の内訳。</small>
              </span>
              <span className="go">料金 →</span>
            </Link>
            <Link href="/about">
              <span className="no">03</span>
              <span>
                <b>設計の理由を知る</b>
                <small>なぜこの形になったのか。</small>
              </span>
              <span className="go">POLARISSとは →</span>
            </Link>
          </div>
          <div className="next-btns rv in">
            <Link href="/order" className="btn btn-fill">
              購入
            </Link>
            <span className="next-fine">初回 19,800円（税込・送料無料）／ 月額 2,178円（税込）</span>
          </div>
        </div>
      </section>
    </>
  );
}
