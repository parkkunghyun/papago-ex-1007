"use client";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [text, setText] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('en');
  const [translatedText, setTranslatedText] = useState('');

  const handleTranslate = async () => {
    if (!text || !targetLanguage) {
      console.error('Text or target language is missing');
      return;
    }
    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text, // 번역할 텍스트
          targetLanguage, // 타겟 언어
        }),
      });

      if (response.ok) {
        const { translatedText } = await response.json();
        setTranslatedText(translatedText);
      } else {
        console.error('Translation API error:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error during translation:', error);
    }
  };


  return (
    <div className="h-screen p-4 bg-black">
      <h1 className="w-full my-8 font-extrabold text-center text-transparent text-8xl bg-clip-text bg-gradient-to-r from-blue-600 to-red-600">
  번역 서비스
</h1>

      <div className="flex flex-col items-center justify-center gap-8 md:flex-row">
        <div className="flex flex-col p-4 gap-2 border-[3px] border-yellow-500 rounded-lg md:w-[600px] md:h-[500px] lg:w-[700px] lg:h-[600px] ">

          <select className="py-4 pl-2 text-2xl" value={targetLanguage} onChange={(e) => setTargetLanguage(e.target.value)}>
              <option value="en">영어</option>
              <option value="ko">한국어</option>
              <option value="ja">일본어</option>
              <option value="zh-CN">중국어(간체)</option>
          </select>
          <textarea  className="flex-1 px-4 py-8 text-3xl" value={text} onChange={(e) => setText(e.target.value)} />

          <button className="py-8 text-white bg-green-500 rounded-lg" onClick={handleTranslate}>번역하기</button>
       </div>
        {
          <div className="flex flex-col p-2 gap-2 border-[3px] border-yellow-500 rounded-lg md:w-[600px] md:h-[500px] lg:w-[700px] lg:h-[600px]  ">
            <h2 className="p-4 mb-4 text-4xl font-extrabold text-white border-b border-white">변역 결과</h2>
            <p className="flex-1 pl-2 text-3xl text-white">{translatedText}</p>
          </div>
        }
      </div>
    </div>
  );
}
