# ホバーアニメーション ガイドライン

## 基本方針

- 全インタラクティブ要素に統一したホバーフィードバックを適用する
- アニメーションは控えめ・上品に。研究機関らしい落ち着きを保つ
- `transition-all duration-200 ease-in-out` を基本とする

---

## ナビゲーションリンク

| 状態 | スタイル |
|------|---------|
| デフォルト | `text-neutral-600` |
| ホバー | `text-brand-600` + 下線アニメーション |
| アクティブ（現在のページ） | `text-brand-600 font-semibold` + 下線表示 |

下線アニメーション:
- `after` 疑似要素で幅0→100%のアンダーラインを `transition` で展開
- 色: `bg-brand-600`
- 高さ: `2px`
- 位置: テキスト下部

```
.nav-link {
  @apply relative text-sm font-medium text-neutral-600 transition-colors duration-200;
}
.nav-link::after {
  @apply absolute bottom-0 left-0 h-0.5 w-0 bg-brand-600 transition-all duration-200;
  content: '';
}
.nav-link:hover {
  @apply text-brand-600;
}
.nav-link:hover::after {
  @apply w-full;
}
.nav-link.active {
  @apply text-brand-600 font-semibold;
}
.nav-link.active::after {
  @apply w-full;
}
```

---

## ボタン

| 状態 | アニメーション |
|------|-------------|
| ホバー | `scale(1.02)` + 背景色変化 + `shadow-md` |
| アクティブ（押下） | `scale(0.98)` |
| フォーカス | `ring-2 ring-brand-500 ring-offset-2` |

```
transition-all duration-200 ease-in-out
hover:scale-[1.02] hover:shadow-md
active:scale-[0.98]
```

---

## カード

| 状態 | アニメーション |
|------|-------------|
| ホバー | `shadow-md → shadow-xl` + `translateY(-2px)` + 画像 `scale(1.05)` |

```
transition-all duration-300 ease-in-out
hover:shadow-xl hover:-translate-y-0.5
```

画像:
```
transition-transform duration-300
group-hover:scale-105
```

---

## 共通ルール

1. **duration**: リンク・ボタンは `200ms`、カードは `300ms`
2. **easing**: `ease-in-out` を標準とする
3. **transform**: `will-change-transform` は必要な場合のみ
4. **アクセシビリティ**: `prefers-reduced-motion` で無効化対応

```css
@media (prefers-reduced-motion: reduce) {
  * {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
  }
}
```
