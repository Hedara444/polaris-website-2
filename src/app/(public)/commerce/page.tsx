import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import "@/app/(public)/terms/terms.css";

export const metadata = buildMetadata({
  title: "特定商取引法に基づく表記 ｜ POLARISS",
  description: "POLARISS official Storeの販売条件および事業者情報です。",
  path: "/commerce",
});

export default function CommercePage() {
  return (
    <main id="top">
      <section className="legal-hero">
        <div className="wrap">
          <div className="crumb">
            <Link href="/">ホーム</Link>／<span>特定商取引法に基づく表記</span>
          </div>
          <p className="kicker">LEGAL</p>
          <h1>特定商取引法に基づく表記</h1>
          <p>POLARISS official Storeの販売条件および事業者情報です。</p>
        </div>
      </section>
      <section className="legal-body">
        <div className="wrap">
          <article className="legal-copy">
            <dl className="legal-details">
              <div>
                <dt>総代理店</dt>
                <dd></dd>
              </div>
              <div>
                <dt>運営統括責任者名</dt>
                <dd>田中 裕喜也</dd>
              </div>
              <div>
                <dt>住所</dt>
                <dd>
                  郵便番号：231-0801
                  <br />
                  神奈川県横浜市中区新山下1-4-22
                </dd>
              </div>
              <div>
                <dt>商品代金以外の料金の説明</dt>
                <dd>送料は全国一律￥550（税込）にて賜ります。</dd>
              </div>
              <div>
                <dt>申込有効期限</dt>
                <dd>
                  ご注文のキャンセルは、発送から5日経過しても商品をお届けできない場合を除き原則としてお受けしてりません。何卒ご了承下さい。
                </dd>
              </div>
              <div>
                <dt>不良品</dt>
                <dd>
                  <p>
                    お客様都合による商品のキャンセル、返品は原則受け付けておりませんので予めご了承下さい。ただし配送中の破損、商品等の誤郵送等の場合、返品・交換をお受け致します。
                  </p>
                  <p>
                    万一不良品等がございましたら、当店の在庫状況を確認のうえ、新品、または同等品と交換させて頂きます。商品到着後7日以内にメールまたは電話にてご連絡下さい。
                  </p>
                  <p>
                    上記の期間を過ぎますと返品・交換のご要望はお受けできなくなりますので、ご了承ください。
                  </p>
                </dd>
              </div>
              <div>
                <dt>販売数量</dt>
                <dd>各商品カート内に表示致します。</dd>
              </div>
              <div>
                <dt>引渡し時期</dt>
                <dd>お支払確認後5日以内に発送いたします。</dd>
              </div>
              <div>
                <dt>お支払い方法</dt>
                <dd>クレジットカード決済（VISA / MASTER / AMEX / JCB）</dd>
              </div>
              <div>
                <dt>お支払い期限</dt>
                <dd>当方からの確認メール送信後5日以内となります。</dd>
              </div>
              <div>
                <dt>返品期限</dt>
                <dd>商品到着後7日以内とさせていただきます。</dd>
              </div>
              <div>
                <dt>返品送料</dt>
                <dd>
                  <p>お客様都合による商品の返品・交換は一切お受けできません。</p>
                  <p>
                    また以下のような場合も返品・交換はお受けできませんので予めご了承ください。
                  </p>
                  <ul>
                    <li>商品到着後7日以上経過した商品</li>
                    <li>お客様がご使用になった商品</li>
                    <li>お客様が破損・汚損された商品</li>
                    <li>お客様が加工・修理された商品</li>
                    <li>
                      商品の箱やタグ、説明書などの付属品を汚損・破損・紛失された場合
                    </li>
                  </ul>
                  <p>
                    当店で取り扱いの商品はすべてメーカーの品質基準をクリアし、国内の正規代理店の検査基準も満たした商品でございます。製造時にやむをえず発生する細かな傷や掠れ、材質上のへこみや黒点なども良品との理解の上でお取引をしておりますので、それらを理由とする返品・交換もお受けできませんのであらかじめご了承ください。
                  </p>
                  <p>
                    但し、初期不良品、ご注文と違った商品が届いた場合につきましては当社にご連絡の上、送料着払いにてご返送下さい。
                  </p>
                </dd>
              </div>
              <div>
                <dt>サービス名</dt>
                <dd>POLARISS official Store</dd>
              </div>
              <div>
                <dt>電話番号</dt>
                <dd>
                  045-264-8772
                  <br />
                  受付時間11:00～18:00
                  <br />
                  ※電話が繋がりにくい場合がございます。お急ぎの場合は、弊社ホームページのお問い合わせフォームからご連絡をお願い申し上げます。
                </dd>
              </div>
              <div>
                <dt>公開メールアドレス</dt>
                <dd>
                  contact＠owl-ty.com
                  <br />
                  ※迷惑メール防止のため「＠」を全角にしてあります。送信の際は「＠」を半角にしてご利用ください。
                </dd>
              </div>
              <div>
                <dt>ホームページアドレス</dt>
                <dd>https://www.thingsline.co.jp</dd>
              </div>
              <div>
                <dt>配送・送料について</dt>
                <dd>クロネコヤマト</dd>
              </div>
              <div>
                <dt>支払い方法について</dt>
                <dd>
                  <ul>
                    <li>銀行振込</li>
                    <li>クレジットカード</li>
                  </ul>
                </dd>
              </div>
            </dl>
          </article>
        </div>
      </section>
    </main>
  );
}

