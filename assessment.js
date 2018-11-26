(function(){
    "use strict";

    const userNameInput = document.getElementById("user-name");
    const assessmentButton = document.getElementById("assessment");
    const resultDivided = document.getElementById("result-area");
    const tweetDivided = document.getElementById("tweet-area");

    /**
     * 指定した要素の子を全削除する
     * @param {HTMLElement} element HTML の要素
     */
    function removeAllChildren(element) {
        while (element.firstChild) {
            // 子要素があるかぎり削除
            element.removeChild(element.firstChild);
        }
    }

    assessmentButton.onclick = function () {
        const userName = userNameInput.value;
        if (userName.length === 0) {
            // ガード句の前に追加　空欄でボタン押したとき、前回の結果を消す
            removeAllChildren(resultDivided);
            // 名前が空のときは処理を終了する　ガード句
            return;
        }
        console.log(userName);
    /** 上記の「= function()」は、「() =>」と書ける
     *  function の文字を省略して () の後ろに矢印（等号と大なり記号）をつけたもの
     *  このような表記を「アロー関数」という
    */

    userNameInput.onkeydown = (event) => {
        if (event.key === "Enter") {
            // ToDo ボタンの onclick() 処理を呼び出す
            assessmentButton.onclick();
        }
    };

    // 結果表示エリアの作成
    removeAllChildren(resultDivided);
    const header = document.createElement("h3");
    header.innerText = "診断結果";
    resultDivided.appendChild(header);

    const paragraph = document.createElement("p");
    const result = assessment(userName);
    paragraph.innerText = result;
    resultDivided.appendChild(paragraph);

    // ツイートエリアの作成
    removeAllChildren(tweetDivided);
    const anchor = document.createElement("a");
    const hrefValue = "https://twitter.com/intent/tweet?button_hashtag="
        + encodeURIComponent("あなたのいいところ診断")
        + "&ref_src=twsrc%5Etfw";
    anchor.setAttribute("href", hrefValue);
    anchor.className = "twitter-hashtag-button";
    anchor.setAttribute("data-text", result);
    anchor.innerText = "Tweet #あなたのいいところ診断";
    tweetDivided.appendChild(anchor);

    twttr.widgets.load();    
    };


    const answers = [
        "{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。",
        "{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。",
        "{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。",
        "{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。",
        "{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。",
        "{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。",
        "{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。",
        "{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。",
        "{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。",
        "{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。",
        "{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。",
        "{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。",
        "{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。",
        "{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。",
        "{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。",
        "{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。"
    ]

    /** ↓JSDoc に準拠した書き方↓
     * 名前の文字列を渡すと診断結果を返す関数　「関数内部の処理」
     * @param {string} userName ユーザの名前　「受取る入力の定義」」@param引数 {string}文字列
     * @return {string} 診断結果　「出力の定義」　@return返り値戻り値
    */
    function assessment(userName) {
        // 全文字のコード番号を取得、足し合わせる
        let sumOfcharCode = 0;
        for (let i = 0; i < userName.length; i++) {
            sumOfcharCode = sumOfcharCode + userName.charCodeAt(i);
        }

        // 全文字のコード番号合計を、回答の種類数で割った余りを添え字とする
        const index = sumOfcharCode % answers.length;
        let result = answers[index];

        // ToDo {userName} をユーザの名前に置き換える
        // /{}/g　正規表現　{}のエスケープのために\を付ける
        result = result.replace(/\{userName\}/g, userName);
        return result;
    }

    console.log(assessment("太郎"));
    console.log(assessment("次郎"));
    console.log(assessment("次郎"));

    // テスト機能　返るはずの結果、間違ってた場合の表示　を書く。正しければエラー出ない
    console.assert(
        assessment("太郎") === "太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。", "結果が間違っています"
    );
    console.assert(
        assessment("太郎") === "太郎のいいところは決断力です。次郎がする決断にいつも助けられる人がいます。", "結果が間違っています"
    );
    console.assert(
        assessment("太郎") === assessment("太郎")
    );
})();
