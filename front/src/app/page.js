'use client';

import { useState, useRef, useEffect } from 'react';
import ChatWidget from '@/widgets/chat-widget/chat-widget';
import Logo from "@/shared/ui/icons/logo";

export default function Home() {
  return (
    <>
      <div className="flex gap-5 md:gap-[70px] fade-in-simultaneous">
        <Logo className="mt-5 w-[70px] p-[10px_0px_15px_10px] sm:w-[80px] sm:mt-[19px] md:w-[160px] md:p-[0px_0px_15px_50px]" />
        <h1 className="mt-5 font-[var(--font-jersey)] text-white text-[38px] sm:text-[50px] md:text-[90px] 2xl:text-[110px] leading-[110px] AvatarMast">
          AvatarMaster
        </h1>
      </div>
      <main className="relative z-10 pt-[150px] text-center fade-in-simultaneous">
        <hr className="h-[35px] bg-[#F6F3FF] -mt-[108px] border-0"></hr>
        <p className="pt-10 pb-20 font-['Russo One'] font-normal text-white tracking-[0.06em] text-[20px] sm:text-[24px] lg:text-[32px] 2xl:text-[48px]">Добро пожаловать на AvatarMaster — вашего пушистого собеседника, реагирующего на ваши слова эмоциями!</p>
        <div className="font-['Russo One'] text-white leading-normal tracking-[0.06em] text-[16px] lg:text-[22px] 2xl:text-[35px]">
          <hr className="w-2/5 h-3 bg-white rounded-[40px] ml-0 mr-auto border-0" ></hr>
          <p className="pt-2 pl-[30px] text-left">
            Поговорите с котиком! Он улыбается, грустит или удивляется в зависимости от того, что вы ему скажете. <br></br> Всё работает прямо в браузере.
          </p>
          <hr className="w-2/5 h-3 bg-white rounded-[40px] mt-20 ml-auto mr-0 border-0"/>
          <p className="pt-2 pr-[30px] text-right">
            Это прототип — идеален для теста эмоций и UI. Здесь не нужен сервер, только ваши фразы и котик 🐾
          </p>
        </div>

        <ChatWidget />

        <footer className="footer">
          <div className="flex items-center gap-[15px] mb-[30px]">
            <img className="w-[60px] h-auto" src="/Group 195.svg" alt="AvatarMaster logo" />
            <p className="m-0 font-['Jersey 15'] text-[40px] max-[425px]:text-[22px]">AvatarMaster</p>
          </div>
          <div className="flex justify-end mt-[30px]">
            <div className="grid grid-cols-[auto_1fr_10px_1fr] items-center w-1/2 max-[768px]:flex max-[768px]:flex-col max-[768px]:w-full max-[768px]:gap-[15px]">
              <p className="m-0 font-['Russo One'] text-[20px] whitespace-nowrap max-[768px]:self-end">Контакты</p>
              <div className="phones">
                <p>+7 952 604 24 24</p>
                <p>+7 918 531 81 46</p>
                <p>+7 951 502 93 22</p>
                <p>+7 904 448 00 08</p>
              </div>
            </div>
          </div>
          <hr className='mt-[43px] w-[90%] h-[30px] bg-white mx-auto border-0'></hr>
        </footer>
      </main>
    </>
  );
}

