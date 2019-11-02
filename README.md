# Quiz Projection Supporter


## ※お知らせ※

技術書典6で頒布した『実践で学ぶ！Electron+Vue.jsでデスクトップアプリ開発』の内容に対応したコードは、
***stable-tbf6ブランチ*** https://github.com/nano-nano/quiz_projection_supporter/tree/stable-tbf6 をご覧下さい。


## これはなに？

Quiz Projection Supporterは、
オフラインで開催される早押しクイズ大会で観客に対して問題文と解答を投影する専用の画面を提供し、
問題フォロー業務を補助するプログラムです。

## 主な機能

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
学生向けクイズ大会「STU XX」実行委員会 https://www.stu-vwx-union.com/ より許可を得て収録したものであり、
改変ならびに再配布はできません。

## 作者

Nano-Nano
[@nano2_aloerina](https://twitter.com/nano2_aloerina)

---

### ビルドコマンド

``` bash
# 依存関係のインストール
$ yarn install

# 開発用モードで起動
$ yarn electron:serve

# リリース用ビルド
$ yarn electron:build

```