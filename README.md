Quiz Projection Supporter
===

## これはなに？

Quiz Projection Supporterは、
オフラインで開催される早押しクイズ大会で観客に対して問題文と解答を投影する専用の画面を提供し、
問題フォロー業務を補助するプログラムです。


## 機能

本プログラムには次の機能があります。

 - 問題文, 解答, 別解を表示する投影画面と、それを制御するコントロール画面を提供します
 - 投影する問題を指定フォーマットのExcelファイル（パスワード付きも含む）から取り込んで使用できます
 - ボタンでの表示候補送り/戻しや、問題に指定されたIDを利用した表示候補選択ができます
 - 投影画面のフォントサイズ、色は自由に選択することができます


## 使い方

準備中...


## ライセンス

プログラム本体については [MIT License](https://github.com/tcnksm/tool/blob/master/LICENCE) です。

サンプル問題データ（quiz_sample_from_STU.xlsx）については、
学生向けクイズ大会「STU」実行委員会（https://www.stu-vwx-union.com/）より許可を得て収録したものであり、
改変ならびに再配布はできません。

本プログラムには次の成果物が含まれています。各成果物のライセンス等は個々のサイトを参照してください。

**Vue.js**
https://vuejs.org/

**electron-vue**
https://github.com/SimulatedGREG/electron-vue

**Vue Router**
https://router.vuejs.org/

**Honoka**
http://honokak.osaka/

**BootstrapVue**
https://bootstrap-vue.js.org/

**fs-extra**
https://github.com/jprichardson/node-fs-extra

**xlsx-populate**
https://github.com/dtjohnson/xlsx-populate


## 作者

Nano-Nano
[@nano2_aloerina](https://twitter.com/nano2_aloerina)

---

## 開発者向け情報

### ビルドコマンド

``` bash
# 依存関係のインストール
npm install / yarn

# 開発用モードで起動
npm run dev / yarn run dev

# リリース用ビルド（インストーラー）
npm run build / yarn run build

# リリース用ビルド（インストーラー無し）
npm run build:dir / yarn run build:dir
```


