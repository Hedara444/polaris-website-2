"use client";

import Link from "next/link";
import { type FormEvent, useRef, useState } from "react";

type FieldKey = "inquiryType" | "name" | "email" | "tel" | "message" | "privacyConsent";

interface FormState {
  inquiryType: string;
  name: string;
  email: string;
  tel: string;
  message: string;
  privacyConsent: boolean;
}

interface FormErrors {
  inquiryType?: string;
  name?: string;
  email?: string;
  message?: string;
  privacyConsent?: string;
}

interface StatusState {
  type: "success" | "error";
  kicker: string;
  title: string;
  copy: string;
}

function emailIsValid(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function ContactClient() {
  const [fields, setFields] = useState<FormState>({
    inquiryType: "",
    name: "",
    email: "",
    tel: "",
    message: "",
    privacyConsent: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<StatusState | null>(null);

  const statusRef = useRef<HTMLDivElement>(null);
  const inquiryTypeRef = useRef<HTMLSelectElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const telRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const privacyConsentRef = useRef<HTMLInputElement>(null);

  const focusField = (key: FieldKey) => {
    switch (key) {
      case "inquiryType":
        inquiryTypeRef.current?.focus();
        break;
      case "name":
        nameRef.current?.focus();
        break;
      case "email":
        emailRef.current?.focus();
        break;
      case "tel":
        telRef.current?.focus();
        break;
      case "message":
        messageRef.current?.focus();
        break;
      case "privacyConsent":
        privacyConsentRef.current?.focus();
        break;
    }
  };

  const validateField = (key: FieldKey, updatedFields = fields): boolean => {
    let errorMessage: string | undefined;

    if (key === "inquiryType" && !updatedFields.inquiryType) {
      errorMessage = "お問い合わせ種別を選択してください。";
    } else if (key === "name" && !updatedFields.name.trim()) {
      errorMessage = "お名前を入力してください。";
    } else if (key === "email") {
      const emailVal = updatedFields.email.trim();
      if (!emailVal) {
        errorMessage = "メールアドレスを入力してください。";
      } else if (!emailIsValid(emailVal)) {
        errorMessage = "メールアドレスを確認してください。";
      }
    } else if (key === "message" && !updatedFields.message.trim()) {
      errorMessage = "お問い合わせ内容を入力してください。";
    } else if (key === "privacyConsent" && !updatedFields.privacyConsent) {
      errorMessage = "個人情報保護方針への同意が必要です。";
    }

    setErrors((prev) => ({
      ...prev,
      [key]: errorMessage,
    }));

    return !errorMessage;
  };

  const handleChange = (
    key: FieldKey,
    value: string | boolean
  ) => {
    const updated = { ...fields, [key]: value };
    setFields(updated);
    if (errors[key as keyof FormErrors]) {
      validateField(key, updated);
    }
  };

  const handleBlur = (key: FieldKey) => {
    if (key !== "privacyConsent" && key !== "tel") {
      validateField(key);
    }
  };

  const validateForm = (): boolean => {
    const keysToValidate: FieldKey[] = [
      "inquiryType",
      "name",
      "email",
      "message",
      "privacyConsent",
    ];

    let valid = true;
    let firstInvalidKey: FieldKey | null = null;
    const newErrors: FormErrors = {};

    keysToValidate.forEach((key) => {
      let msg: string | undefined;
      if (key === "inquiryType" && !fields.inquiryType) {
        msg = "お問い合わせ種別を選択してください。";
      } else if (key === "name" && !fields.name.trim()) {
        msg = "お名前を入力してください。";
      } else if (key === "email") {
        const val = fields.email.trim();
        if (!val) msg = "メールアドレスを入力してください。";
        else if (!emailIsValid(val)) msg = "メールアドレスを確認してください。";
      } else if (key === "message" && !fields.message.trim()) {
        msg = "お問い合わせ内容を入力してください。";
      } else if (key === "privacyConsent" && !fields.privacyConsent) {
        msg = "個人情報保護方針への同意が必要です。";
      }

      if (msg) {
        valid = false;
        newErrors[key as keyof FormErrors] = msg;
        if (!firstInvalidKey) {
          firstInvalidKey = key;
        }
      }
    });

    setErrors(newErrors);

    if (firstInvalidKey) {
      focusField(firstInvalidKey);
    }

    return valid;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus(null);

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });

      const data = await res.json();
      setIsSubmitting(false);

      if (res.ok && data?.ok) {
        setFields({
          inquiryType: "",
          name: "",
          email: "",
          tel: "",
          message: "",
          privacyConsent: false,
        });
        setErrors({});
        setStatus({
          type: "success",
          kicker: "COMPLETE",
          title: "お問い合わせを受け付けました。",
          copy: "お問い合わせありがとうございます。",
        });
      } else {
        setStatus({
          type: "error",
          kicker: "ERROR",
          title: "送信できませんでした。",
          copy: data?.message || "時間をおいて再度お試しください。",
        });
      }
    } catch {
      setIsSubmitting(false);
      setStatus({
        type: "error",
        kicker: "ERROR",
        title: "送信できませんでした。",
        copy: "現在フォームから送信できません。時間をおいて再度お試しください。",
      });
    }

    setTimeout(() => {
      statusRef.current?.focus();
    }, 50);
  };

  return (
    <main id="top">
      <section className="legal-hero contact-hero">
        <div className="wrap">
          <div className="crumb">
            <Link href="/">ホーム</Link>／<span>お問い合わせ</span>
          </div>
          <p className="kicker">CONTACT</p>
          <h1>POLARISSについてのお問い合わせ</h1>
          <p>
            購入前のご相談、取り付けやご利用方法についてなど、POLARISSに関するお問い合わせを受け付けています。
          </p>
        </div>
      </section>

      <section className="contact-body">
        <div className="wrap">
          <div className="contact-layout">
            <form
              className={`contact-form ${isSubmitting ? "is-submitting" : ""}`}
              id="contact-form"
              noValidate
              onSubmit={handleSubmit}
            >
              {/* Field 01: Inquiry Type */}
              <div
                className={`contact-field ${errors.inquiryType ? "has-error" : ""}`}
                data-field="inquiry-type"
              >
                <div className="field-heading">
                  <span className="field-number">01</span>
                  <label htmlFor="inquiry-type">お問い合わせ種別</label>
                  <span className="field-badge required">必須</span>
                </div>
                <div className="select-wrap">
                  <select
                    id="inquiry-type"
                    name="inquiryType"
                    ref={inquiryTypeRef}
                    value={fields.inquiryType}
                    required
                    aria-describedby="inquiry-type-error"
                    aria-invalid={!!errors.inquiryType}
                    onChange={(e) => handleChange("inquiryType", e.target.value)}
                    onBlur={() => handleBlur("inquiryType")}
                  >
                    <option value="">選択してください</option>
                    <option value="pre-purchase">購入前のご相談</option>
                    <option value="installation">取り付けについて</option>
                    <option value="in-use">ご利用中のお問い合わせ</option>
                    <option value="business">法人・販売店からのご相談</option>
                    <option value="other">その他</option>
                  </select>
                </div>
                <p className="field-error" id="inquiry-type-error" aria-live="polite">
                  {errors.inquiryType}
                </p>
              </div>

              {/* Field 02: Name */}
              <div
                className={`contact-field ${errors.name ? "has-error" : ""}`}
                data-field="name"
              >
                <div className="field-heading">
                  <span className="field-number">02</span>
                  <label htmlFor="contact-name">お名前</label>
                  <span className="field-badge required">必須</span>
                </div>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  ref={nameRef}
                  value={fields.name}
                  autoComplete="name"
                  required
                  aria-describedby="contact-name-error"
                  aria-invalid={!!errors.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  onBlur={() => handleBlur("name")}
                />
                <p className="field-error" id="contact-name-error" aria-live="polite">
                  {errors.name}
                </p>
              </div>

              {/* Field 03: Email */}
              <div
                className={`contact-field ${errors.email ? "has-error" : ""}`}
                data-field="email"
              >
                <div className="field-heading">
                  <span className="field-number">03</span>
                  <label htmlFor="contact-email">メールアドレス</label>
                  <span className="field-badge required">必須</span>
                </div>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  ref={emailRef}
                  value={fields.email}
                  inputMode="email"
                  autoComplete="email"
                  required
                  aria-describedby="contact-email-error"
                  aria-invalid={!!errors.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  onBlur={() => handleBlur("email")}
                />
                <p className="field-error" id="contact-email-error" aria-live="polite">
                  {errors.email}
                </p>
              </div>

              {/* Field 04: Phone Number */}
              <div className="contact-field" data-field="tel">
                <div className="field-heading">
                  <span className="field-number">04</span>
                  <label htmlFor="contact-tel">電話番号</label>
                  <span className="field-badge optional">任意</span>
                </div>
                <input
                  id="contact-tel"
                  name="tel"
                  type="tel"
                  ref={telRef}
                  value={fields.tel}
                  inputMode="tel"
                  autoComplete="tel"
                  onChange={(e) => handleChange("tel", e.target.value)}
                />
              </div>

              {/* Field 05: Message */}
              <div
                className={`contact-field ${errors.message ? "has-error" : ""}`}
                data-field="message"
              >
                <div className="field-heading">
                  <span className="field-number">05</span>
                  <label htmlFor="contact-message">お問い合わせ内容</label>
                  <span className="field-badge required">必須</span>
                </div>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={9}
                  ref={messageRef}
                  value={fields.message}
                  required
                  aria-describedby="contact-message-error"
                  aria-invalid={!!errors.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  onBlur={() => handleBlur("message")}
                />
                <p className="field-error" id="contact-message-error" aria-live="polite">
                  {errors.message}
                </p>
              </div>

              {/* Field 06: Privacy Consent */}
              <fieldset
                className={`contact-field consent-field ${errors.privacyConsent ? "has-error" : ""}`}
                data-field="privacy"
              >
                <legend className="field-heading">
                  <span className="field-number">06</span>
                  <span>個人情報の取り扱い</span>
                  <span className="field-badge required">必須</span>
                </legend>
                <label className="consent-label" htmlFor="privacy-consent">
                  <input
                    id="privacy-consent"
                    name="privacyConsent"
                    type="checkbox"
                    ref={privacyConsentRef}
                    checked={fields.privacyConsent}
                    required
                    aria-describedby="privacy-consent-help privacy-consent-error"
                    aria-invalid={!!errors.privacyConsent}
                    onChange={(e) => handleChange("privacyConsent", e.target.checked)}
                  />
                  <span>
                    <Link href="/privacy">個人情報保護方針</Link>
                    をご確認のうえ、同意して送信してください。
                  </span>
                </label>
                <p className="consent-help" id="privacy-consent-help">
                  チェックを入れると送信できます。
                </p>
                <p className="field-error" id="privacy-consent-error" aria-live="polite">
                  {errors.privacyConsent}
                </p>
              </fieldset>

              {/* Submit Button */}
              <div className="contact-submit">
                <span className="field-number">07</span>
                <button
                  className="btn btn-fill submit-button"
                  id="contact-submit"
                  type="submit"
                  disabled={isSubmitting}
                  aria-busy={isSubmitting}
                >
                  <span className="submit-label">送信する</span>
                  <span className="submit-progress" aria-hidden={!isSubmitting}>
                    送信中
                  </span>
                </button>
              </div>

              {/* Status Box */}
              {status && (
                <div
                  className={`form-status is-${status.type}`}
                  id="form-status"
                  ref={statusRef}
                  role="status"
                  aria-live="polite"
                  tabIndex={-1}
                >
                  <p className="status-kicker">{status.kicker}</p>
                  <h2 className="status-title">{status.title}</h2>
                  <p className="status-copy">{status.copy}</p>
                </div>
              )}
            </form>

            {/* Sidebar */}
            <aside className="contact-aside" aria-labelledby="before-contact-title">
              <p className="aside-label">QUICK LINKS</p>
              <h2 id="before-contact-title">お問い合わせ前に</h2>
              <p>知りたい内容を、すぐに確認できるページをご案内します。</p>
              <nav className="contact-links" aria-label="お問い合わせ前のご案内">
                <Link href="/faq">
                  <span>
                    <b>よくある質問を見る</b>
                    <small>サービスや契約について</small>
                  </span>
                  <i>→</i>
                </Link>
                <Link href="/howto">
                  <span>
                    <b>使い方を見る</b>
                    <small>設定から通知までの流れ</small>
                  </span>
                  <i>→</i>
                </Link>
                <Link href="/price">
                  <span>
                    <b>料金を確認する</b>
                    <small>初回費用と月額料金</small>
                  </span>
                  <i>→</i>
                </Link>
              </nav>
              <div className="in-use-note">
                <b>ご利用中の方</b>
                <p>通知や位置情報など、ご利用中のよくあるご質問はFAQで確認できます。</p>
                <Link href="/faq#g7">ご利用中のFAQを見る →</Link>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
