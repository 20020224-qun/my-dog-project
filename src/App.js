import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
/*
1.引入 React 與 useState Hook，用來管理狀態。
2.引入 Bootstrap 樣式，方便用 className 套用排版與顏色。 
3.引入自訂 CSS，補充或覆蓋 Bootstrap。
*/
function App() {
  // 1. 初始化資料狀態
  const [dogs, setDogs] = useState([
    { 
      id: 1, 
      name: "黃金獵犬", 
      fortune: "你的笑容擁有治癒力量，別吝嗇分享它，今天會有人因為你而感到溫暖。",
      image: { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Golden_Retriever_Buddy_0311.jpg/500px-Golden_Retriever_Buddy_0311.jpg" },
      color: "text-warning"
    },
    { 
      id: 2, 
      name: "威爾斯柯基", 
      fortune: "雖然步子小，但底盤穩。慢慢走沒關係，重點是你一直在前進的路上。",
      image: { url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhZBMVaQr0eh6HV4J_jkNj5Wd7DelB8m5y6rQn1dFrMTOFDpDzPstZGdp08nRnkNNFPaYhOfwWm_M61N-hLE4_Z6yBvHQY2CMjZ137RA&s=10" },
      color: "text-info"
    },
    { 
      id: 3, 
      name: "伯恩山犬", 
      fortune: "成熟穩重是你的本錢。當大家都慌亂時，你的冷靜將成為最強大的力量。",
      image: { url: "https://images.squarespace-cdn.com/content/v1/61ccb17203b2956faba35dce/dacdd013-486b-4095-ba21-34ad4019bd31/Bernese+Mountain+Dogs+Are+cute+as+puppy.jpg" },
      color: "text-primary"
    },
    { 
      id: 4, 
      name: "柴犬", 
      fortune: "倔強一點也無妨。堅持那些你真正看重的事，全世界都會為你讓路。",
      image: { url: "https://img.petpedia.net/upload_by_admin/shibadog_5_800" },
      color: "text-warning"
    },
    { 
      id: 5, 
      name: "芒狗", 
      fortune: "生活不需要每天都甜得發膩，偶爾的一點點酸澀，反而讓回甘更令人心動。",
      image: { url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHe82TWKTxC6g3zfbCtysOOj9tedKqOvaZfA&s" },
      color: "text-danger"
    },
    { 
      id: 6, 
      name: "奇異狗", 
      fortune: "如果覺得怪怪的也沒關係，切開來後的內在美才是你的真本事。",
      image: { url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvMg2g9t8U10lInul7ujRFU6bFMZhzOhulZQ&s" },
      color: "text-success"
    }
  ]);
  
  // 2. 狀態定義
  const [selectedId, setSelectedId] = useState(null); // 紀錄目前選中的卡片 ID
  const [gameStarted, setGameStarted] = useState(false); // 控制遊戲是否開始（標題切換）
  /*
  Selected Id → 紀錄目前選中的卡片 ID，初始為 null。
  GameStarted → 控制遊戲是否開始，初始為 false。
  */

  /**
   * Fisher-Yates 洗牌演算法：確保陣列隨機性的專業寫法
   * 從後往前交換元素，時間複雜度 O(n)
   */
  const shuffle = (array) => {
    let newArr = [...array];
    for (let i = newArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
  };

  // 開始遊戲：洗牌並切換 UI 階段
  const handleStartGame = () => {
    setDogs(shuffle(dogs));
    setGameStarted(true);
  };

  // 點擊卡片：選中特定狗狗
  const handleCardClick = (id) => {
    if (!selectedId) {
      setSelectedId(id);
    }
  };

  // 返回功能：清空選中狀態並「悄悄」再次洗牌，增加下一次抽卡的未知感
  const handleBack = (e) => {
    e.stopPropagation();
    setSelectedId(null);
    // 延遲洗牌是為了配合 CSS 過渡動畫，讓使用者體驗更平滑
    setTimeout(() => {
      setDogs(shuffle(dogs));
    }, 300);
  };

  // 根據選中的 ID 找出對應的狗狗資料物件
  const selectedDog = dogs.find(d => d.id === selectedId);

  return (
    <div className="app-container">
      {/* 動態標題：根據遊戲狀態切換位置與文字 */}
      <h1 
        className={`main-title ${gameStarted ? 'moved' : 'center'}`}
        onClick={handleStartGame}
      >
        {gameStarted ? "狗狗塔羅牌" : "你今日的幸運狗"}
      </h1>

      {gameStarted && (
        <div className={`tarot-container fade-in`}>
          {/* 牌陣區域：當有卡片被選中時，其他卡片會變模糊 */}
          <div className={`tarot-row ${selectedId ? 'has-selected' : ''}`}>
            {dogs.map((dog) => (
              <div 
                key={dog.id} 
                className={`dog-card ${selectedId === dog.id ? 'active selected' : ''}`}
                onClick={() => handleCardClick(dog.id)}
              >
                <div className="dog-card-inner">
                  {/* 卡片背面：包含星芒裝飾與腳印圖案 */}
                  <div className="dog-card-back" />
                  {/* 卡片正面：顯示狗狗圖片 */}
                  <div className="dog-card-front">
                    <img src={dog.image?.url} alt={dog.name} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 幸運語錄詳情區 */}
          {selectedDog && (
            <div className="detail-section text-white text-center">
              <h2 className={`display-5 fw-bold ${selectedDog.color}`}>{selectedDog.name}</h2>
              <hr className="bg-white" />
              <div className="info-box py-3">
                <h4 className="lh-base">「 {selectedDog.fortune} 」</h4>
              </div>
              <button className="btn btn-outline-warning btn-lg mt-4 w-100" onClick={handleBack}>
                ← 返回重新抽籤
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
