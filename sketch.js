let seaweeds = []; // 儲存水草屬性的陣列
let numLines = 40; // 水草的數量
let colors = []; // 調色盤
let segments = 10; // 每條水草的節點數量

function setup() {
  // 創建畫布，並將其設置為透明
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.style('position', 'absolute');
  canvas.style('top', '0');
  canvas.style('left', '0');
  canvas.style('z-index', '1'); // 設置畫布在 iframe 上層
  canvas.style('pointer-events', 'none'); // 禁用畫布的鼠標事件，讓 iframe 可交互
  clear(); // 確保畫布透明

  // 定義調色盤
  colors = [
    color(19, 42, 19, 150), // 加入透明度 (150)
    color(49, 87, 44, 150),
    color(79, 119, 45, 150),
    color(144, 169, 85, 150),
    color(236, 243, 158, 150),
  ];

  // 初始化每條水草的屬性
  initializeSeaweeds();

  // 在視窗中間產生一個 iframe
  let iframe = createElement('iframe');
  iframe.attribute('src', 'https://www.et.tku.edu.tw/'); // 替換為目標網址
  iframe.attribute('width', '100%');
  iframe.attribute('height', '100%');
  iframe.style('position', 'absolute');
  iframe.style('top', '0');
  iframe.style('left', '0');
  iframe.style('z-index', '0'); // 設置 iframe 在畫布下層
  iframe.style('border', 'none');
}

function draw() {
  clear(); // 清除畫布，保證透明效果
  background(220, 220, 220, 80); // 設置背景顏色，透明度為 80%

  blendMode(BLEND); // 設定混合模式為 BLEND，允許顏色重疊
  let spacing = width / numLines; // 每條水草的間距

  for (let i = 0; i < numLines; i++) {
    let baseX = i * spacing + spacing / 2; // 每條水草的基準 X 座標
    let baseY = height; // 水草的基準 Y 座標 (畫布底部)
    let segmentHeight = seaweeds[i].height / segments; // 每段的高度

    strokeWeight(seaweeds[i].weight); // 設定水草的粗細 (隨機 10 到 35)
    stroke(seaweeds[i].color); // 設定水草的顏色
    noFill(); // 確保水草內部沒有填充

    beginShape(); // 開始繪製水草的形狀
    vertex(baseX, baseY); // 水草的底部固定

    // 繪製水草的每個節點
    for (let j = 0; j < segments; j++) {
      let sway = sin(frameCount * seaweeds[i].frequency + j * 0.5) * (30 - j * 2); // 節點的搖擺幅度逐漸減小
      let currentX = baseX + sway; // 當前節點的 X 座標
      let currentY = baseY - segmentHeight * (j + 1); // 當前節點的 Y 座標

      vertex(currentX, currentY); // 添加節點到形狀中
    }

    endShape(); // 結束繪製水草的形狀
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // 更新畫布大小
  initializeSeaweeds(); // 重新初始化水草屬性
}

function initializeSeaweeds() {
  seaweeds = []; // 清空水草陣列
  for (let i = 0; i < numLines; i++) {
    seaweeds.push({
      height: random(100, 350), // 水草的高度 (隨機 100 到 350)
      color: random(colors), // 從調色盤中隨機選擇顏色
      weight: random(10, 35), // 水草的粗細 (隨機 10 到 35)
      frequency: random(0.02, 0.08), // 水草的搖晃頻率
    });
  }
}
