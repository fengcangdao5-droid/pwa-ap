// 【重要】リールの絵柄の並び順（リール配列）を固定
// この順番の通りに、上から下へ（インデックス順に）流れるようになります
const reelSequence = ['7️⃣', '🍒', '🍏', '🔔', '🍇', '🍒', '🔔', '7️⃣', '🍇', '🍏'];

// HTML要素の取得
const reels = [
    document.getElementById('reel1'),
    document.getElementById('reel2'),
    document.getElementById('reel3')
];

const stopButtons = [
    document.getElementById('stop1'),
    document.getElementById('stop2'),
    document.getElementById('stop3')
];

const spinBtn = document.getElementById('spin-btn');
const message = document.getElementById('message');

// 各リールのタイマーIDを管理する配列
let timers = [null, null, null];
// 各リールが現在「何番目の絵柄」を表示しているかを記録する配列
let currentIndices = [0, 0, 0];
// 現在止まっているリールの数
let stoppedCount = 0;

// SPINボタンを押したときの処理
spinBtn.addEventListener('click', () => {
    spinBtn.disabled = true;
    message.textContent = 'ストップボタンを押してね！';
    message.style.color = 'white';
    stoppedCount = 0;

    // 3つのリールすべてを回転させる
    reels.forEach((reel, index) => {
        if (timers[index]) clearInterval(timers[index]);

        // 開始時の位置を少しバラつかせる（毎回同じ位置からスタートしないようにランダムにする）
        currentIndices[index] = Math.floor(Math.random() * reelSequence.length);

        // 0.08秒（80ミリ秒）ごとに絵柄を規則正しく進める（少しスピードを上げました）
        timers[index] = setInterval(() => {
            // インデックスを1つ進める
            currentIndices[index]++;
            
            // 配列の最後までいったら、0（最初）に戻す（ループ処理）
            if (currentIndices[index] >= reelSequence.length) {
                currentIndices[index] = 0;
            }

            // 決まった順番の絵柄を表示
            reel.textContent = reelSequence[currentIndices[index]];
        }, 80);

        // 対応するSTOPボタンを有効化
        stopButtons[index].disabled = false;
    });
});

// 各STOPボタンにクリックイベントを設定
stopButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        // そのリールの回転を止める
        clearInterval(timers[index]);
        button.disabled = true;
        
        stoppedCount++;

        // 3つすべて止まったら判定へ
        if (stoppedCount === 3) {
            checkResult();
        }
    });
});

// 揃ったかどうかの判定関数
function checkResult() {
    const r1 = reels[0].textContent;
    const r2 = reels[1].textContent;
    const r3 = reels[2].textContent;

    if (r1 === r2 && r2 === r3) {
        if (r1 === '7️⃣') {
            message.textContent = '🎉 大当り！！ おめでとう！ 🎉';
            message.style.color = '#f1c40f';
        } else {
            message.textContent = '✨ 当たり！ ✨';
            message.style.color = '#2ecc71';
        }
    } else {
        message.textContent = '残念！もう一回！';
        message.style.color = '#e74c3c';
    }

    // 再びSPINボタンを押せるようにする
    spinBtn.disabled = false;
}